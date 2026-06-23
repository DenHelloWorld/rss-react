'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type LazyImageProps = ImageProps;

const LazyImage = ({ className, ...imageProps }: LazyImageProps) => {
  const [isImageLoadError, setIsImageLoadError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-app-bg">
      {isImageLoadError && (
        <svg className="card-placeholder" role="presentation">
          <use href="/icons.svg#broken-image" />
        </svg>
      )}
      {!isImageLoaded && !isImageLoadError && <div className="skeleton" />}

      {!isImageLoadError && (
        <Image
          width={0}
          height={0}
          {...imageProps}
          className={`${isImageLoaded ? 'opacity-100' : 'opacity-0'} m-auto ${className ?? ''}`}
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
