import { Outlet, useMatch } from 'react-router';
import ArtworkResults from '../components/ArtworkResults.tsx';
import { ROUTES } from '../consts/routes.const.ts';
import { type JSX } from 'react';

const ArtworkResultsLayout = (): JSX.Element => {
  const isDetailsLocation = !!useMatch(`${ROUTES.DETAILS.path}/:id`);

  return (
    <>
      <div
        className={`main-panel ${isDetailsLocation ? 'main-panel--aside' : ''}`}
      >
        <ArtworkResults />
      </div>
      <Outlet />
    </>
  );
};

export default ArtworkResultsLayout;
