
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Transaction, Budget } from '@/types/finance';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface BudgetProgressProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export const BudgetProgress = ({ transactions, budgets }: BudgetProgressProps) => {
  const budgetProgress = budgets.map(budget => {
    const spent = transactions
      .filter(t => t.category === budget.category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const percentage = (spent / budget.amount) * 100;
    
    return {
      ...budget,
      spent,
      percentage,
      remaining: budget.amount - spent
    };
  }).sort((a, b) => b.percentage - a.percentage);

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Budget Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgetProgress.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No budgets set</p>
          ) : (
            budgetProgress.slice(0, 5).map((budget) => (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <div className="flex items-center gap-2">
                    {budget.percentage > 100 && (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                    <Badge 
                      variant={budget.percentage > 100 ? 'destructive' : budget.percentage > 80 ? 'secondary' : 'default'}
                    >
                      {budget.percentage.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                
                <Progress 
                  value={Math.min(budget.percentage, 100)} 
                  className="h-2"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹{budget.spent.toFixed(2)} spent</span>
                  <span>₹{budget.amount.toFixed(2)} budget</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
