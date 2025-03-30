'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePrivacy } from '@/contexts/privacy-context';
import { formatCurrency } from '@/lib/utils';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Mock data for expense categories
const expenseCategories = [
  {
    name: 'Food',
    value: 345.65,
    percentage: 27.7,
    color: '#f97316', // orange-500
  },
  {
    name: 'Transportation',
    value: 245.3,
    percentage: 19.7,
    color: '#3b82f6', // blue-500
  },
  {
    name: 'Entertainment',
    value: 198.45,
    percentage: 15.9,
    color: '#a855f7', // purple-500
  },
  {
    name: 'Bills',
    value: 320.49,
    percentage: 25.7,
    color: '#ef4444', // red-500
  },
  {
    name: 'Shopping',
    value: 136.0,
    percentage: 10.9,
    color: '#22c55e', // green-500
  },
];

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }: any) => {
  const { privacyMode, isLoading } = usePrivacy();

  if (isLoading) {
    return null;
  }

  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-sm font-semibold">
          {formatCurrency(payload[0].value, privacyMode)}
        </p>
        <p className="text-xs text-muted-foreground">{`${payload[0].payload.percentage}% of total`}</p>
      </div>
    );
  }
  return null;
};

export function ExpenseChart() {
  const { privacyMode, isLoading } = usePrivacy();

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  return (
    <Card className="border-border/40">
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
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Legend
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
