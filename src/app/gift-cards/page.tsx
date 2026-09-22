'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GiftCardCreator from '@/components/giftcards/GiftCardCreator';

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-6">
        <GiftCardCreator />
      </main>
      <Footer />
    </div>
  );
}
