import { useState, useEffect } from 'react';
import { Budget, Category } from '../types/finance';
import { budgetsAPI } from '../utils/api';
import { useToast } from './use-toast';

export interface ApiBudget {
  _id: string;
  user: string;
  category: string;
  amount: number;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

// Convert API budget to frontend budget format
const convertToFrontendBudget = (apiBudget: ApiBudget): Budget => ({
  id: apiBudget._id,
  category: apiBudget.category as Category,
  amount: apiBudget.amount,
});

export const useBudgets = (filters?: {
  month?: number;
  year?: number;
}) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBudgets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await budgetsAPI.getBudgets(filters);
      
      if (response.data.success) {
        const apiBudgets: ApiBudget[] = response.data.data.budgets;
        const convertedBudgets = apiBudgets.map(convertToFrontendBudget);
        setBudgets(convertedBudgets);
      }
    } catch (err: any) {
      console.error('Error fetching budgets:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch budgets';
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

  const createBudget = async (budgetData: {
    category: string;
    amount: number;
    month: number;
    year: number;
  }) => {
    try {
      const response = await budgetsAPI.createBudget(budgetData);
      
      if (response.data.success) {
        const newBudget = convertToFrontendBudget(response.data.data.budget);
        setBudgets(prev => [...prev, newBudget]);
        
        toast({
          title: 'Success',
          description: 'Budget created successfully',
        });
        
        return newBudget;
      }
    } catch (err: any) {
      console.error('Error creating budget:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create budget';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateBudget = async (id: string, updates: Partial<{
    category: string;
    amount: number;
    month: number;
    year: number;
  }>) => {
    try {
      const response = await budgetsAPI.updateBudget(id, updates);
      
      if (response.data.success) {
        const updatedBudget = convertToFrontendBudget(response.data.data.budget);
        setBudgets(prev => 
          prev.map(b => b.id === id ? updatedBudget : b)
        );
        
        toast({
          title: 'Success',
          description: 'Budget updated successfully',
        });
        
        return updatedBudget;
      }
    } catch (err: any) {
      console.error('Error updating budget:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update budget';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      const response = await budgetsAPI.deleteBudget(id);
      
      if (response.data.success) {
        setBudgets(prev => prev.filter(b => b.id !== id));
        
        toast({
          title: 'Success',
          description: 'Budget deleted successfully',
        });
      }
    } catch (err: any) {
      console.error('Error deleting budget:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete budget';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [filters?.month, filters?.year]);

  return {
    budgets,
    isLoading,
    error,
    createBudget,
    updateBudget,
    deleteBudget,
    refetch: fetchBudgets,
  };
};
