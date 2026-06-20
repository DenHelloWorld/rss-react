import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './NotFoundPage.tsx';

describe(NotFoundPage.name, () => {
  it('should render the page heading', async () => {
    render(await NotFoundPage());
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
  });

  it('should render the description text', async () => {
    render(await NotFoundPage());
    expect(
      screen.getByText(/sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('should render the image with correct alt text', async () => {
    render(await NotFoundPage());
    expect(
      screen.getByAltText(/sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('should render a link to the root route', async () => {
    render(await NotFoundPage());
    const link = screen.getByRole('link', { name: /return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
