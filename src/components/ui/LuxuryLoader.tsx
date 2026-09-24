'use client';

import React from 'react';
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
  subtitle = 'Sanctuaire d’exception...',
  className = '',
}: LuxuryLoaderProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 text-center ${className}`}>
      {/* Outer Golden Pulsing Ring */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-transparent border-t-[#f2ca50] border-r-[#f2ca50]/40"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1.5 rounded-full border border-transparent border-b-[#d4af37] border-l-[#d4af37]/40"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full bg-[#f2ca50]/10 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-[#f2ca50]" />
        </motion.div>
      </div>

      {/* Typography */}
      <div className="flex flex-col items-center gap-1">
        <h3 className="font-serif text-sm sm:text-base tracking-[0.25em] text-[#f2ca50] font-semibold uppercase">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#99907c] tracking-wider font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0c0c]/95 backdrop-blur-xl">
        {content}
      </div>
    );
  }

  if (variant === 'modal') {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-[#141313] border border-[#f2ca50]/30 shadow-2xl">
        {content}
      </div>
    );
  }

  return content;
}
