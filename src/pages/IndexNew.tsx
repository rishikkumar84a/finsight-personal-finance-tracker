import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryChart } from '@/components/CategoryChart';
import { MonthlyChart } from '@/components/MonthlyChart';
import { BudgetManager } from '@/components/BudgetManager';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentTransactions } from '@/components/RecentTransactions';
import { BudgetProgress } from '@/components/BudgetProgress';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/hooks/useTransactions';
import { useBudgets } from '@/hooks/useBudgets';
import { PlusCircle, TrendingUp, DollarSign, AlertTriangle, LogOut, User, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Index = () => {
  const { user, logout } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { 
    transactions, 
    isLoading: transactionsLoading, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useTransactions({
    month: selectedMonth,
    year: selectedYear
  });

  const { 
    budgets, 
    isLoading: budgetsLoading, 
    createBudget, 
    updateBudget 
  } = useBudgets({
    month: selectedMonth,
    year: selectedYear
  });

  const handleLogout = () => {
    logout();
  };

  const handleAddTransaction = async (transactionData: {
    description: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
  }) => {
    await addTransaction(transactionData);
  };

  const handleUpdateBudget = async (category: string, amount: number) => {
    try {
      // Check if budget exists for this category
      const existingBudget = budgets.find(b => b.category === category);
      
      if (existingBudget) {
        await updateBudget(existingBudget.id, { amount });
      } else {
        await createBudget({
          category,
          amount,
          month: selectedMonth,
          year: selectedYear
        });
      }
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  // Calculate totals for current month
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

  if (transactionsLoading && budgetsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-slate-600">Loading your financial data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinSight
              </h1>
            </div>
            <p className="text-slate-600 text-lg">Welcome back, {user?.username}!</p>
          </div>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {user?.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Stats */}
        <DashboardStats 
          transactions={transactions}
          budgets={budgets}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />

        <Tabs defaultValue="dashboard" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Monthly Overview</CardTitle>
                  <CardDescription>Your financial summary for this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <MonthlyChart transactions={transactions} />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Expense Categories</CardTitle>
                  <CardDescription>Breakdown of your spending by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryChart transactions={transactions.filter(t => t.type === 'expense')} />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions transactions={transactions.slice(0, 5)} />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Budget Progress</CardTitle>
                  <CardDescription>How you're tracking against your budgets</CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetProgress budgets={budgets} transactions={transactions} />
                </CardContent>
              </Card>
            </div>

            {/* Financial Insights */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{Math.abs(totalIncome - totalExpenses).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {totalIncome - totalExpenses >= 0 ? 'Surplus' : 'Deficit'} this month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : '0'}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentage of income saved
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{totalExpenses > 0 ? (totalExpenses / new Date().getDate()).toFixed(2) : '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Daily spending average
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Budget Alerts */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
                <CardDescription>AI-powered recommendations for your finances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgets.map(budget => {
                  const spent = transactions
                    .filter(t => t.category === budget.category && t.type === 'expense')
                    .reduce((sum, t) => sum + t.amount, 0);
                  
                  const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
                  
                  if (percentage > 90) {
                    return (
                      <div key={budget.id} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">
                          You're {percentage > 100 ? 'over' : 'close to'} your {budget.category} budget 
                          ({percentage.toFixed(1)}% used)
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
                
                {budgets.length > 0 && budgets.every(budget => {
                  const spent = transactions
                    .filter(t => t.category === budget.category && t.type === 'expense')
                    .reduce((sum, t) => sum + t.amount, 0);
                  return budget.amount === 0 || (spent / budget.amount) * 100 <= 90;
                }) && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Great job! You're staying within your budgets this month.</span>
                  </div>
                )}

                {budgets.length === 0 && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <PlusCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">
                      Set up budgets to get personalized spending insights and alerts.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Add Transaction</CardTitle>
                  <CardDescription>Record a new income or expense</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionForm onSubmit={handleAddTransaction} />
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>All your financial transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionList 
                      transactions={transactions}
                      onUpdate={updateTransaction}
                      onDelete={deleteTransaction}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Budget Management</CardTitle>
                <CardDescription>Set and track your monthly spending limits</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetManager 
                  budgets={budgets}
                  transactions={transactions}
                  onUpdateBudget={handleUpdateBudget}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Spending Trends</CardTitle>
                  <CardDescription>Monthly spending comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <MonthlyChart transactions={transactions} />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Category Analysis</CardTitle>
                  <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryChart transactions={transactions.filter(t => t.type === 'expense')} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
