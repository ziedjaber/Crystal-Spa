'use client';

import React, { useState } from 'react';
import { ArrowRight, Heart, Gem, Sparkles } from 'lucide-react';
import { ROOM_IMAGES_A1, ROOM_IMAGES_A2, ROOM_IMAGES_A3, RoomImage } from '@/data/apartment';
import { useLanguage } from '@/context/LanguageContext';
import AirbnbGalleryModal from '@/components/gallery/AirbnbGalleryModal';
import ProgressiveImage from '@/components/ui/ProgressiveImage';

interface RoomGalleryProps {
  apartmentId?: string;
}

function resolveApartmentId(id?: string): 'a1' | 'a2' | 'a3' {
  if (!id) return 'a2';
  const norm = id.toLowerCase();
  if (norm === 'a1' || norm === 'you-and-me' || norm === 'diamant-noir') return 'a1';
  if (norm === 'a3' || norm === 'le-reve-luxe' || norm === 'suite-celeste') return 'a3';
  return 'a2';
}

export default function RoomGallery({ apartmentId }: RoomGalleryProps) {
  const { language, t } = useLanguage();
  const [selectedApartment, setSelectedApartment] = useState<'a2' | 'a1' | 'a3'>(() =>
    resolveApartmentId(apartmentId)
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  React.useEffect(() => {
    if (apartmentId) {
      setSelectedApartment(resolveApartmentId(apartmentId));
      setActiveCategory('all');
    }
  }, [apartmentId]);

  const imagesList: RoomImage[] =
    selectedApartment === 'a2'
      ? ROOM_IMAGES_A2
      : selectedApartment === 'a3'
      ? ROOM_IMAGES_A3
      : ROOM_IMAGES_A1;

  // Dynamically compute available categories for the active apartment
  const categoriesA2 = [
    { id: 'all', label: language === 'fr' ? 'Toutes les Perspectives' : 'All Perspectives' },
    { id: 'jacuzzi', label: language === 'fr' ? 'Jacuzzi Spa 24h/24' : 'Hydro Spa 24/7' },
    { id: 'chambre', label: language === 'fr' ? 'Chambre Queen Size' : 'Queen Bedroom' },
    { id: 'theme', label: language === 'fr' ? 'Pièce à Thème' : 'Themed Suite' },
    { id: 'salon', label: language === 'fr' ? 'Salon Cosy' : 'Cosy Living Room' },
    { id: 'cuisine', label: language === 'fr' ? 'Kitchenette & Bar' : 'Kitchenette' },
    { id: 'salle-de-bain', label: language === 'fr' ? 'Salle de Bain & LED' : 'LED Bathroom' },
    { id: 'cour', label: language === 'fr' ? 'Cour & Accès Privé' : 'Private Courtyard' },
  ];

  const categoriesA3 = [
    { id: 'all', label: language === 'fr' ? 'Toutes les Perspectives' : 'All Perspectives' },
    { id: 'jacuzzi', label: language === 'fr' ? 'Spa Céleste & Étoiles' : 'Starry Hydro Spa' },
    { id: 'chambre', label: language === 'fr' ? 'Chambre Master King' : 'Master King Bedroom' },
    { id: 'salon', label: language === 'fr' ? 'Salon Panoramique' : 'Panoramic Lounge' },
    { id: 'cuisine', label: language === 'fr' ? 'Kitchenette Bar' : 'Kitchenette' },
    { id: 'salle-de-bain', label: language === 'fr' ? 'Salle de Bain Luxe' : 'Luxury Bathroom' },
    { id: 'cour', label: language === 'fr' ? 'Cour Extérieure' : 'Outdoor Courtyard' },
  ];

  const categoriesA1 = [
    { id: 'all', label: language === 'fr' ? 'Toutes les Perspectives' : 'All Perspectives' },
    { id: 'jacuzzi', label: language === 'fr' ? 'Jacuzzi Spa' : 'Spa Jacuzzi' },
    { id: 'chambre', label: language === 'fr' ? 'Chambre Master' : 'Master Bedroom' },
    { id: 'salon', label: language === 'fr' ? 'Salon Cinéma' : 'Cinema Salon' },
    { id: 'cuisine', label: language === 'fr' ? 'Cuisine Équipée' : 'Full Kitchen' },
    { id: 'salle-de-bain', label: language === 'fr' ? 'Salle de Bain' : 'Bathroom' },
    { id: 'cour', label: language === 'fr' ? 'Cour & Accès Privé' : 'Private Courtyard' },
  ];

  const activeCategories =
    selectedApartment === 'a2'
      ? categoriesA2
      : selectedApartment === 'a3'
      ? categoriesA3
      : categoriesA1;

  const filteredImages = imagesList.filter((img) => {
    return activeCategory === 'all' || img.category === activeCategory;
  });

  return (
    <section className="w-full bg-[#0e0e0e] py-20 px-6 md:px-12 lg:px-24" id="galerie-section">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#f2ca50]">
              {t('gallery.badge')}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#e5e2e1]">
              {t('gallery.title')}
            </h2>
          </div>

          <a
            href="#reservation-bar"
            className="text-[11px] font-bold tracking-wider text-[#f2ca50] hover:text-white uppercase flex items-center gap-1.5 transition-colors group cursor-pointer"
          >
            <span>{language === 'fr' ? 'Vérifier les disponibilités' : 'Check availability'}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Apartment Switcher Bar for all 3 Apartments */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-xl bg-[#1c1b1b] border border-white/5">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setSelectedApartment('a2');
                setActiveCategory('all');
              }}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                selectedApartment === 'a2'
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_15px_rgba(242,202,80,0.3)]'
                  : 'text-[#c9c6bf] hover:text-[#e5e2e1]'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Apt 2: La Vie est Belle (30 photos)</span>
            </button>

            <button
              onClick={() => {
                setSelectedApartment('a1');
                setActiveCategory('all');
              }}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                selectedApartment === 'a1'
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_15px_rgba(242,202,80,0.3)]'
                  : 'text-[#c9c6bf] hover:text-[#e5e2e1]'
              }`}
            >
              <Gem className="w-4 h-4" />
              <span>Apt 1: Y0U AND ME (24 photos)</span>
            </button>

            <button
              onClick={() => {
                setSelectedApartment('a3');
                setActiveCategory('all');
              }}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                selectedApartment === 'a3'
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_15px_rgba(242,202,80,0.3)]'
                  : 'text-[#c9c6bf] hover:text-[#e5e2e1]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Apt 3: Le Rêve Luxe (31 photos)</span>
            </button>
          </div>

          <span className="text-xs text-[#d0c5af] font-light hidden xl:inline px-3">
            {selectedApartment === 'a2'
              ? 'Le Petit-Quevilly, Rouen • 4.97★ (37 avis Airbnb)'
              : selectedApartment === 'a3'
              ? 'Le Petit-Quevilly, Rouen • 4.93★ (27 avis Airbnb)'
              : 'Le Petit-Quevilly, Rouen • 5.0★ (8 avis Airbnb)'}
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {activeCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-xs tracking-wider transition-all cursor-pointer ${
                activeCategory === category.id
                  ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-[0_0_12px_rgba(242,202,80,0.25)]'
                  : 'bg-[#1c1b1b] text-[#c9c6bf] hover:text-[#e5e2e1] border border-white/5 font-medium'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setActiveImageIndex(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#1c1b1b] cursor-pointer border border-white/5 hover:border-[#f2ca50]/40 transition-all duration-500 hover:-translate-y-1 shadow-lg"
            >
              <ProgressiveImage
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                rounded="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f2ca50] mb-0.5">
                  {img.categoryLabel}
                </span>
                <p className="text-sm font-serif text-[#e5e2e1] line-clamp-1 font-medium">
                  {img.title}
                </p>
                <p className="text-[11px] text-[#c9c6bf] line-clamp-1 font-light">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Trigger */}
        <div className="text-center pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#d0c5af] font-light">
            {language === 'fr'
              ? 'Toutes les photos sont certifiées 100% fidèles à l’appartement réel.'
              : 'All photos are 100% genuine and verified.'}
          </p>
          <a
            href="#reservation-bar"
            className="px-6 py-2.5 rounded-lg bg-[#2a2a2a] hover:bg-[#353534] text-[#f2ca50] text-xs font-bold uppercase tracking-wider transition-colors border border-[#f2ca50]/20"
          >
            {language === 'fr' ? 'Réserver cette ambiance' : 'Book this atmosphere'}
          </a>
        </div>

      </div>

      {/* Airbnb-Grade Fullscreen Interactive Gallery Modal */}
      <AirbnbGalleryModal
        images={filteredImages}
        initialIndex={activeImageIndex ?? 0}
        isOpen={activeImageIndex !== null}
        onClose={() => setActiveImageIndex(null)}
        apartmentTitle={
          selectedApartment === 'a2'
            ? 'Apt 2: La Vie est Belle'
            : selectedApartment === 'a3'
            ? 'Apt 3: Le Rêve Luxe'
            : 'Apt 1: YOU AND ME'
        }
      />
    </section>
  );
}
