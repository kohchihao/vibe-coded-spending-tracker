import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AddAccountForm } from "@/components/accounts/add-account-form"

export default function AddAccountPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add Account" text="Create a new spending account" />
      <div className="grid gap-8">
        <AddAccountForm />
      </div>
    </DashboardShell>
  )
}

