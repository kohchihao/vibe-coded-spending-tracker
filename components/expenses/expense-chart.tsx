'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePrivacy } from '@/contexts/privacy-context';
import { useSession } from '@/contexts/session-context';
import { useMonthlyExpenseBreakdown } from '@/lib/hooks/useMonthlyExpenseBreakdown';
import { formatCurrency } from '@/lib/utils';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

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

// Generate a random color for each category
const generateRandomColor = () => {
  const colors = [
    '#f97316', // orange-500
    '#3b82f6', // blue-500
    '#a855f7', // purple-500
    '#ef4444', // red-500
    '#22c55e', // green-500
    '#f59e0b', // amber-500
    '#ec4899', // pink-500
    '#8b5cf6', // violet-500
    '#14b8a6', // teal-500
    '#f43f5e', // rose-500
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

interface ExpenseChartProps {
  selectedMonth: string;
}

export function ExpenseChart({ selectedMonth }: ExpenseChartProps) {
  const { isLoading } = usePrivacy();
  const selectedMonthDate = new Date(selectedMonth);
  const { user } = useSession();

  const { data: expenseBreakdown, isLoading: expenseBreakdownLoading } =
    useMonthlyExpenseBreakdown(user?.id ?? '', selectedMonthDate);

  // Don't render anything while loading
  if (isLoading || expenseBreakdownLoading) {
    return null;
  }

  // Transform the expense breakdown data for the chart
  const chartData =
    expenseBreakdown?.map((category) => ({
      name: category.category_name,
      value: category.amount,
      percentage: category.percentage,
      color: generateRandomColor(),
    })) ?? [];

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>
          Your spending by category for{' '}
          {new Date(selectedMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
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
