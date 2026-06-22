'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const';
import SearchBar from '../SearchBar/SearchBar';
import { artsApi } from '../../store/arts/arts-api';
import { useAppDispatch } from '../../store/store';
import { API_TAGS } from '../../consts/api-tags.const';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams/useUpdateSearchParams';
import { useNavigationLoading } from '../../contexts/NavigationLoadingContext';

const ArtworkSearch = () => {
  const dispatch = useAppDispatch();
  const invalidateArtsList = () =>
    dispatch(
      artsApi.util.invalidateTags([{ type: API_TAGS.ARTS, id: API_TAGS.LIST }])
    );
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM
  );
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const { isNavigating } = useNavigationLoading();

  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';

  useEffect(() => {
    if (!searchParams.get(ROUTE_QUERY_PARAMS.QUERY) && storedSearchTerm) {
      updateSearchParams({ [ROUTE_QUERY_PARAMS.QUERY]: storedSearchTerm });
    }
  }, [searchParams, storedSearchTerm, updateSearchParams]);

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
      isDisabled={isNavigating}
      initialValue={searchTerm}
      onSearch={handleSearch}
      onRefetch={invalidateArtsList}
    />
  );
};

export default ArtworkSearch;
