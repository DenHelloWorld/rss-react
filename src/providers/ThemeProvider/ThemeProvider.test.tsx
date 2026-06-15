import { ThemeContext } from '../../context/ThemeContext/ThemeContext.ts';
import { THEME } from '../../consts/theme.const.ts';
import ThemeProvider from './ThemeProvider.tsx';
import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage';

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
    localStorage.removeItem(STORAGE_KEYS.THEME);
    document.documentElement.className = '';
  });

  it('should apply light theme by default', () => {
    act(() => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME.LIGHT);
  });

  it('should apply theme stored in localStorage', () => {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(THEME.DARK));

    act(() => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME.DARK);
    expect(document.documentElement).toHaveClass(THEME.DARK);
  });

  it('should update theme and localStorage when setTheme is called', () => {
    act(() => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    act(() => {
      screen.getByText('Set Dark').click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME.DARK);
    expect(document.documentElement).toHaveClass(THEME.DARK);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.THEME)!)).toBe(
      THEME.DARK
    );
  });
});
