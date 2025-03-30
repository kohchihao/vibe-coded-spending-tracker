import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CategoriesList } from "@/components/categories/categories-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Categories" text="Manage your expense categories">
        <Button asChild>
          <Link href="/categories/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-8">
        <CategoriesList />
      </div>
    </DashboardShell>
  )
}

