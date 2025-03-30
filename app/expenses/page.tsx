import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { ExpenseChart } from '@/components/expenses/expense-chart';
import { ExpenseDataTable } from '@/components/expenses/expense-data-table';
import { ExpenseTableToolbar } from '@/components/expenses/expense-table-toolbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data for expense categories
const expenseCategories = [
  {
    category: 'Food',
    amount: 345.65,
    percentage: 27.7,
    color: '#f97316', // orange-500
  },
  {
    category: 'Transportation',
    amount: 245.3,
    percentage: 19.7,
    color: '#3b82f6', // blue-500
  },
  {
    category: 'Entertainment',
    amount: 198.45,
    percentage: 15.9,
    color: '#a855f7', // purple-500
  },
  {
    category: 'Bills',
    amount: 320.49,
    percentage: 25.7,
    color: '#ef4444', // red-500
  },
  {
    category: 'Shopping',
    amount: 136.0,
    percentage: 10.9,
    color: '#22c55e', // green-500
  },
];

export default function ExpensesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Expenses"
        text="View and manage your expenses"
      ></DashboardHeader>

      {/* Floating action button for mobile */}
      <div className="fixed bottom-6 left-6 z-10 md:hidden">
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" asChild>
          <Link href="/expenses/add">
            <PlusCircle className="h-6 w-6" />
            <span className="sr-only">Add Expense</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-1 order-2 md:order-1">
          <ExpenseChart />
        </div>
        <div className="md:col-span-1 order-1 md:order-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Expenses</CardTitle>
              <CardDescription>
                Your highest spending categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category) => (
                  <div key={category.category} className="flex items-center">
                    <div className="w-full space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {category.category}
                        </p>
                        <p className="text-sm font-medium">
                          {formatCurrency(category.amount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {category.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4 mt-6">
        <div className="hidden md:block">
          <ExpenseTableToolbar />
        </div>
        <ExpenseDataTable />

        {/* Desktop add expense button */}
        <div className="hidden md:flex md:justify-center mt-6">
          <Button size="lg" asChild>
            <Link href="/expenses/add">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Expense
            </Link>
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
