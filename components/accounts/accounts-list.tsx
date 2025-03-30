"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { usePrivacy } from "@/contexts/privacy-context"

// Mock data for accounts
const accounts = [
  {
    id: "1",
    name: "Cash",
    balance: 245.5,
    description: "Physical cash for day-to-day expenses",
  },
  {
    id: "2",
    name: "Credit Card",
    balance: 678.24,
    description: "Main credit card for online purchases and subscriptions",
  },
  {
    id: "3",
    name: "Bank Account",
    balance: 1322.15,
    description: "Primary checking account for bills and regular expenses",
  },
]

export function AccountsList() {
  const { privacyMode } = usePrivacy()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <Card key={account.id}>
          <CardHeader>
            <CardTitle>{account.name}</CardTitle>
            <CardDescription>{account.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(account.balance, privacyMode)}</div>
            <p className="text-xs text-muted-foreground">Current Balance</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

