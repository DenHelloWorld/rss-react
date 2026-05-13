import { type JSX, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage = (props: LazyImageProps): JSX.Element => {
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full flex align-middle justify-center">
      {isImageLoadError && (
        <svg className="card-placeholder" role="presentation">
          <use href="/icons.svg#broken-image" />
        </svg>
      )}
      {!isImageLoaded && !isImageLoadError && <div className="skeleton" />}

      {!isImageLoadError && (
        <img
          loading="lazy"
          src={props.src}
          alt={props.alt}
          className={` ${isImageLoaded ? 'opacity-100' : 'opacity-0'} m-auto`}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          onError={() => {
            setIsImageLoadError(true);
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
