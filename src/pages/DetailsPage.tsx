import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import {
  AICApiService,
  type AICArtworkDetails,
} from '../services/AICApiService.ts';
import { ROUTES } from '../consts/routes.const.ts';
import LoadingIndicator from '../components/LoadIndicator.tsx';
import LazyImage from '../components/LazyImage.tsx';
import { useClickableBlock } from '../hooks/useClickableBlock.ts';
import { KEYBOARD_KEYS } from '../consts/keyboard-keys.const.ts';

const DetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<AICArtworkDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const res = await AICApiService.getById(id);
          setData(res.data);
        } catch (error) {
          console.error('Failed to fetch artwork:', error);
          if (error instanceof Error) {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      }
    };
    void load();
  }, [id]);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.focus();
    }
  }, [loading]);

  const handleClose = () =>
    void navigate({
      pathname: ROUTES.ROOT.path,
      search: searchParams.toString(),
    });

  const clickableBlockProps = useClickableBlock({
    onClick: handleClose,
    allowedKeys: [KEYBOARD_KEYS.ESC, KEYBOARD_KEYS.ESCAPE],
  });

  if (error || (!data && !loading)) {
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
        <p className="error-message my-4 w-fit mx-auto">{error}</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      {...clickableBlockProps}
      className="mx-auto container shell relative"
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="flex w-full justify-between gap-6 top-bar items-center">
            {data?.title && <h2 className="title">{data.title}</h2>}

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

          {data && (
            <div className="flex flex-col md:flex-row gap-8 mt-6">
              <div className="flex-1 overflow-hidden">
                <LazyImage
                  src={AICApiService.getImageUrl(String(data.image_id))}
                  alt={data.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 details-grid-border pt-6">
                  <section>
                    <h3 className="details-label mb-2">Artist</h3>
                    <p className="details-artist">{data.artist_display}</p>
                  </section>
                  <div>
                    <h4 className="details-label mb-1">Origin</h4>
                    <p className="details-value">
                      {data.place_of_origin ?? 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <h4 className="details-label mb-1">Date</h4>
                    <p className="details-value">{data.date_display}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="details-label mb-1">Dimensions</h4>
                    <p className="details-value">
                      {data.dimensions ?? 'Dimensions not available'}
                    </p>
                  </div>
                </div>

                <section className="details-meta-box">
                  <h4 className="details-label mb-2">Medium</h4>
                  <p className="details-medium">{data.medium_display}</p>
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
