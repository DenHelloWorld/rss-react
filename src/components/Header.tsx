import { type JSX, type ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  return <header className="header">{children}</header>;
};

export default Header;
