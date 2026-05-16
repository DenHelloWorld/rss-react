import Header from './components/Header.tsx';
import { Outlet } from 'react-router';
import ArtworkSearch from './components/ArtworkSearch.tsx';
import { useIsHomeActive } from './hooks/useIsHomeActive.ts';
import Flyout from './layouts/Flyout.tsx';

const App = () => {
  const isHomeActive = useIsHomeActive();

  return (
    <div className="app-wrapper">
      <Header>{isHomeActive && <ArtworkSearch />}</Header>

      <main className="main relative">
        <Flyout />
        <Outlet />
      </main>
    </div>
  );
};

export default App;
