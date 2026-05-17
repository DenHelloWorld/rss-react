import { type JSX, type ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { STORAGE_KEYS } from '../services/local-storage.service.ts'; // Укажите ваш правильный путь
import { ThemeContext } from '../context/ThemeContext.ts';

const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [storedTheme, setStoredTheme] = useLocalStorage(STORAGE_KEYS.THEME);

  const theme = storedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setStoredTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
