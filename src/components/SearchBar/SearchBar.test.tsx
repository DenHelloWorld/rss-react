import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';
import { KEYBOARD_KEYS } from '../../consts/keyboard-keys.const.ts';

describe(SearchBar.name, () => {
  const mockOnSearch = vi.fn();

  it('renders with initial value', () => {
    render(<SearchBar initialValue="Art" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Art');
  });

  it('updates input value on change', () => {
    render(<SearchBar initialValue="" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Sunflowers' } });

    expect(input).toHaveValue('Sunflowers');
  });

  it('calls onSearch with trimmed value when button is clicked', () => {
    const { container } = render(
      <SearchBar initialValue="  Monet  " onSearch={mockOnSearch} />
    );

    const searchButton = container.querySelector('.button--success');

    fireEvent.click(searchButton!);

    expect(mockOnSearch).toHaveBeenCalledWith('Monet');
  });

  it('triggers search on Enter key press', () => {
    render(<SearchBar initialValue="Gogh" onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, {
      key: KEYBOARD_KEYS.ENTER,
      code: KEYBOARD_KEYS.ENTER,
    });

    expect(mockOnSearch).toHaveBeenCalledWith('Gogh');
  });

  it('clears input when clear button is clicked', () => {
    const { container } = render(
      <SearchBar initialValue="To be cleared" onSearch={mockOnSearch} />
    );

    const clearButton = container.querySelector('.button--error');

    fireEvent.click(clearButton!);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });

  it('does not trigger search on non-Enter key press', () => {
    render(<SearchBar initialValue="Test" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, {
      key: KEYBOARD_KEYS.ESC,
      code: KEYBOARD_KEYS.ESC,
    });

    expect(mockOnSearch).not.toHaveBeenCalledWith('Test');
  });

  it('disables buttons when isDisabled is true', () => {
    const { container } = render(
      <SearchBar initialValue="Art" onSearch={mockOnSearch} isDisabled={true} />
    );

    const buttons = container.querySelectorAll('button');

    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('does not disable buttons when isDisabled is false (default)', () => {
    const { container } = render(
      <SearchBar initialValue="Art" onSearch={mockOnSearch} />
    );

    const buttons = container.querySelectorAll('button');

    buttons.forEach((button) => {
      expect(button).not.toBeDisabled();
    });
  });
});
