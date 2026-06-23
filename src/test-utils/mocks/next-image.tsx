import React from 'react';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
    onLoad,
    onError,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src={src as string}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  ),
}));
