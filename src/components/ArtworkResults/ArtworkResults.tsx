import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage.ts';
import { STORAGE_KEYS } from '../../utils/local-storage/local-storage.ts';
import { useSearchParams } from 'react-router';
import {
  useSearchArtsQuery,
  getArtworkImageUrl,
} from '../../store/arts/arts-api.ts';
import ResultsContainer from '../ResultsContainer/ResultsContainer.tsx';
import AICCard from '../AICCard/AICCard.tsx';
import ErrorTrigger from '../ErrorTrigger/ErrorTrigger.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import { useErrorMessage } from '../../hooks/useErrorMessage/useErrorMessage.ts';

const ArtworkResults = () => {
  const [storedSearchTerm] = useLocalStorage(STORAGE_KEYS.SEARCH_TERM);
  const [searchParams, setSearchParams] = useSearchParams();
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
            <AICCard art={art} getImageUrl={getArtworkImageUrl} />
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
