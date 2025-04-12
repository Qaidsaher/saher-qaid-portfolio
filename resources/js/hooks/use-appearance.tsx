// useAppearance.ts
import { useCallback, useEffect, useState } from 'react';

export type Appearance =
  | 'light'
  | 'dark'
  | 'ocean'
  | 'sunrise'
  | 'forest'
  | 'midnight'
  | 'dusk'
  | 'aurora'
  | 'system';

const prefersDark = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const themeClasses = [
  'dark',
  'theme-ocean',
  'theme-sunrise',
  'theme-forest',
  'theme-midnight',
  'theme-dusk',
  'theme-aurora'
];

const applyTheme = (appearance: Appearance) => {
  // Remove any existing theme classes
  themeClasses.forEach(cls =>
    document.documentElement.classList.remove(cls)
  );

  if (appearance === 'system') {
    if (prefersDark()) {
      document.documentElement.classList.add('dark');
    }
  } else if (appearance === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (appearance === 'ocean') {
    document.documentElement.classList.add('theme-ocean');
  } else if (appearance === 'sunrise') {
    document.documentElement.classList.add('theme-sunrise');
  } else if (appearance === 'forest') {
    document.documentElement.classList.add('theme-forest');
  } else if (appearance === 'midnight') {
    document.documentElement.classList.add('theme-midnight');
  } else if (appearance === 'dusk') {
    document.documentElement.classList.add('theme-dusk');
  } else if (appearance === 'aurora') {
    document.documentElement.classList.add('theme-aurora');
  }
  // No extra class for 'light' because it’s the default.
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
    const savedAppearance =
      (localStorage.getItem('appearance') as Appearance | null) || 'system';
    updateAppearance(savedAppearance);
    return () =>
      mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
  }, [updateAppearance]);

  return { appearance, updateAppearance } as const;
}
