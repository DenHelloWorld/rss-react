import './App.css';
import { type JSX } from 'react';
import Header from './components/Header.tsx';
import { Outlet, useMatch } from 'react-router';
import { ROUTES } from './consts/routes.const.ts';
import ArtworkSearch from './components/ArtworkSearch.tsx';
import ArtworkResults from './components/ArtworkResults.tsx';

const App = (): JSX.Element => {
  const isRootLocation = !!useMatch(ROUTES.ROOT.path);
  const isDetailsLocation = !!useMatch(`${ROUTES.DETAILS.path}/:id`);
  const isSearchContext = isRootLocation || isDetailsLocation;

  return (
    <div className="app-wrapper">
      <Header>
        <ArtworkSearch />
      </Header>

      <main className="main">
        {isSearchContext && (
          <div
            className={`main-panel ${isDetailsLocation ? 'main-panel--aside' : ''}`}
          >
            <ArtworkResults />
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default App;
