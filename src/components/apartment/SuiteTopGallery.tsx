'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Star,
  MapPin,
  Users,
  Bed,
  Shield,
  CheckCircle2,
  ArrowLeft,
  Camera,
  Sparkles,
  Eye,
} from 'lucide-react';
import { ApartmentItem, RoomImage, getTopApartmentImages } from '@/data/apartment';
import { useLanguage } from '@/context/LanguageContext';
import AirbnbGalleryModal from '@/components/gallery/AirbnbGalleryModal';

interface SuiteTopGalleryProps {
  apartment: ApartmentItem;
  onOpenBookingModal: () => void;
}

export default function SuiteTopGallery({
  apartment,
  onOpenBookingModal,
}: SuiteTopGalleryProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Get curated 6-7 images for this suite
  const images: RoomImage[] = getTopApartmentImages(apartment.id || apartment.slug);
  const totalImages = images.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, lightboxOpen]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const currentImage = images[currentIndex] || {
    id: 'default',
    title: apartment.title,
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: apartment.image,
    description: apartment.description,
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. TOP HERO APARTMENT SHOWCASE & GALLERY SLIDER */}
      {/* ============================================================ */}
      <section
        id="suite-hero"
        className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex flex-col justify-between overflow-hidden -mt-20 pt-28 pb-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dynamic Animated Background Carousel */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${currentImage.src}')` }}
            />
          </AnimatePresence>
        </div>

        {/* Cinematic Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] [data-theme=light]:from-[#FAF8F5] via-black/60 [data-theme=light]:via-black/50 to-black/40 [data-theme=light]:to-black/30 pointer-events-none transition-colors" />
        <div className="absolute inset-0 scrim-radial-gold pointer-events-none opacity-70" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* TOP / CENTER CONTENT: Breadcrumbs & Header Info */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col gap-6">
          
          {/* Top Row: Breadcrumb & View Fullscreen Button */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs backdrop-blur-md bg-black/50 px-3.5 py-1.5 rounded-full border border-white/20 w-fit shadow-md" style={{ color: 'rgba(255,255,255,0.9)' }}>
              <Link
                href="/"
                className="transition-colors flex items-center gap-1 hover:text-[#f2ca50]"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                <ArrowLeft className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.9)' }} />
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {language === 'fr'
                    ? 'Domaine Crystal Spa'
                    : 'Crystal Spa Home'}
                </span>
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
              <span className="font-semibold truncate max-w-[200px] sm:max-w-none" style={{ color: '#f2ca50' }}>
                {apartment.title}
              </span>
            </div>

            {/* Quick Action: Open Full Lightbox */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-[#C8A24D] text-white hover:text-white text-xs font-semibold backdrop-blur-md border border-white/20 hover:border-[#C8A24D] transition-all cursor-pointer shadow-lg"
              aria-label="Agrandir les photos"
              style={{ color: '#ffffff' }}
            >
              <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" style={{ color: '#ffffff' }} />
              <span className="hidden sm:inline" style={{ color: '#ffffff' }}>
                {language === 'fr' ? 'Plein écran' : 'Fullscreen'}
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-bold" style={{ color: '#ffffff' }}>
                {currentIndex + 1}/{totalImages}
              </span>
            </button>
          </div>

          {/* Badges & Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#C8A24D] font-bold text-xs uppercase tracking-wider shadow-lg" style={{ color: '#ffffff' }}>
              {apartment.badge}
            </span>
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold border border-white/20 flex items-center gap-1.5 shadow-md" style={{ color: '#f2ca50' }}>
              <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#f2ca50' }} />
              <span className="font-bold" style={{ color: '#ffffff' }}>{apartment.rating}</span>
              <span className="font-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
                ({apartment.reviewsCount}{' '}
                {language === 'fr' ? 'avis certifiés' : 'verified reviews'})
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium border border-emerald-500/30" style={{ color: '#34d399' }}>
              <Sparkles className="w-3 h-3" style={{ color: '#34d399' }} />
              <span style={{ color: '#ffffff' }}>
                {language === 'fr' ? 'Spa Privatif 24h/24' : 'Private Spa 24/7'}
              </span>
            </div>
          </div>

          {/* Title & Location */}
          <div className="flex flex-col gap-2 max-w-4xl">
            <h1
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight transition-colors"
              style={{ color: '#FFFFFF', textShadow: '0 2px 15px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.6)' }}
            >
              {apartment.title}
            </h1>
            <p
              className="text-sm sm:text-base font-medium flex items-center gap-2"
              style={{ color: '#EDE8E0', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
            >
              <MapPin className="w-4 h-4 text-[#f2ca50] shrink-0" />
              <span>
                {apartment.location} • {apartment.locationDetails}
              </span>
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 shadow-md font-medium" style={{ color: '#ffffff' }}>
              <Users className="w-4 h-4" style={{ color: '#f2ca50' }} />
              <span style={{ color: '#ffffff' }}>
                {apartment.capacityGuests}{' '}
                {language === 'fr' ? 'Voyageurs' : 'Guests'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 shadow-md font-medium" style={{ color: '#ffffff' }}>
              <Bed className="w-4 h-4" style={{ color: '#f2ca50' }} />
              <span style={{ color: '#ffffff' }}>
                {apartment.bedroomsCount}{' '}
                {language === 'fr' ? 'Chambre King/Queen' : 'Bedroom'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 shadow-md font-medium" style={{ color: '#ffffff' }}>
              <Shield className="w-4 h-4" style={{ color: '#f2ca50' }} />
              <span style={{ color: '#ffffff' }}>
                {apartment.surfaceM2} m²{' '}
                {language === 'fr' ? 'Privatifs' : 'Private Surface'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 shadow-md font-medium" style={{ color: '#ffffff' }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: '#f2ca50' }} />
              <span style={{ color: '#ffffff' }}>
                {language === 'fr'
                  ? 'Arrivée Autonome 24h/24'
                  : 'Self Check-in 24/7'}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Left & Right Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 z-20">
          <button
            onClick={handlePrev}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 hover:bg-[#C8A24D] backdrop-blur-xl border border-white/25 hover:border-[#C8A24D] flex items-center justify-center transition-all duration-300 shadow-2xl group cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Image précédente"
            style={{ color: '#ffffff' }}
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" style={{ color: '#ffffff' }} />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 z-20">
          <button
            onClick={handleNext}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 hover:bg-[#C8A24D] backdrop-blur-xl border border-white/25 hover:border-[#C8A24D] flex items-center justify-center transition-all duration-300 shadow-2xl group cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Image suivante"
            style={{ color: '#ffffff' }}
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" style={{ color: '#ffffff' }} />
          </button>
        </div>

        {/* BOTTOM SECTION: Active Image Info Pill + Interactive Thumbnails Strip + Action Bar */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col gap-5 mt-6">
          
          {/* Active Image Caption & Counter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/95 dark:bg-[#1c1b1b]/95 backdrop-blur-xl px-4 sm:px-6 py-3 rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C8A24D]/15 dark:bg-[#f2ca50]/20 text-[#B89032] dark:text-[#f2ca50] border border-[#C8A24D]/30 dark:border-[#f2ca50]/30 shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B89032] dark:text-[#f2ca50]">
                    {currentImage.categoryLabel}
                  </span>
                  <span className="text-[10px] text-[#8B8B8B] dark:text-[#d0c5af]/60">•</span>
                  <span className="text-xs text-[#171717] dark:text-white font-semibold truncate">
                    {currentImage.title}
                  </span>
                </div>
                <p className="text-[11px] text-[#666666] dark:text-[#d0c5af] font-light truncate max-w-md sm:max-w-xl">
                  {currentImage.description}
                </p>
              </div>
            </div>

            {/* Price & Booking Call-to-action */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/10 dark:border-white/10">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-[#666666] dark:text-[#d0c5af] font-light">
                  {language === 'fr' ? 'Dès' : 'From'}
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C8A24D] dark:text-[#f2ca50]">
                  {apartment.pricePerNightEUR} €
                </span>
                <span className="text-[11px] text-[#8B8B8B] dark:text-[#d0c5af] font-light">
                  / {language === 'fr' ? 'nuit' : 'night'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#galerie-section"
                  className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#252424] hover:bg-[#F5F2EC] dark:hover:bg-[#2e2d2d] text-[#171717] dark:text-[#e5e2e1] text-xs font-semibold transition-all border border-black/10 dark:border-white/10 text-center cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C8A24D] dark:text-[#f2ca50]" />
                  <span className="hidden sm:inline">
                    {language === 'fr' ? '30+ Photos' : '30+ Photos'}
                  </span>
                </a>
                <button
                  onClick={onOpenBookingModal}
                  className="px-6 py-2.5 rounded-xl bg-[#C8A24D] hover:bg-[#B89032] text-white text-xs font-bold uppercase tracking-wider luxury-shimmer-btn shadow-lg shadow-[#C8A24D]/30 cursor-pointer"
                >
                  {language === 'fr' ? 'Réserver' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>

          {/* 6-7 Interactive Thumbnail Cards Ribbon */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-max">
              {images.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={img.id || idx}
                    onClick={() => handleSelect(idx)}
                    className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'ring-2 ring-[#C8A24D] ring-offset-2 ring-offset-black scale-105 shadow-xl shadow-[#C8A24D]/30'
                        : 'opacity-75 hover:opacity-100 border border-white/20 hover:border-white/50'
                    }`}
                    style={{ width: '104px', height: '68px' }}
                    aria-label={`Afficher ${img.title}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="120px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity ${
                        isActive
                          ? 'bg-gradient-to-t from-black/85 via-transparent to-transparent'
                          : 'bg-black/35 group-hover:bg-transparent'
                      }`}
                    />
                    <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between text-[9px] font-semibold text-white px-1 pointer-events-none">
                      <span
                        className="truncate text-white font-bold tracking-wider uppercase text-[8.5px]"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.8)' }}
                      >
                        {img.categoryLabel || `Photo ${idx + 1}`}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] shrink-0 animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. AIRBNB-GRADE FULLSCREEN INTERACTIVE GALLERY MODAL */}
      {/* ============================================================ */}
      <AirbnbGalleryModal
        images={images}
        initialIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        apartmentTitle={apartment.title}
      />
    </>
  );
}
