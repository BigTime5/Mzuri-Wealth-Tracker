import { useMemo } from 'react';
import { useFinance } from '@/hooks/useFinance';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { NetWorthChart } from '@/components/NetWorthChart';
import { TransactionList } from '@/components/TransactionList';
import { CategoryBreakdown } from '@/components/CategoryBreakdown';
import { BudgetProgress } from '@/components/BudgetProgress';
import { calculateTotals, getMonthlyData, formatCurrency } from '@/lib/finance';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const {
    transactions,
    budgets,
    isLoading,
    addTransaction,
    deleteTransaction,
    resetData,
  } = useFinance();

  const totals = useMemo(() => calculateTotals(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAddTransaction={addTransaction} onReset={resetData} />
      
      <main className="container py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Net Worth"
            value={formatCurrency(totals.netWorth)}
            subtitle="Your total balance"
            icon={<Wallet className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            title="Total Income"
            value={formatCurrency(totals.income)}
            subtitle="All time earnings"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="income"
          />
          <StatCard
            title="Total Expenses"
            value={formatCurrency(totals.expenses)}
            subtitle="All time spending"
            icon={<TrendingDown className="h-5 w-5" />}
            variant="expense"
          />
          <StatCard
            title="Savings Rate"
            value={totals.income > 0 
              ? `${((totals.netWorth / totals.income) * 100).toFixed(0)}%`
              : '0%'
            }
            subtitle="Of total income saved"
            icon={<PiggyBank className="h-5 w-5" />}
          />
        </div>

        {/* Net Worth Chart */}
        <NetWorthChart data={monthlyData} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction} 
            />
          </div>

          {/* Right Column - Breakdowns */}
          <div className="space-y-6">
            <BudgetProgress transactions={transactions} budgets={budgets} />
            <CategoryBreakdown transactions={transactions} type="expense" />
            <CategoryBreakdown transactions={transactions} type="income" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>🇰🇪 Made for Kenya • Amounts in Kenyan Shillings (KES)</p>
            <p>Data synced securely across your devices</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
