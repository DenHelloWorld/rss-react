'use client';

import { useEffect, useActionState, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigationLoading } from '../../hooks/useNavigationLoading/useNavigationLoading';
import { searchAction } from '../../actions/search';
import { revalidateAll } from '../../actions/revalidate';

const ArtworkSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isNavigating, setIsNavigating } = useNavigationLoading();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
    STORAGE_KEYS.SEARCH_TERM
  );
  const isInitialMount = useRef(true);

  const [redirectUrl, formAction, isSearchPending] = useActionState(
    searchAction,
    ''
  );

  const searchTerm = searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? '';

  useEffect(() => {
    setIsNavigating(isSearchPending);
  }, [isSearchPending, setIsNavigating]);

  useEffect(() => {
    if (redirectUrl) {
      setStoredSearchTerm(
        new URLSearchParams(redirectUrl.split('?')[1]).get(
          ROUTE_QUERY_PARAMS.QUERY
        ) ?? ''
      );
      router.push(redirectUrl);
    }
  }, [redirectUrl, router, setStoredSearchTerm]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!searchParams.get(ROUTE_QUERY_PARAMS.QUERY) && storedSearchTerm) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(ROUTE_QUERY_PARAMS.QUERY, storedSearchTerm);
        router.push(`${pathname}?${params.toString()}`);
      }
    }
  }, [searchParams, storedSearchTerm, router, pathname]);

  const handleClear = (value: string) => {
    setStoredSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(ROUTE_QUERY_PARAMS.QUERY, value);
    } else {
      params.delete(ROUTE_QUERY_PARAMS.QUERY);
    }
    params.set(ROUTE_QUERY_PARAMS.PAGE, '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRefetch = () => {
    setIsNavigating(true);
    void revalidateAll().then(() => {
      router.refresh();
    });
  };

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="pathname" value={pathname} />
      <SearchBar
        key={searchTerm}
        isDisabled={isNavigating || isSearchPending}
        initialValue={searchTerm}
        onSearch={handleClear}
        onRefetch={handleRefetch}
      />
    </form>
  );
};

export default ArtworkSearch;
