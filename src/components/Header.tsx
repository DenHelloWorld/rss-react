import React from 'react';

class Header extends React.Component<{ children: React.ReactNode }> {
  render() {
    return <header className="header">{this.props.children}</header>;
  }
}

export default Header;
