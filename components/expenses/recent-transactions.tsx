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
import { useRecentTransactions } from '@/lib/hooks/useRecentTransactions';
import { formatCurrency } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import CategoryIcon from '../categories/CategoryIcon';

export function RecentTransactions() {
  const { privacyMode, isLoading: isPrivacyLoading } = usePrivacy();
  const { user } = useSession();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useRecentTransactions(user?.id ?? '');

  // Don't render anything while loading privacy settings
  if (isPrivacyLoading) {
    return null;
  }

  // Show loading spinner while fetching transactions
  if (isTransactionsLoading) {
    return (
      <Card className="col-span-4">
        <CardHeader className="pb-3">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription className="hidden md:block">
            Your most recent expenses across all accounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="pb-3">
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription className="hidden md:block">
          Your most recent expenses across all accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 md:space-y-8">
          {transactions?.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <CategoryIcon
                color={transaction.category_color}
                icon={transaction.category_icon}
              />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category_name} • {transaction.account_name}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {formatCurrency(transaction.amount, privacyMode)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
