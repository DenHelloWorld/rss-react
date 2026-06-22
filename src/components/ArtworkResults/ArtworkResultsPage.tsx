import { Suspense } from 'react';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import Pagination from '../Pagination/Pagination';
import { fetchArtworks } from '../../store/arts/arts-api';
import { getErrorMessage } from '../../utils/error/error';

type Props = {
  query: string;
  currentPage: number;
};

const ArtworkResultsPage = async ({ query, currentPage }: Props) => {
  let data = null;
  let errorMessage: string | null = null;
  try {
    data = await fetchArtworks(query, currentPage);
  } catch (err) {
    errorMessage = getErrorMessage(err);
  }

  return (
    <>
      <Suspense>
        <ResultsContainer
          data={data}
          errorMessage={errorMessage}
          searchTerm={query}
        />
      </Suspense>

      {data && (
        <Pagination
          total={data.pagination.total}
          currentPage={currentPage}
          totalPages={data.pagination.total_pages}
        />
      )}
    </>
  );
};

export default ArtworkResultsPage;
