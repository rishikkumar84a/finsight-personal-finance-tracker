
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction, Budget } from '@/types/finance';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface DashboardStatsProps {
  transactions: Transaction[];
  budgets: Budget[];
  selectedMonth: number;
  selectedYear: number;
}

export const DashboardStats = ({ transactions, budgets }: DashboardStatsProps) => {
  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const budgetRemaining = totalBudget - currentMonthExpenses;

  const stats = [
    {
      title: "Monthly Expenses",
      value: `₹${currentMonthExpenses.toFixed(2)}`,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: currentMonthExpenses > totalBudget ? "Over budget" : "Within budget"
    },
    {
      title: "Monthly Income",
      value: `₹${currentMonthIncome.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: currentMonthIncome > currentMonthExpenses ? "Positive" : "Negative"
    },
    {
      title: "Total Budget",
      value: `₹${totalBudget.toFixed(2)}`,
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: `${budgets.length} categories`
    },
    {
      title: "Budget Remaining",
      value: `₹${budgetRemaining.toFixed(2)}`,
      icon: DollarSign,
      color: budgetRemaining >= 0 ? "text-green-600" : "text-red-600",
      bgColor: budgetRemaining >= 0 ? "bg-green-50" : "bg-red-50",
      change: budgetRemaining >= 0 ? "Surplus" : "Deficit"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.color} mt-1`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
