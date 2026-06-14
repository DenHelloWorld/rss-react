import { type ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage.ts';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext.ts';
import { type Theme, THEME } from '../../consts/theme.const.ts';

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
