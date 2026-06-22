import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';
import { NavigationLoadingProvider } from '../../providers/NavigationLoadingProvider/NavigationLoadingProvider';

const mockPush = vi.fn();

const mockSearchParams = new URLSearchParams('query=cats');

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockSearchParams,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, number>) =>
    key === 'total' ? `Total: ${String(values?.count ?? 0)}` : key,
}));

const renderComponent = (props = {}) =>
  render(
    <NavigationLoadingProvider>
      <Pagination total={100} currentPage={5} totalPages={10} {...props} />
    </NavigationLoadingProvider>
  );

describe(Pagination.name, () => {
  it('should render current page and total pages info', () => {
    renderComponent();

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/Total: 100/i)).toBeInTheDocument();
  });

  it('should navigate to next page when right button is clicked', () => {
    renderComponent();
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[1]);

    expect(mockPush).toHaveBeenCalledWith('?query=cats&page=6');
  });

  it('should navigate to previous page when left button is clicked', () => {
    renderComponent();
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);

    expect(mockPush).toHaveBeenCalledWith('?query=cats&page=4');
  });

  it('should disable prev button on the first page', () => {
    renderComponent({ currentPage: 1 });

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('should disable next button on the last page', () => {
    renderComponent({ currentPage: 10 });

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('should handle zero or one page total', () => {
    renderComponent({ currentPage: 1, totalPages: 1 });

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('should not disable buttons on middle page', () => {
    renderComponent({ currentPage: 5 });

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('should disable both buttons when isNavigating is true', () => {
    renderComponent({ currentPage: 5 });
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[1]);

    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});
