import { createContext } from 'react';
import { THEME, type Theme } from '../consts/theme.const.ts';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: THEME.LIGHT,
  setTheme: () => undefined,
});
