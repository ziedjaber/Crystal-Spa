'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GiftCardCreator from '@/components/giftcards/GiftCardCreator';
import { LanguageProvider } from '@/context/LanguageContext';

export default function GiftCardsPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-grow pt-20">
          <GiftCardCreator />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
