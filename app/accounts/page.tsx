import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AccountsList } from "@/components/accounts/accounts-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AccountsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Accounts" text="Manage your spending accounts">
        <Button asChild>
          <Link href="/accounts/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Account
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-8">
        <AccountsList />
      </div>
    </DashboardShell>
  )
}

