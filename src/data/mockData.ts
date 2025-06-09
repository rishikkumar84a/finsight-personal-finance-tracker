
import { Transaction, Budget, Category } from '@/types/finance';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 3450.99,
    description: 'Grocery shopping at Big Bazaar',
    category: 'Food & Dining',
    date: '2025-01-07',
    type: 'expense'
  },
  {
    id: '2',
    amount: 250.50,
    description: 'Coffee and snacks',
    category: 'Food & Dining',
    date: '2025-01-06',
    type: 'expense'
  },
  {
    id: '3',
    amount: 2500.00,
    description: 'Petrol fill-up',
    category: 'Transportation',
    date: '2025-01-05',
    type: 'expense'
  },
  {
    id: '4',
    amount: 15999.99,
    description: 'New laptop accessories',
    category: 'Shopping',
    date: '2025-01-04',
    type: 'expense'
  },
  {
    id: '5',
    amount: 800.00,
    description: 'Movie tickets',
    category: 'Entertainment',
    date: '2025-01-03',
    type: 'expense'
  },
  {
    id: '6',
    amount: 4567.78,
    description: 'Electricity bill',
    category: 'Bills & Utilities',
    date: '2025-01-02',
    type: 'expense'
  },
  {
    id: '7',
    amount: 1500.50,
    description: 'Doctor visit consultation',
    category: 'Healthcare',
    date: '2025-01-01',
    type: 'expense'
  },
  {
    id: '8',
    amount: 125000.00,
    description: 'Monthly salary',
    category: 'Other',
    date: '2025-01-01',
    type: 'income'
  },
  {
    id: '9',
    amount: 2343.50,
    description: 'Dinner at restaurant',
    category: 'Food & Dining',
    date: '2024-12-30',
    type: 'expense'
  },
  {
    id: '10',
    amount: 12000.00,
    description: 'Annual gym membership',
    category: 'Healthcare',
    date: '2024-12-28',
    type: 'expense'
  }
];

export const mockBudgets: Budget[] = [
  { id: '1', category: 'Food & Dining', amount: 25000 },
  { id: '2', category: 'Transportation', amount: 15000 },
  { id: '3', category: 'Shopping', amount: 10000 },
  { id: '4', category: 'Entertainment', amount: 7500 },
  { id: '5', category: 'Bills & Utilities', amount: 20000 },
  { id: '6', category: 'Healthcare', amount: 12500 },
];

export const categories: Category[] = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Personal Care',
  'Other'
];

export const categoryColors: Record<Category, string> = {
  'Food & Dining': '#ef4444',
  'Transportation': '#f97316',
  'Shopping': '#eab308',
  'Entertainment': '#22c55e',
  'Bills & Utilities': '#3b82f6',
  'Healthcare': '#a855f7',
  'Travel': '#06b6d4',
  'Education': '#8b5cf6',
  'Personal Care': '#ec4899',
  'Other': '#6b7280'
};
