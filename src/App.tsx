import './App.css';
import { type JSX } from 'react';
import Header from './components/Header.tsx';
import { Outlet } from 'react-router';

import ArtworkSearch from './components/ArtworkSearch.tsx';

const App = (): JSX.Element => {
  return (
    <div className="app-wrapper">
      <Header>
        <ArtworkSearch />
      </Header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
