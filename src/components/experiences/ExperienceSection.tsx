'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { EyeOff, Waves, Heart, Tv, Sparkles, ShieldCheck } from 'lucide-react';

export default function ExperienceSection() {
  const { language, t } = useLanguage();

  const highlights = [
    {
      icon: EyeOff,
      title:
        language === 'fr'
          ? '100% Privatif & Sans Vis-à-Vis'
          : language === 'es'
          ? '100% Privado y Sin Vistas'
          : '100% Private & No Vis-à-Vis',
      description:
        language === 'fr'
          ? "Votre suite vous appartient entièrement. Absence totale d'espaces partagés, insonorisation studio acoustique de pointe et sas d'entrée confidentiel."
          : language === 'es'
          ? "Su suite le pertenece por completo. Ausencia total de espacios compartidos, insonorización acústica de primer nivel y entrada confidencial."
          : 'Your suite belongs entirely to you. Absolute privacy with no shared areas, acoustic soundproofing, and confidential keyless entry.',
    },
    {
      icon: Waves,
      title:
        language === 'fr'
          ? 'Jacuzzi Spa Privatif 24h/24'
          : language === 'es'
          ? 'Jacuzzi Spa Privado 24h/24'
          : '24/7 Private Hydro Spa',
      description:
        language === 'fr'
          ? "Eau changée et désinfectée systématiquement. Température d’eau réglable immédiatement à votre convenance avec buses d’hydromassage lombaires."
          : language === 'es'
          ? "Agua cambiada y desinfectada sistemáticamente. Temperatura regulable inmediatamente a su gusto con chorros de hidromasaje lumbar."
          : 'Water changed and sanitized systematically. Custom instant temperature control with targeted lumbar hydromassage jets.',
    },
    {
      icon: Heart,
      title:
        language === 'fr'
          ? 'Séjour Romantique Sur-Mesure'
          : language === 'es'
          ? 'Estancia Romántica a Medida'
          : 'Bespoke Romantic Stays',
      description:
        language === 'fr'
          ? 'Mise en scène personnalisée : pétales parfumés, coupes de champagne, mot doux, sélection gourmande et ambiance tamisée à la bougie.'
          : language === 'es'
          ? 'Puesta en escena personalizada: pétalos perfumados, copas de champán, nota dulce, selección gourmet y ambiente tenue a la luz de las velas.'
          : 'Personalized setup: scented petals, champagne flutes, sweet note, sweet treats, and soft candlelit mood.',
    },
    {
      icon: Tv,
      title:
        language === 'fr'
          ? '2 Smart TV (Jacuzzi + Chambre)'
          : language === 'es'
          ? '2 Smart TV (Jacuzzi + Habitación)'
          : 'Dual Smart TVs (Jacuzzi + Bed)',
      description:
        language === 'fr'
          ? 'Deux écrans 4K avec Netflix, YouTube, Disney+ inclus pour regarder vos séries préférées les pieds dans l’eau chaude ou sous la couette.'
          : language === 'es'
          ? 'Dos pantallas 4K con Netflix, YouTube y Disney+ incluidos para disfrutar de sus series favoritas en el agua o bajo las sábanas.'
          : 'Two 4K smart screens with Netflix, YouTube, Disney+ included to binge your favorite shows from the hot tub or bed.',
    },
    {
      icon: Sparkles,
      title:
        language === 'fr'
          ? 'Douche Italienne & Miroir LED'
          : language === 'es'
          ? 'Ducha Italiana y Espejo LED'
          : 'Italian Shower & LED Touch Mirror',
      description:
        language === 'fr'
          ? 'Douche spacieuse à effet ciel de pluie, miroir tactile lumineux, produits d’accueil de qualité, peignoirs et claquettes fournis.'
          : language === 'es'
          ? 'Amplia ducha con efecto lluvia, espejo táctil iluminado, productos de bienvenida de cortesía, albornoces y zapatillas incluidos.'
          : 'Spacious rain shower, modern touch-lit mirror, toiletries, plush bathrobes, and slippers all provided.',
    },
    {
      icon: ShieldCheck,
      title:
        language === 'fr'
          ? 'Hospitalité Hôte & Sérénité'
          : language === 'es'
          ? 'Hospitalidad 5 Estrellas y Serenidad'
          : '5-Star Host Hospitality',
      description:
        language === 'fr'
          ? 'Hôte Laïd réactif répondant en moins d’une heure. Arrivée autonome 24h/24, stationnement gratuit et assistance permanente.'
          : language === 'es'
          ? 'Anfitrión Laïd atento con respuesta en menos de una hora. Llegada autónoma 24h/24, aparcamiento gratuito y asistencia permanente.'
          : 'Responsive host Laïd answering in under an hour. Keyless 24/7 check-in, free parking, and continuous assistance.',
    },
  ];

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-24 py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#0e0e0e] [data-theme=light]:bg-[#FAF8F5]" id="experience-section">
      {/* 4K Background Image with Dark Scrim Overlay (Dark theme only) */}
      <div className="absolute inset-0 bg-4k-hero pointer-events-none">
        <Image
          src="/a2/chambre.png"
          alt="Chambre Spa"
          fill
          sizes="100vw"
          quality={75}
          loading="lazy"
          decoding="async"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 scrim-4k-overlay pointer-events-none" />
      <div className="absolute inset-0 scrim-radial-gold pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16 sm:gap-20">
        
        <div className="text-center max-w-[680px] mx-auto flex flex-col items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8A24D] dark:text-[#f2ca50] bg-[#C8A24D]/10 dark:bg-[#2a2a2a]/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C8A24D]/30 dark:border-[#f2ca50]/20">
            {language === 'fr'
              ? 'Les Fondements Crystal Spa'
              : language === 'es'
              ? 'Los Fundamentos Crystal Spa'
              : 'The Crystal Spa Pillars'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white [data-theme=light]:text-[#171717] leading-tight font-medium experience-title">
            {language === 'fr'
              ? "L'Art de l'Expérience Privative"
              : language === 'es'
              ? 'El Arte de la Experiencia Privada'
              : 'The Art of Private Experience'}
          </h2>
          <p className="text-sm sm:text-base text-white [data-theme=light]:text-[#4A453E] font-light leading-relaxed max-w-[620px] experience-description">
            {language === 'fr'
              ? 'Chaque détail architectural, tactile et sensoriel a été calibré pour effacer la notion du temps et vous offrir une déconnexion intime sans pareil.'
              : language === 'es'
              ? 'Cada detalle arquitectónico, táctil y sensorial ha sido calibrado para borrar la noción del tiempo y ofrecer un santuario íntimo inigualable.'
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
                className="p-8 sm:p-9 rounded-2xl bg-[#1c1b1b]/85 backdrop-blur-xl luxury-card flex flex-col gap-6 border border-white/10 luxury-overlap-shadow group hover:border-[#f2ca50]/40 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2a]/80 flex items-center justify-center text-[#f2ca50] transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(242,202,80,0.2)] border border-[#f2ca50]/20">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-lg text-white [data-theme=light]:text-[#171717] group-hover:text-[#f2ca50] transition-colors font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F0EBD9] [data-theme=light]:text-[#5C554E] font-light leading-relaxed">
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
