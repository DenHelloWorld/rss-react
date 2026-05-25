import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './NotFoundPage.tsx';

vi.mock('../components/LazyImage/LazyImage.tsx', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

const renderComponent = () =>
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

describe(NotFoundPage.name, () => {
  it('should render the page heading', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
  });

  it('should render the description text', () => {
    renderComponent();

    expect(
      screen.getByText(/sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('should render the image with correct alt text', () => {
    renderComponent();

    expect(
      screen.getByAltText(/sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('should render a link to the root route', () => {
    renderComponent();

    const link = screen.getByRole('link', { name: /return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
