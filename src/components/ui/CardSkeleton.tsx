'use client';

import React from 'react';
import Skeleton from './Skeleton';
import ImageSkeleton from './ImageSkeleton';

export function ApartmentCardSkeleton() {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-[#161515] border border-white/5 overflow-hidden flex flex-col">
      <div className="relative aspect-[16/10] w-full">
        <ImageSkeleton aspectRatio="auto" rounded="rounded-none" showIcon />
      </div>
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <Skeleton className="w-3/4 h-6 rounded-lg" />
        <Skeleton className="w-1/2 h-4 rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="w-20 h-5 rounded-full" />
          <Skeleton className="w-24 h-5 rounded-full" />
        </div>
        <div className="pt-2 flex justify-between items-center">
          <Skeleton className="w-28 h-8 rounded-lg" />
          <Skeleton className="w-24 h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function RomanticPackCardSkeleton() {
  return (
    <div className="rounded-2xl p-5 bg-[#161515] border border-white/5 flex flex-col gap-3">
      <Skeleton className="w-1/2 h-5 rounded-md" />
      <Skeleton className="w-full h-12 rounded-lg" />
      <Skeleton className="w-1/3 h-6 rounded-md" />
    </div>
  );
}
