import { EditAccountForm } from '@/components/accounts/edit-account-form';
import { PrivateRoute } from '@/components/auth/private-route';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export default function EditAccountPage() {
  return (
    <PrivateRoute>
      <DashboardShell>
        <DashboardHeader
          heading="Edit Account"
          text="Modify your account details"
        />
        <div className="grid gap-8">
          <EditAccountForm />
        </div>
      </DashboardShell>
    </PrivateRoute>
  );
}
