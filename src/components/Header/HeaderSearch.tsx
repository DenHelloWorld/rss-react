'use client';

import dynamic from 'next/dynamic';
import { usePathname } from '../../i18n/navigation';
import { ROUTES } from '../../consts/routes.const';
const ArtworkSearch = dynamic(() => import('../ArtworkSearch/ArtworkSearch'), {
  ssr: false,
});

const isHomePathname = (pathname: string): boolean =>
  pathname === ROUTES.ROOT.path ||
  pathname.startsWith(`/${ROUTES.DETAILS.path}`);

const HeaderSearch = () => {
  const pathname = usePathname();

  if (!isHomePathname(pathname)) return null;

  return <ArtworkSearch />;
};

export default HeaderSearch;
