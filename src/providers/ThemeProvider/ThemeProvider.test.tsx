import { ThemeContext } from '../../context/ThemeContext/ThemeContext.ts';
import { THEME } from '../../consts/theme.const.ts';
import ThemeProvider from './ThemeProvider.tsx';
import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Cookies from 'js-cookie';
import { COOKIE_KEYS } from '../../utils/cookie-storage/cookie-storage.ts';

const TestComponent = () => (
  <ThemeContext.Consumer>
    {({ theme, setTheme }) => (
      <div>
        <span data-testid="theme-value">{theme}</span>
        <button
          onClick={() => {
            setTheme(THEME.DARK);
          }}
        >
          Set Dark
        </button>
      </div>
    )}
  </ThemeContext.Consumer>
);

describe(ThemeProvider.name, () => {
  beforeEach(() => {
    Cookies.remove(COOKIE_KEYS.THEME);
    document.documentElement.className = '';
  });

  it('should apply light theme by default', () => {
    act(() => {
      render(
        <ThemeProvider initialTheme={THEME.LIGHT}>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME.LIGHT);
  });

  it('should apply theme stored in cookie', () => {
    Cookies.set(COOKIE_KEYS.THEME, THEME.DARK);

    act(() => {
      render(
        <ThemeProvider initialTheme={THEME.DARK}>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME.DARK);
    expect(document.documentElement).toHaveClass(THEME.DARK);
  });

  it('should update theme and cookie when setTheme is called', () => {
    act(() => {
      render(
        <ThemeProvider initialTheme={THEME.LIGHT}>
          <TestComponent />
        </ThemeProvider>
      );
    });

    act(() => {
      screen.getByText('Set Dark').click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME.DARK);
    expect(document.documentElement).toHaveClass(THEME.DARK);
    expect(Cookies.get(COOKIE_KEYS.THEME)).toBe(THEME.DARK);
  });
});
