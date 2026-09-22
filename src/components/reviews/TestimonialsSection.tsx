'use client';

import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Clara Montrose',
    role: 'Séjour Romantique • Appartement A1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Septembre 2026',
    comment: 'Un séjour magique. Le jacuzzi privé à 38°C après une journée à Paris était tout simplement fantastique. La décoration et la literie sont dignes d’un hôtel 5 étoiles.',
  },
  {
    id: 2,
    name: 'Alexandre & Sophie K.',
    role: 'Anniversaire de Mariage',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Août 2026',
    comment: 'L’ambiance romantique avec le pack champagne et pétales de rose dépassait nos attentes. Tout est pensé avec un sens du détail irréprochable.',
  },
  {
    id: 3,
    name: 'Geneviève Laurent',
    role: 'Voyage d’Affaires & Relaxation',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Août 2026',
    comment: 'L’isolation acoustique est incroyable en plein Paris 8ème. Calme absolu, wifi ultra-rapide et accès autonomie sans contrainte.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#090909] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="badge-luxury">AVIS & EXPÉRIENCES</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-wide">
            Le Témoignage <span className="text-[#F5D97A]">de nos Hôtes</span>
          </h2>
          <p className="text-sm text-[#B8B8B8] font-light leading-relaxed">
            Découvrez les impressions de nos invités ayant séjourné dans nos suites spa privatives.
          </p>
        </div>

        {/* Swiper Review Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="pb-14"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="card-luxury p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#D4AF37]/30" />
                  </div>

                  <p className="text-xs text-[#B8B8B8] font-light italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/40 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#FAFAFA]">{t.name}</h4>
                    <span className="text-[11px] text-[#D4AF37] block">{t.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
