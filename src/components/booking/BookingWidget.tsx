'use client';

import React, { useState } from 'react';
import { Calendar, Users, Tag, Sparkles, ArrowRight } from 'lucide-react';

interface BookingWidgetProps {
  onReserve: (query: { checkIn: string; checkOut: string; guests: number; promoCode: string }) => void;
}

export default function BookingWidget({ onReserve }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [checkOut, setCheckOut] = useState<string>(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [guests, setGuests] = useState<number>(2);
  const [promoCode, setPromoCode] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReserve({ checkIn, checkOut, guests, promoCode });
  };

  return (
    <div className="glass-panel-luxury p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl relative z-20">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        {/* Check-In */}
        <div>
          <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Check-in
          </label>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="input-luxury w-full"
          />
        </div>

        {/* Check-Out */}
        <div>
          <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Check-out
          </label>
          <input
            type="date"
            min={checkIn}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="input-luxury w-full"
          />
        </div>

        {/* Guests */}
        <div>
          <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="input-luxury w-full cursor-pointer"
          >
            <option value={1} className="bg-[#121212] text-[#FAFAFA]">1 Guest (Solo Spa)</option>
            <option value={2} className="bg-[#121212] text-[#FAFAFA]">2 Guests (Romantic Escape)</option>
            <option value={3} className="bg-[#121212] text-[#FAFAFA]">3 Guests (Small Group)</option>
            <option value={4} className="bg-[#121212] text-[#FAFAFA]">4 Guests (Suite Max)</option>
          </select>
        </div>

        {/* Promo Code */}
        <div>
          <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#D4AF37]" /> Promo Code
          </label>
          <input
            type="text"
            placeholder="CRYSTALVIP"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="input-luxury w-full uppercase placeholder:text-slate-600"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="btn-gold-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider"
          >
            Reserve Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
