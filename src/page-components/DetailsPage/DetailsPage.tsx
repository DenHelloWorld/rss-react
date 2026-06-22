'use client';

import { useParams } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  useGetArtByIdQuery,
  getArtworkImageUrl,
  artsApi,
} from '../../store/arts/arts-api';
import { useAppDispatch } from '../../store/store';
import { API_TAGS } from '../../consts/api-tags.const';
import LoadingIndicator from '../../components/LoadIndicator/LoadIndicator';
import LazyImage from '../../components/LazyImage/LazyImage';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams/useUpdateSearchParams';
import { getErrorMessage } from '../../utils/error/error';
import { KEYBOARD_KEYS } from '../../consts/keyboard-keys.const';

const DetailsPage = () => {
  const t = useTranslations('DetailsPage');
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const updateSearchParams = useUpdateSearchParams();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.focus();
  }, []);

  const { data, isFetching, error } = useGetArtByIdQuery(id, {
    skip: !id,
  });

  const artwork = data?.data;
  const imageUrl = artwork ? getArtworkImageUrl(String(artwork.image_id)) : '';
  const errorMessage = getErrorMessage(error);

  const handleClose = () => {
    updateSearchParams({}, '/');
  };

  const clickableBlockProps = useClickableBlock({
    onClick: handleClose,
    allowedKeys: [KEYBOARD_KEYS.ESC, KEYBOARD_KEYS.ESCAPE],
  });

  const handleRefetch = () => {
    dispatch(
      artsApi.util.invalidateTags([{ type: API_TAGS.ARTS, id: Number(id) }])
    );
  };

  const closeButton = (
    <button
      aria-label={t('close')}
      className="button button--error button--icon"
      onClick={handleClose}
    >
      <svg>
        <use href="/icons.svg#close" />
      </svg>
    </button>
  );

  if (errorMessage || (!artwork && !isFetching)) {
    return (
      <section
        ref={sectionRef}
        {...clickableBlockProps}
        className="mx-auto container shell relative"
      >
        <div className="flex justify-end">{closeButton}</div>
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
                aria-label={t('refresh')}
                className="button button--warning"
                onClick={handleRefetch}
              >
                <svg>
                  <use href="/icons.svg#refresh" />
                </svg>
                {t('refresh')}
              </button>

              {closeButton}
            </div>
          </div>

          {artwork && (
            <div className="flex flex-col md:flex-row gap-8 mt-6">
              <div className="flex-1 overflow-hidden">
                <LazyImage
                  src={imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-contain"
                  loading="eager"
                  unoptimized
                />
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 details-grid-border pt-6">
                  <section>
                    <h3 className="details-label mb-2">{t('artist')}</h3>
                    <p className="details-artist">{artwork.artist_display}</p>
                  </section>
                  <div>
                    <h4 className="details-label mb-1">{t('origin')}</h4>
                    <p className="details-value">
                      {artwork.place_of_origin ?? t('unknown')}
                    </p>
                  </div>
                  <div>
                    <h4 className="details-label mb-1">{t('date')}</h4>
                    <p className="details-value">{artwork.date_display}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="details-label mb-1">{t('dimensions')}</h4>
                    <p className="details-value">
                      {artwork.dimensions ?? t('dimensionsNotAvailable')}
                    </p>
                  </div>
                </div>

                <section className="details-meta-box">
                  <h4 className="details-label mb-2">{t('medium')}</h4>
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
