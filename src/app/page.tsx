import { Suspense } from 'react';
import ArtworkResultsLayout from '../layouts/ArtworkResultsLayout/ArtworkResultsLayout';

const HomePage = () => (
  <Suspense>
    <ArtworkResultsLayout />
  </Suspense>
);

export default HomePage;
