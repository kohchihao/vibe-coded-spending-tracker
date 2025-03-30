import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddCategoryForm } from "@/components/categories/add-category-form"

export default function AddCategoryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add Category" text="Create a new expense category" />
      <div className="grid gap-8">
        <AddCategoryForm />
      </div>
    </DashboardShell>
  )
}

