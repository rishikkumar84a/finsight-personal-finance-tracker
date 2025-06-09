
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Budget, Transaction, Category } from '@/types/finance';
import { categories, categoryColors } from '@/data/mockData';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface BudgetManagerProps {
  budgets: Budget[];
  onUpdateBudget: (category: Category, amount: number) => void;
  transactions: Transaction[];
}

export const BudgetManager = ({ budgets, onUpdateBudget, transactions }: BudgetManagerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Food & Dining');
  const [budgetAmount, setBudgetAmount] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(budgetAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid budget amount",
        variant: "destructive",
      });
      return;
    }

    onUpdateBudget(selectedCategory, amount);
    setBudgetAmount('');
    
    toast({
      title: "Success",
      description: `Budget for ${selectedCategory} updated successfully`,
    });
  };

  const getBudgetProgress = (category: Category) => {
    const budget = budgets.find(b => b.category === category);
    const spent = transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      budget: budget?.amount || 0,
      spent,
      percentage: budget ? (spent / budget.amount) * 100 : 0
    };
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Set Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
                <SelectTrigger className="focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="amount">Monthly Budget (₹)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="focus-visible:ring-blue-500"
              />
            </div>
            
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Update Budget
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => {
          const { budget, spent, percentage } = getBudgetProgress(category);
          const isOverBudget = percentage > 100;
          const isWarning = percentage > 80 && percentage <= 100;
          
          return (
            <Card key={category} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{category}</CardTitle>
                  <Badge 
                    variant={isOverBudget ? 'destructive' : isWarning ? 'secondary' : 'default'}
                    className="flex items-center gap-1"
                  >
                    {isOverBudget && <AlertTriangle className="h-3 w-3" />}
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Spent: ₹{spent.toFixed(2)}</span>
                  <span>Budget: ₹{budget.toFixed(2)}</span>
                </div>
                
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-2"
                  style={{
                    // @ts-ignore
                    '--progress-background': isOverBudget ? '#ef4444' : isWarning ? '#f59e0b' : '#22c55e'
                  }}
                />
                
                <div className="text-xs text-muted-foreground">
                  {budget > 0 ? (
                    <>
                      {isOverBudget ? (
                        <span className="text-red-600 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          ₹{(spent - budget).toFixed(2)} over budget
                        </span>
                      ) : (
                        <span className="text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          ₹{(budget - spent).toFixed(2)} remaining
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-slate-500">No budget set</span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
