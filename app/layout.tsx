'use client';
import '@/app/globals.css';
import { PrivacyProvider } from '@/contexts/privacy-context';
import { SessionProvider } from '@/contexts/session-context';
import queryClient from '@/lib/reactQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import './globals.css';

// export const metadata = {
//   title: 'Spending Tracker',
//   description: 'Track and manage your expenses',
//   generator: 'v0.dev',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <PrivacyProvider>{children}</PrivacyProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
