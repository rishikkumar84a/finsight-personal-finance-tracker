
export type Category = 
  | 'Food & Dining'
  | 'Transportation'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Healthcare'
  | 'Travel'
  | 'Education'
  | 'Personal Care'
  | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string;
  type: 'expense' | 'income';
}

export interface Budget {
  id: string;
  category: Category;
  amount: number;
}

export interface MonthlyData {
  month: string;
  amount: number;
}

export interface CategoryData {
  category: Category;
  amount: number;
  color: string;
}
