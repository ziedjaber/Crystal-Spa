'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RoomGallery from '@/components/apartment/RoomGallery';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-8">
        <RoomGallery />
      </main>

      <Footer />
    </div>
  );
}
