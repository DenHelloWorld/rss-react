import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';
import { KEYBOARD_KEYS } from '../../consts/keyboard-keys.const.ts';

describe(SearchBar.name, () => {
  const mockOnSearch = vi.fn();
  const mockOnRefetch = vi.fn();

  it('renders with initial value', () => {
    render(
      <SearchBar
        initialValue="Art"
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('Art');
  });

  it('updates input value on change', () => {
    render(
      <SearchBar
        initialValue=""
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Sunflowers' },
    });

    expect(screen.getByRole('textbox')).toHaveValue('Sunflowers');
  });

  it('search button has type submit', () => {
    const { container } = render(
      <SearchBar
        initialValue="Monet"
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    expect(container.querySelector('.button--success')).toHaveAttribute(
      'type',
      'submit'
    );
  });

  it('search button submits the form', () => {
    const { container } = render(
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SearchBar
          initialValue="Gogh"
          onSearch={mockOnSearch}
          onRefetch={mockOnRefetch}
        />
      </form>
    );

    const submitSpy = vi.fn((e: Event) => {
      e.preventDefault();
    });
    container.querySelector('form')!.addEventListener('submit', submitSpy);

    fireEvent.click(container.querySelector('.button--success')!);

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('does not call onSearch on Enter key press (submit handled natively by form)', () => {
    render(
      <SearchBar
        initialValue="Gogh"
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    fireEvent.keyDown(screen.getByRole('textbox'), {
      key: KEYBOARD_KEYS.ENTER,
    });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('does not call onSearch on non-Enter key press', () => {
    render(
      <SearchBar
        initialValue="Test"
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    fireEvent.keyDown(screen.getByRole('textbox'), { key: KEYBOARD_KEYS.ESC });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch with empty string when clear is clicked', () => {
    const { container } = render(
      <SearchBar
        initialValue="To be cleared"
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    fireEvent.click(container.querySelector('.button--error')!);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('calls onRefetch when refresh button is clicked', () => {
    const { container } = render(
      <SearchBar
        initialValue="Art"
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    fireEvent.click(container.querySelector('.button--warning')!);

    expect(mockOnRefetch).toHaveBeenCalledTimes(1);
  });

  it('does not show clear button when input is empty', () => {
    const { container } = render(
      <SearchBar
        initialValue=""
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
      />
    );

    expect(container.querySelector('.button--error')).not.toBeInTheDocument();
  });

  it('disables all buttons when isDisabled is true', () => {
    const { container } = render(
      <SearchBar
        initialValue="Art"
        onSearch={mockOnSearch}
        onRefetch={mockOnRefetch}
        isDisabled
      />
    );

    container.querySelectorAll('button').forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
