import { ThemeContext } from '../../context/ThemeContext/ThemeContext.ts';
import { THEME } from '../../consts/theme.const.ts';
import ThemeProvider from './ThemeProvider.tsx';
import { localStorageMock } from '../../test-utils/storage-mock.ts';
import { act, render, screen } from '@testing-library/react';
import { STORAGE_KEYS } from '../../services/localStorageService/local-storage.service.ts';
import { describe, it, expect } from 'vitest';

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
    localStorageMock.setItem(STORAGE_KEYS.THEME, JSON.stringify(THEME.DARK));

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

    const button = screen.getByText('Set Dark');
    act(() => {
      button.click();
    });

    expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME.DARK);
    expect(document.documentElement).toHaveClass(THEME.DARK);

    expect(localStorageMock.getItem(STORAGE_KEYS.THEME)).toBe(
      JSON.stringify(THEME.DARK)
    );
  });
});
