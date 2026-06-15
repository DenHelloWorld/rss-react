import { type ReactNode, useEffect } from 'react';
import { useCookies } from '../../hooks/useCookies/useCookies';
import { COOKIE_KEYS } from '../../utils/cookie-storage/cookie-storage';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext.ts';
import { type Theme, THEME } from '../../consts/theme.const.ts';

const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: string;
}) => {
  const [storedTheme, setStoredTheme] = useCookies(COOKIE_KEYS.THEME);

  const theme =
    (storedTheme ?? initialTheme) === THEME.DARK ? THEME.DARK : THEME.LIGHT;

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
