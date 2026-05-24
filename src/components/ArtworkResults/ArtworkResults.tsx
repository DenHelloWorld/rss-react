import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { STORAGE_KEYS } from '../../services/localStorageService/local-storage.service.ts';
import { useSearchParams } from 'react-router';
import {
  AICApiService,
  type AICArtwork,
} from '../../services/AICApiService/aic-api-service.ts';
import ResultsContainer from '../ResultsContainer/ResultsContainer.tsx';
import AICCard from '../AICCard/AICCard.tsx';
import ErrorTrigger from '../ErrorTrigger/ErrorTrigger.tsx';
import Pagination from '../Pagination/Pagination.tsx';

const ArtworkResults = () => {
  // TODO: check https://tanstack.com/query/latest (and disable buttons on loading)
  const [arts, setArts] = useState<AICArtwork[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storedSearchTerm] = useLocalStorage(STORAGE_KEYS.SEARCH_TERM);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';
  const [totalArts, setTotalArts] = useState<number>(0);
  const currentPage = searchParams.get(ROUTE_QUERY_PARAMS.PAGE) ?? '1';
  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: searchTerm, page: String(newPage) });
  };

  const performSearchRef = useRef<
    (
      query: string,
      page: string,
      didCancelRef: { current: boolean }
    ) => Promise<void>
  >(async () => {
    /* empty */
  });

  useLayoutEffect(() => {
    performSearchRef.current = async (
      query: string,
      page: string,
      didCancelRef: { current: boolean }
    ) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await AICApiService.search(query, { page });

        if (!didCancelRef.current) {
          setArts(response.data);
          setTotalPages(response.pagination.total_pages);
          setTotalArts(response.pagination.total);

          setSearchParams({ query, page });
        }
      } catch (e) {
        if (!didCancelRef.current) {
          setErrorMessage(
            e instanceof Error ? e.message : 'An unknown error occurred'
          );
        }
      } finally {
        if (!didCancelRef.current) {
          setIsLoading(false);
        }
      }
    };
  });

  useEffect(() => {
    const didCancelRef = { current: false };

    void performSearchRef.current(searchTerm, currentPage, didCancelRef);

    return () => {
      didCancelRef.current = true;
    };
  }, [searchTerm, currentPage]);

  return (
    <>
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
    </>
  );
};

export default ArtworkResults;
