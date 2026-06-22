'use client';

import { Suspense } from 'react';
import { usePathname } from '../../i18n/navigation';
import { ROUTES, isDetailsPathname } from '../../consts/routes.const';
import ArtworkSearch from '../ArtworkSearch/ArtworkSearch';

const isHomePathname = (pathname: string): boolean =>
  pathname === ROUTES.ROOT.path || isDetailsPathname(pathname);

const HeaderSearch = () => {
  const pathname = usePathname();

  if (!isHomePathname(pathname)) return null;

  return (
    <Suspense>
      <ArtworkSearch />
    </Suspense>
  );
};

export default HeaderSearch;
