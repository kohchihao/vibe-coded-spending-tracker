import type React from "react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 mb-6">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl">{heading}</h1>
        {text && <p className="text-sm md:text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}

