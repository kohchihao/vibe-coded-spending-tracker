'use client';

import { cn } from '@/lib/utils';
import { BarChart3, CreditCard, Home, Plus, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className="grid h-full grid-cols-5">
        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={cn(
            'flex flex-col items-center justify-center',
            pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* Expenses */}
        <Link
          href="/expenses"
          className={cn(
            'flex flex-col items-center justify-center',
            pathname?.startsWith('/expenses')
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs mt-1">Expenses</span>
        </Link>

        {/* Add Expense - Fancy Button */}
        <Link
          href="/expenses/add"
          className={cn(
            'flex flex-col items-center justify-center',
            pathname === '/expenses/add'
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary mb-1">
            <Plus className="h-6 w-6 text-primary-foreground" />
          </div>
        </Link>

        {/* Accounts */}
        <Link
          href="/accounts"
          className={cn(
            'flex flex-col items-center justify-center',
            pathname?.startsWith('/accounts')
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          <CreditCard className="h-5 w-5" />
          <span className="text-xs mt-1">Accounts</span>
        </Link>

        {/* Categories */}
        <Link
          href="/categories"
          className={cn(
            'flex flex-col items-center justify-center',
            pathname?.startsWith('/categories')
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          <Tag className="h-5 w-5" />
          <span className="text-xs mt-1">Categories</span>
        </Link>
      </div>
    </div>
  );
}
