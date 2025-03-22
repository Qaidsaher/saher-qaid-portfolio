

import React, { ReactNode, useEffect } from 'react';
import { initializeTheme } from '@/components/useAppearance';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <>{children}</>;
}
