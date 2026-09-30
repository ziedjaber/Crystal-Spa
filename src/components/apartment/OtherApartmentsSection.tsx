'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FEATURED_APARTMENTS, ApartmentItem } from '@/data/apartment';
import { useLanguage } from '@/context/LanguageContext';
import { Star, MapPin, CheckCircle2, ChevronRight, Sparkles, Users, Bed, Shield } from 'lucide-react';

interface OtherApartmentsSectionProps {
  currentApartmentId: string;
  onBookApartment?: (apartmentId: string) => void;
}

export default function OtherApartmentsSection({
  currentApartmentId,
  onBookApartment,
}: OtherApartmentsSectionProps) {
  const { language } = useLanguage();

  // Filter out the active apartment so only the other suites are shown
  const otherApartments = FEATURED_APARTMENTS.filter(
    (apt) => apt.id !== currentApartmentId && apt.slug !== currentApartmentId
  );

  if (otherApartments.length === 0) return null;

  return (
    <section className="w-full px-3.5 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24 bg-[#0e0e0e] border-t border-white/5" id="suites-collection">
      <div id="autres-suites" className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/30 w-fit">
              <Sparkles className="w-4 h-4 text-[#f2ca50]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2ca50]">
                {language === 'fr' ? 'Collection Crystal Spa' : 'Crystal Spa Collection'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#e5e2e1]">
              {language === 'fr' ? "Découvrez nos Autres Suites d'Exception" : 'Explore Our Other Signature Suites'}
            </h2>
            <p className="text-sm sm:text-base text-[#d0c5af] font-light leading-relaxed">
              {language === 'fr'
                ? 'Chaque logement est un sanctuaire privé totalement indépendant : spa privatif 24h/24, literie haut de gamme et atmosphère romantique sur-mesure.'
                : 'Each apartment is an independent private spa sanctuary: 24/7 private hydro spa, luxury bedding, and tailored romantic atmosphere.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#f2ca50] bg-[#1c1b1b] px-4 py-2.5 rounded-xl border border-white/10 font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping" />
            <span>
              {language === 'fr'
                ? `${otherApartments.length} Autre(s) Suite(s) Disponible(s)`
                : `${otherApartments.length} Other Suite(s) Available`}
            </span>
          </div>
        </div>

        {/* Other Apartments Cards Grid */}
        <div className={`grid grid-cols-1 ${otherApartments.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto w-full' : 'lg:grid-cols-3'} gap-8 items-stretch`}>
          {otherApartments.map((apt: ApartmentItem) => {
            const suiteAriaLabel = apt.slug === 'la-vie-est-belle'
              ? 'Suite La Vie est Belle – Spa Privatif'
              : apt.slug === 'le-reve-luxe'
              ? 'Suite Le Rêve Luxe – Suite Céleste'
              : `Suite ${apt.title}`;

            return (
              <Link
                key={apt.id}
                href={`/suites/${apt.slug}`}
                aria-label={suiteAriaLabel}
                className="group rounded-3xl bg-[#1c1b1b] overflow-hidden flex flex-col luxury-card border border-white/10 hover:border-[#f2ca50]/50 transition-all duration-500 shadow-2xl cursor-pointer"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden zoom-container">
                  <Image
                    src={apt.image}
                    alt={apt.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-black/40 pointer-events-none" />

                  {/* Badge Top Left */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#C8A24D] text-[#1c1b1b] font-bold text-[11px] uppercase tracking-wider shadow-lg">
                      {apt.badge}
                    </span>
                  </div>

                  {/* Rating Top Right */}
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#1c1b1b]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#171717] dark:text-[#f2ca50] border border-black/5 dark:border-[#f2ca50]/30 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-current text-[#C8A24D] dark:text-[#f2ca50]" />
                    <span className="text-[#171717] dark:text-white font-bold">{apt.rating}</span>
                    <span className="text-[#333333] dark:text-[#f0ebd9] font-light">({apt.reviewsCount})</span>
                  </div>

                  {/* Location Pill Bottom */}
                  <div className="absolute bottom-3 left-4 text-xs font-medium flex items-center gap-1.5 bg-white/95 text-[#171717] dark:bg-black/70 dark:text-white backdrop-blur-md px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/15 shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A24D] dark:text-[#f2ca50] shrink-0" />
                    <span className="truncate max-w-[220px] font-semibold">{apt.location}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-3">
                    
                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors font-medium">
                      {apt.title}
                    </h3>

                    {/* Key Specs */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#f0ebd9] pt-1">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>{apt.capacityGuests} {language === 'fr' ? 'pers.' : 'guests'}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>{apt.bedroomsCount} {language === 'fr' ? 'chambre' : 'bed'}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>{apt.surfaceM2} m²</span>
                      </div>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-xs text-[#f0ebd9] font-light">
                        {language === 'fr' ? 'Dès' : 'From'}
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#f2ca50]">
                        {apt.pricePerNightEUR} €
                      </span>
                      <span className="text-xs text-[#f0ebd9] font-light">
                        / {language === 'fr' ? 'nuitée tout inclus' : 'night all inclusive'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#f0ebd9] font-light line-clamp-3 leading-relaxed pt-1">
                      {language === 'fr' ? apt.description : apt.descriptionEn}
                    </p>

                    {/* Amenities Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {apt.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2.5 py-1 rounded-lg bg-[#252424] text-[#f0ebd9] text-[11px] flex items-center gap-1.5 border border-white/5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    {/* "View Suite" */}
                    <span className="flex-1 py-3 px-4 rounded-xl bg-[#2a2a2a] group-hover:bg-[#383838] text-[#e5e2e1] group-hover:text-[#f2ca50] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 text-center border border-white/10">
                      <span>{language === 'fr' ? `Voir ${apt.title}` : `View ${apt.title}`}</span>
                      <ChevronRight className="w-4 h-4 text-[#f2ca50]" />
                    </span>

                    {/* "Réserver" stops propagation so it doesn't navigate */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onBookApartment) onBookApartment(apt.id);
                      }}
                      aria-label={`Réserver la suite ${apt.title}`}
                      className="py-3 px-5 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider luxury-shimmer-btn shadow-lg shadow-[#d4af37]/20 cursor-pointer transition-all shrink-0"
                    >
                      {language === 'fr' ? 'Réserver' : 'Book'}
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
