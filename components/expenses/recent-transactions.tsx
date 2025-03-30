"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { usePrivacy } from "@/contexts/privacy-context"

// Mock data for recent transactions
const recentTransactions = [
  {
    id: "1",
    description: "Grocery Shopping",
    amount: 78.45,
    date: "2025-04-15",
    category: "Food",
    account: "Credit Card",
  },
  {
    id: "2",
    description: "Coffee Shop",
    amount: 4.5,
    date: "2025-04-14",
    category: "Food",
    account: "Cash",
  },
  {
    id: "3",
    description: "Gas Station",
    amount: 45.67,
    date: "2025-04-13",
    category: "Transportation",
    account: "Credit Card",
  },
  {
    id: "4",
    description: "Movie Tickets",
    amount: 24.99,
    date: "2025-04-12",
    category: "Entertainment",
    account: "Bank Account",
  },
  {
    id: "5",
    description: "Phone Bill",
    amount: 65.0,
    date: "2025-04-10",
    category: "Bills",
    account: "Bank Account",
  },
]

// Function to get category icon
function getCategoryIcon(category: string) {
  switch (category) {
    case "Food":
      return {
        icon: () => (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-500"
            >
              <path d="M17 8c0-5-4-5-4-5s-4 0-4 5" />
              <path d="M15 18H9c-1 0-1.5-.5-2-1.5" />
              <path d="M9 18h6v3H9z" />
              <path d="M9 5V3" />
              <path d="M15 5V3" />
              <path d="M12 18v3" />
              <path d="M6 13c-2 1-3 3.5-3 5.5 0 2 1 3.5 3 3.5h0" />
              <path d="M18 13c2 1 3 3.5 3 5.5 0 2-1 3.5-3 3.5h0" />
              <path d="M20 8c1 0 2 1.5 2 3" />
              <path d="M4 8c-1 0-2 1.5-2 3" />
              <path d="M20.5 11c.83 1 1.5 2.4 1.5 4" />
              <path d="M3.5 11c-.83 1-1.5 2.4-1.5 4" />
            </svg>
          </div>
        ),
      }
    case "Transportation":
      return {
        icon: () => (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
        ),
      }
    case "Entertainment":
      return {
        icon: () => (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500"
            >
              <path d="m4 8 2-2m0 0 2-2M6 6 4 4m2 2 2 2" />
              <rect width="12" height="12" x="8" y="8" rx="2" />
              <path d="m15 13-2 2 4 4" />
            </svg>
          </div>
        ),
      }
    case "Bills":
      return {
        icon: () => (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <path d="M8 10h8" />
              <path d="M8 14h4" />
              <path d="M16 18h.01" />
            </svg>
          </div>
        ),
      }
    case "Shopping":
      return {
        icon: () => (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M2 10h20" />
              <path d="M6 14h2" />
              <path d="M16 14h2" />
              <path d="M10 14h4" />
              <path d="M10 6h4" />
              <path d="M6 22V6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v16" />
            </svg>
          </div>
        ),
      }
    case "Health":
      return {
        icon: () => (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-teal-500"
            >
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
              <circle cx="20" cy="10" r="2" />
            </svg>
          </div>
        ),
      }
    default:
      return {
        icon: () => (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        ),
      }
  }
}

export function RecentTransactions() {
  const { privacyMode } = usePrivacy()

  return (
    <Card className="col-span-4">
      <CardHeader className="pb-3">
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription className="hidden md:block">Your most recent expenses across all accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 md:space-y-8">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              {getCategoryIcon(transaction.category).icon()}
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category} • {transaction.account}
                </p>
              </div>
              <div className="ml-auto font-medium">{formatCurrency(transaction.amount, privacyMode)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

