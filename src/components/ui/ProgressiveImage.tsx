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
  showSkeletonWhileLoading = true,
  fill,
  width,
  height,
  priority = false,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${
        fill ? 'w-full h-full' : 'inline-block'
      } bg-[#181716] ${containerClassName}`}
    >
      {/* Background Shimmer Skeleton while downloading */}
      {showSkeletonWhileLoading && !isLoaded && !hasError && (
        <Skeleton
          className="absolute inset-0 w-full h-full z-0"
          rounded={rounded}
        />
      )}

      {/* Main Image with Unsplash-style Blur-to-HD Transition */}
      {!hasError ? (
        <Image
          src={src}
          alt={alt || 'Crystal Spa image'}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`
            ${fill ? 'w-full h-full' : ''}
            ${
              isLoaded
                ? 'progressive-blur-loaded'
                : 'progressive-blur-loading'
            }
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
