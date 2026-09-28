'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import { FEATURED_APARTMENTS, calculateStayPricing } from '@/data/apartment';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  Heart,
  Clock,
  ArrowRight,
  CreditCard,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

const TEST_ADDONS = [
  {
    id: 'pack-confort',
    name: 'Pack Confort',
    nameEn: 'Comfort Pack',
    price: 29,
    icon: Clock,
    desc: 'Arrivée anticipée 15h00 & départ tardif 13h00 (+4h de spa)',
    descEn: 'Early check-in 3PM & late check-out 1PM (+4h spa access)',
  },
  {
    id: 'pack-romance',
    name: 'Pack Romance',
    nameEn: 'Romance Pack',
    price: 29,
    icon: Heart,
    desc: 'Pétales de roses fraîches, bougies LED, mot personnalisé calligraphié',
    descEn: 'Rose petals, LED candlelight, handwritten personalized note',
  },
];

export default function PaymentTestPage() {
  const { language } = useLanguage();

  // Test State
  const [selectedAptId, setSelectedAptId] = useState(FEATURED_APARTMENTS[0].id);
  const [checkInDate, setCheckInDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [selectedPacks, setSelectedPacks] = useState<string[]>(['pack-romance']);
  const [guestName, setGuestName] = useState('Alexandre de Valois');
  const [guestEmail, setGuestEmail] = useState('alexandre.valois@example.com');
  const [guestPhone, setGuestPhone] = useState('06 12 34 56 78');

  const currentApartment =
    FEATURED_APARTMENTS.find((apt) => apt.id === selectedAptId) || FEATURED_APARTMENTS[0];

  const stayPricing = calculateStayPricing(checkInDate, checkOutDate);
  const addonsTotal = selectedPacks.reduce((acc, id) => {
    const pack = TEST_ADDONS.find((p) => p.id === id);
    return acc + (pack ? pack.price : 0);
  }, 0);

  const totalAmount = stayPricing.baseAmountEUR + addonsTotal;

  const togglePack = (id: string) => {
    setSelectedPacks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FFFFFF] flex flex-col selection:bg-[#f2ca50] selection:text-black">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Page Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-[#f2ca50] text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Banc d’Essai Stripe Sandbox' : 'Stripe Payment Sandbox'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {language === 'fr' ? 'Formulaire de Test de Paiement' : 'Payment Integration Test'}
            </h1>
            <p className="text-xs sm:text-sm text-[#99907c] max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Testez l’ensemble du tunnel de paiement Stripe en direct : calcul automatique des tarifs, scénarios de cartes de test (Succès, 3DS, Refus, Solde insuffisant) et journalisation serveur.'
                : 'Test the end-to-end Stripe payment flow in real-time with automated pricing calculations, 1-click test cards, 3DS simulation, and server logs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Booking Parameters Simulator */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Suite Selection */}
              <div className="p-6 rounded-3xl bg-[#141312] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    {language === 'fr' ? '1. Suite Sélectionnée' : '1. Selected Suite'}
                  </span>
                  <span className="text-[11px] text-[#99907c]">
                    {FEATURED_APARTMENTS.length} suites disponibles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {FEATURED_APARTMENTS.map((apt) => {
                    const isSelected = selectedAptId === apt.id;
                    return (
                      <button
                        key={apt.id}
                        type="button"
                        onClick={() => setSelectedAptId(apt.id)}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#221f17] border-[#f2ca50] ring-1 ring-[#f2ca50]'
                            : 'bg-[#191817] border-white/5 hover:border-[#f2ca50]/40'
                        }`}
                      >
                        <div>
                          <span className="text-[10px] font-bold text-[#f2ca50] uppercase block">
                            {apt.badge}
                          </span>
                          <span className="font-semibold text-xs text-white block mt-0.5">
                            {apt.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#99907c]">
                          {apt.surfaceM2} m² • Jacuzzi
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Addons Selection */}
              <div className="p-6 rounded-3xl bg-[#141312] border border-white/10 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {language === 'fr' ? '2. Dates & Add-ons' : '2. Dates & Options'}
                  </span>
                  <span className="text-[11px] text-[#f2ca50] font-mono">
                    {stayPricing.nightsCount} {language === 'fr' ? 'nuitée(s)' : 'night(s)'}
                  </span>
                </div>

                {/* Dates picker */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#99907c] font-medium">Arrivée (Check-in)</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-[#1c1b1a] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#99907c] font-medium">Départ (Check-out)</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-[#1c1b1a] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                </div>

                {/* Romantic Addons */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">
                    {language === 'fr' ? 'Packs Romantiques' : 'Romantic Packs'}
                  </label>
                  <div className="space-y-2">
                    {TEST_ADDONS.map((pack) => {
                      const isSelected = selectedPacks.includes(pack.id);
                      return (
                        <div
                          key={pack.id}
                          onClick={() => togglePack(pack.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-[#221f17] border-[#f2ca50]'
                              : 'bg-[#191817] border-white/5 hover:border-[#f2ca50]/30'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[#f2ca50] border-[#f2ca50] text-black' : 'border-white/20'}`}>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-white block">
                                {language === 'fr' ? pack.name : pack.nameEn}
                              </span>
                              <span className="text-[10px] text-[#99907c] block">
                                {language === 'fr' ? pack.desc : pack.descEn}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#f2ca50] shrink-0">
                            +{pack.price} €
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Details */}
                <div className="space-y-3 pt-2">
                  <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">
                    {language === 'fr' ? 'Coordonnées Client Test' : 'Test Guest Details'}
                  </label>
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Nom complet"
                      className="w-full bg-[#1c1b1a] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#f2ca50]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full bg-[#1c1b1a] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#f2ca50]"
                      />
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="Téléphone"
                        className="w-full bg-[#1c1b1a] border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#f2ca50]"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Calculation Summary */}
                <div className="p-4 rounded-2xl bg-[#0f0e0e] border border-[#f2ca50]/20 space-y-2 text-xs">
                  <div className="flex justify-between text-[#99907c]">
                    <span>Hébergement ({stayPricing.nightsCount} nuitée(s)) :</span>
                    <span className="text-white font-medium">{stayPricing.baseAmountEUR} €</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between text-[#99907c]">
                      <span>Packs Romantiques :</span>
                      <span className="text-white font-medium">+{addonsTotal} €</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2 border-t border-white/5">
                    <span className="font-bold text-white uppercase tracking-wider text-[11px]">Total autoritatif serveur :</span>
                    <span className="font-serif text-2xl font-bold text-[#f2ca50]">{totalAmount} €</span>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Stripe Payment Form Component */}
            <div className="lg:col-span-7">
              <StripePaymentForm
                amountEUR={totalAmount}
                apartmentTitle={currentApartment.title}
                apartmentId={currentApartment.id}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                guestName={guestName}
                guestEmail={guestEmail}
                guestPhone={guestPhone}
                selectedPacks={selectedPacks}
              />
            </div>

          </div>

          {/* Bottom Navigation Links */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#99907c]">
            <Link
              href="/booking"
              className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
            >
              <span>← {language === 'fr' ? 'Retour au Portail de Réservation' : 'Back to Booking Portal'}</span>
            </Link>
            <span>
              {language === 'fr'
                ? 'Pour activer les paiements Stripe réels en production, renseignez `STRIPE_SECRET_KEY` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` dans vos variables d’environnement.'
                : 'To enable live Stripe payments, configure your API keys in .env.local.'}
            </span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
