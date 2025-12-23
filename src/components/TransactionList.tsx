import { useMemo } from 'react';
import { Transaction } from '@/types/finance';
import { formatCurrency, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/lib/finance';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 10);
  }, [transactions]);

  const getCategoryInfo = (transaction: Transaction) => {
    const categories = transaction.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return categories.find(c => c.value === transaction.category);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  if (sortedTransactions.length === 0) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-card text-center">
        <p className="text-muted-foreground">No transactions yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add your first transaction to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card animate-fade-in overflow-hidden">
      <div className="p-5 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground">Your latest financial activity</p>
      </div>
      
      <div className="divide-y divide-border">
        {sortedTransactions.map((transaction, index) => {
          const categoryInfo = getCategoryInfo(transaction);
          
          return (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center text-lg',
                  transaction.type === 'income' 
                    ? 'bg-income/10' 
                    : 'bg-expense/10'
                )}>
                  {categoryInfo?.icon || (transaction.type === 'income' ? '💰' : '💸')}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{categoryInfo?.label}</span>
                    <span>•</span>
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={cn(
                    'font-semibold currency-display',
                    transaction.type === 'income' ? 'text-income' : 'text-expense'
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <div className={cn(
                    'flex items-center justify-end gap-1 text-xs',
                    transaction.type === 'income' ? 'text-income' : 'text-expense'
                  )}>
                    {transaction.type === 'income' 
                      ? <TrendingUp className="h-3 w-3" /> 
                      : <TrendingDown className="h-3 w-3" />
                    }
                  </div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this transaction? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(transaction.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
