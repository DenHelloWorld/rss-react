import './App.css';
import { type JSX, useCallback, useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';
import { STORAGE_KEYS } from './services/local-storage.service.ts';
import { AICApiService, type AICArtwork } from './services/AICApiService.ts';
import AICCard from './components/AICCard.tsx';
import { ResultsContainer } from './components/ResultsContainer.tsx';
import ErrorTrigger from './components/ErrorTrigger.tsx';
import { Outlet, useMatch, useSearchParams } from 'react-router';
import { ROUTE_QUERY_PARAMS, ROUTES } from './consts/routes.const.ts';
import Pagination from './components/Pagination.tsx';
import { useLocalStorage } from './hooks/useLocalStorage.ts';

const App = (): JSX.Element => {
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get(ROUTE_QUERY_PARAMS.PAGE) ?? '1';
  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';
  const [totalArts, setTotalArts] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arts, setArts] = useState<AICArtwork[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isRootLocation = !!useMatch(ROUTES.ROOT.path);
  const isDetailsLocation = !!useMatch(`${ROUTES.DETAILS.path}/:id`);
  const isSearchContext = isRootLocation || isDetailsLocation;

  const performSearch = useCallback(async (query: string, page: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await AICApiService.search(query, { page });
      setArts(response.data);
      setTotalPages(response.pagination.total_pages);
      setTotalArts(response.pagination.total);
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : 'An unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const onComponentDidMount = () => {
      void performSearch(searchTerm, currentPage);
    };

    onComponentDidMount();
  }, [searchTerm, currentPage, performSearch]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: searchTerm, page: String(newPage) });
  };

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== searchTerm) {
      setStoredSearchTerm(trimmedValue);
      setSearchParams({ query: trimmedValue, page: '1' });
    }
  };

  return (
    <div className="app-wrapper">
      <Header>
        <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
      </Header>

      <main className="main">
        {isSearchContext && (
          <div
            className={`main-panel ${isDetailsLocation ? 'main-panel--aside' : ''}`}
          >
            <ResultsContainer
              searchTerm={searchTerm}
              isLoading={isLoading}
              errorMessage={errorMessage}
              isEmpty={!arts?.length}
            >
              {arts?.map((art) => (
                <AICCard
                  key={art.id}
                  art={art}
                  getImageUrl={AICApiService.getImageUrl}
                />
              ))}
              <ErrorTrigger />
            </ResultsContainer>

            {!isLoading && arts && (
              <Pagination
                total={totalArts}
                currentPage={Number(currentPage)}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default App;
