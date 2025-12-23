import { useState, useEffect, useCallback } from 'react';
import { Transaction, Budget } from '@/types/finance';
import { 
  getDefaultBudgets, 
  checkBudgetAlerts,
} from '@/lib/finance';
import { toast } from '@/hooks/use-toast';
import { EXPENSE_CATEGORIES } from '@/lib/finance';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useFinance = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from database
  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (transactionsError) throw transactionsError;

        // Fetch budgets
        const { data: budgetsData, error: budgetsError } = await supabase
          .from('budgets')
          .select('*')
          .eq('user_id', user.id);

        if (budgetsError) throw budgetsError;

        // Transform database data to app format
        const formattedTransactions: Transaction[] = (transactionsData || []).map(t => ({
          id: t.id,
          type: t.type as 'income' | 'expense',
          category: t.category as Transaction['category'],
          amount: Number(t.amount),
          description: t.description,
          date: t.date,
        }));

        const formattedBudgets: Budget[] = (budgetsData || []).map(b => ({
          category: b.category as Budget['category'],
          limit: Number(b.amount),
        }));

        setTransactions(formattedTransactions);
        setBudgets(formattedBudgets.length > 0 ? formattedBudgets : getDefaultBudgets());

        // Initialize default budgets if none exist
        if (budgetsData?.length === 0) {
          const defaults = getDefaultBudgets();
          for (const budget of defaults) {
            await supabase.from('budgets').insert({
              user_id: user.id,
              category: budget.category,
              amount: budget.limit,
            });
          }
        }
      } catch (error) {
        console.error('Failed to load finance data:', error);
        toast({
          variant: "destructive",
          title: "Error Loading Data",
          description: "Failed to load your financial data. Please try again.",
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [user]);

  // Check budget alerts when transactions change
  useEffect(() => {
    if (!isLoading && transactions.length > 0 && budgets.length > 0) {
      const alerts = checkBudgetAlerts(transactions, budgets);
      alerts.forEach(alert => {
        const category = EXPENSE_CATEGORIES.find(c => c.value === alert.category);
        if (alert.percentage >= 100) {
          toast({
            variant: "destructive",
            title: `${category?.icon} Budget Exceeded!`,
            description: `You've exceeded your ${category?.label} budget by ${Math.round(alert.percentage - 100)}%`,
          });
        } else if (alert.percentage >= 80) {
          toast({
            title: `${category?.icon} Budget Warning`,
            description: `You've used ${Math.round(alert.percentage)}% of your ${category?.label} budget`,
          });
        }
      });
    }
  }, [transactions, budgets, isLoading]);

  const addTransaction = useCallback(async (
    transaction: Omit<Transaction, 'id'>
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: transaction.type,
          category: transaction.category,
          amount: transaction.amount,
          description: transaction.description,
          date: transaction.date,
        })
        .select()
        .single();

      if (error) throw error;

      const newTransaction: Transaction = {
        id: data.id,
        type: data.type as 'income' | 'expense',
        category: data.category as Transaction['category'],
        amount: Number(data.amount),
        description: data.description,
        date: data.date,
      };

      setTransactions(prev => [newTransaction, ...prev]);
      
      toast({
        title: transaction.type === 'income' ? '💰 Income Added' : '💸 Expense Added',
        description: `${transaction.description} recorded successfully`,
      });
    } catch (error) {
      console.error('Failed to add transaction:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add transaction. Please try again.",
      });
    }
  }, [user]);

  const deleteTransaction = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTransactions(prev => prev.filter(t => t.id !== id));
      toast({
        title: 'Transaction Deleted',
        description: 'The transaction has been removed',
      });
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
      });
    }
  }, [user]);

  const updateBudget = useCallback(async (category: Budget['category'], limit: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('budgets')
        .upsert({
          user_id: user.id,
          category,
          amount: limit,
        }, {
          onConflict: 'user_id,category',
        });

      if (error) throw error;

      setBudgets(prev => {
        const existing = prev.find(b => b.category === category);
        if (existing) {
          return prev.map(b => b.category === category ? { ...b, limit } : b);
        }
        return [...prev, { category, limit }];
      });
      
      toast({
        title: '📊 Budget Updated',
        description: 'Your budget has been saved',
      });
    } catch (error) {
      console.error('Failed to update budget:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update budget. Please try again.",
      });
    }
  }, [user]);

  const resetData = useCallback(async () => {
    if (!user) return;

    try {
      // Delete all user transactions
      const { error: deleteError } = await supabase
        .from('transactions')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setTransactions([]);
      toast({
        title: '🔄 Data Reset',
        description: 'All transactions have been cleared',
      });
    } catch (error) {
      console.error('Failed to reset data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset data. Please try again.",
      });
    }
  }, [user]);

  return {
    transactions,
    budgets,
    isLoading,
    addTransaction,
    deleteTransaction,
    updateBudget,
    resetData,
  };
};
