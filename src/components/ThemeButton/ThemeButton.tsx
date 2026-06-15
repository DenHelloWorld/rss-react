'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext.ts';
import { THEME } from '../../consts/theme.const.ts';

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
  };

  return (
    <button
      onClick={toggleTheme}
      className="button button--icon button--outline text-blue-500"
    >
      {theme === THEME.LIGHT ? (
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
