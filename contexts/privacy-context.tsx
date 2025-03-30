"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type PrivacyContextType = {
  privacyMode: boolean
  togglePrivacyMode: () => void
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined)

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [privacyMode, setPrivacyMode] = useState(false)

  const togglePrivacyMode = () => {
    setPrivacyMode((prev) => !prev)
  }

  return <PrivacyContext.Provider value={{ privacyMode, togglePrivacyMode }}>{children}</PrivacyContext.Provider>
}

export function usePrivacy() {
  const context = useContext(PrivacyContext)
  if (context === undefined) {
    throw new Error("usePrivacy must be used within a PrivacyProvider")
  }
  return context
}

