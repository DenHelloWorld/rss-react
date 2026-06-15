'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '../../consts/routes.const';
import ThemeButton from '../ThemeButton/ThemeButton';
import ArtworkSearch from '../ArtworkSearch/ArtworkSearch';
import ErrorTrigger from '../ErrorTrigger/ErrorTrigger';

const Header = () => {
  const pathname = usePathname();
  const isHome =
    pathname === ROUTES.ROOT.path ||
    pathname.startsWith(`/${ROUTES.DETAILS.path}`);

  return (
    <header className="header">
      <div className="header-container">
        <nav className="navigation">
          <Link
            href={ROUTES.ROOT.path}
            className={`link ${isHome ? 'link--active' : ''}`}
          >
            {ROUTES.ROOT.label}
          </Link>
          <Link
            href={`/${ROUTES.ABOUT.path}`}
            className={`link ${pathname === `/${ROUTES.ABOUT.path}` ? 'link--active' : ''}`}
          >
            {ROUTES.ABOUT.label}
          </Link>
          <ThemeButton />
          <ErrorTrigger />
        </nav>

        {isHome && (
          <Suspense>
            <ArtworkSearch />
          </Suspense>
        )}
      </div>
    </header>
  );
};

export default Header;
