import './App.css';
import { type JSX, useCallback, useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';
import {
  localStorageService,
  STORAGE_KEYS,
} from './services/local-storage.service.ts';
import { AICApiService, type AICArtwork } from './services/AICApiService.ts';
import AICCard from './components/AICCard.tsx';
import { ResultsContainer } from './components/ResultsContainer.tsx';
import ErrorTrigger from './components/ErrorTrigger.tsx';
import { Outlet, useMatch } from 'react-router';

const App = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>(
    () => localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM) ?? ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arts, setArts] = useState<AICArtwork[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isRootLocation = !!useMatch('/');

  const performSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await AICApiService.search(query);
      setArts(response.data);
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : 'An unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const onComponentDidMount = async () => {
      await performSearch(
        localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM) ?? ''
      );
    };

    void onComponentDidMount();
  }, [performSearch]);

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue !== searchTerm) {
      localStorageService.setItem(STORAGE_KEYS.SEARCH_TERM, trimmedValue);
      setSearchTerm(trimmedValue);

      void performSearch(trimmedValue);
    }
  };

  return (
    <div className="app-wrapper">
      <Header>
        <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
      </Header>

      <main className="main">
        {isRootLocation && (
          <>
            <ErrorTrigger />
            <ResultsContainer
              searchTerm={searchTerm}
              isLoading={isLoading}
              errorMessage={errorMessage}
              isEmpty={!arts || arts.length === 0}
            >
              {arts?.map((art) => (
                <AICCard
                  key={art.id}
                  art={art}
                  getImageUrl={AICApiService.getImageUrl}
                />
              ))}
            </ResultsContainer>
          </>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default App;
