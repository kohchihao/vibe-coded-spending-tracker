'use client';

import { PrivateRoute } from '@/components/auth/private-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { AddExpenseForm } from '@/components/expenses/add-expense-form';

export default function AddExpensePage() {
  return (
    <PrivateRoute>
      <DashboardShell>
        <DashboardHeader heading="Add Expense" text="Record a new expense" />
        <div className="grid gap-8">
          <AddExpenseForm />
        </div>
      </DashboardShell>
    </PrivateRoute>
  );
}
