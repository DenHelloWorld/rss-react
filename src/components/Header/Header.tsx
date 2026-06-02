import { NavLink } from 'react-router';
import { ROUTES } from '../../consts/routes.const.ts';
import { useIsHomeActive } from '../../hooks/useIsHomeActive/useIsHomeActive.ts';
import { type ReactNode, useState } from 'react';
import ThemeButton from '../ThemeButton/ThemeButton.tsx';
import Modal from '../Modal/Modal.tsx';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const isHomeActive = useIsHomeActive();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

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

          <button className="button" onClick={handleOpen}>
            open a form
          </button>

          <Modal isOpen={isModalOpen} onClose={handleClose}>
            <section className="mx-auto container shell">Test</section>
          </Modal>
        </nav>

        {children}
      </div>
    </header>
  );
};

export default Header;
