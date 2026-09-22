'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Sparkles, Thermometer, ShieldCheck, Waves } from 'lucide-react';
import { FACILITIES_DATA } from '@/data/services';

export default function FacilityGallery() {
  return (
    <section className="py-20 bg-[#04070b] relative overflow-hidden" id="sanctuary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 border border-teal-800/60 text-xs font-semibold uppercase tracking-widest text-teal-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" /> THE CRYSTAL SANCTUARY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
              State-of-the-Art <span className="gold-gradient-text">Wellness Facilities</span>
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md font-light leading-relaxed">
            All treatment bookings grant 60 minutes of complimentary access to our quiet thermal waters, salt sauna, and hydration lounge.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="rounded-3xl overflow-hidden glass-panel border-teal-500/20 p-2 sm:p-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full rounded-2xl overflow-hidden min-h-[450px] sm:min-h-[550px]"
          >
            {FACILITIES_DATA.map((facility) => (
              <SwiperSlide key={facility.id}>
                <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden flex items-end p-6 sm:p-12">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover object-center brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04070b] via-[#04070b]/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {facility.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-teal-950/80 backdrop-blur-md border border-teal-700/50 text-[11px] font-medium text-teal-300 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                      {facility.temperature && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                          <Thermometer className="w-3.5 h-3.5" />
                          {facility.temperature}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs text-amber-300 font-serif tracking-widest uppercase block mb-1">
                        {facility.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-4xl font-bold text-slate-100">
                        {facility.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-200 font-light leading-relaxed max-w-xl">
                      {facility.description}
                    </p>

                    <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <ShieldCheck className="w-4 h-4" /> Ozone Purified
                      </span>
                      <span className="flex items-center gap-1 text-teal-300 font-medium">
                        <Waves className="w-4 h-4" /> Geothermal Springs
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
