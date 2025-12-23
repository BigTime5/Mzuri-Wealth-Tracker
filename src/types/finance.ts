export type IncomeCategory = 
  | 'salary' 
  | 'investments' 
  | 'business' 
  | 'freelance' 
  | 'rental' 
  | 'other';

export type ExpenseCategory = 
  | 'rent' 
  | 'utilities' 
  | 'food' 
  | 'transport' 
  | 'healthcare' 
  | 'education' 
  | 'entertainment' 
  | 'shopping' 
  | 'savings'
  | 'other';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: IncomeCategory | ExpenseCategory;
  description: string;
  date: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  netWorth: number;
}

export interface Budget {
  category: ExpenseCategory;
  limit: number;
}

export interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
}
