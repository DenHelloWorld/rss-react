import { useContext, type JSX } from 'react';
import { ThemeContext } from '../context/ThemeContext.ts';

const ThemeButton = (): JSX.Element => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="button button--icon button--outline text-blue-500"
    >
      {theme === 'light' ? (
        <svg>
          <use href="/icons.svg#sunny" />
        </svg>
      ) : (
        <svg>
          <use href="/icons.svg#moon-stars" />
        </svg>
      )}
    </button>
  );
};

export default ThemeButton;
