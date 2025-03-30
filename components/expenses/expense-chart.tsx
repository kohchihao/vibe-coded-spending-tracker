"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { formatCurrency } from "@/lib/utils"
import { usePrivacy } from "@/contexts/privacy-context"

// Mock data for expense categories
const expenseCategories = [
  {
    name: "Food",
    value: 345.65,
    percentage: 27.7,
    color: "#f97316", // orange-500
  },
  {
    name: "Transportation",
    value: 245.3,
    percentage: 19.7,
    color: "#3b82f6", // blue-500
  },
  {
    name: "Entertainment",
    value: 198.45,
    percentage: 15.9,
    color: "#a855f7", // purple-500
  },
  {
    name: "Bills",
    value: 320.49,
    percentage: 25.7,
    color: "#ef4444", // red-500
  },
  {
    name: "Shopping",
    value: 136.0,
    percentage: 10.9,
    color: "#22c55e", // green-500
  },
]

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }: any) => {
  const { privacyMode } = usePrivacy()

  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">{formatCurrency(payload[0].value, privacyMode)}</p>
        <p className="text-xs text-muted-foreground">{`${payload[0].payload.percentage}% of total`}</p>
      </div>
    )
  }
  return null
}

export function ExpenseChart() {
  const { privacyMode } = usePrivacy()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Your spending by category this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(value) => <span>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

