'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Waves, BedDouble, MapPin, Maximize2 } from 'lucide-react';
import { FEATURED_APARTMENTS } from '@/data/apartment';

const suiteA1 = FEATURED_APARTMENTS[0];

interface ApartmentHeroProps {
  onBookNow: () => void;
}

export default function ApartmentHero({ onBookNow }: ApartmentHeroProps) {
  return (
    <section className="relative min-h-[90vh] bg-[#090909] flex flex-col justify-between overflow-hidden pt-28 pb-16 border-b border-white/5">
      <div className="absolute inset-0 z-0">
        <Image
          src="/a1/Jacuzzi.png"
          alt="Appartement A1 Private Jacuzzi"
          fill
          priority
          className="object-cover object-center brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-[#090909]/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto space-y-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 badge-luxury shadow-lg shadow-[#D4AF37]/10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
          PARIS PRIVATE RESIDENCE • SUITE SPA PRIVATIVE
        </motion.div>

        <div className="space-y-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FAFAFA] leading-[1.1]"
          >
            Appartement A1 — <span className="text-[#F5D97A]">Jacuzzi Suite</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[#B8B8B8] font-light leading-relaxed max-w-2xl"
          >
            Une expérience immersive unique au cœur du 8ème arrondissement de Paris. Bain bouillonnant chauffé à 38°C, literie master et aménagement romantique.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <button
            onClick={onBookNow}
            className="btn-gold-primary text-xs font-bold uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            RÉSERVER APPARTEMENT A1 • DÈS {suiteA1.pricePerNightEUR}€ / NUIT
          </button>

          <a
            href="#gallery"
            className="btn-gold-secondary text-xs font-bold uppercase tracking-wider"
          >
            GALERIE PHOTOS (23 PIÈCES)
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Specifications Summary */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-panel-luxury">
          <div className="space-y-1">
            <span className="text-[10px] text-[#B8B8B8] font-bold tracking-widest uppercase block">SURFACE HABITABLE</span>
            <span className="text-lg font-bold text-[#FAFAFA] flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[#D4AF37]" /> {suiteA1.surfaceM2} M²
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-[#B8B8B8] font-bold tracking-widest uppercase block">CAPACITÉ D'ACCUEIL</span>
            <span className="text-lg font-bold text-[#FAFAFA] flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#D4AF37]" /> {suiteA1.capacityGuests} PERSONNES MAX
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-[#B8B8B8] font-bold tracking-widest uppercase block">ESPACE BIEN-ÊTRE</span>
            <span className="text-lg font-bold text-[#FAFAFA] flex items-center gap-2">
              <Waves className="w-4 h-4 text-[#D4AF37]" /> JACUZZI 38°C
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-[#B8B8B8] font-bold tracking-widest uppercase block">LOCALISATION</span>
            <span className="text-lg font-bold text-[#FAFAFA] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> PARIS 8ÉME
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
