'use client';

import React from 'react';
import Image from 'next/image';
import Skeleton from './Skeleton';

interface ImageSkeletonProps {
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  className?: string;
  rounded?: string;
  showIcon?: boolean;
}

export default function ImageSkeleton({
  aspectRatio = 'video',
  className = '',
  rounded = 'rounded-2xl',
  showIcon = true,
}: ImageSkeletonProps) {
  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-[16/10]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-[21/9]'
      : 'h-full w-full';

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${rounded} ${className} bg-[#141313] border border-white/5 flex items-center justify-center`}
    >
      <Skeleton className="absolute inset-0 w-full h-full" rounded={rounded} />
      {showIcon && (
        <div className="relative z-10 w-11 h-11 rounded-full bg-[#181613]/90 border border-[#f2ca50]/30 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(242,202,80,0.25)]">
          <Image
            src="/logo.png"
            alt="Crystal Spa"
            width={28}
            height={28}
            className="w-full h-full object-contain filter drop-shadow opacity-80"
          />
        </div>
      )}
    </div>
  );
}
