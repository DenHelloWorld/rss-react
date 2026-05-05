import React, { type JSX } from 'react';

class Header extends React.Component<{ children: React.ReactNode }> {
  render(): JSX.Element {
    return <header className="header">{this.props.children}</header>;
  }
}

export default Header;
