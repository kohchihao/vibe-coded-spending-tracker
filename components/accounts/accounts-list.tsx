'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { usePrivacy } from '@/contexts/privacy-context';
import { useSession } from '@/contexts/session-context';
import { useAccounts } from '@/lib/hooks/useAccounts';
import { formatCurrency } from '@/lib/utils';
import { Edit } from 'lucide-react';

export function AccountsList() {
  const { privacyMode, isLoading } = usePrivacy();
  const { user } = useSession();
  const { data: accounts, isLoading: isAccountsLoading } = useAccounts(
    user?.id ?? ''
  );

  if (isLoading) {
    return null;
  }

  if (isAccountsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {accounts?.map((account) => (
        <Card key={account.id}>
          <CardHeader>
            <CardTitle>{account.name}</CardTitle>
            <CardDescription>{account.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(account.balance, privacyMode)}
            </div>
            <p className="text-xs text-muted-foreground">Current Balance</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
