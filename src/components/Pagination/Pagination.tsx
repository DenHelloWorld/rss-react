'use client';

import { useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ROUTE_QUERY_PARAMS } from '../../consts/routes.const';
import { useNavigationLoading } from '../../contexts/NavigationLoadingContext';

type PaginationProps = {
  total: number;
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages, total }: PaginationProps) => {
  const t = useTranslations('Pagination');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const { isNavigating, setIsNavigating } = useNavigationLoading();

  useEffect(() => {
    setIsNavigating(false);
  }, [searchParams, setIsNavigating]);

  const navigate = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(ROUTE_QUERY_PARAMS.PAGE, String(newPage));
    setIsNavigating(true);
    startTransition(() => {
      router.push(`?${params}`);
    });
  };

  const handlePrev = () => {
    navigate(currentPage - 1);
  };
  const handleNext = () => {
    navigate(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        className="button button--icon"
        disabled={currentPage <= 1 || isNavigating}
        onClick={handlePrev}
      >
        <svg>
          <use href="/icons.svg#arrow-left" />
        </svg>
      </button>

      <span>
        <span>{currentPage}</span> / <span>{totalPages}</span>
      </span>

      <button
        className="button button--icon"
        disabled={currentPage >= totalPages || isNavigating}
        onClick={handleNext}
      >
        <svg>
          <use href="/icons.svg#arrow-right" />
        </svg>
      </button>

      <span className="text-xs text-gray-500">
        {t('total', { count: total })}
      </span>
    </div>
  );
};

export default Pagination;
