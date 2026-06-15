'use client';

// TODO: Feature 9 — convert to server component. Replace useCookies, useSearchParams,
// useUpdateSearchParams, and RTK Query with server-side fetch + HTML form action.

import { useSearchParams } from 'next/navigation';
import { useCookies } from '../../hooks/useCookies/useCookies';
import { COOKIE_KEYS } from '../../utils/cookie-storage/cookie-storage';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const';
import SearchBar from '../SearchBar/SearchBar';
import { useSearchArtsQuery } from '../../store/arts/arts-api';
import { useInvalidateArtsList } from '../../hooks/useArtsInvalidation/useArtsInvalidation';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams/useUpdateSearchParams';

const ArtworkSearch = () => {
  const invalidateArtsList = useInvalidateArtsList();
  const [storedSearchTerm, setStoredSearchTerm] = useCookies(
    COOKIE_KEYS.SEARCH_TERM
  );
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';
  const currentPage = searchParams.get(ROUTE_QUERY_PARAMS.PAGE) ?? '1';

  const { isFetching } = useSearchArtsQuery({
    query: searchTerm,
    page: Number(currentPage),
    limit: 9,
  });

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== searchTerm) {
      setStoredSearchTerm(trimmedValue);
      updateSearchParams({
        [ROUTE_QUERY_PARAMS.QUERY]: trimmedValue,
        [ROUTE_QUERY_PARAMS.PAGE]: '1',
      });
    }
  };

  return (
    <SearchBar
      isDisabled={isFetching}
      initialValue={searchTerm}
      onSearch={handleSearch}
      onRefetch={invalidateArtsList}
    />
  );
};

export default ArtworkSearch;
