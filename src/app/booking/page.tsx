'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ApartmentBooking from '@/components/booking/ApartmentBooking';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 text-center mb-8 space-y-2">
          <span className="text-[10px] text-[#FFC000] font-bold tracking-[0.3em] uppercase block">
            ONLINE RESERVATION PORTAL
          </span>
          <h1 className="text-section-title text-[#FFFFFF]">
            BOOK <span className="text-[#FFC000]">APPARTEMENT A1</span>
          </h1>
          <p className="text-xs text-[#7D7D7D] max-w-lg mx-auto uppercase">
            Select your check-in and check-out dates, guest count, and optional VIP concierge transfers.
          </p>
        </div>

        <ApartmentBooking />
      </main>

      <Footer />
    </div>
  );
}
