'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EyeOff, Waves, Heart, Tv, Sparkles, ShieldCheck } from 'lucide-react';

export default function ExperienceSection() {
  const { language, t } = useLanguage();

  const highlights = [
    {
      icon: EyeOff,
      title: language === 'fr' ? '100% Privatif & Sans Vis-à-Vis' : '100% Private & No Vis-à-Vis',
      description:
        language === 'fr'
          ? "Votre suite vous appartient entièrement. Absence totale d'espaces partagés, insonorisation studio acoustique de pointe et sas d'entrée confidentiel."
          : 'Your suite belongs entirely to you. Absolute privacy with no shared areas, acoustic soundproofing, and confidential keyless entry.',
    },
    {
      icon: Waves,
      title: language === 'fr' ? 'Jacuzzi Spa Privatif 24h/24' : '24/7 Private Hydro Spa',
      description:
        language === 'fr'
          ? "Eau changée et désinfectée systématiquement. Température d’eau réglable immédiatement à votre convenance avec buses d’hydromassage lombaires."
          : 'Water changed and sanitized systematically. Custom instant temperature control with targeted lumbar hydromassage jets.',
    },
    {
      icon: Heart,
      title: language === 'fr' ? 'Séjour Romantique Sur-Mesure' : 'Bespoke Romantic Stays',
      description:
        language === 'fr'
          ? 'Mise en scène personnalisée : pétales parfumés, coupes de champagne, mot doux, sélection gourmande et ambiance tamisée à la bougie.'
          : 'Personalized setup: scented petals, champagne flutes, sweet note, sweet treats, and soft candlelit mood.',
    },
    {
      icon: Tv,
      title: language === 'fr' ? '2 Smart TV (Jacuzzi + Chambre)' : 'Dual Smart TVs (Jacuzzi + Bed)',
      description:
        language === 'fr'
          ? 'Deux écrans 4K avec Netflix, YouTube, Disney+ inclus pour regarder vos séries préférées les pieds dans l’eau chaude ou sous la couette.'
          : 'Two 4K smart screens with Netflix, YouTube, Disney+ included to binge your favorite shows from the hot tub or bed.',
    },
    {
      icon: Sparkles,
      title: language === 'fr' ? 'Douche Italienne & Miroir LED' : 'Italian Shower & LED Touch Mirror',
      description:
        language === 'fr'
          ? 'Douche spacieuse à effet ciel de pluie, miroir tactile lumineux, produits d’accueil de qualité, peignoirs et claquettes fournis.'
          : 'Spacious rain shower, modern touch-lit mirror, toiletries, plush bathrobes, and slippers all provided.',
    },
    {
      icon: ShieldCheck,
      title: language === 'fr' ? 'Hospitalité Hôte & Sérénité' : '5-Star Host Hospitality',
      description:
        language === 'fr'
          ? 'Hôte Laïd réactif répondant en moins d’une heure. Arrivée autonome 24h/24, stationnement gratuit et assistance permanente.'
          : 'Responsive host Laïd answering in under an hour. Keyless 24/7 check-in, free parking, and continuous assistance.',
    },
  ];

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-24 py-24 overflow-hidden" id="experience-section">
      {/* 4K Background Image with Dark Scrim Overlay */}
      <div
        className="absolute inset-0 bg-4k-hero"
        style={{ backgroundImage: "url('/a2/chambre.png')" }}
      />
      <div className="absolute inset-0 scrim-4k-overlay pointer-events-none" />
      <div className="absolute inset-0 scrim-radial-gold pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-14">
        
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#f2ca50] bg-[#2a2a2a]/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#f2ca50]/20">
            {language === 'fr' ? 'Les Fondements Crystal Spa' : 'The Crystal Spa Pillars'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#e5e2e1] drop-shadow-md">
            {t('nav.experience')}
          </h2>
          <p className="text-sm text-[#d0c5af] font-light leading-relaxed">
            {language === 'fr'
              ? 'Chaque détail architectural, tactile et sensoriel a été calibré pour effacer la notion du temps et vous offrir une déconnexion intime sans pareil.'
              : 'Every architectural, tactile, and sensory detail has been calibrated to erase time and offer an unmatched intimate sanctuary.'}
          </p>
        </div>

        {/* 6 Luxury Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#1c1b1b]/85 backdrop-blur-xl luxury-card flex flex-col gap-6 border border-white/10 shadow-2xl group hover:border-[#f2ca50]/40 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2a]/80 flex items-center justify-center text-[#f2ca50] transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(242,202,80,0.2)] border border-[#f2ca50]/20">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-lg text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#d0c5af] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
