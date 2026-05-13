import { type JSX, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage = (props: LazyImageProps): JSX.Element => {
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      {isImageLoadError && (
        <div className="card-placeholder-wrapper">
          <svg className="card-placeholder" role="presentation">
            <use href="/icons.svg#broken-image" />
          </svg>
        </div>
      )}
      {!isImageLoaded && !isImageLoadError && <div className="skeleton" />}

      {!isImageLoadError && (
        <img
          loading="lazy"
          src={props.src}
          alt={props.alt}
          className={` ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          } ${props.className ?? ''}`}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          onError={() => {
            setIsImageLoadError(true);
          }}
        />
      )}
    </>
  );
};

export default LazyImage;
