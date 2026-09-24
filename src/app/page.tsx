'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProgressiveImage from '@/components/ui/ProgressiveImage';
import TopAnnouncementBar from '@/components/layout/TopAnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import BookingBar from '@/components/booking/BookingBar';
import DirectBookingPerks from '@/components/booking/DirectBookingPerks';
import RomanticPacksSection from '@/components/apartment/RomanticPacksSection';
import GiftCardBanner from '@/components/giftcards/GiftCardBanner';
import ExperienceSection from '@/components/experiences/ExperienceSection';
import ApartmentEquipments from '@/components/apartment/ApartmentEquipments';
import RoomGallery from '@/components/apartment/RoomGallery';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import LocationAccessSection from '@/components/location/LocationAccessSection';
import FaqSection from '@/components/faq/FaqSection';
import ConciergeContact from '@/components/contact/ConciergeContact';
import ApartmentBooking from '@/components/booking/ApartmentBooking';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { FEATURED_APARTMENTS, ApartmentItem } from '@/data/apartment';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Star, MapPin, Users, Shield, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import AirbnbLogo from '@/components/ui/AirbnbLogo';

function MainContent() {
  const { language, t } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState<string | undefined>(undefined);
  const [selectedPackId, setSelectedPackId] = useState<string | undefined>(undefined);

  const openBookingWithApt = (aptId: string) => {
    setSelectedAptId(aptId);
    setBookingModalOpen(true);
  };

  const openBookingWithPack = (packId: string) => {
    setSelectedPackId(packId);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans antialiased selection:bg-[#d4af37] selection:text-[#3c2f00] flex flex-col">
      {/* 0. Top Reassurance Ribbon */}
      <TopAnnouncementBar />

      {/* Navigation */}
      <Navbar onOpenBookingModal={() => setBookingModalOpen(true)} />

      <main className="flex-grow pt-20 bg-[#131313]">
        {/* 1. Ultra-Luxurious Hero with Particles */}
        <Hero onReserveNow={() => setBookingModalOpen(true)} />

        {/* 2. Floating Search & Booking Bar */}
        <BookingBar
          onSearch={() => {
            const suitesEl = document.getElementById('suites-collection');
            if (suitesEl) suitesEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. The 3 Distinct Apartments Showcase Cards */}
        <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#131313]" id="suites-collection">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/30 w-fit">
                  <Sparkles className="w-4 h-4 text-[#f2ca50]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2ca50]">
                    {language === 'fr' ? 'Collection Haute Hospitalité' : 'Haute Hospitality Collection'}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#e5e2e1]">
                  {language === 'fr' ? 'Nos 3 Appartements d’Exception' : 'Our 3 Signature Apartments'}
                </h2>
                <p className="text-sm sm:text-base text-[#d0c5af] font-light leading-relaxed">
                  {language === 'fr'
                    ? 'Chaque logement est un sanctuaire spa totalement indépendant : accès autonome par serrure connectée, jacuzzi privatif 24h/24 et prestations d’hôtellerie 5 étoiles.'
                    : 'Each apartment is an independent private spa sanctuary: keyless keypad entry, 24/7 private hydro spa, and 5-star hospitality amenities.'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#f2ca50] bg-[#1c1b1b] px-4 py-2.5 rounded-xl border border-white/5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping" />
                <span>
                  {language === 'fr' ? '3 Appartements Disponibles' : '3 Apartments Available'}
                </span>
              </div>
            </div>

            {/* 3 Apartments Large Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {FEATURED_APARTMENTS.map((apt) => (
                <div
                  key={apt.id}
                  className="group rounded-2xl bg-[#1c1b1b] overflow-hidden flex flex-col luxury-card border border-white/5 hover:border-[#f2ca50]/40 transition-all duration-500 shadow-2xl"
                >
                  {/* Photo Banner with Zoom */}
                  <div className="relative aspect-[16/11] overflow-hidden zoom-container">
                    <ProgressiveImage
                      src={apt.image}
                      alt={apt.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      rounded="rounded-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-black/40 pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] font-bold text-[11px] uppercase tracking-wider shadow-md">
                        {apt.badge}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#2a2a2a]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#f2ca50] border border-white/10 shadow-lg">
                      <AirbnbLogo className="w-3.5 h-3.5 text-[#FF385C]" />
                      <Star className="w-3 h-3 fill-current text-[#f2ca50]" />
                      <span className="text-white font-bold">{apt.rating}</span>
                      <span className="text-[#d0c5af] font-light">({apt.reviewsCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs text-[#e5e2e1] font-light flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-[#f2ca50]" />
                      <span>{apt.location}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors font-medium">
                          {apt.title}
                        </h3>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-[#d0c5af] font-light">
                          {language === 'fr' ? 'Dès' : 'From'}
                        </span>
                        <span className="font-serif text-2xl font-bold text-[#f2ca50]">
                          {apt.pricePerNightEUR} €
                        </span>
                        <span className="text-xs text-[#d0c5af] font-light">/ {language === 'fr' ? 'nuitée' : 'night'}</span>
                        <span className="text-xs text-[#99907c] font-light ml-auto">{apt.surfaceM2} m²</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#d0c5af] font-light line-clamp-3 leading-relaxed">
                        {language === 'fr' ? apt.description : apt.descriptionEn}
                      </p>

                      {/* Amenities Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {apt.amenities.slice(0, 3).map((am) => (
                          <span
                            key={am}
                            className="px-2.5 py-1 rounded-full bg-[#201f1f] text-[#c9c6bf] text-[11px] flex items-center gap-1.5 border border-white/5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                            <span>{am}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <Link
                        href={`/suites/${apt.slug}`}
                        aria-label={language === 'fr' ? `Découvrir l’appartement ${apt.title}` : `View details for ${apt.title}`}
                        className="flex-1 py-3 rounded-lg bg-[#2a2a2a] hover:bg-[#353534] text-[#e5e2e1] hover:text-[#f2ca50] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                      >
                        <span>{language === 'fr' ? 'Voir l’Appartement' : 'View Apartment'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => openBookingWithApt(apt.id)}
                        aria-label={language === 'fr' ? `Réserver l’appartement ${apt.title}` : `Book ${apt.title}`}
                        className="py-3 px-5 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider luxury-shimmer-btn cursor-pointer"
                      >
                        {language === 'fr' ? 'Réserver' : 'Book'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. Romantic Add-on Packs */}
        <RomanticPacksSection
          onSelectPack={(packId) => openBookingWithPack(packId)}
          selectedPackId={selectedPackId}
        />

        {/* 5. Direct Booking Guarantees (Pourquoi Réserver en Direct sur ce Site ?) */}
        <DirectBookingPerks />

        {/* 6. Complete 42 Amenities List */}
        <ApartmentEquipments />

        {/* 7. 6 Exclusive Experience Pillars */}
        <ExperienceSection />

        {/* 8. Photo Gallery with Switcher for all 3 Apartments */}
        <RoomGallery />

        {/* 9. Offer a Romantic Escape Gift Card */}
        <GiftCardBanner />

        {/* 10. Verified Reviews & Distinctions */}
        <ReviewsSection />

        {/* 11. Two Locations & Interactive Map */}
        <LocationAccessSection />

        {/* 12. FAQ Accordion (8 Comprehensive Answers) */}
        <FaqSection />

        {/* 13. Concierge Contact Form */}
        <ConciergeContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2.5 sm:p-6 bg-[#090909]/90 backdrop-blur-2xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl my-auto py-2 sm:py-0"
            >
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#1c1b1b]/90 backdrop-blur-md border border-[#f2ca50]/30 text-[#e5e2e1] hover:text-[#f2ca50] transition-colors cursor-pointer shadow-lg"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <ApartmentBooking
                initialApartmentId={selectedAptId}
                initialPackId={selectedPackId}
                onComplete={() => setBookingModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
