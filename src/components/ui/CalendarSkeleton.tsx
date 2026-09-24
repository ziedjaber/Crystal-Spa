'use client';

import React from 'react';
import Skeleton from './Skeleton';

export default function CalendarSkeleton() {
  return (
    <div className="p-6 rounded-3xl bg-[#161515] border border-white/5 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-48 h-6 rounded-lg" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((m) => (
          <div key={m} className="flex flex-col gap-3">
            <Skeleton className="w-36 h-6 mx-auto rounded-md" />
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-4 rounded" />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5 pt-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
