import { Suspense } from 'react';
import ArtworkResultsLayout from '../../../layouts/ArtworkResultsLayout/ArtworkResultsLayout';

const DetailsChildrenSlot = () => (
  <Suspense>
    <ArtworkResultsLayout />
  </Suspense>
);

export default DetailsChildrenSlot;
