import { useNavigate, useParams } from 'react-router';
import { useEffect, useState, type JSX } from 'react';
import {
  AICApiService,
  type AICArtworkDetails,
} from '../services/AICApiService.ts';
import { ROUTES } from '../consts/routes.const.ts';
import LoadingIndicator from '../components/LoadIndicator.tsx';
import LazyImage from '../components/LazyImage.tsx';

const DetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<AICArtworkDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await AICApiService.getById(id);
          setData(res.data);
        } catch (error) {
          console.error('Failed to fetch artwork:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    void load();
  }, [id]);

  const handleClose = () => void navigate(ROUTES.ROOT.path);

  return (
    <section className="mx-auto container shell relative">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="flex w-full justify-between gap-6 top-bar items-center">
            {data?.title && <h2 className="title">{data.title}</h2>}

            <button
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
              <div className="flex-1 overflow-hidden bg-gray-50">
                <LazyImage
                  src={AICApiService.getImageUrl(String(data.image_id))}
                  alt={data.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-gray-100 pt-6">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Artist
                    </h3>
                    <p className="text-xl text-gray-800 leading-tight">
                      {data.artist_display}
                    </p>
                  </section>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">
                      Origin
                    </h4>
                    <p className="text-gray-700">
                      {data.place_of_origin ?? 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">
                      Date
                    </h4>
                    <p className="text-gray-700">{data.date_display}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">
                      Dimensions
                    </h4>
                    <p className="text-gray-700">
                      {data.dimensions ?? 'Dimensions not available'}
                    </p>
                  </div>
                </div>

                <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">
                    Medium
                  </h4>
                  <p className="text-gray-600 italic leading-relaxed">
                    {data.medium_display}
                  </p>
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
