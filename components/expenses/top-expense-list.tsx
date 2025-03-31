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
import { motion } from 'framer-motion';

interface TopExpenseListProps {
  selectedMonth: string;
}

export function TopExpenseList({ selectedMonth }: TopExpenseListProps) {
  const { privacyMode, isLoading: privacyLoading } = usePrivacy();
  const { user } = useSession();
  const selectedMonthDate = new Date(selectedMonth);
  const { data: expenseCategories, isLoading: dataLoading } =
    useMonthlyExpenseBreakdown(user?.id ?? '', selectedMonthDate);

  // Don't render anything while loading
  if (privacyLoading || dataLoading) {
    return null;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Expenses</CardTitle>
        <CardDescription>Your highest spending categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenseCategories?.map((category, index) => (
            <div key={category.category_name} className="flex items-center">
              <div className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {category.category_name}
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
