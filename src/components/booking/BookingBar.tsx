'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Bed, Calendar, CalendarCheck, Sparkles, ChevronDown, Search } from 'lucide-react';

interface BookingBarProps {
  onSearch?: (criteria: any) => void;
}

export default function BookingBar({ onSearch }: BookingBarProps) {
  const { language, t } = useLanguage();
  const [suite, setSuite] = useState('all');
  const [checkIn, setCheckIn] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [formula, setFormula] = useState(t('booking.pack_romantic'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suitesEl = document.getElementById('suites-collection');
    if (suitesEl) {
      suitesEl.scrollIntoView({ behavior: 'smooth' });
    }
    if (onSearch) {
      onSearch({ suite, checkIn, checkOut, formula });
    }
  };

  return (
    <section className="relative z-30 px-6 md:px-12 lg:px-24 -mt-14 w-full">
      <div className="max-w-6xl mx-auto rounded-xl bg-[#201f1f]/95 backdrop-blur-2xl shadow-[0_24px_50px_rgba(0,0,0,0.7)] p-6 lg:p-8 border border-[#f2ca50]/20 transition-all duration-500 hover:border-[#f2ca50]/40">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end" id="reservation-bar">
          
          {/* Suite Choice */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="booking-bar-suite"
              className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider flex items-center gap-1.5"
            >
              <Bed className="w-3.5 h-3.5" />
              <span>{t('booking.suite_label')}</span>
            </label>
            <div className="relative bg-[#0e0e0e] rounded-lg border border-transparent focus-within:border-[#f2ca50]/40 transition-colors">
              <select
                id="booking-bar-suite"
                aria-label={t('booking.suite_label')}
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                className="w-full bg-transparent text-[#e5e2e1] text-xs px-3.5 py-3 rounded-lg outline-none cursor-pointer appearance-none pr-8"
              >
                <option className="bg-[#201f1f] text-[#e5e2e1]" value="all">{t('booking.all_suites')}</option>
                <option className="bg-[#201f1f] text-[#e5e2e1]" value="la-vie-est-belle">La Vie est Belle | Spa Privatif (Rouen)</option>
                <option className="bg-[#201f1f] text-[#e5e2e1]" value="diamant-noir">Suite Diamant Noir (Paris 85m²)</option>
                <option className="bg-[#201f1f] text-[#e5e2e1]" value="master-crystal-royale">Master Crystal Royale (110m²)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 pointer-events-none text-[#99907c]" />
            </div>
          </div>

          {/* Date Check-in */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="booking-bar-checkin"
              className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('booking.checkin')}</span>
            </label>
            <div className="bg-[#0e0e0e] rounded-lg border border-transparent focus-within:border-[#f2ca50]/40 transition-colors">
              <input
                id="booking-bar-checkin"
                aria-label={t('booking.checkin')}
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-[#e5e2e1] text-xs px-3.5 py-2.5 rounded-lg outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Date Check-out */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="booking-bar-checkout"
              className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{t('booking.checkout')}</span>
            </label>
            <div className="bg-[#0e0e0e] rounded-lg border border-transparent focus-within:border-[#f2ca50]/40 transition-colors">
              <input
                id="booking-bar-checkout"
                aria-label={t('booking.checkout')}
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-[#e5e2e1] text-xs px-3.5 py-2.5 rounded-lg outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Formule / Ambiance */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="booking-bar-formula"
              className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('booking.pack_label')}</span>
            </label>
            <div className="relative bg-[#0e0e0e] rounded-lg border border-transparent focus-within:border-[#f2ca50]/40 transition-colors">
              <select
                id="booking-bar-formula"
                aria-label={t('booking.pack_label')}
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className="w-full bg-transparent text-[#e5e2e1] text-xs px-3.5 py-3 rounded-lg outline-none cursor-pointer appearance-none pr-8"
              >
                <option className="bg-[#201f1f] text-[#e5e2e1]">Pack Confort (+29 €)</option>
                <option className="bg-[#201f1f] text-[#e5e2e1]">Pack Romance (+49 €)</option>
                <option className="bg-[#201f1f] text-[#e5e2e1]">Pack Love (+59 €)</option>
                <option className="bg-[#201f1f] text-[#e5e2e1]">Pack Prestige (+79 €)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 pointer-events-none text-[#99907c]" />
            </div>
          </div>

          {/* CTA Submit */}
          <div className="flex flex-col">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 luxury-shimmer-btn shadow-lg cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{t('booking.search')}</span>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
