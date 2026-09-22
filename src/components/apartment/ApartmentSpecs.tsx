'use client';

import React from 'react';
import { Waves, BedDouble, Utensils, ShowerHead, Tv, Wifi, ShieldCheck, Zap } from 'lucide-react';
import { FEATURED_APARTMENTS } from '@/data/apartment';

const suiteA1 = FEATURED_APARTMENTS[0];

export default function ApartmentSpecs() {
  return (
    <section className="py-24 bg-[#121212] relative overflow-hidden" id="specs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="badge-luxury">ÉQUIPEMENTS & FICHE TECHNIQUE</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-wide">
            Prestations & <span className="text-[#F5D97A]">Équipements</span>
          </h2>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suiteA1.amenities.map((amenity: string, idx: number) => (
            <div
              key={idx}
              className="card-luxury p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#090909] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#FAFAFA] uppercase">
                  {amenity}
                </h3>
                <p className="text-xs text-[#B8B8B8] mt-1 font-light">
                  Prestation de luxe incluse dans la réservation de la suite.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Dossier */}
        <div className="glass-panel-luxury p-8 space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#FAFAFA]">
            Dossier Technique Appartement A1
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/5">
            <div>
              <span className="text-[10px] text-[#B8B8B8] font-bold uppercase tracking-widest block">TYPE DE SUITE</span>
              <span className="text-sm font-bold text-[#FAFAFA]">Suite Spa Privative Penthouse</span>
            </div>

            <div>
              <span className="text-[10px] text-[#B8B8B8] font-bold uppercase tracking-widest block">ACCÈS SÉCURISÉ</span>
              <span className="text-sm font-bold text-[#FAFAFA]">Serrure Connectée Keyless 24/7</span>
            </div>

            <div>
              <span className="text-[10px] text-[#B8B8B8] font-bold uppercase tracking-widest block">CLIMATISATION</span>
              <span className="text-sm font-bold text-[#FAFAFA]">Reversible & Plancher Chauffant</span>
            </div>

            <div>
              <span className="text-[10px] text-[#B8B8B8] font-bold uppercase tracking-widest block">ISOLATION PHONIQUE</span>
              <span className="text-sm font-bold text-[#FAFAFA]">Double Vitrage Acoustique 42dB</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
