'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePrivacy } from '@/contexts/privacy-context';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useCurrentMonthTotals } from '@/lib/hooks/useCurrentMonthTotals';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from 'lucide-react';

export function ExpenseSummary() {
  const { privacyMode, isLoading: privacyLoading } = usePrivacy();
  const isMobile = useIsMobile();
  const { data: monthlyTotals, isLoading: totalsLoading } =
    useCurrentMonthTotals();

  const { account_expenses } = monthlyTotals ?? {};

  // Don't render anything while loading
  if (privacyLoading || totalsLoading) {
    return null;
  }

  // For mobile, just show a simple card with total spending
  if (isMobile) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(monthlyTotals?.total_expenses || 0, privacyMode)}
          </div>
          <p className="text-xs text-muted-foreground">
            For{' '}
            {new Date().toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Desktop view with tabs and multiple cards
  return (
    <Tabs defaultValue="all" className="col-span-full space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          {account_expenses?.map((account) => (
            <TabsTrigger key={account.id} value={account.name}>
              {account.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value="all" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Spending
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  monthlyTotals?.total_expenses || 0,
                  privacyMode
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                For{' '}
                {new Date().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Change
              </CardTitle>
              <ArrowUpIcon className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">
                Compared to last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Category
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Food</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(345.65, privacyMode)} (27.7%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Daily Average
              </CardTitle>
              <ArrowDownIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  (monthlyTotals?.total_expenses || 0) / 30,
                  privacyMode
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                -5.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {account_expenses?.map((account) => (
        <TabsContent
          key={account.id}
          value={account.name}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {account.name} Spending
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(account.total, privacyMode)}
                </div>
                <p className="text-xs text-muted-foreground">
                  For{' '}
                  {new Date().toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
