import { useMemo } from 'react';
import { Transaction, Budget } from '@/types/finance';
import { formatCurrency, EXPENSE_CATEGORIES } from '@/lib/finance';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface BudgetProgressProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export const BudgetProgress = ({ transactions, budgets }: BudgetProgressProps) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  const budgetStatus = useMemo(() => {
    const currentMonthExpenses = transactions.filter(
      t => t.type === 'expense' && t.date.startsWith(currentMonth)
    );

    return budgets.map(budget => {
      const spent = currentMonthExpenses
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      
      const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
      const category = EXPENSE_CATEGORIES.find(c => c.value === budget.category);

      return {
        ...budget,
        spent,
        percentage,
        remaining: Math.max(0, budget.limit - spent),
        category: category,
        status: percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'ok',
      };
    }).filter(b => b.limit > 0);
  }, [transactions, budgets, currentMonth]);

  if (budgetStatus.length === 0) {
    return null;
  }

  const monthName = new Date().toLocaleDateString('en-KE', { month: 'long' });

  return (
    <div className="bg-card rounded-xl p-5 shadow-card animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Budget Overview</h3>
        <p className="text-sm text-muted-foreground">{monthName} spending progress</p>
      </div>

      <div className="space-y-4">
        {budgetStatus.map((budget) => (
          <div key={budget.category?.value} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>{budget.category?.icon}</span>
                <span className="font-medium">{budget.category?.label}</span>
                {budget.status === 'exceeded' && (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                )}
                {budget.status === 'ok' && budget.percentage > 0 && (
                  <CheckCircle className="h-4 w-4 text-income" />
                )}
              </div>
              <div className="text-right">
                <span className={cn(
                  'font-semibold',
                  budget.status === 'exceeded' && 'text-destructive',
                  budget.status === 'warning' && 'text-warning'
                )}>
                  {formatCurrency(budget.spent)}
                </span>
                <span className="text-muted-foreground"> / {formatCurrency(budget.limit)}</span>
              </div>
            </div>
            
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  budget.status === 'exceeded' && 'bg-destructive',
                  budget.status === 'warning' && 'bg-warning',
                  budget.status === 'ok' && 'bg-income'
                )}
                style={{ width: `${Math.min(100, budget.percentage)}%` }}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              {budget.status === 'exceeded' 
                ? `Exceeded by ${formatCurrency(budget.spent - budget.limit)}`
                : `${formatCurrency(budget.remaining)} remaining`
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
