import '@/app/globals.css';
import { PrivacyProvider } from '@/contexts/privacy-context';
import { SessionProvider } from '@/contexts/session-context';
import type React from 'react';

export const metadata = {
  title: 'Spending Tracker',
  description: 'Track and manage your expenses',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <SessionProvider>
          <PrivacyProvider>{children}</PrivacyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import './globals.css';
