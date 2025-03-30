"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { BarChart3, CreditCard, Home, PiggyBank, Tag } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <PiggyBank className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Spending Tracker</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-foreground/80",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/expenses"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/expenses") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <BarChart3 className="h-4 w-4" />
          Expenses
        </Link>
        <Link
          href="/accounts"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/accounts") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <CreditCard className="h-4 w-4" />
          Accounts
        </Link>
        <Link
          href="/categories"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-foreground/80",
            pathname?.startsWith("/categories") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Tag className="h-4 w-4" />
          Categories
        </Link>
      </nav>
    </div>
  )
}

