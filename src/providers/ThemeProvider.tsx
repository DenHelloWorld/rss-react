import { type ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { STORAGE_KEYS } from '../services/local-storage.service.ts';
import { ThemeContext } from '../context/ThemeContext.ts';
import { type Theme, THEME } from '../consts/theme.const.ts';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage(STORAGE_KEYS.THEME);

  const theme = storedTheme === THEME.DARK ? THEME.DARK : THEME.LIGHT;

  useEffect(() => {
    const isDark = theme === THEME.DARK;

    document.documentElement.classList.toggle(THEME.DARK, isDark);
    document.documentElement.classList.toggle(THEME.LIGHT, !isDark);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setStoredTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
