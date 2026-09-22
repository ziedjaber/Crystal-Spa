'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { APARTMENT_AMENITIES_42 } from '@/data/apartment';
import {
  CheckCircle,
  Check,
  Heart,
  ShieldCheck,
  Bath,
  Bed,
  Tv,
  Wind,
  Shield,
  Wifi,
  Utensils,
  DoorClosed,
  Sparkles,
  Key,
} from 'lucide-react';

function getAmenityIcon(iconName: string, className = "w-4 h-4") {
  switch (iconName) {
    case 'shower':
      return <Bath className={className} />;
    case 'bed':
      return <Bed className={className} />;
    case 'tv':
      return <Tv className={className} />;
    case 'ac_unit':
      return <Wind className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'wifi':
      return <Wifi className={className} />;
    case 'restaurant':
      return <Utensils className={className} />;
    case 'door_front':
      return <DoorClosed className={className} />;
    case 'hot_tub':
      return <Sparkles className={className} />;
    case 'key':
      return <Key className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export default function ApartmentEquipments() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const totalCount = APARTMENT_AMENITIES_42.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  const displayedCategories =
    selectedCategory === 'all'
      ? APARTMENT_AMENITIES_42
      : APARTMENT_AMENITIES_42.filter((c) => c.category === selectedCategory);

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-24 py-24 overflow-hidden" id="equipements-section">
      {/* 4K Background Image with Scrim Overlay */}
      <div
        className="absolute inset-0 bg-4k-hero"
        style={{ backgroundImage: "url('/a1/Chambre.png')" }}
      />
      <div className="absolute inset-0 scrim-4k-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/30 w-fit backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
              <span className="text-[11px] font-bold tracking-wider text-[#f2ca50] uppercase">
                {language === 'fr' ? 'Prestations & Confort Absolu' : 'Uncompromising Comfort & Amenities'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#e5e2e1] drop-shadow-md">
              {t('equip.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#d0c5af] font-light">
              {t('equip.desc')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#d0c5af] bg-[#1c1b1b]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
            <CheckCircle className="w-4 h-4 text-[#f2ca50]" />
            <span>
              {language === 'fr'
                ? `42 équipements vérifiés & disponibles 24h/24`
                : `42 verified amenities available 24/7`}
            </span>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_20px_rgba(242,202,80,0.4)] font-bold'
                : 'bg-[#1c1b1b]/80 backdrop-blur-md text-[#c9c6bf] hover:text-[#e5e2e1] border border-white/10'
            }`}
          >
            {language === 'fr' ? `Tous les Équipements (${totalCount})` : `All Amenities (${totalCount})`}
          </button>
          {APARTMENT_AMENITIES_42.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.category
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_20px_rgba(242,202,80,0.4)] font-bold'
                  : 'bg-[#1c1b1b]/80 backdrop-blur-md text-[#c9c6bf] hover:text-[#e5e2e1] border border-white/10'
              }`}
            >
              {getAmenityIcon(cat.icon, 'w-4 h-4')}
              <span>{language === 'fr' ? cat.category : cat.categoryEn}</span>
              <span className="opacity-60 text-[10px]">({cat.items.length})</span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-2xl bg-[#1c1b1b]/85 backdrop-blur-xl border border-white/10 hover:border-[#f2ca50]/40 transition-all duration-300 flex flex-col gap-4 shadow-2xl group"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#2a2a2a]/80 flex items-center justify-center text-[#f2ca50] group-hover:scale-110 transition-transform shadow-md">
                  {getAmenityIcon(cat.icon, 'w-5 h-5')}
                </div>
                <div>
                  <h3 className="text-base font-serif text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors">
                    {language === 'fr' ? cat.category : cat.categoryEn}
                  </h3>
                  <span className="text-[10px] text-[#99907c] uppercase tracking-wider font-semibold">
                    {cat.items.length} {language === 'fr' ? 'équipements' : 'amenities'}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-medium text-[#e5e2e1]">
                        {language === 'fr' ? item.title : item.titleEn}
                      </span>
                      {(item.description || item.descriptionEn) && (
                        <span className="text-[11px] text-[#99907c] font-light leading-snug">
                          {language === 'fr' ? item.description : item.descriptionEn}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Special Airbnb Highlight Callout */}
        <div className="rounded-2xl bg-[#1c1b1b]/90 backdrop-blur-xl p-6 sm:p-8 border border-[#f2ca50]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#f2ca50]/15 border border-[#f2ca50]/30 flex items-center justify-center shrink-0 shadow-lg">
              <Heart className="w-8 h-8 text-[#f2ca50]" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#f2ca50] text-[#3c2f00] font-bold text-[10px] uppercase tracking-wider">
                  Airbnb Top 10%
                </span>
                <span className="text-xs text-[#d0c5af]">• Coup de cœur voyageurs 4.97★</span>
              </div>
              <h4 className="font-serif text-lg sm:text-xl text-[#e5e2e1]">
                {language === 'fr'
                  ? 'Fait partie des 10 % des logements les plus appréciés'
                  : 'Ranked in the top 10% of highest rated stays'}
              </h4>
              <p className="text-xs sm:text-sm text-[#d0c5af] font-light max-w-xl">
                {language === 'fr'
                  ? 'D’après les évaluations, les avis et la fiabilité des 37 couples et voyageurs accueillis.'
                  : 'Based on high ratings, verified reviews and reliable 5-star service for all 37 guest couples.'}
              </p>
            </div>
          </div>

          <a
            href="#reservation-bar"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#cba328] hover:from-[#fada68] hover:to-[#dfb537] text-[#3c2f00] font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_0_25px_rgba(242,202,80,0.3)] hover:scale-105 shrink-0 cursor-pointer"
          >
            {language === 'fr' ? 'Réserver ce Séjour' : 'Book this Stay'}
          </a>
        </div>
      </div>
    </section>
  );
}
