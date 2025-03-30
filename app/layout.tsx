import type React from "react"
import "@/app/globals.css"
import { PrivacyProvider } from "@/contexts/privacy-context"

export const metadata = {
  title: "Spending Tracker",
  description: "Track and manage your expenses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <PrivacyProvider>{children}</PrivacyProvider>
      </body>
    </html>
  )
}



import './globals.css'