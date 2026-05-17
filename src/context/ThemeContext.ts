import { createContext } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {
    /* empty */
  },
});
