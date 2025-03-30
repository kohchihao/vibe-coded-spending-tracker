'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type PrivacyContextType = {
  privacyMode: boolean;
  togglePrivacyMode: () => void;
  isLoading: boolean;
};

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(() => {
    // Initialize from localStorage if available, otherwise default to false
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('privacyMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Update localStorage whenever privacyMode changes
  useEffect(() => {
    localStorage.setItem('privacyMode', JSON.stringify(privacyMode));
  }, [privacyMode]);

  // Set loading to false after initial mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const togglePrivacyMode = () => {
    setPrivacyMode((prev: boolean) => !prev);
  };

  return (
    <PrivacyContext.Provider
      value={{ privacyMode, togglePrivacyMode, isLoading }}
    >
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
}
