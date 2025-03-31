'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  CreditCard,
  Home,
  Menu,
  PiggyBank,
  Tag,
} from 'lucide-react';

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
            className
          )}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setOpen(false)}
          >
            <PiggyBank className="h-6 w-6" />
            <span className="font-bold">Spending Tracker</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <div className="flex flex-col gap-4 py-2">
              <Link
                href="/dashboard"
                className={cn(
                  'flex items-center gap-2 text-lg font-medium transition-colors',
                  pathname === '/dashboard'
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
                onClick={() => setOpen(false)}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/expenses"
                className={cn(
                  'flex items-center gap-2 text-lg font-medium transition-colors',
                  pathname?.startsWith('/expenses')
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
                onClick={() => setOpen(false)}
              >
                <BarChart3 className="h-5 w-5" />
                Expenses
              </Link>
              <Link
                href="/accounts"
                className={cn(
                  'flex items-center gap-2 text-lg font-medium transition-colors',
                  pathname?.startsWith('/accounts')
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
                onClick={() => setOpen(false)}
              >
                <CreditCard className="h-5 w-5" />
                Accounts
              </Link>
              <Link
                href="/categories"
                className={cn(
                  'flex items-center gap-2 text-lg font-medium transition-colors',
                  pathname?.startsWith('/categories')
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
                onClick={() => setOpen(false)}
              >
                <Tag className="h-5 w-5" />
                Categories
              </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
