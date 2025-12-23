import { Transaction, MonthlyData, Budget, IncomeCategory, ExpenseCategory } from '@/types/finance';

export const INCOME_CATEGORIES: { value: IncomeCategory; label: string; icon: string }[] = [
  { value: 'salary', label: 'Salary', icon: '💼' },
  { value: 'investments', label: 'Investments', icon: '📈' },
  { value: 'business', label: 'Business', icon: '🏪' },
  { value: 'freelance', label: 'Freelance', icon: '💻' },
  { value: 'rental', label: 'Rental Income', icon: '🏠' },
  { value: 'other', label: 'Other', icon: '💰' },
];

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string; icon: string }[] = [
  { value: 'rent', label: 'Rent/Mortgage', icon: '🏠' },
  { value: 'utilities', label: 'Utilities', icon: '💡' },
  { value: 'food', label: 'Food & Groceries', icon: '🛒' },
  { value: 'transport', label: 'Transport', icon: '🚗' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'savings', label: 'Savings/SACCO', icon: '🏦' },
  { value: 'other', label: 'Other', icon: '📝' },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatShortCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `KES ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `KES ${(amount / 1000).toFixed(0)}K`;
  }
  return formatCurrency(amount);
};

export const calculateTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    income,
    expenses,
    netWorth: income - expenses,
  };
};

export const getMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthlyMap = new Map<string, { income: number; expenses: number }>();
  
  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const existing = monthlyMap.get(monthKey) || { income: 0, expenses: 0 };
    
    if (t.type === 'income') {
      existing.income += t.amount;
    } else {
      existing.expenses += t.amount;
    }
    
    monthlyMap.set(monthKey, existing);
  });
  
  const sortedMonths = Array.from(monthlyMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  let cumulativeNetWorth = 0;
  
  return sortedMonths.map(([month, data]) => {
    cumulativeNetWorth += data.income - data.expenses;
    const date = new Date(month + '-01');
    const monthName = date.toLocaleDateString('en-KE', { month: 'short', year: '2-digit' });
    
    return {
      month: monthName,
      income: data.income,
      expenses: data.expenses,
      netWorth: cumulativeNetWorth,
    };
  });
};

export const getCategoryTotals = (transactions: Transaction[], type: 'income' | 'expense') => {
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const filtered = transactions.filter(t => t.type === type);
  
  return categories.map(cat => {
    const total = filtered
      .filter(t => t.category === cat.value)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      ...cat,
      total,
    };
  }).filter(cat => cat.total > 0);
};

export const checkBudgetAlerts = (
  transactions: Transaction[], 
  budgets: Budget[]
): { category: ExpenseCategory; spent: number; limit: number; percentage: number }[] => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthExpenses = transactions.filter(
    t => t.type === 'expense' && t.date.startsWith(currentMonth)
  );
  
  return budgets.map(budget => {
    const spent = currentMonthExpenses
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      category: budget.category,
      spent,
      limit: budget.limit,
      percentage: budget.limit > 0 ? (spent / budget.limit) * 100 : 0,
    };
  }).filter(b => b.percentage >= 80);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Sample data for demo purposes
export const getSampleTransactions = (): Transaction[] => {
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 7);
  const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString().slice(0, 7);
  
  return [
    // Current month
    { id: generateId(), type: 'income', amount: 120000, category: 'salary', description: 'Monthly salary', date: `${currentMonth}-05` },
    { id: generateId(), type: 'income', amount: 15000, category: 'freelance', description: 'Web design project', date: `${currentMonth}-15` },
    { id: generateId(), type: 'expense', amount: 35000, category: 'rent', description: 'Monthly rent', date: `${currentMonth}-01` },
    { id: generateId(), type: 'expense', amount: 8000, category: 'utilities', description: 'KPLC & Water', date: `${currentMonth}-10` },
    { id: generateId(), type: 'expense', amount: 12000, category: 'food', description: 'Groceries', date: `${currentMonth}-08` },
    { id: generateId(), type: 'expense', amount: 5000, category: 'transport', description: 'Fuel & Matatu', date: `${currentMonth}-12` },
    
    // Last month
    { id: generateId(), type: 'income', amount: 120000, category: 'salary', description: 'Monthly salary', date: `${lastMonth}-05` },
    { id: generateId(), type: 'income', amount: 8000, category: 'investments', description: 'M-Shwari interest', date: `${lastMonth}-28` },
    { id: generateId(), type: 'expense', amount: 35000, category: 'rent', description: 'Monthly rent', date: `${lastMonth}-01` },
    { id: generateId(), type: 'expense', amount: 7500, category: 'utilities', description: 'KPLC & Water', date: `${lastMonth}-10` },
    { id: generateId(), type: 'expense', amount: 15000, category: 'food', description: 'Groceries', date: `${lastMonth}-08` },
    { id: generateId(), type: 'expense', amount: 20000, category: 'savings', description: 'SACCO contribution', date: `${lastMonth}-15` },
    
    // Two months ago
    { id: generateId(), type: 'income', amount: 115000, category: 'salary', description: 'Monthly salary', date: `${twoMonthsAgo}-05` },
    { id: generateId(), type: 'expense', amount: 35000, category: 'rent', description: 'Monthly rent', date: `${twoMonthsAgo}-01` },
    { id: generateId(), type: 'expense', amount: 6000, category: 'utilities', description: 'KPLC & Water', date: `${twoMonthsAgo}-10` },
    { id: generateId(), type: 'expense', amount: 10000, category: 'food', description: 'Groceries', date: `${twoMonthsAgo}-08` },
    { id: generateId(), type: 'expense', amount: 15000, category: 'healthcare', description: 'NHIF & Doctor visit', date: `${twoMonthsAgo}-20` },
  ];
};

export const getDefaultBudgets = (): Budget[] => [
  { category: 'rent', limit: 40000 },
  { category: 'food', limit: 15000 },
  { category: 'transport', limit: 8000 },
  { category: 'utilities', limit: 10000 },
  { category: 'entertainment', limit: 5000 },
];
