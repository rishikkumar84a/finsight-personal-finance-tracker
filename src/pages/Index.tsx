
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryChart } from '@/components/CategoryChart';
import { MonthlyChart } from '@/components/MonthlyChart';
import { BudgetManager } from '@/components/BudgetManager';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentTransactions } from '@/components/RecentTransactions';
import { BudgetProgress } from '@/components/BudgetProgress';
import { Transaction, Budget, Category } from '@/types/finance';
import { mockTransactions, mockBudgets } from '@/data/mockData';
import { PlusCircle, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === selectedMonth && 
           transactionDate.getFullYear() === selectedYear;
  });

  const totalExpenses = currentMonthTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudget = (category: Category, amount: number) => {
    setBudgets(prev => {
      const existing = prev.find(b => b.category === category);
      if (existing) {
        return prev.map(b => b.category === category ? { ...b, amount } : b);
      } else {
        return [...prev, { id: Date.now().toString(), category, amount }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FinSight
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Your personal finance dashboard</p>
        </div>

        {/* Quick Stats */}
        <DashboardStats 
          transactions={currentMonthTransactions}
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
                  <CardTitle>Monthly Spending Trend</CardTitle>
                  <CardDescription>Your spending pattern over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <MonthlyChart transactions={transactions} />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryChart transactions={currentMonthTransactions} />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <RecentTransactions transactions={transactions.slice(0, 5)} />
              <BudgetProgress 
                transactions={currentMonthTransactions}
                budgets={budgets}
              />
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Add Transaction</CardTitle>
                  <CardDescription>Record a new expense or income</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionForm onSubmit={addTransaction} />
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                <TransactionList 
                  transactions={transactions}
                  onUpdate={updateTransaction}
                  onDelete={deleteTransaction}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetManager 
              budgets={budgets}
              onUpdateBudget={updateBudget}
              transactions={currentMonthTransactions}
            />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalExpenses > totalBudget ? (
                      <span className="text-red-600">Over Budget</span>
                    ) : (
                      <span className="text-green-600">On Track</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ₹{Math.abs(totalBudget - totalExpenses).toFixed(2)} 
                    {totalExpenses > totalBudget ? ' over' : ' remaining'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(() => {
                      const categoryTotals = currentMonthTransactions.reduce((acc, t) => {
                        acc[t.category] = (acc[t.category] || 0) + t.amount;
                        return acc;
                      }, {} as Record<string, number>);
                      
                      const topCategory = Object.entries(categoryTotals)
                        .sort(([,a], [,b]) => b - a)[0];
                      
                      return topCategory ? topCategory[0] : 'None';
                    })()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Highest spending category this month
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
                    ₹{(totalExpenses / new Date().getDate()).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Daily spending average
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
                <CardDescription>AI-powered recommendations for your finances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgets.map(budget => {
                  const spent = currentMonthTransactions
                    .filter(t => t.category === budget.category)
                    .reduce((sum, t) => sum + t.amount, 0);
                  
                  const percentage = (spent / budget.amount) * 100;
                  
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
                
                {budgets.every(budget => {
                  const spent = currentMonthTransactions
                    .filter(t => t.category === budget.category)
                    .reduce((sum, t) => sum + t.amount, 0);
                  return (spent / budget.amount) * 100 <= 90;
                }) && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Great job! You're staying within your budgets this month.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
