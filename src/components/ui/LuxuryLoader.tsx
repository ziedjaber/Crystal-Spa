'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LuxuryLoaderProps {
  variant?: 'fullscreen' | 'inline' | 'modal';
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function LuxuryLoader({
  variant = 'inline',
  title = 'CRYSTAL SPA',
  subtitle = 'Sanctuaire d’exception & Bien-être intime...',
  className = '',
}: LuxuryLoaderProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-5 text-center select-none ${className}`}>
      {/* Outer Golden Pulsing Aura & Spinning Rings */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
        {/* Soft Golden Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-[#f2ca50]/15 blur-xl animate-pulse" />

        {/* Outer Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-transparent border-t-[#f2ca50] border-r-[#f2ca50]/50"
        />

        {/* Middle Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-transparent border-b-[#d4af37] border-l-[#d4af37]/40"
        />

        {/* Inner Ring 3 with dashes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3.5 rounded-full border border-dashed border-[#f2ca50]/20"
        />

        {/* Central Logo Container with Golden Glow */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#181613] border border-[#f2ca50]/40 flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(242,202,80,0.35)]"
        >
          <Image
            src="/logo.png"
            alt="Crystal Spa Logo"
            width={48}
            height={48}
            priority
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(242,202,80,0.6)]"
          />
        </motion.div>
      </div>

      {/* Luxury Typography */}
      <div className="flex flex-col items-center gap-1.5 max-w-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#f2ca50] animate-pulse" />
          <h3 className="font-serif text-sm sm:text-base tracking-[0.3em] text-[#f2ca50] font-semibold uppercase">
            {title}
          </h3>
          <Sparkles className="w-3.5 h-3.5 text-[#f2ca50] animate-pulse" />
        </div>
        {subtitle && (
          <p className="text-xs text-[#b8b09d] tracking-wider font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Shimmering Progress Indicator */}
      <div className="w-36 h-0.5 rounded-full bg-white/10 overflow-hidden relative">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#f2ca50] to-transparent"
        />
      </div>
    </div>
  );

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0c0c]/98 backdrop-blur-2xl">
        {content}
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-[#141313] border border-[#f2ca50]/30 shadow-2xl">
        {content}
      </div>
    );
  }

  return content;
}
