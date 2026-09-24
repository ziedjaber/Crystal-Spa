'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Sparkles,
  Info,
} from 'lucide-react';
import ProgressiveImage from '@/components/ui/ProgressiveImage';
import { RoomImage } from '@/data/apartment';

interface AirbnbGalleryModalProps {
  images: RoomImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  apartmentTitle?: string;
}

export default function AirbnbGalleryModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  apartmentTitle,
}: AirbnbGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaption, setShowCaption] = useState(true);

  // Swipe handling
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);

  // Thumbnails bar ref
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  // Sync index when initialIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [isOpen, initialIndex]);

  // Reset zoom & pan on image change
  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    resetZoom();
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, resetZoom]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    resetZoom();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, resetZoom]);

  const handleSelectIndex = (idx: number) => {
    if (idx === currentIndex) return;
    resetZoom();
    setCurrentIndex(idx);
  };

  // Toggle Zoom
  const toggleZoom = () => {
    if (isZoomed) {
      resetZoom();
    } else {
      setIsZoomed(true);
      setZoomLevel(2.2);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  // Toggle Native Fullscreen
  const toggleNativeFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation (Airbnb style)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'Escape':
          e.preventDefault();
          if (isZoomed) {
            resetZoom();
          } else {
            onClose();
          }
          break;
        case '+':
        case '=':
          e.preventDefault();
          setIsZoomed(true);
          setZoomLevel((prev) => Math.min(prev + 0.5, 3));
          break;
        case '-':
          e.preventDefault();
          setZoomLevel((prev) => {
            const next = Math.max(prev - 0.5, 1);
            if (next === 1) setIsZoomed(false);
            return next;
          });
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          toggleZoom();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleNativeFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, isZoomed, resetZoom, onClose]);

  // Touch Swipe for mobile (When not zoomed)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setTouchDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isZoomed) return;
    const deltaX = e.touches[0].clientX - touchStart.x;
    setTouchDelta(deltaX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || isZoomed) return;
    if (touchDelta > 55) {
      handlePrev();
    } else if (touchDelta < -55) {
      handleNext();
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  // Pan while zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        ref={modalContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-[#070707]/98 backdrop-blur-2xl flex flex-col justify-between select-none overflow-hidden"
      >
        {/* ============================================================== */}
        {/* 1. TOP AIRBNB-STYLE NAVIGATION & ACTIONS BAR */}
        {/* ============================================================== */}
        <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
          {/* Left: Counter & Room Category */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#d0c5af] bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <span className="text-[#f2ca50] font-bold">{currentIndex + 1}</span> / {total}
            </span>

            {currentImage.categoryLabel && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#f2ca50] bg-[#f2ca50]/10 px-3 py-1 rounded-full border border-[#f2ca50]/20">
                <Sparkles className="w-3 h-3" />
                <span>{currentImage.categoryLabel}</span>
              </span>
            )}

            {apartmentTitle && (
              <span className="text-xs text-[#c9c6bf] font-serif hidden md:inline truncate max-w-xs">
                {apartmentTitle}
              </span>
            )}
          </div>

          {/* Right: Controls (Zoom, Fullscreen, Caption Toggle, Close) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Zoom Toggle */}
            <button
              onClick={toggleZoom}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
                isZoomed
                  ? 'bg-[#f2ca50] text-[#3c2f00] border-[#f2ca50] shadow-[0_0_12px_rgba(242,202,80,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
              title={isZoomed ? 'Dézoomer (1x)' : 'Zoomer (2.2x)'}
              aria-label="Zoomer ou dézoomer l'image"
            >
              {isZoomed ? (
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Native Fullscreen */}
            <button
              onClick={toggleNativeFullscreen}
              className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer hidden sm:block"
              title="Plein écran"
              aria-label="Activer ou désactiver le plein écran"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Info / Caption Toggle */}
            <button
              onClick={() => setShowCaption((prev) => !prev)}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer hidden sm:block ${
                showCaption
                  ? 'bg-white/15 text-[#f2ca50] border-[#f2ca50]/30'
                  : 'bg-white/5 text-white/60 border-white/10'
              }`}
              title="Afficher/masquer les détails"
              aria-label="Basculer la légende"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#f2ca50] text-white hover:text-[#3c2f00] border border-white/10 transition-all cursor-pointer ml-1 sm:ml-2 shadow-lg"
              title="Fermer (Échap)"
              aria-label="Fermer la galerie"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        {/* ============================================================== */}
        {/* 2. MAIN STAGE WITH NAVIGATION & ZOOM & SWIPE */}
        {/* ============================================================== */}
        <main
          className="relative flex-1 flex items-center justify-center overflow-hidden px-2 sm:px-12 my-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Navigation Chevron Left */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-30 p-2.5 sm:p-4 rounded-full bg-black/60 hover:bg-[#f2ca50] text-white hover:text-[#3c2f00] backdrop-blur-xl border border-white/15 transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Active Image Box */}
          <div
            className={`relative max-w-6xl w-full h-[52vh] sm:h-[68vh] flex items-center justify-center transition-transform ${
              isZoomed
                ? isDragging
                  ? 'cursor-grabbing'
                  : 'cursor-grab'
                : 'cursor-zoom-in'
            }`}
            onClick={() => {
              if (!isZoomed) toggleZoom();
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: isZoomed ? zoomLevel : 1,
                  x: isZoomed ? panOffset.x : 0,
                  y: isZoomed ? panOffset.y : 0,
                }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <ProgressiveImage
                  src={currentImage.src}
                  alt={currentImage.title || 'Photo Crystal Spa'}
                  fill
                  priority
                  containerClassName="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Chevron Right */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-30 p-2.5 sm:p-4 rounded-full bg-black/60 hover:bg-[#f2ca50] text-white hover:text-[#3c2f00] backdrop-blur-xl border border-white/15 transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Floating Caption / Atmospheric Details */}
          <AnimatePresence>
            {showCaption && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 max-w-xl w-[90%] text-center pointer-events-none z-20"
              >
                <div className="bg-[#121212]/85 backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-2xl border border-white/10 shadow-2xl inline-block">
                  <h3 className="font-serif text-sm sm:text-base text-[#e5e2e1] font-medium leading-snug">
                    {currentImage.title}
                  </h3>
                  {currentImage.description && (
                    <p className="text-[11px] sm:text-xs text-[#d0c5af] font-light mt-0.5 line-clamp-2">
                      {currentImage.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* ============================================================== */}
        {/* 3. BOTTOM AIRBNB-STYLE THUMBNAIL STRIP (MINIATURES) */}
        {/* ============================================================== */}
        <footer className="relative z-30 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 py-3 sm:py-4 px-4 sm:px-8">
          <div
            ref={thumbnailsContainerRef}
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-1 max-w-6xl mx-auto"
          >
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={img.id || idx}
                  ref={isActive ? activeThumbnailRef : null}
                  onClick={() => handleSelectIndex(idx)}
                  className={`relative shrink-0 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 w-14 h-10 sm:w-20 sm:h-14 border ${
                    isActive
                      ? 'ring-2 ring-[#f2ca50] border-[#f2ca50] scale-105 opacity-100 shadow-[0_0_15px_rgba(242,202,80,0.4)]'
                      : 'border-white/10 opacity-40 hover:opacity-80 hover:scale-100'
                  }`}
                  aria-label={`Afficher la photo ${idx + 1}`}
                >
                  <ProgressiveImage
                    src={img.src}
                    alt={img.title || `Miniature ${idx + 1}`}
                    fill
                    sizes="90px"
                    className="object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#f2ca50]/15 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
