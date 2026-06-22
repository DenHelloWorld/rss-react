import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination from './Pagination';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams('query=cats'),
}));

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    useTransition: () => [false, (fn: () => void) => fn()],
  };
});

vi.mock('../../contexts/NavigationLoadingContext', () => ({
  useNavigationLoading: () => ({ isNavigating: false, setIsNavigating: vi.fn() }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    key === 'total' ? `Total: ${values?.count}` : key,
}));

describe(Pagination.name, () => {
  const defaultProps = {
    total: 100,
    currentPage: 5,
    totalPages: 10,
  };

  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render current page and total pages info', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/Total: 100/i)).toBeInTheDocument();
  });

  it('should navigate to next page when right button is clicked', () => {
    render(<Pagination {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(mockPush).toHaveBeenCalledWith('?query=cats&page=6');
  });

  it('should navigate to previous page when left button is clicked', () => {
    render(<Pagination {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(mockPush).toHaveBeenCalledWith('?query=cats&page=4');
  });

  it('should disable prev button on the first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });

  it('should disable next button on the last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('should handle zero or one page total', () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={1} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('should not disable buttons on middle page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).not.toBeDisabled();
  });
});
