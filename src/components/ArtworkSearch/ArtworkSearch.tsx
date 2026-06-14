import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage.ts';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';
import { useSearchArtsQuery } from '../../store/arts/arts-api.ts';
import { useInvalidateArtsList } from '../../hooks/useArtsInvalidation/useArtsInvalidation.ts';

const ArtworkSearch = () => {
  const invalidateArtsList = useInvalidateArtsList();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM
  );
  const [searchParams, setSearchParams] = useSearchParams();
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
      setSearchParams({ query: trimmedValue, page: '1' });
    }
  };

  const handleRefetch = () => {
    invalidateArtsList();
  };

  return (
    <SearchBar
      isDisabled={isFetching}
      initialValue={searchTerm}
      onSearch={handleSearch}
      onRefetch={handleRefetch}
    />
  );
};

export default ArtworkSearch;
