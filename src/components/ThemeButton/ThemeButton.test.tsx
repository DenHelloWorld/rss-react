import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeButton from './ThemeButton';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext.ts';
import { THEME } from '../../consts/theme.const.ts';

describe(ThemeButton.name, () => {
  it('should render light theme icon when theme is LIGHT', () => {
    const setTheme = vi.fn();

    render(
      <ThemeContext.Provider
        value={{ theme: THEME.LIGHT as 'light', setTheme }}
      >
        <ThemeButton />
      </ThemeContext.Provider>
    );

    const svg = document.querySelector('svg');
    expect(svg?.innerHTML).toContain('sunny');
  });

  it('should render dark theme icon when theme is DARK', () => {
    const setTheme = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: THEME.DARK as 'dark', setTheme }}>
        <ThemeButton />
      </ThemeContext.Provider>
    );

    const svg = document.querySelector('svg');
    expect(svg?.innerHTML).toContain('moon-stars');
  });

  it('should call setTheme with DARK when currently LIGHT', () => {
    const setTheme = vi.fn();

    render(
      <ThemeContext.Provider
        value={{ theme: THEME.LIGHT as 'light', setTheme }}
      >
        <ThemeButton />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(setTheme).toHaveBeenCalledWith(THEME.DARK);
  });

  it('should call setTheme with LIGHT when currently DARK', () => {
    const setTheme = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: THEME.DARK as 'dark', setTheme }}>
        <ThemeButton />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(setTheme).toHaveBeenCalledWith(THEME.LIGHT);
  });
});
