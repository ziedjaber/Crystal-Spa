'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  /** true if the user has explicitly overridden the system preference */
  isUserOverride: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: true,
  isUserOverride: false,
});

export const THEME_STORAGE_KEY = 'crystal_spa_theme';
const COOKIE_OVERRIDE_KEY = 'crystal_spa_theme_override';

/** Read a cookie value by name (client-side only) */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Write a cookie that persists for 1 year */
function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function applyThemeClass(targetTheme: Theme) {
  const root = document.documentElement;
  if (targetTheme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isUserOverride, setIsUserOverride] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      // 1. Check cookie / localStorage for an explicit user choice
      const cookieSaved = getCookie(COOKIE_OVERRIDE_KEY) as Theme | null;
      const lsSaved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      const saved = cookieSaved || lsSaved;

      if (saved === 'light' || saved === 'dark') {
        setThemeState(saved);
        setIsUserOverride(true);
        applyThemeClass(saved);
      } else {
        // 2. Fall back to system preference
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const systemTheme: Theme = mq.matches ? 'dark' : 'light';
        setThemeState(systemTheme);
        applyThemeClass(systemTheme);

        // 3. Listen to live system changes (only when user hasn't overridden)
        const listener = (e: MediaQueryListEvent) => {
          setIsUserOverride((override) => {
            if (!override) {
              const next: Theme = e.matches ? 'dark' : 'light';
              setThemeState(next);
              applyThemeClass(next);
            }
            return override;
          });
        };
        mq.addEventListener('change', listener);
        return () => mq.removeEventListener('change', listener);
      }
    } catch {
      applyThemeClass('dark');
    } finally {
      setMounted(true);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setIsUserOverride(true);
    applyThemeClass(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setCookie(COOKIE_OVERRIDE_KEY, newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isUserOverride,
  };

  if (!mounted) return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
