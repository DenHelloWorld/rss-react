'use client';

import { useTranslations } from 'next-intl';
import ErrorPage from '../../page-components/ErrorPage/ErrorPage';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  const t = useTranslations('ErrorPage');

  return <ErrorPage resetLabel={t('reset')} error={error} reset={reset} />;
};

export default Error;
