'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart, Waves, Flame, Moon, Coffee, ShieldCheck } from 'lucide-react';
import { EXPERIENCES_LIST, ExperienceItem } from '@/data/apartment';

export default function ExperiencesSection() {
  return (
    <section className="py-24 bg-[#121212] relative overflow-hidden" id="experiences">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="badge-luxury">ÉLÉGANCE & BIEN-ÊTRE</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-wide">
            Expériences & <span className="text-[#F5D97A]">Rituals Privés</span>
          </h2>
          <p className="text-sm text-[#B8B8B8] font-light leading-relaxed">
            Profitez de moments uniques pensés pour la relaxation, la romance et le ressourcement absolu.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES_LIST.map((exp: ExperienceItem) => (
            <div
              key={exp.id}
              className="card-luxury p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center group"
            >
              {/* Rounded Image (28px radius) */}
              <div className="relative w-full sm:w-48 h-48 rounded-[24px] overflow-hidden shrink-0">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-60" />
              </div>

              {/* Text Info */}
              <div className="space-y-3 text-center sm:text-left flex-grow">
                <span className="badge-luxury inline-block">{exp.badge}</span>
                <h3 className="font-serif text-2xl font-bold text-[#FAFAFA] group-hover:text-[#F5D97A] transition-colors">
                  {exp.title}
                </h3>
                <span className="text-xs text-[#D4AF37] font-semibold block">{exp.subtitle}</span>
                <p className="text-xs text-[#B8B8B8] leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Icons Highlights Banner */}
        <div className="pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-2 p-4 rounded-[24px] bg-[#181818] border border-white/5">
            <Waves className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="text-xs font-bold text-[#FAFAFA] uppercase">Jacuzzi Privatif 38°C</h4>
            <p className="text-[11px] text-[#B8B8B8]">Bassin d’hydro-massage privé</p>
          </div>

          <div className="space-y-2 p-4 rounded-[24px] bg-[#181818] border border-white/5">
            <Heart className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="text-xs font-bold text-[#FAFAFA] uppercase">Romantic Escape</h4>
            <p className="text-[11px] text-[#B8B8B8]">Pétales & bougies parfumées</p>
          </div>

          <div className="space-y-2 p-4 rounded-[24px] bg-[#181818] border border-white/5">
            <Flame className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="text-xs font-bold text-[#FAFAFA] uppercase">Sauna Vapeur</h4>
            <p className="text-[11px] text-[#B8B8B8]">Bain de chaleur détoxifiant</p>
          </div>

          <div className="space-y-2 p-4 rounded-[24px] bg-[#181818] border border-white/5">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] mx-auto" />
            <h4 className="text-xs font-bold text-[#FAFAFA] uppercase">Confidentialité 100%</h4>
            <p className="text-[11px] text-[#B8B8B8]">Accès autonomie & keyless</p>
          </div>
        </div>

      </div>
    </section>
  );
}
