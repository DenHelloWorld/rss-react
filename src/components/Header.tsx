import { type JSX, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';
import { ROUTES } from '../consts/routes.const.ts';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  const location = useLocation();
  const isHomeActive =
    location.pathname === ROUTES.ROOT.path ||
    location.pathname.startsWith(`/${ROUTES.DETAILS.path}`);

  return (
    <header className="header">
      <div className="header-container">
        <nav className="navigation">
          <NavLink
            to={ROUTES.ROOT.path}
            className={`link ${isHomeActive ? 'link--active' : ''}`}
          >
            {ROUTES.ROOT.label}
          </NavLink>
          <NavLink
            to={ROUTES.ABOUT.path}
            className={({ isActive }) =>
              `link ${isActive ? 'link--active' : ''}`
            }
          >
            {ROUTES.ABOUT.label}
          </NavLink>
        </nav>

        {children}
      </div>
    </header>
  );
};

export default Header;
