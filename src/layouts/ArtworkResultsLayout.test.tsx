import type * as ReactRouter from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import ArtworkResultsLayout from './ArtworkResultsLayout';

vi.mock('../components/ArtworkResults.tsx', () => ({
  default: () => <div>ArtworkResults</div>,
}));

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactRouter>();
  return {
    ...actual,
    Outlet: () => <div>Outlet</div>,
  };
});

const renderWithRouter = (initialEntry: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<ArtworkResultsLayout />}>
          <Route path="details/:id" element={<div>Details Page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe(ArtworkResultsLayout.name, () => {
  it('should render ArtworkResults and Outlet', () => {
    renderWithRouter('/');

    expect(screen.getByText('ArtworkResults')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });

  it('should not have main-panel--aside class on root route', () => {
    renderWithRouter('/');

    const panel = screen.getByText('ArtworkResults').closest('.main-panel');
    expect(panel).not.toHaveClass('main-panel--aside');
  });

  it('should have main-panel--aside class on details route', () => {
    renderWithRouter('/details/123');

    const panel = screen.getByText('ArtworkResults').closest('.main-panel');
    expect(panel).toHaveClass('main-panel--aside');
  });
});
