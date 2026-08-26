import { atom } from 'nanostores';

export type Theme = 'light' | 'dark';

// Initialize theme from localStorage or system preference if in browser
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'dark';
};

export const $theme = atom<Theme>(getInitialTheme());

export const toggleTheme = () => {
  const next = $theme.get() === 'light' ? 'dark' : 'light';
  $theme.set(next);
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

export const initTheme = () => {
  if (typeof window !== 'undefined') {
    const current = $theme.get();
    if (current === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};
