'use client';

import type { ReactNode } from 'react';
import { Link, usePathname } from '../../i18n/navigation';

type NavLinkProps = {
  href: string;
  activeFor?: string[];
  children: ReactNode;
};

const isPathMatch = (pathname: string, path: string): boolean =>
  pathname === path || pathname.startsWith(`${path}/`);

const NavLink = ({ href, activeFor, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = activeFor
    ? activeFor.some((path) => isPathMatch(pathname, path))
    : isPathMatch(pathname, href);

  return (
    <Link href={href} className={`link ${isActive ? 'link--active' : ''}`}>
      {children}
    </Link>
  );
};

export default NavLink;
