import Header from './components/Header/Header.tsx';
import { Outlet } from 'react-router';
import ArtworkSearch from './components/ArtworkSearch/ArtworkSearch.tsx';
import { useIsHomeActive } from './hooks/useIsHomeActive.ts';

const App = () => {
  const isHomeActive = useIsHomeActive();

  return (
    <div className="app-wrapper">
      <Header>{isHomeActive && <ArtworkSearch />}</Header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
