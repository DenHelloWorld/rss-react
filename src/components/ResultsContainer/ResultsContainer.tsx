'use client';

import { useTranslations } from 'next-intl';
import { type AICResponse } from '../../store/arts/arts-api';
import { useNavigationLoading } from '../../contexts/NavigationLoadingContext';
import LoadingIndicator from '../LoadIndicator/LoadIndicator';
import AICCard from '../AICCard/AICCard';

type Props = {
  data: AICResponse | null;
  errorMessage: string | null;
  searchTerm: string;
};

const ResultsContainer = ({ data, errorMessage, searchTerm }: Props) => {
  const t = useTranslations('ResultsContainer');
  const { isNavigating } = useNavigationLoading();

  const displayTitle = searchTerm
    ? t('resultsFor', { term: searchTerm })
    : t('defaultTitle');
  const isEmpty = !data?.data.length;

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

      {isNavigating && (
        <div className="flex h-full items-center justify-center">
          <LoadingIndicator />
        </div>
      )}

      {!isNavigating && !errorMessage && !isEmpty && (
        <ul className="cards-grid">
          {data.data.map((art) => (
            <li key={art.id}>
              <AICCard art={art} />
            </li>
          ))}
        </ul>
      )}

      {!isNavigating && !errorMessage && isEmpty && (
        <p className="text-gray-400 italic text-center py-10">{t('empty')}</p>
      )}
    </section>
  );
};

export default ResultsContainer;
