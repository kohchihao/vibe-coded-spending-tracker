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
import { motion } from 'framer-motion';

// Mock data for expense categories
const expenseCategories = [
  {
    category: 'Food',
    amount: 345.65,
    percentage: 27.7,
  },
  {
    category: 'Transportation',
    amount: 245.3,
    percentage: 19.7,
  },
  {
    category: 'Entertainment',
    amount: 198.45,
    percentage: 15.9,
  },
  {
    category: 'Bills',
    amount: 320.49,
    percentage: 25.7,
  },
  {
    category: 'Shopping',
    amount: 136.0,
    percentage: 10.9,
  },
];

export function ExpenseList() {
  const { privacyMode, isLoading } = usePrivacy();

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Your spending by category this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenseCategories.map((category, index) => (
            <div key={category.category} className="flex items-center">
              <div className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {category.category}
                  </p>
                  <p className="text-sm font-medium">
                    {formatCurrency(category.amount, privacyMode)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full rounded-full bg-muted">
                    <motion.div
                      className="h-2 rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                  <motion.span
                    className="text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.8,
                    }}
                  >
                    {category.percentage}%
                  </motion.span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
