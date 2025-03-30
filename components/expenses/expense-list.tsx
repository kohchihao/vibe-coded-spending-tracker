"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { usePrivacy } from "@/contexts/privacy-context"

// Mock data for expense categories
const expenseCategories = [
  {
    category: "Food",
    amount: 345.65,
    percentage: 27.7,
  },
  {
    category: "Transportation",
    amount: 245.3,
    percentage: 19.7,
  },
  {
    category: "Entertainment",
    amount: 198.45,
    percentage: 15.9,
  },
  {
    category: "Bills",
    amount: 320.49,
    percentage: 25.7,
  },
  {
    category: "Shopping",
    amount: 136.0,
    percentage: 10.9,
  },
]

export function ExpenseList() {
  const { privacyMode } = usePrivacy()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Your spending by category this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenseCategories.map((category) => (
            <div key={category.category} className="flex items-center">
              <div className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{category.category}</p>
                  <p className="text-sm font-medium">{formatCurrency(category.amount, privacyMode)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${category.percentage}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{category.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

