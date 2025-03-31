'use client';

import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { AddExpenseFloatingButton } from '@/components/expenses/add-expanse-floating-button';
import { ExpenseChart } from '@/components/expenses/expense-chart';
import { ExpenseDataTable } from '@/components/expenses/expense-data-table';
import { ExpenseTableToolbar } from '@/components/expenses/expense-table-toolbar';
import { TopExpenseList } from '@/components/expenses/top-expense-list';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSession } from '@/contexts/session-context';
import { useMonthlyTotal } from '@/lib/hooks/use-monthly-total';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

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

// Generate last 36 months for the selector
const months = (() => {
  const date = new Date();
  date.setDate(1); // Ensure we're on the 1st of the month
  return Array.from({ length: 36 }, (_, i) => {
    const currentDate = new Date(date.getFullYear(), date.getMonth() - i, 1);
    const value = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}`;
    return {
      value, // Format: YYYY-MM
      label: currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    };
  });
})();

export default function ExpensesPage() {
  const { user } = useSession();
  const [selectedMonth, setSelectedMonth] = useState(months[0].value);

  // Convert selectedMonth string to Date object
  const selectedMonthDate = new Date(selectedMonth);

  const { data: monthlyTotals, isLoading } = useMonthlyTotal(
    user?.id ?? '',
    selectedMonthDate
  );

  // Calculate total spending for the selected month
  const totalSpending = monthlyTotals?.total_expenses ?? 0;

  return (
    <DashboardShell>
      <DashboardHeader heading="Expenses" text="View and manage your expenses">
        <div className="flex items-center gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DashboardHeader>

      {/* Total spending card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Total Spending</CardTitle>
          <CardDescription>
            Your total expenses for{' '}
            {new Date(selectedMonth).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {isLoading ? (
              <div className="h-8 w-32 animate-pulse rounded bg-muted" />
            ) : (
              formatCurrency(totalSpending)
            )}
          </div>
        </CardContent>
      </Card>

      {/* Floating action button for mobile */}
      <AddExpenseFloatingButton />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-1 order-2 md:order-1">
          <ExpenseChart selectedMonth={selectedMonth} />
        </div>
        <div className="md:col-span-1 order-1 md:order-2">
          <TopExpenseList selectedMonth={selectedMonth} />
        </div>
      </div>
      <div className="space-y-4 mt-6">
        <div className="hidden md:block">
          <ExpenseTableToolbar />
        </div>
        <ExpenseDataTable selectedMonth={selectedMonth} />
      </div>
    </DashboardShell>
  );
}
