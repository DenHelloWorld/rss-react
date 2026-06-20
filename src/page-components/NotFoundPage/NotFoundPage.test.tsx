import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './NotFoundPage.tsx';

const defaultProps = {
  title: 'Page Not Found',
  description: 'Sorry, the page you are looking for does not exist.',
  returnButton: <a href="/">Return to Home</a>,
};

describe(NotFoundPage.name, () => {
  it('should render the page heading', () => {
    render(<NotFoundPage {...defaultProps} />);
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
  });

  it('should render the description text', () => {
    render(<NotFoundPage {...defaultProps} />);
    expect(
      screen.getByText(/sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('should render the image with correct alt text', () => {
    render(<NotFoundPage {...defaultProps} />);
    expect(
      screen.getByAltText(/sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('should render the return button', () => {
    render(<NotFoundPage {...defaultProps} />);
    const link = screen.getByRole('link', { name: /return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
