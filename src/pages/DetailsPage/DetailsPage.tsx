import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useRef } from 'react';
import {
  useGetArtByIdQuery,
  getArtworkImageUrl,
} from '../../store/arts/arts-api.ts';
import { ROUTES } from '../../consts/routes.const.ts';
import { useInvalidateArtById } from '../../hooks/useArtsInvalidation/useArtsInvalidation.ts';
import LoadingIndicator from '../../components/LoadIndicator/LoadIndicator.tsx';
import LazyImage from '../../components/LazyImage/LazyImage.tsx';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';
import { useErrorMessage } from '../../hooks/useErrorMessage/useErrorMessage.ts';
import { KEYBOARD_KEYS } from '../../consts/keyboard-keys.const.ts';

const DetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const invalidateArtById = useInvalidateArtById();

  const { data, isFetching, error } = useGetArtByIdQuery(id ?? '', {
    skip: !id,
  });

  const artwork = data?.data;
  const errorMessage = useErrorMessage(error);

  const handleClose = () =>
    void navigate({
      pathname: ROUTES.ROOT.path,
      search: searchParams.toString(),
    });

  const clickableBlockProps = useClickableBlock({
    onClick: handleClose,
    allowedKeys: [KEYBOARD_KEYS.ESC, KEYBOARD_KEYS.ESCAPE],
  });

  const handleRefetch = () => {
    invalidateArtById(Number(id));
  };

  if (errorMessage || (!artwork && !isFetching)) {
    return (
      <section
        ref={sectionRef}
        {...clickableBlockProps}
        className="mx-auto container shell relative"
      >
        <div className="flex justify-end">
          <button
            aria-label="Close"
            className="button button--error button--icon"
            onClick={handleClose}
          >
            <svg>
              <use href="/icons.svg#close" />
            </svg>
          </button>
        </div>
        <p className="error-message my-4 w-fit mx-auto">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      {...clickableBlockProps}
      className="mx-auto container shell relative"
    >
      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="flex w-full justify-between gap-6 top-bar items-center">
            {artwork?.title && <h2 className="title">{artwork.title}</h2>}

            <div className="flex gap-4">
              <button
                aria-label="refresh button"
                className="button button--warning"
                onClick={handleRefetch}
              >
                <svg>
                  <use href="/icons.svg#refresh" />
                </svg>
                Refresh
              </button>

              <button
                aria-label="Close"
                className="button button--error button--icon"
                onClick={handleClose}
              >
                <svg>
                  <use href="/icons.svg#close" />
                </svg>
              </button>
            </div>
          </div>

          {artwork && (
            <div className="flex flex-col md:flex-row gap-8 mt-6">
              <div className="flex-1 overflow-hidden">
                <LazyImage
                  src={getArtworkImageUrl(String(artwork.image_id))}
                  alt={artwork.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 details-grid-border pt-6">
                  <section>
                    <h3 className="details-label mb-2">Artist</h3>
                    <p className="details-artist">{artwork.artist_display}</p>
                  </section>
                  <div>
                    <h4 className="details-label mb-1">Origin</h4>
                    <p className="details-value">
                      {artwork.place_of_origin ?? 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <h4 className="details-label mb-1">Date</h4>
                    <p className="details-value">{artwork.date_display}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="details-label mb-1">Dimensions</h4>
                    <p className="details-value">
                      {artwork.dimensions ?? 'Dimensions not available'}
                    </p>
                  </div>
                </div>

                <section className="details-meta-box">
                  <h4 className="details-label mb-2">Medium</h4>
                  <p className="details-medium">{artwork.medium_display}</p>
                </section>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DetailsPage;
