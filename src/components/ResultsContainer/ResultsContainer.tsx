import { useTranslations } from 'next-intl';
import LoadingIndicator from '../LoadIndicator/LoadIndicator.tsx';
import type { ReactNode } from 'react';

type ResultsContainerProps = {
  searchTerm: string;
  isFetching: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  children: ReactNode;
};

const ResultsContainer = ({
  searchTerm,
  isFetching,
  errorMessage,
  isEmpty,
  children,
}: ResultsContainerProps) => {
  const t = useTranslations('ResultsContainer');
  const displayTitle = searchTerm
    ? t('resultsFor', { term: searchTerm })
    : t('defaultTitle');

  return (
    <section className="shell relative h-full">
      <h1 className="title top-bar truncate w-full" title={displayTitle}>
        {displayTitle}
      </h1>

      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 border border-red-100">
          {errorMessage}
        </div>
      )}

      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <>
          {!errorMessage && !isEmpty && (
            <ul className="cards-grid">{children}</ul>
          )}

          {!errorMessage && isEmpty && (
            <p className="text-gray-400 italic text-center py-10">
              {t('empty')}
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default ResultsContainer;
