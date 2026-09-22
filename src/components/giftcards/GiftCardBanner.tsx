'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Gift, ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function GiftCardBanner() {
  const { language } = useLanguage();

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16 bg-[#121110]" id="carte-cadeau-section">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#1c1a16] via-[#242119] to-[#1c1a16] border border-[#f2ca50]/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#f2ca50]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#f2ca50]/10 blur-3xl pointer-events-none" />

        {/* Left Content */}
        <div className="flex flex-col gap-4 max-w-2xl text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2ca50]/20 border border-[#f2ca50]/40 w-fit mx-auto lg:mx-0">
            <Gift className="w-4 h-4 text-[#f2ca50]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2ca50]">
              {language === 'fr' ? 'La Surprise Parfaite' : 'The Perfect Surprise'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#e5e2e1] leading-tight">
            {language === 'fr' ? 'Offrez une Parenthèse à Deux' : 'Gift an Unforgettable Escape for Two'}
          </h2>

          <p className="text-sm sm:text-base text-[#d0c5af] font-light leading-relaxed">
            {language === 'fr'
              ? 'La Carte Cadeau Crystal Spa : le présent idéal pour une Saint-Valentin, un anniversaire de mariage ou simplement pour faire chavirer le cœur de votre moitié. Valable 1 an sur l’ensemble de nos suites privatives avec jacuzzi.'
              : 'The Crystal Spa Gift Card: the ideal present for Valentine’s Day, wedding anniversaries, or a spontaneous romantic surprise. Valid for 1 year across all private spa suites.'}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#f2ca50] pt-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'fr' ? 'Montant libre ou nuitée complète' : 'Custom amount or full overnight'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              {language === 'fr' ? 'Envoi immédiat par email ou coffret' : 'Instant digital or postal gift box'}
            </span>
          </div>
        </div>

        {/* Right CTA / Card Mockup */}
        <div className="flex flex-col items-center gap-4 z-10 shrink-0">
          <Link
            href="/gift-cards"
            className="px-8 py-4 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] font-bold text-xs uppercase tracking-widest luxury-shimmer-btn shadow-xl shadow-[#d4af37]/20 flex items-center gap-2.5 transition-all hover:scale-105"
          >
            <span>{language === 'fr' ? 'Offrir une Carte Cadeau' : 'Order a Gift Card'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <span className="text-[11px] text-[#99907c] font-light">
            {language === 'fr' ? 'Confirmation instantanée • Valable 12 mois' : 'Instant confirmation • Valid 12 months'}
          </span>
        </div>

      </div>
    </section>
  );
}
