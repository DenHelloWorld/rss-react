import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import Header from './Header';
import { ROUTES } from '../../consts/routes.const.ts';

const renderHeader = () =>
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

describe(Header.name, () => {
  it('should render with correct content', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    renderHeader();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should apply active class to the Home link when on root path', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    renderHeader();
    expect(screen.getByRole('link', { name: ROUTES.ROOT.label })).toHaveClass(
      'link--active'
    );
  });

  it('should apply active class to the About link when on about path', () => {
    vi.mocked(usePathname).mockReturnValue(`/${ROUTES.ABOUT.path}`);
    renderHeader();
    expect(screen.getByRole('link', { name: ROUTES.ABOUT.label })).toHaveClass(
      'link--active'
    );
  });
});
