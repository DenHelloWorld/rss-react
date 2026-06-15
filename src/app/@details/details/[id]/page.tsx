import { Suspense } from 'react';
import DetailsPage from '../../../../page-components/DetailsPage/DetailsPage';

const DetailsSlot = () => (
  <Suspense>
    <DetailsPage />
  </Suspense>
);

export default DetailsSlot;
