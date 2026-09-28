'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import Skeleton from './Skeleton';

interface ProgressiveImageProps extends Omit<ImageProps, 'onLoad'> {
  containerClassName?: string;
  rounded?: string;
  showSkeletonWhileLoading?: boolean;
}

export default function ProgressiveImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  rounded = 'rounded-none',
  showSkeletonWhileLoading = false,
  fill,
  width,
  height,
  priority = false,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${
        fill ? 'w-full h-full' : 'inline-block'
      } ${containerClassName || 'bg-[#181716]'}`}
    >
      {/* Background Skeleton while loading if explicitly requested */}
      {showSkeletonWhileLoading && !isLoaded && !hasError && (
        <Skeleton
          className="absolute inset-0 w-full h-full z-0"
          rounded={rounded}
        />
      )}

      {/* Main Image with Fast Smooth Render */}
      {!hasError ? (
        <Image
          src={src}
          alt={alt || 'Crystal Spa image'}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          quality={props.quality || 80}
          sizes={props.sizes || (fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined)}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`
            ${fill ? 'w-full h-full' : ''}
            transition-opacity duration-300 ease-out
            ${isLoaded ? 'opacity-100' : 'opacity-90'}
            ${className}
          `}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1c1b1b] text-xs text-[#d0c5af]/60">
          Image indisponible
        </div>
      )}
    </div>
  );
}
