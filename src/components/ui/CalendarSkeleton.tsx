'use client';

import React from 'react';
import Image from 'next/image';
import Skeleton from './Skeleton';
import { Sparkles } from 'lucide-react';

export default function CalendarSkeleton() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#161515] border border-[#f2ca50]/20 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
      {/* Luxury Logo Header in Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-white/5 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1e1c19] border border-[#f2ca50]/30 flex items-center justify-center p-2 shadow-[0_0_12px_rgba(242,202,80,0.2)]">
            <Image
              src="/logo.png"
              alt="Crystal Spa"
              width={28}
              height={28}
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#f2ca50] animate-pulse" />
              <span className="font-serif text-xs font-semibold text-[#f2ca50] tracking-[0.2em] uppercase">
                CRYSTAL SPA
              </span>
            </div>
            <Skeleton className="w-36 h-3 mt-1 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-40 h-7 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
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
