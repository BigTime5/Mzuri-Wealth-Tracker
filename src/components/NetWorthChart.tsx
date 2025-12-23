import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyData } from '@/types/finance';
import { formatShortCurrency } from '@/lib/finance';

interface NetWorthChartProps {
  data: MonthlyData[];
}

export const NetWorthChart = ({ data }: NetWorthChartProps) => {
  const chartData = useMemo(() => {
    if (data.length === 0) {
      return [
        { month: 'No Data', netWorth: 0, income: 0, expenses: 0 }
      ];
    }
    return data;
  }, [data]);

  return (
    <div className="bg-card rounded-xl p-5 shadow-card animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Net Worth Trend</h3>
        <p className="text-sm text-muted-foreground">Your financial growth over time</p>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(158, 64%, 32%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(158, 64%, 32%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => formatShortCurrency(value)}
              width={80}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as MonthlyData;
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold text-foreground mb-2">{label}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-income">
                          Income: {formatShortCurrency(data.income)}
                        </p>
                        <p className="text-expense">
                          Expenses: {formatShortCurrency(data.expenses)}
                        </p>
                        <p className="font-semibold text-foreground pt-1 border-t border-border">
                          Net Worth: {formatShortCurrency(data.netWorth)}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="netWorth"
              stroke="hsl(158, 64%, 32%)"
              strokeWidth={2.5}
              fill="url(#netWorthGradient)"
              dot={{ fill: 'hsl(158, 64%, 32%)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
