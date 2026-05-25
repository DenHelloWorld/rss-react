import {
  ROUTE_QUERY_KEYS,
  ROUTE_QUERY_PARAMS,
} from '../../consts/routes.const.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { STORAGE_KEYS } from '../../services/localStorageService/local-storage.service.ts';
import { useSearchParams } from 'react-router';
import { AICApiService } from '../../services/AICApiService/aic-api-service.ts';
import ResultsContainer from '../ResultsContainer/ResultsContainer.tsx';
import AICCard from '../AICCard/AICCard.tsx';
import ErrorTrigger from '../ErrorTrigger/ErrorTrigger.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import { useQuery } from '@tanstack/react-query';
import { useErrorMessage } from '../../hooks/useErrorMessage/useErrorMessage.ts';

const ArtworkResults = () => {
  const [storedSearchTerm] = useLocalStorage(STORAGE_KEYS.SEARCH_TERM);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm =
    searchParams.get(ROUTE_QUERY_PARAMS.QUERY) ?? storedSearchTerm ?? '';
  const currentPage = searchParams.get(ROUTE_QUERY_PARAMS.PAGE) ?? '';
  const { data, isFetching, error } = useQuery({
    queryKey: [ROUTE_QUERY_KEYS.ARTWORKS, searchTerm, currentPage],
    queryFn: () => AICApiService.search(searchTerm, { page: currentPage }),
    placeholderData: (previousData) => previousData,
  });
  const errorMessage = useErrorMessage(error);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: searchTerm, page: String(newPage) });
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
            <AICCard art={art} getImageUrl={AICApiService.getImageUrl} />
          </li>
        ))}
        <ErrorTrigger />
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
