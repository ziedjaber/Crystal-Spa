'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, BedDouble, Calendar, Sparkles, Check } from 'lucide-react';
import { FEATURED_APARTMENTS, ApartmentItem } from '@/data/apartment';

interface ApartmentGridProps {
  onReserveSuite: (apartment: ApartmentItem) => void;
}

export default function ApartmentGrid({ onReserveSuite }: ApartmentGridProps) {
  return (
    <section className="py-24 bg-[#090909] relative overflow-hidden" id="suites">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="badge-luxury">NOS SUITES PRIVATIVES</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-wide">
            Suites & Appartements <span className="text-[#F5D97A]">de Prestige</span>
          </h2>
          <p className="text-sm text-[#B8B8B8] font-light leading-relaxed">
            Chaque suite est aménagée avec jacuzzi privé, literie haute couture et équipements exclusifs pour un séjour inoubliable (300€–500€ / nuit).
          </p>
        </div>

        {/* Apartments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_APARTMENTS.map((item) => (
            <div key={item.id} className="card-luxury overflow-hidden flex flex-col justify-between group">
              
              {/* Image Header (28px rounded top) */}
              <div className="relative h-64 w-full overflow-hidden rounded-t-[24px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />

                {/* Badge (999px rounded) */}
                <div className="absolute top-4 left-4 z-10 badge-luxury">
                  {item.badge}
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-4 right-4 z-10 bg-[#090909]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#D4AF37]/40 text-xs font-bold text-[#F5D97A]">
                  {item.pricePerNightEUR}€ <span className="text-[10px] text-[#B8B8B8] font-normal">/ nuit</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B8B8B8] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.location}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#F5D97A]">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span>{item.rating}</span>
                      <span className="text-[#B8B8B8] font-normal">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#FAFAFA] group-hover:text-[#F5D97A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#B8B8B8] line-clamp-1">{item.subtitle}</p>

                  {/* Amenities List */}
                  <div className="pt-3 border-t border-white/5 space-y-1.5">
                    {item.amenities.slice(0, 3).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#B8B8B8]">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reserve Button */}
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => onReserveSuite(item)}
                    className="btn-gold-primary w-full text-xs font-bold uppercase tracking-wider"
                  >
                    <Calendar className="w-4 h-4" />
                    Réserver cette suite
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
