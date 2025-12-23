import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Transaction } from '@/types/finance';
import { getCategoryTotals, formatCurrency, formatShortCurrency } from '@/lib/finance';
import { cn } from '@/lib/utils';

interface CategoryBreakdownProps {
  transactions: Transaction[];
  type: 'income' | 'expense';
}

const COLORS = {
  income: [
    'hsl(158, 64%, 32%)',
    'hsl(158, 64%, 42%)',
    'hsl(158, 64%, 52%)',
    'hsl(38, 92%, 50%)',
    'hsl(38, 92%, 60%)',
    'hsl(200, 60%, 50%)',
  ],
  expense: [
    'hsl(0, 72%, 51%)',
    'hsl(0, 72%, 61%)',
    'hsl(25, 95%, 53%)',
    'hsl(38, 92%, 50%)',
    'hsl(45, 93%, 47%)',
    'hsl(280, 60%, 50%)',
    'hsl(200, 60%, 50%)',
    'hsl(160, 60%, 40%)',
    'hsl(220, 60%, 50%)',
    'hsl(320, 60%, 50%)',
  ],
};

export const CategoryBreakdown = ({ transactions, type }: CategoryBreakdownProps) => {
  const categoryData = useMemo(() => {
    return getCategoryTotals(transactions, type);
  }, [transactions, type]);

  const total = useMemo(() => {
    return categoryData.reduce((sum, cat) => sum + cat.total, 0);
  }, [categoryData]);

  if (categoryData.length === 0) {
    return (
      <div className="bg-card rounded-xl p-5 shadow-card animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {type === 'income' ? 'Income' : 'Expense'} Breakdown
        </h3>
        <div className="text-center py-8 text-muted-foreground">
          <p>No {type} recorded yet</p>
        </div>
      </div>
    );
  }

  const pieData = categoryData.map(cat => ({
    name: cat.label,
    value: cat.total,
    icon: cat.icon,
  }));

  return (
    <div className="bg-card rounded-xl p-5 shadow-card animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {type === 'income' ? 'Income' : 'Expense'} Breakdown
        </h3>
        <p className="text-sm text-muted-foreground">
          Total: {formatCurrency(total)}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full lg:w-1/2 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[type][index % COLORS[type].length]}
                    className="transition-opacity hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-card border border-border rounded-lg p-2 shadow-lg text-sm">
                        <p className="font-medium">{data.icon} {data.name}</p>
                        <p className="text-muted-foreground">{formatCurrency(data.value)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 space-y-2">
          {categoryData.slice(0, 5).map((cat, index) => {
            const percentage = ((cat.total / total) * 100).toFixed(0);
            return (
              <div key={cat.value} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[type][index % COLORS[type].length] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate">
                      {cat.icon} {cat.label}
                    </span>
                    <span className="font-medium ml-2">{percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: COLORS[type][index % COLORS[type].length],
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
