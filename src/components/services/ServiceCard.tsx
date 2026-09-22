'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, Star, Sparkles, CheckCircle2, Calendar, Eye } from 'lucide-react';
import { Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  onBookNow: (service: Service) => void;
  onViewDetails: (service: Service) => void;
}

export default function ServiceCard({ service, onBookNow, onViewDetails }: ServiceCardProps) {
  return (
    <div className="group glass-panel rounded-3xl overflow-hidden border border-teal-500/20 hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-900/30 flex flex-col h-full relative">
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 fill-slate-950" />
          POPULAR RITUAL
        </div>
      )}

      {/* Service Image Header */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1816] via-[#0a1816]/30 to-transparent" />

        {/* Category Pill */}
        <div className="absolute bottom-3 left-4 bg-teal-950/80 backdrop-blur-md border border-teal-700/50 text-teal-300 text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full">
          {service.category.replace('-', ' ')}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Title & Rating */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-xl font-bold text-slate-100 group-hover:text-amber-200 transition-colors line-clamp-1">
              {service.title}
            </h3>
          </div>

          {/* Rating and Duration */}
          <div className="flex items-center space-x-4 text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-1 text-amber-300 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{service.rating}</span>
              <span className="text-slate-500">({service.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-teal-300">
              <Clock className="w-3.5 h-3.5" />
              <span>{service.durationMinutes} mins</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Key Benefits */}
          <div className="space-y-1.5 pt-2 border-t border-teal-900/30">
            {service.benefits.slice(0, 2).map((b, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Buttons */}
        <div className="pt-4 border-t border-teal-900/30 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Investment</span>
            <span className="text-2xl font-bold text-amber-300 font-serif">${service.priceUSD}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(service)}
              className="p-2.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 border border-teal-800/60 text-teal-300 hover:text-white transition-colors cursor-pointer"
              title="View Ritual Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onBookNow(service)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
