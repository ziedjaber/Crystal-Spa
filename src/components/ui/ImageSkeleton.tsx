'use client';

import React from 'react';
import Skeleton from './Skeleton';
import { Sparkles } from 'lucide-react';

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
        <div className="relative z-10 w-9 h-9 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#f2ca50]/50" />
        </div>
      )}
    </div>
  );
}
