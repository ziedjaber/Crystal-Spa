'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TopAnnouncementBar from '@/components/layout/TopAnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SuiteTopGallery from '@/components/apartment/SuiteTopGallery';
import RoomGallery from '@/components/apartment/RoomGallery';
import OtherApartmentsSection from '@/components/apartment/OtherApartmentsSection';
import ApartmentEquipments from '@/components/apartment/ApartmentEquipments';
import SuiteSignatureDetail from '@/components/apartment/SuiteSignatureDetail';
import DirectBookingPerks from '@/components/booking/DirectBookingPerks';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import LocationAccessSection from '@/components/location/LocationAccessSection';
import ConciergeContact from '@/components/contact/ConciergeContact';
import ApartmentBooking from '@/components/booking/ApartmentBooking';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { getApartmentBySlug, FEATURED_APARTMENTS } from '@/data/apartment';
import { SuiteItem } from '@/components/apartment/SuitesCollection';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SuitePageProps {
  params: Promise<{ slug: string }>;
}

function SuitePageContent({ slug }: { slug: string }) {
  const { language, t } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const apartment = getApartmentBySlug(slug) || FEATURED_APARTMENTS[0];
  const [selectedAptForBooking, setSelectedAptForBooking] = useState<string>(apartment.id);

  // Map apartment to SuiteItem format for signature detail component
  const suiteItem: SuiteItem = {
    id: apartment.id,
    title: apartment.title,
    titleEn: apartment.title,
    location: apartment.location,
    price: apartment.pricePerNightEUR,
    area: `${apartment.surfaceM2} m²`,
    rating: apartment.rating.toString(),
    reviewsCount: `${apartment.reviewsCount} avis`,
    description: apartment.description,
    descriptionEn: apartment.descriptionEn,
    image: apartment.image,
    badge: apartment.badge,
    badgeEn: apartment.badge,
    tags: apartment.amenities,
    tagsEn: apartment.amenities,
    featured: apartment.featured,
  };

  const handleOpenBooking = (aptId?: string) => {
    setSelectedAptForBooking(aptId || apartment.id);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans antialiased selection:bg-[#d4af37] selection:text-[#3c2f00] flex flex-col">
      {/* 0. Top Reassurance Ribbon */}
      <TopAnnouncementBar />

      {/* Navigation */}
      <Navbar onOpenBookingModal={() => handleOpenBooking()} />

      <main className="flex-grow pt-20">
        
        {/* 1. Apartment Top Showcase & 6-7 Image Gallery Slider */}
        <SuiteTopGallery
          apartment={apartment}
          onOpenBookingModal={() => handleOpenBooking()}
        />

        {/* 2. Dedicated Suite Signature Detail & Interactive Calculator */}
        <SuiteSignatureDetail
          currentSuite={suiteItem}
          onConfirmBooking={() => handleOpenBooking()}
        />

        {/* 3. Direct Booking Advantages */}
        <DirectBookingPerks />

        {/* 4. Full 42 Amenities List */}
        <ApartmentEquipments />

        {/* 5. Dedicated Gallery for this Apartment */}
        <RoomGallery apartmentId={apartment.id} />

        {/* 6. Other Apartments in Collection Cards */}
        <OtherApartmentsSection
          currentApartmentId={apartment.id}
          onBookApartment={(aptId) => handleOpenBooking(aptId)}
        />

        {/* 7. Reviews Section */}
        <ReviewsSection apartmentId={apartment.id} />

        {/* 8. Location & Map Section */}
        <LocationAccessSection currentApartment={apartment} />

        {/* 9. VIP Concierge Contact Form */}
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
                initialApartmentId={selectedAptForBooking || apartment.id}
                onComplete={() => setBookingModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function SuitePage({ params }: SuitePageProps) {
  const resolvedParams = use(params);
  return (
    <LanguageProvider>
      <SuitePageContent slug={resolvedParams.slug} />
    </LanguageProvider>
  );
}
