import { NavLink } from 'react-router';
import { ROUTES } from '../../consts/routes.const.ts';
import { useIsHomeActive } from '../../hooks/useIsHomeActive.ts';
import type { ReactNode } from 'react';
import ThemeButton from '../ThemeButton/ThemeButton.tsx';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const isHomeActive = useIsHomeActive();

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

          <ThemeButton />
        </nav>

        {children}
      </div>
    </header>
  );
};

export default Header;
