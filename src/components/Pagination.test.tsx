import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe(Pagination.name, () => {
  const mockOnPageChange = vi.fn();

  const defaultProps = {
    total: 100,
    currentPage: 5,
    totalPages: 10,
    onPageChange: mockOnPageChange,
  };

  it('should render current page and total pages info', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/Total: 100/i)).toBeInTheDocument();
  });

  it('should call onPageChange with next page when right button is clicked', () => {
    render(<Pagination {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];

    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(6);
  });

  it('should call onPageChange with previous page when left button is clicked', () => {
    render(<Pagination {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];

    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('should disable prev button on the first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('should disable next button on the last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('should handle zero or one page total', () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={1} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});
