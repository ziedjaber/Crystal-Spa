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
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-[#131313]/40 pointer-events-none" />
        <div className="absolute inset-0 scrim-radial-gold pointer-events-none opacity-70" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* TOP / CENTER CONTENT: Breadcrumbs & Header Info */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col gap-6">
          
          {/* Top Row: Breadcrumb & View Fullscreen Button */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#d0c5af] backdrop-blur-md bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 w-fit">
              <Link
                href="/"
                className="hover:text-[#f2ca50] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>
                  {language === 'fr'
                    ? 'Domaine Crystal Spa'
                    : 'Crystal Spa Home'}
                </span>
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-[#f2ca50] font-semibold truncate max-w-[200px] sm:max-w-none">
                {apartment.title}
              </span>
            </div>

            {/* Quick Action: Open Full Lightbox */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-[#f2ca50] text-[#e5e2e1] hover:text-[#3c2f00] text-xs font-semibold backdrop-blur-md border border-white/15 hover:border-[#f2ca50] transition-all cursor-pointer shadow-lg"
              aria-label="Agrandir les photos"
            >
              <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">
                {language === 'fr' ? 'Plein écran' : 'Fullscreen'}
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 group-hover:bg-[#3c2f00]/20 text-[10px] font-mono">
                {currentIndex + 1}/{totalImages}
              </span>
            </button>
          </div>

          {/* Badges & Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] font-bold text-xs uppercase tracking-wider shadow-lg">
              {apartment.badge}
            </span>
            <div className="px-3 py-1 rounded-full bg-[#1c1b1b]/90 backdrop-blur-md text-[#f2ca50] text-xs font-semibold border border-[#f2ca50]/30 flex items-center gap-1.5 shadow-md">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-white font-bold">{apartment.rating}</span>
              <span className="text-[#d0c5af] font-light">
                ({apartment.reviewsCount}{' '}
                {language === 'fr' ? 'avis certifiés' : 'verified reviews'})
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-emerald-400 text-xs font-medium border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              <span>
                {language === 'fr' ? 'Spa Privatif 24h/24' : 'Private Spa 24/7'}
              </span>
            </div>
          </div>

          {/* Title & Location */}
          <div className="flex flex-col gap-2 max-w-4xl">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#e5e2e1] leading-tight drop-shadow-md">
              {apartment.title}
            </h1>
            <p className="text-sm sm:text-base text-[#d0c5af] font-light flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#f2ca50] shrink-0" />
              <span>
                {apartment.location} • {apartment.locationDetails}
              </span>
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm text-[#e5e2e1]">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
              <Users className="w-4 h-4 text-[#f2ca50]" />
              <span>
                {apartment.capacityGuests}{' '}
                {language === 'fr' ? 'Voyageurs' : 'Guests'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
              <Bed className="w-4 h-4 text-[#f2ca50]" />
              <span>
                {apartment.bedroomsCount}{' '}
                {language === 'fr' ? 'Chambre King/Queen' : 'Bedroom'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
              <Shield className="w-4 h-4 text-[#f2ca50]" />
              <span>
                {apartment.surfaceM2} m²{' '}
                {language === 'fr' ? 'Privatifs' : 'Private Surface'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-[#f2ca50]" />
              <span>
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
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#f2ca50] text-[#e5e2e1] hover:text-[#3c2f00] backdrop-blur-xl border border-white/20 hover:border-[#f2ca50] flex items-center justify-center transition-all duration-300 shadow-2xl group cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 z-20">
          <button
            onClick={handleNext}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#f2ca50] text-[#e5e2e1] hover:text-[#3c2f00] backdrop-blur-xl border border-white/20 hover:border-[#f2ca50] flex items-center justify-center transition-all duration-300 shadow-2xl group cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* BOTTOM SECTION: Active Image Info Pill + Interactive Thumbnails Strip + Action Bar */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col gap-5 mt-6">
          
          {/* Active Image Caption & Counter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/60 backdrop-blur-xl px-4 sm:px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/30 shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2ca50]">
                    {currentImage.categoryLabel}
                  </span>
                  <span className="text-[10px] text-[#d0c5af]/60">•</span>
                  <span className="text-xs text-white font-medium truncate">
                    {currentImage.title}
                  </span>
                </div>
                <p className="text-[11px] text-[#d0c5af] font-light truncate max-w-md sm:max-w-xl">
                  {currentImage.description}
                </p>
              </div>
            </div>

            {/* Price & Booking Call-to-action */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#f2ca50]">
                  {apartment.pricePerNightEUR} €
                </span>
                <span className="text-[11px] text-[#d0c5af] font-light">
                  / {language === 'fr' ? 'nuit' : 'night'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#galerie-section"
                  className="px-4 py-2.5 rounded-lg bg-[#1c1b1b] hover:bg-[#2a2a2a] text-[#e5e2e1] text-xs font-semibold transition-all border border-white/10 text-center cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span className="hidden sm:inline">
                    {language === 'fr' ? '30+ Photos' : '30+ Photos'}
                  </span>
                </a>
                <button
                  onClick={onOpenBookingModal}
                  className="px-6 py-2.5 rounded-lg bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider luxury-shimmer-btn shadow-lg shadow-[#d4af37]/20 cursor-pointer"
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
                        ? 'ring-2 ring-[#f2ca50] ring-offset-2 ring-offset-[#131313] scale-105 shadow-xl shadow-[#f2ca50]/20'
                        : 'opacity-65 hover:opacity-100 border border-white/10 hover:border-white/30'
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
                          ? 'bg-gradient-to-t from-black/80 via-transparent to-transparent'
                          : 'bg-black/30 group-hover:bg-transparent'
                      }`}
                    />
                    <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between text-[9px] font-medium text-white px-1">
                      <span className="truncate drop-shadow-md">
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
      {/* 2. FULLSCREEN LIGHTBOX MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-8"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between gap-3 z-20 pb-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] font-bold text-[10px] sm:text-xs shrink-0">
                  {currentImage.categoryLabel}
                </span>
                <span className="text-xs sm:text-base font-serif text-white font-medium truncate max-w-[160px] sm:max-w-md">
                  {currentImage.title}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="text-[11px] sm:text-xs text-[#d0c5af] font-mono">
                  {currentIndex + 1} / {totalImages}
                </span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#f2ca50] text-white hover:text-[#3c2f00] transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage with Navigation Arrows */}
            <div className="relative flex-grow flex items-center justify-center py-2 sm:py-4 my-auto">
              <button
                onClick={handlePrev}
                className="absolute left-1 sm:left-6 z-30 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-[#f2ca50] text-white hover:text-[#3c2f00] backdrop-blur-lg border border-white/20 transition-all cursor-pointer"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>

              <div className="relative w-full h-[52vh] sm:h-[70vh] max-w-6xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentImage.src}
                      alt={currentImage.title}
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={handleNext}
                className="absolute right-1 sm:right-6 z-30 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-[#f2ca50] text-white hover:text-[#3c2f00] backdrop-blur-lg border border-white/20 transition-all cursor-pointer"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Lightbox Footer Thumbnail Strip */}
            <div className="w-full max-w-4xl mx-auto overflow-x-auto pb-1 scrollbar-none z-20">
              <div className="flex items-center justify-center gap-1.5 sm:gap-3 min-w-max mx-auto px-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => handleSelect(idx)}
                    className={`relative rounded-md sm:rounded-lg overflow-hidden cursor-pointer transition-all w-12 h-9 sm:w-[70px] sm:h-[48px] shrink-0 ${
                      idx === currentIndex
                        ? 'ring-2 ring-[#f2ca50] scale-105 opacity-100'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
