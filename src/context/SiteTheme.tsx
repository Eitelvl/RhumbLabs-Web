import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
const SiteTheme = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  ));

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch { /* Storage may be disabled. */ }
  }, [theme]);

  return (
    <SiteTheme.Provider value={{ theme, toggleTheme: () => setTheme(current => current === 'dark' ? 'light' : 'dark') }}>
      {children}
    </SiteTheme.Provider>
  );
}

export function useSiteTheme() {
  const context = useContext(SiteTheme);
  if (!context) throw new Error('useSiteTheme must be used within SiteThemeProvider');
  return context;
}
