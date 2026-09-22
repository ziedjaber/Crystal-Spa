'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ShieldCheck, Phone, Clock } from 'lucide-react';

export default function TopAnnouncementBar() {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-[#181611] text-[#f2ca50] border-b border-[#f2ca50]/20 py-1.5 sm:py-2 px-3 sm:px-8 text-[10px] sm:text-xs font-medium z-50 relative select-none leading-tight sm:leading-normal">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        
        {/* Main Direct Booking Reassurance */}
        <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2ca50] shrink-0 animate-pulse" />
          <span className="text-[#e5e2e1]">
            {language === 'fr' ? (
              <>
                <strong className="text-[#f2ca50] font-semibold">Réservation directe garantie :</strong> meilleur tarif, zéro frais · Arrivée autonome 24h/24
              </>
            ) : (
              <>
                <strong className="text-[#f2ca50] font-semibold">Direct booking guaranteed:</strong> best rate, zero fee · 24/7 keyless check-in
              </>
            )}
          </span>
        </div>

        {/* Quick Highlights / Direct Contact */}
        <div className="hidden md:flex items-center gap-5 text-[#d0c5af] text-[11px]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>{language === 'fr' ? 'Arrivée dès 17h • Départ 11h' : 'Check-in 5PM • Check-out 11AM'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>{language === 'fr' ? 'Caution empreinte 250 € (non débitée)' : 'Deposit hold €250 (not debited)'}</span>
          </div>

          <a
            href="tel:+33756949490"
            className="flex items-center gap-1.5 text-[#f2ca50] hover:underline font-semibold"
          >
            <Phone className="w-3 h-3" />
            <span>07 56 94 94 90</span>
          </a>
        </div>

      </div>
    </div>
  );
}
