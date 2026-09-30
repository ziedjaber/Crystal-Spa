'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TopAnnouncementBar from '@/components/layout/TopAnnouncementBar';
import SuiteNavbar from '@/components/layout/SuiteNavbar';
import Footer from '@/components/layout/Footer';
import SuiteTopGallery from '@/components/apartment/SuiteTopGallery';
import SuiteSignatureDetail from '@/components/apartment/SuiteSignatureDetail';
import dynamic from 'next/dynamic';

const DirectBookingPerks = dynamic(() => import('@/components/booking/DirectBookingPerks'), {
  loading: () => <div className="min-h-[150px]" />,
});
const ApartmentEquipments = dynamic(() => import('@/components/apartment/ApartmentEquipments'), {
  loading: () => <div className="min-h-[300px]" />,
});
const OtherApartmentsSection = dynamic(() => import('@/components/apartment/OtherApartmentsSection'), {
  loading: () => <div className="min-h-[300px]" />,
});
const RoomGallery = dynamic(() => import('@/components/apartment/RoomGallery'), {
  loading: () => <div className="min-h-[250px]" />,
});
const ReviewsSection = dynamic(() => import('@/components/reviews/ReviewsSection'), {
  loading: () => <div className="min-h-[250px]" />,
});
const LocationAccessSection = dynamic(() => import('@/components/location/LocationAccessSection'), {
  loading: () => <div className="min-h-[250px]" />,
});
const ConciergeContact = dynamic(() => import('@/components/contact/ConciergeContact'), {
  loading: () => <div className="min-h-[250px]" />,
});

const ApartmentBooking = dynamic(() => import('@/components/booking/ApartmentBooking'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[300px] text-[#f2ca50]">
      <div className="w-8 h-8 border-2 border-[#f2ca50] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});
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

  const [selectedPackIdsForBooking, setSelectedPackIdsForBooking] = useState<string[]>([]);
  const [selectedDatesForBooking, setSelectedDatesForBooking] = useState<{ checkIn?: string; checkOut?: string }>({});

  const handleOpenBooking = (details?: string | {
    suiteTitle?: string;
    totalPrice?: number;
    extras?: string[];
    packIds?: string[];
    checkIn?: string;
    checkOut?: string;
  }) => {
    if (typeof details === 'string') {
      setSelectedAptForBooking(details);
      setSelectedPackIdsForBooking([]);
      setSelectedDatesForBooking({});
    } else if (details) {
      setSelectedAptForBooking(apartment.id);
      const packs: string[] = [];
      if (details.packIds && details.packIds.length > 0) {
        packs.push(...details.packIds);
      } else if (details.extras && details.extras.length > 0) {
        if (details.extras.some(e => e.includes('Confort') || e.includes('Comfort'))) packs.push('pack-confort');
        if (details.extras.some(e => e.includes('Romance'))) packs.push('pack-romance');
      }
      setSelectedPackIdsForBooking(packs);
      setSelectedDatesForBooking({
        checkIn: details.checkIn,
        checkOut: details.checkOut,
      });
    } else {
      setSelectedAptForBooking(apartment.id);
      setSelectedPackIdsForBooking([]);
      setSelectedDatesForBooking({});
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--cs-bg)] text-[var(--cs-text-primary)] font-sans antialiased selection:bg-[#d4af37] selection:text-[#3c2f00] flex flex-col transition-colors">
      {/* 0. Top Reassurance Ribbon */}
      <TopAnnouncementBar />

      {/* Dedicated Apartment Suite Navigation */}
      <SuiteNavbar apartment={apartment} onOpenBookingModal={() => handleOpenBooking()} />

      <main className="flex-grow pt-20">
        
        {/* 1. Apartment Top Showcase & 6-7 Image Gallery Slider */}
        <SuiteTopGallery
          apartment={apartment}
          onOpenBookingModal={() => handleOpenBooking()}
        />

        {/* 2. Dedicated Suite Signature Detail & Interactive Calculator */}
        <SuiteSignatureDetail
          currentSuite={suiteItem}
          onConfirmBooking={(bookingDetails) => handleOpenBooking(bookingDetails)}
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
                initialPackIds={selectedPackIdsForBooking}
                initialCheckIn={selectedDatesForBooking.checkIn}
                initialCheckOut={selectedDatesForBooking.checkOut}
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
