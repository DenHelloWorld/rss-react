'use client';

// TODO: Feature 9 — convert to server component. Replace useSearchParams,
// useUpdateSearchParams, and RTK Query with server-side fetch + searchParams prop from page.tsx.

import { useSearchParams } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const';
import {
  useSearchArtsQuery,
  getArtworkImageUrl,
} from '../../store/arts/arts-api';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import AICCard from '../AICCard/AICCard';
import Pagination from '../Pagination/Pagination';
import { useErrorMessage } from '../../hooks/useErrorMessage/useErrorMessage';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams/useUpdateSearchParams';

const ArtworkResults = () => {
  const [storedSearchTerm] = useLocalStorage(STORAGE_KEYS.SEARCH_TERM);
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';
  const currentPage = searchParams.get(ROUTE_QUERY_PARAMS.PAGE) ?? '';

  const { data, isFetching, error } = useSearchArtsQuery({
    query: searchTerm,
    page: Number(currentPage),
    limit: 9,
  });
  const errorMessage = useErrorMessage(error);

  const handlePageChange = (newPage: number) => {
    updateSearchParams({
      [ROUTE_QUERY_PARAMS.QUERY]: searchTerm,
      [ROUTE_QUERY_PARAMS.PAGE]: String(newPage),
    });
  };

  return (
    <>
      <ResultsContainer
        searchTerm={searchTerm}
        isFetching={isFetching}
        errorMessage={errorMessage}
        isEmpty={!data?.data.length}
      >
        {data?.data.map((art) => (
          <li key={art.id}>
            <AICCard art={art} getImageUrl={getArtworkImageUrl} />
          </li>
        ))}
      </ResultsContainer>

      {data && (
        <Pagination
          isFetching={isFetching}
          total={data.pagination.total}
          currentPage={Number(currentPage)}
          totalPages={data.pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ArtworkResults;
