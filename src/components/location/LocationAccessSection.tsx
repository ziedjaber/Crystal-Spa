'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  MapPin,
  Car,
  Key,
  Train,
  ArrowRight,
  ExternalLink,
  Navigation,
  CheckCircle2,
  Home,
  Maximize2,
  X,
  Plus,
  Minus,
  Flower2,
  Church,
  ShoppingBag,
} from 'lucide-react';
import { ApartmentItem } from '@/data/apartment';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationAccessSectionProps {
  currentApartment?: ApartmentItem;
}

export default function LocationAccessSection({
  currentApartment,
}: LocationAccessSectionProps) {
  const { language } = useLanguage();
  const [bboxDelta, setBboxDelta] = useState<number>(0.005);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Use per-apartment coordinates when available, fallback to La Vie est Belle
  const lat = currentApartment?.lat ?? 49.426421;
  const lng = currentApartment?.lng ?? 1.0662014;
  const locationTitle = 'Le Petit-Quevilly, Normandie, France';
  const aptTitle = currentApartment ? currentApartment.title : 'La Vie est Belle | Spa Privatif';

  const getEmbedUrl = (delta: number) =>
    `https://maps.google.com/maps?q=${lat},${lng}&hl=fr&z=16&output=embed`;
  const googleMapsEmbedUrl = getEmbedUrl(bboxDelta);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const handleZoomIn = () => {
    setBboxDelta((prev) => Math.max(prev / 1.5, 0.001));
  };

  const handleZoomOut = () => {
    setBboxDelta((prev) => Math.min(prev * 1.5, 0.05));
  };

  return (
    <section
      className="relative w-full py-16 sm:py-24 px-3.5 sm:px-6 md:px-12 lg:px-24 bg-[#131313] border-t border-white/5 overflow-hidden"
      id="localisation-section"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/30 w-fit">
              <MapPin className="w-4 h-4 text-[#f2ca50]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2ca50]">
                {locationTitle}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#e5e2e1]">
              {aptTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#d0c5af] font-light leading-relaxed">
              {language === 'fr'
                ? 'Ce logement est situé à Le Petit-Quevilly, Normandie, France. Emplacement privilégié dans un quartier résidentiel paisible, à seulement 5 minutes du centre historique de Rouen et des transports en commun. Stationnement gratuit très facile.'
                : 'This apartment is located in Le Petit-Quevilly, Normandy, France. Prime location in a quiet residential district, just 5 minutes from historic downtown Rouen and public transit. Free and easy parking.'}
            </p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider luxury-shimmer-btn shadow-xl shadow-[#d4af37]/20 transition-all cursor-pointer w-fit shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>{language === 'fr' ? 'Itinéraire GPS Google Maps' : 'Open in Google Maps'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 2-Column Showcase: Interactive Map Frame + Access Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Airbnb-Style Interactive Map Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-[#1c1b1b] border border-white/10 shadow-2xl relative min-h-[420px] lg:min-h-[500px] flex flex-col group">
            
            {/* Top Airbnb Map Bar (Title) */}
            <div className="absolute top-4 left-4 z-20 bg-[#131313]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg pointer-events-none">
              <span className="text-xs font-semibold text-white">
                {locationTitle}
              </span>
            </div>

            {/* Top Right Airbnb Map Controls (Expand, Zoom +, Zoom -) */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 shadow-lg">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-9 h-9 rounded-xl bg-[#131313]/90 hover:bg-[#201f1f] text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-md"
                title={language === 'fr' ? 'Agrandir la carte' : 'Expand map'}
                aria-label="Agrandir la carte"
              >
                <Maximize2 className="w-4 h-4 text-[#f2ca50]" />
              </button>
              <button
                onClick={handleZoomIn}
                className="w-9 h-9 rounded-t-xl bg-[#131313]/90 hover:bg-[#201f1f] text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-md"
                title="Zoom +"
                aria-label="Zoom in"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-9 h-9 rounded-b-xl bg-[#131313]/90 hover:bg-[#201f1f] text-white border-x border-b border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-md -mt-1.5"
                title="Zoom -"
                aria-label="Zoom out"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Custom Gold/Black Luxury Marker Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+12px)] pointer-events-none z-20 flex flex-col items-center drop-shadow-[0_8px_24px_rgba(210,175,55,0.45)]">
              <div className="w-11 h-11 rounded-full bg-[#f2ca50] border-[2.5px] border-[#3c2f00] flex items-center justify-center shadow-2xl ring-4 ring-[#f2ca50]/25">
                <Home className="w-5 h-5 fill-[#3c2f00] text-[#3c2f00]" />
              </div>
              {/* Tail */}
              <div className="w-3 h-3 bg-[#f2ca50] rotate-45 -mt-1.5 border-r-[2px] border-b-[2px] border-[#3c2f00]" />
            </div>

            <iframe
              key={googleMapsEmbedUrl}
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px', flexGrow: 1 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localisation Google Maps - ${aptTitle}`}
              className="w-full h-full transition-opacity duration-300"
            />
            {/* Transparent overlay — prevents map panning so the pin stays fixed on the apartment */}
            <div className="absolute inset-0 z-10 cursor-default" aria-hidden="true" />

            {/* Map Bottom Information Ribbon */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-[#131313]/95 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-between gap-3 shadow-xl z-20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#f2ca50]/20 text-[#f2ca50] border border-[#f2ca50]/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white font-semibold">
                    {aptTitle} • Le Petit-Quevilly (76140)
                  </span>
                  <span className="text-[11px] text-[#d0c5af] font-light">
                    Normandie, France • À 5 min du centre historique de Rouen
                  </span>
                </div>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2a2a2a] hover:bg-[#383838] text-[#f2ca50] text-xs font-semibold border border-[#f2ca50]/30 transition-colors shrink-0"
              >
                <span>{language === 'fr' ? 'Itinéraire' : 'Directions'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Logistics, Parking & Proximity Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#1c1b1b] border border-white/10 shadow-2xl">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">
                  {language === 'fr' ? 'Accès & Commodités' : 'Access & Convenience'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold uppercase tracking-wider border border-[#22c55e]/30">
                  100% 5★ Emplacement
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* 1. Parking */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131313]/80 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/15 flex items-center justify-center text-[#f2ca50] shrink-0 border border-[#f2ca50]/25">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {language === 'fr' ? 'Stationnement Gratuit Garanti' : 'Guaranteed Free Parking'}
                    </span>
                    <span className="text-xs text-[#d0c5af] font-light leading-relaxed">
                      {language === 'fr'
                        ? 'Nombreuses places gratuites disponibles sur place et dans la rue devant le logement sans aucun parcmètre.'
                        : 'Abundant free parking spaces available on-site and in the street directly outside.'}
                    </span>
                  </div>
                </div>

                {/* 2. Self Check-in */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131313]/80 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/15 flex items-center justify-center text-[#f2ca50] shrink-0 border border-[#f2ca50]/25">
                    <Key className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {language === 'fr' ? 'Arrivée Autonome Sécurisée 24h/24' : 'Keyless Self Check-in 24/7'}
                    </span>
                    <span className="text-xs text-[#d0c5af] font-light leading-relaxed">
                      {language === 'fr'
                        ? 'Accès en totale discrétion par serrure connectée dès 17h00. Code personnel envoyé par message avant votre venue.'
                        : 'Complete privacy via digital keypad lock from 5:00 PM. Access code texted prior to arrival.'}
                    </span>
                  </div>
                </div>

                {/* 3. Transports & Proximité Rouen */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131313]/80 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/15 flex items-center justify-center text-[#f2ca50] shrink-0 border border-[#f2ca50]/25">
                    <Train className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {language === 'fr' ? 'Transports & Proximité Immédiate' : 'Transit & Proximity'}
                    </span>
                    <span className="text-xs text-[#d0c5af] font-light leading-relaxed">
                      {language === 'fr'
                        ? 'À 5 min à pied du tramway (accès direct hyper-centre & Cathédrale de Rouen), 800 m du Jardin des Plantes et commerces à proximité.'
                        : '5 min walk to tramway (direct link to historic Rouen & Cathedral), 800m to Botanical Gardens and local shops.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Surrounding Hotspots Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-[#201f1f] text-[#c9c6bf] text-[11px] font-medium border border-white/5 inline-flex items-center gap-1.5">
                  <Flower2 className="w-3 h-3 text-[#f2ca50] shrink-0" />
                  Jardin des Plantes (800m)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#201f1f] text-[#c9c6bf] text-[11px] font-medium border border-white/5 inline-flex items-center gap-1.5">
                  <Church className="w-3 h-3 text-[#f2ca50] shrink-0" />
                  {language === 'fr' ? 'Cathédrale de Rouen (5 min)' : 'Rouen Cathedral (5 min)'}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#201f1f] text-[#c9c6bf] text-[11px] font-medium border border-white/5 inline-flex items-center gap-1.5">
                  <ShoppingBag className="w-3 h-3 text-[#f2ca50] shrink-0" />
                  Grand Frais &amp; Restos (200m)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#201f1f] text-[#c9c6bf] text-[11px] font-medium border border-white/5 inline-flex items-center gap-1.5">
                  <Train className="w-3 h-3 text-[#f2ca50] shrink-0" />
                  {language === 'fr' ? 'Gare SNCF Rouen (10 min)' : 'Rouen Train Station (10 min)'}
                </span>
              </div>
            </div>

            {/* Reassurance Guarantee */}
            <div className="p-4 rounded-2xl bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#f2ca50] shrink-0" />
              <p className="text-[11px] text-[#e5e2e1] font-light leading-snug">
                {language === 'fr'
                  ? 'L’adresse exacte et les instructions détaillées d’accès vous sont transmises par SMS et e-mail dès validation de votre réservation.'
                  : 'Exact address and comprehensive arrival instructions sent via SMS and email immediately upon booking confirmation.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Map Modal (Triggered by ⤢ Button) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl h-[88vh] sm:h-[85vh] bg-[#1c1b1b] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-3 sm:p-5 bg-[#131313] border-b border-white/10 flex items-center justify-between gap-2 z-10">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#131313] border border-white flex items-center justify-center text-white shrink-0">
                    <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-sm sm:text-lg text-white font-semibold truncate max-w-[160px] sm:max-w-none">
                      {locationTitle}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#f2ca50] truncate max-w-[160px] sm:max-w-none">
                      {aptTitle} • 76140 Le Petit-Quevilly
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#d4af37] transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Google Maps</span>
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl bg-[#201f1f] text-white hover:text-[#f2ca50] transition-colors border border-white/10 cursor-pointer"
                    aria-label="Fermer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Large Map Container */}
              <div className="relative flex-grow w-full h-full">
                {/* Custom Gold/Black Luxury Marker Pin (Modal) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+14px)] pointer-events-none z-20 flex flex-col items-center drop-shadow-[0_8px_28px_rgba(210,175,55,0.5)]">
                  <div className="w-12 h-12 rounded-full bg-[#f2ca50] border-[3px] border-[#3c2f00] flex items-center justify-center shadow-2xl ring-4 ring-[#f2ca50]/30">
                    <Home className="w-6 h-6 fill-[#3c2f00] text-[#3c2f00]" />
                  </div>
                  {/* Tail */}
                  <div className="w-3.5 h-3.5 bg-[#f2ca50] rotate-45 -mt-2 border-r-[2px] border-b-[2px] border-[#3c2f00]" />
                </div>

                <iframe
                  src={`https://maps.google.com/maps?q=${lat},${lng}&hl=fr&z=17&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte Plein Écran Crystal Spa"
                  className="w-full h-full"
                />
                {/* Transparent overlay — prevents map panning so the pin stays fixed on the apartment */}
                <div className="absolute inset-0 z-10 cursor-default" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
