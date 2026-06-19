'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const ErrorTrigger = () => {
  const t = useTranslations('ErrorTrigger');
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error(t('error'));
  }

  const handleTrigger = () => {
    setIsError(true);
  };

  return (
    <button onClick={handleTrigger} className="button button--warning">
      <svg>
        <use href="/icons.svg#bomb" />
      </svg>
      {t('label')}
    </button>
  );
};

export default ErrorTrigger;
