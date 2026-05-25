import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full flex align-middle justify-center bg-app-bg">
      {isImageLoadError && (
        <svg className="card-placeholder" role="presentation">
          <use href="/icons.svg#broken-image" />
        </svg>
      )}
      {!isImageLoaded && !isImageLoadError && <div className="skeleton" />}

      {!isImageLoadError && (
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className={` ${isImageLoaded ? 'opacity-100' : 'opacity-0'} m-auto ${className ?? ''}`}
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
