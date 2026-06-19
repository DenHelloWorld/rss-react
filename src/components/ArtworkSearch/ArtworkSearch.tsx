'use client';

// TODO: Feature 9 — convert to server component. Replace useSearchParams,
// useUpdateSearchParams, and RTK Query with server-side fetch + HTML form action.

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const';
import SearchBar from '../SearchBar/SearchBar';
import { useSearchArtsQuery } from '../../store/arts/arts-api';
import { useInvalidateArtsList } from '../../hooks/useArtsInvalidation/useArtsInvalidation';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams/useUpdateSearchParams';

const ArtworkSearch = () => {
  const invalidateArtsList = useInvalidateArtsList();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM
  );
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';
  const currentPage = searchParams.get(ROUTE_QUERY_PARAMS.PAGE) ?? '1';

  const queryOnMount = useRef(searchParams.get(ROUTE_QUERY_PARAMS.QUERY));
  const storedOnMount = useRef(storedSearchTerm);

  useEffect(() => {
    if (!queryOnMount.current && storedOnMount.current) {
      updateSearchParams({ [ROUTE_QUERY_PARAMS.QUERY]: storedOnMount.current });
    }
  }, [updateSearchParams]);

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
