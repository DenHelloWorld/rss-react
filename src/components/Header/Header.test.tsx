import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Header from './Header';
import { ROUTES } from '../../consts/routes.const.ts';

describe(Header.name, () => {
  const renderHeaderWithRoute = (initialPath: string) => {
    const routes = [
      {
        path: ROUTES.ROOT.path,
        element: <Header>test</Header>,
        children: [
          {
            path: ROUTES.ABOUT.path,
            element: <div>About Page</div>,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [initialPath],
    });

    return render(<RouterProvider router={router} />);
  };

  it('should render with correct content', () => {
    renderHeaderWithRoute(ROUTES.ROOT.path);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should apply active class to the Home link when on root path', async () => {
    renderHeaderWithRoute(ROUTES.ROOT.path);

    const homeLink = screen.getByRole('link', { name: ROUTES.ROOT.label });

    await waitFor(() => {
      expect(homeLink).toHaveClass('link--active');
    });
  });

  it('should apply active class to the About link when on about path', async () => {
    renderHeaderWithRoute(`/${ROUTES.ABOUT.path}`);

    const aboutLink = screen.getByRole('link', { name: ROUTES.ABOUT.label });

    await waitFor(() => {
      expect(aboutLink).toHaveClass('link--active');
    });
  });
});
