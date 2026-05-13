import { type JSX, type ReactNode } from 'react';
import { NavLink } from 'react-router';
import { ROUTES } from '../consts/routes.const.ts';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="navigation">
          <NavLink
            to={ROUTES.ROOT.path}
            className={({ isActive }) =>
              `link ${isActive ? 'link--active' : ''}`
            }
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
