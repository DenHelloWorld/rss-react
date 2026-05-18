import { Outlet, useMatch, useNavigate, useSearchParams } from 'react-router';
import ArtworkResults from '../components/ArtworkResults.tsx';
import { ROUTES } from '../consts/routes.const.ts';
import { type JSX } from 'react';
import { useClickableBlock } from '../hooks/useClickableBlock.ts';

const ArtworkResultsLayout = (): JSX.Element => {
  const isDetailsLocation = !!useMatch(`${ROUTES.DETAILS.path}/:id`);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () =>
    void navigate({
      pathname: ROUTES.ROOT.path,
      search: searchParams.toString(),
    });

  return (
    <>
      <div
        {...useClickableBlock({
          onClick: () => {
            handleClose();
          },
        })}
        className={`main-panel ${isDetailsLocation ? 'main-panel--aside' : ''}`}
      >
        <ArtworkResults />
      </div>
      <Outlet />
    </>
  );
};

export default ArtworkResultsLayout;
