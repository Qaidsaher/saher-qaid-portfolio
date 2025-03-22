import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

export const applyTheme = (appearance: Appearance) => {
  const isDark =
    appearance === 'dark' || (appearance === 'system' && prefersDark());
  // Toggle the 'dark' class on the document element
  document.documentElement.classList.toggle('dark', isDark);
};

const mediaQuery = () => {
  if (typeof window === 'undefined') return null;
  return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem('appearance') as Appearance;
  applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
  const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
  applyTheme(savedAppearance);
  // Listen for changes in the system theme
  mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>('system');

  const updateAppearance = useCallback((mode: Appearance) => {
    setAppearance(mode);
    localStorage.setItem('appearance', mode);
    setCookie('appearance', mode);
    applyTheme(mode);
  }, []);

  useEffect(() => {
    const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
    updateAppearance(savedAppearance || 'system');
    return () => {
      mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    };
  }, [updateAppearance]);

  return { appearance, updateAppearance } as const;
}
