import { PrivateRoute } from '@/components/auth/private-route';
import { EditCategoryForm } from '@/components/categories/edit-category-form';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export default function EditCategoryPage() {
  return (
    <PrivateRoute>
      <DashboardShell>
        <DashboardHeader
          heading="Edit Category"
          text="Modify your category details"
        />
        <div className="grid gap-8">
          <EditCategoryForm />
        </div>
      </DashboardShell>
    </PrivateRoute>
  );
}
