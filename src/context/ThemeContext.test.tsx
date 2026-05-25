import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeContext } from './ThemeContext.ts';
import { THEME } from '../consts/theme.const.ts';
import { useContext } from 'react';

describe('ThemeContext', () => {
  it('should have default values', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useContext(ThemeContext);
      return <div data-theme={theme} data-set-theme={String(setTheme)} />;
    };

    const { container } = render(<TestComponent />);
    expect(container.querySelector('[data-theme]')).toHaveAttribute(
      'data-theme',
      THEME.LIGHT
    );
    expect(container.querySelector('[data-set-theme]')).toHaveAttribute(
      'data-set-theme',
      '() => undefined'
    );
  });

  it('should call default setTheme without throwing', () => {
    const TestComponent = () => {
      const { setTheme } = useContext(ThemeContext);
      setTheme(THEME.DARK);
      return null;
    };

    expect(() => render(<TestComponent />)).not.toThrow();
  });

  it('should return provided theme value', () => {
    const mockSetTheme = () => {};
    const TestComponent = () => {
      const context = useContext(ThemeContext);
      return <div>{context.theme}</div>;
    };

    render(
      <ThemeContext.Provider
        value={{ theme: THEME.DARK as 'dark', setTheme: mockSetTheme }}
      >
        <TestComponent />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(THEME.DARK)).toBeInTheDocument();
  });

  it('should call setTheme when provided', () => {
    let called = false;
    const mockSetTheme = () => {
      called = true;
    };
    const TestComponent = () => {
      const context = useContext(ThemeContext);
      context.setTheme(THEME.LIGHT as 'light');
      return null;
    };

    render(
      <ThemeContext.Provider
        value={{ theme: THEME.LIGHT as 'light', setTheme: mockSetTheme }}
      >
        <TestComponent />
      </ThemeContext.Provider>
    );

    expect(called).toBe(true);
  });
});
