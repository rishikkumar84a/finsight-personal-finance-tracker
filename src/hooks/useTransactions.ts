import { useState, useEffect } from 'react';
import { transactionsAPI } from '@/utils/api';
import { Transaction } from '@/types/finance';
import { useToast } from '@/hooks/use-toast';

export interface ApiTransaction {
  _id: string;
  user: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// Convert API transaction to frontend transaction format
const convertToFrontendTransaction = (apiTransaction: ApiTransaction): Transaction => ({
  id: apiTransaction._id,
  description: apiTransaction.description,
  amount: apiTransaction.amount,
  type: apiTransaction.type,
  category: apiTransaction.category as any,
  date: apiTransaction.date.split('T')[0], // Convert ISO date to YYYY-MM-DD
});

export const useTransactions = (filters?: {
  month?: number;
  year?: number;
  category?: string;
  type?: string;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await transactionsAPI.getTransactions(filters);
      
      if (response.data.success) {
        const apiTransactions: ApiTransaction[] = response.data.data.transactions;
        const convertedTransactions = apiTransactions.map(convertToFrontendTransaction);
        setTransactions(convertedTransactions);
      }
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch transactions';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (transactionData: {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date?: string;
  }) => {
    try {
      const response = await transactionsAPI.createTransaction(transactionData);
      
      if (response.data.success) {
        const newTransaction = convertToFrontendTransaction(response.data.data.transaction);
        setTransactions(prev => [newTransaction, ...prev]);
        
        toast({
          title: 'Success',
          description: 'Transaction added successfully',
        });
        
        return newTransaction;
      }
    } catch (err: any) {
      console.error('Error creating transaction:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create transaction';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<{
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
  }>) => {
    try {
      const response = await transactionsAPI.updateTransaction(id, updates);
      
      if (response.data.success) {
        const updatedTransaction = convertToFrontendTransaction(response.data.data.transaction);
        setTransactions(prev => 
          prev.map(t => t.id === id ? updatedTransaction : t)
        );
        
        toast({
          title: 'Success',
          description: 'Transaction updated successfully',
        });
        
        return updatedTransaction;
      }
    } catch (err: any) {
      console.error('Error updating transaction:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update transaction';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const response = await transactionsAPI.deleteTransaction(id);
      
      if (response.data.success) {
        setTransactions(prev => prev.filter(t => t.id !== id));
        
        toast({
          title: 'Success',
          description: 'Transaction deleted successfully',
        });
      }
    } catch (err: any) {
      console.error('Error deleting transaction:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete transaction';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters?.month, filters?.year, filters?.category, filters?.type]);

  return {
    transactions,
    isLoading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  };
};
