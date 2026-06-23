import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePathname } from '../../i18n/navigation';
import Header from './Header';
import { ROUTES } from '../../consts/routes.const.ts';
import { DEFAULT_LOCALE } from '../../consts/locales.const';

vi.mock('./HeaderSearch', () => ({
  default: () => null,
}));
vi.mock('../ErrorTrigger/ErrorTrigger', () => ({
  default: () => null,
}));
vi.mock('../LanguageSwitcher/LanguageSwitcher', () => ({
  default: () => null,
}));
vi.mock('../ThemeButton/ThemeButtonDynamic', () => ({
  default: () => null,
}));

describe(Header.name, () => {
  it('should render with correct content', async () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(await Header({ locale: DEFAULT_LOCALE }));

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should apply active class to the Home link when on root path', async () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(await Header({ locale: DEFAULT_LOCALE }));

    expect(screen.getByRole('link', { name: ROUTES.ROOT.label })).toHaveClass(
      'link--active'
    );
  });

  it('should apply active class to the About link when on about path', async () => {
    vi.mocked(usePathname).mockReturnValue(`/${ROUTES.ABOUT.path}`);

    render(await Header({ locale: DEFAULT_LOCALE }));

    expect(screen.getByRole('link', { name: ROUTES.ABOUT.label })).toHaveClass(
      'link--active'
    );
  });
});
