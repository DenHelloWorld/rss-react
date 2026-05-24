import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { STORAGE_KEYS } from '../services/local-storage.service.ts';
import { ROUTE_QUERY_PARAMS } from '../consts/routes.const.ts';
import SearchBar from './SearchBar.tsx';

const ArtworkSearch = () => {
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== searchTerm) {
      setStoredSearchTerm(trimmedValue);
      setSearchParams({ query: trimmedValue, page: '1' });
    }
  };

  return <SearchBar initialValue={searchTerm} onSearch={handleSearch} />;
};

export default ArtworkSearch;
