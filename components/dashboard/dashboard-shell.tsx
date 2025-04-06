import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { PrivacyToggle } from '@/components/layout/privacy-toggle';
import { UserNav } from '@/components/layout/user-nav';
import type React from 'react';
import { BottomNav } from '../layout/BottomNav';
interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto max-w-screen-xl flex h-16 items-center justify-between py-4 px-4 xl:px-0">
          <div className="flex items-center">
            <MobileNav className="md:hidden" />
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <PrivacyToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto max-w-screen-xl flex flex-col gap-6 py-6 md:gap-8 md:py-8 px-4 md:px-6 xl:px-0 pb-20 md:pb-8">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
