import Header from './components/Header/Header.tsx';
import { Outlet } from 'react-router';
import ArtworkSearch from './components/ArtworkSearch/ArtworkSearch.tsx';
import { useIsHomeActive } from './hooks/useIsHomeActive.ts';
import Flyout from './layouts/Flyout/Flyout.tsx';

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
