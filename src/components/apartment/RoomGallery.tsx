'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight, Heart, Gem, Sparkles, Maximize2 } from 'lucide-react';
import { ROOM_IMAGES_A1, ROOM_IMAGES_A2, ROOM_IMAGES_A3, RoomImage } from '@/data/apartment';
import { useLanguage } from '@/context/LanguageContext';

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
    { id: 'jacuzzi', label: language === 'fr' ? 'Jacuzzi Balnéo' : 'Balneo Jacuzzi' },
    { id: 'chambre', label: language === 'fr' ? 'Chambre Master' : 'Master Bedroom' },
    { id: 'salon', label: language === 'fr' ? 'Salon Cinéma' : 'Cinema Salon' },
    { id: 'cuisine', label: language === 'fr' ? 'Cuisine Équipée' : 'Full Kitchen' },
    { id: 'salle-de-bain', label: language === 'fr' ? 'Salle de Bain' : 'Bathroom' },
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

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex(
        (activeImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

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
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
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

              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-[#f2ca50]" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && filteredImages[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-[#1c1b1b] border border-white/10 text-white hover:text-[#f2ca50] transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#1c1b1b]/80 border border-white/10 text-white hover:text-[#f2ca50] transition-colors cursor-pointer"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#1c1b1b]/80 border border-white/10 text-white hover:text-[#f2ca50] transition-colors cursor-pointer"
              aria-label="Suivant"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Modal Image & Caption */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={filteredImages[activeImageIndex].src}
                  alt={filteredImages[activeImageIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="mt-4 text-center max-w-xl">
                <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-widest">
                  {filteredImages[activeImageIndex].categoryLabel} • {activeImageIndex + 1} / {filteredImages.length}
                </span>
                <h3 className="font-serif text-xl text-[#e5e2e1] mt-1">
                  {filteredImages[activeImageIndex].title}
                </h3>
                <p className="text-xs text-[#d0c5af] font-light mt-1">
                  {filteredImages[activeImageIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
