'use client';

import { PrivateRoute } from '@/components/auth/private-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { ExpenseList } from '@/components/expenses/expense-list';
import { ExpenseSummary } from '@/components/expenses/expense-summary';
import { RecentTransactions } from '@/components/expenses/recent-transactions';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardShell>
        <DashboardHeader
          heading="Dashboard"
          text="View and manage your spending"
        >
          {/* Desktop Add Expense button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href="/expenses/add">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
          </div>
        </DashboardHeader>

        {/* Mobile-optimized layout */}
        <div className="grid gap-6">
          {/* Simplified expense summary */}
          <div className="grid gap-4">
            <ExpenseSummary />
          </div>

          {/* Floating action button for mobile - positioned at bottom LEFT */}
          {/* <AddExpenseFloatingButton /> */}

          {/* Recent transactions and expense breakdown side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <RecentTransactions />
            </div>
            <div>
              <ExpenseList />
            </div>
          </div>
        </div>
      </DashboardShell>
    </PrivateRoute>
  );
}
