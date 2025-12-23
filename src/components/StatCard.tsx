import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'income' | 'expense';
  className?: string;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) => {
  const variants = {
    default: 'bg-card',
    primary: 'bg-primary text-primary-foreground',
    income: 'bg-card border-l-4 border-l-income',
    expense: 'bg-card border-l-4 border-l-expense',
  };

  const iconVariants = {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary-foreground/20 text-primary-foreground',
    income: 'bg-income/10 text-income',
    expense: 'bg-expense/10 text-expense',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-5 shadow-card transition-all duration-300 hover:shadow-card-hover animate-fade-in',
        variants[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn(
            'text-sm font-medium',
            variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn(
            'text-2xl font-bold tracking-tight currency-display',
            variant === 'income' && 'text-income',
            variant === 'expense' && 'text-expense'
          )}>
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              'text-xs',
              variant === 'primary' ? 'text-primary-foreground/60' : 'text-muted-foreground'
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-medium',
              trend.isPositive ? 'text-income' : 'text-expense'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% from last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          'rounded-lg p-2.5',
          iconVariants[variant]
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};
