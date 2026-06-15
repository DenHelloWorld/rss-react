'use client';

import { usePathname } from 'next/navigation';
import ArtworkResults from '../../components/ArtworkResults/ArtworkResults';
import { ROUTES } from '../../consts/routes.const';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock';
import Flyout from '../Flyout/Flyout';
import { useArtworkSelection } from '../../hooks/useArtworkSelection/useArtworkSelection';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams/useUpdateSearchParams';

const ArtworkResultsLayout = () => {
  const pathname = usePathname();
  const isDetailsLocation = pathname.startsWith(`/${ROUTES.DETAILS.path}`);
  const updateSearchParams = useUpdateSearchParams();
  const { count } = useArtworkSelection();

  const handleClose = () => {
    updateSearchParams({}, '/');
  };

  const clickableBlockProps = useClickableBlock({ onClick: handleClose });

  return (
    <>
      <div
        {...clickableBlockProps}
        className={`relative main-panel ${isDetailsLocation ? 'main-panel--aside' : ''}`}
      >
        <ArtworkResults />
      </div>

      {!!count && <Flyout />}
    </>
  );
};

export default ArtworkResultsLayout;
