import { Outlet, useMatch, useNavigate, useSearchParams } from 'react-router';
import ArtworkResults from '../../components/ArtworkResults/ArtworkResults.tsx';
import { ROUTES } from '../../consts/routes.const.ts';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';
import Flyout from '../Flyout/Flyout.tsx';
import { useArtworkSelection } from '../../hooks/useArtworkSelection/useArtworkSelection.ts';

const ArtworkResultsLayout = () => {
  const isDetailsLocation = !!useMatch(`${ROUTES.DETAILS.path}/:id`);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { count } = useArtworkSelection();

  const handleClose = () =>
    void navigate({
      pathname: ROUTES.ROOT.path,
      search: searchParams.toString(),
    });

  return (
    <>
      <div
        {...useClickableBlock({
          onClick: handleClose,
        })}
        className={`relative main-panel ${isDetailsLocation ? 'main-panel--aside' : ''}`}
      >
        <ArtworkResults />
      </div>
      <Outlet />

      {!!count && <Flyout />}
    </>
  );
};

export default ArtworkResultsLayout;
