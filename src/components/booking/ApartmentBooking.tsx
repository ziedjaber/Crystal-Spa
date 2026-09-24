'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Heart,
  Wine,
  Crown,
  Lock,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FEATURED_APARTMENTS, calculateStayPricing } from '@/data/apartment';
import { useLanguage } from '@/context/LanguageContext';
import BookingCalendar from './BookingCalendar';

interface ApartmentBookingProps {
  initialApartmentId?: string;
  initialPackId?: string;
  onComplete?: () => void;
}

const ROMANTIC_ADDONS = [
  {
    id: 'pack-confort',
    name: 'Pack Confort',
    nameEn: 'Comfort Pack',
    price: 29,
    icon: Clock,
    badge: 'Horaires Étendus',
    badgeEn: 'Extra Hours',
    summary: 'Arrivée dès 15h00 & départ tardif jusqu’à 13h00 (+4h de spa)',
    summaryEn: 'Early check-in 3PM & late check-out 1PM (+4h spa access)',
  },
  {
    id: 'pack-romance',
    name: 'Pack Romance',
    nameEn: 'Romance Pack',
    price: 29,
    icon: Heart,
    badge: 'Ambiance Féerique',
    badgeEn: 'Fairy Tale Mood',
    summary: 'Pétales de roses sur lit & spa, bougies LED chaleureuses, mot d’amour personnalisé calligraphié (sans alcool, sans chocolat)',
    summaryEn: 'Silky rose petals on bed & spa, warm LED candles, handwritten personalized love letter (alcohol-free, chocolate-free)',
  },
];

export default function ApartmentBooking({
  initialApartmentId,
  initialPackId,
  onComplete,
}: ApartmentBookingProps) {
  const { language } = useLanguage();

  const [selectedAptId, setSelectedAptId] = useState<string>(
    initialApartmentId || FEATURED_APARTMENTS[1]?.id || FEATURED_APARTMENTS[0].id
  );
  const [step, setStep] = useState<number>(1);
  const [checkInDate, setCheckInDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedPacks, setSelectedPacks] = useState<string[]>(
    initialPackId ? [initialPackId] : []
  );

  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [hpCompanyField, setHpCompanyField] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showCalendarView, setShowCalendarView] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);

  const toggleCalendarView = () => {
    setIsCalendarModalOpen(true);
  };

  const currentApartment =
    FEATURED_APARTMENTS.find((apt) => apt.id === selectedAptId) ||
    FEATURED_APARTMENTS[0];

  const stayPricing = calculateStayPricing(checkInDate, checkOutDate);

  const calculateNights = () => {
    return stayPricing.nightsCount;
  };

  const calculatePacksTotal = () => {
    return selectedPacks.reduce((acc, id) => {
      const p = ROMANTIC_ADDONS.find((item) => item.id === id);
      return acc + (p ? p.price : 0);
    }, 0);
  };

  const calculateTotal = () => {
    return stayPricing.baseAmountEUR + calculatePacksTotal();
  };

  const togglePack = (id: string) => {
    setSelectedPacks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      setErrorMsg(
        language === 'fr'
          ? 'Veuillez renseigner votre nom, email et numéro de téléphone.'
          : 'Please enter your name, email, and phone number.'
      );
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentId: currentApartment.id,
          checkInDate,
          checkOutDate,
          guestsCount,
          guestName: guestName.trim(),
          guestEmail: guestEmail.trim(),
          guestPhone: guestPhone.trim(),
          selectedPacks,
          specialRequests: specialRequests.trim(),
          hp_company_field: hpCompanyField,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 429) {
        setErrorMsg(
          language === 'fr'
            ? 'Trop de tentatives rapprochées. Veuillez patienter 1 minute avant de réessayer.'
            : 'Too many requests. Please wait a minute before trying again.'
        );
        return;
      }

      if (data.success) {
        setConfirmedBooking(data.data);
        setStep(4);
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMsg(
          data.error ||
            (language === 'fr'
              ? 'Erreur lors de la réservation. Veuillez vérifier vos informations.'
              : 'Booking failed. Please check your information.')
        );
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(
        language === 'fr'
          ? 'Erreur de connexion sécurisée. Veuillez vérifier votre réseau.'
          : 'Secure connection error. Please verify your network.'
      );
    }
  };

  const copyBookingCode = () => {
    if (confirmedBooking?.id) {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#151414] border border-[#f2ca50]/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] p-5 sm:p-8 md:p-10 text-[#e5e2e1] relative overflow-hidden">
      
      {/* Brand & Guarantee Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#1c1a17] border border-[#f2ca50]/40 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(242,202,80,0.25)] shrink-0">
            <img
              src="/logo.png"
              alt="Crystal Spa"
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm sm:text-base font-bold text-[#f2ca50] tracking-[0.2em] uppercase">
                CRYSTAL SPA
              </span>
              <span className="text-[10px] font-bold text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded-full border border-[#22c55e]/30">
                Direct Best Rate
              </span>
            </div>
            <span className="text-[11px] text-[#99907c] block">
              {language === 'fr' ? 'Sanctuaire Spa Privatif • Réservation Directe Garantie' : 'Private Spa Sanctuary • Guaranteed Direct Booking'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#d0c5af] bg-[#1a1918] px-3.5 py-1.5 rounded-xl border border-white/5 w-fit">
          <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
          <span>{language === 'fr' ? 'Garantie Meilleur Tarif • Sans Frais' : 'Best Price Guarantee • 0 Fees'}</span>
        </div>
      </div>

      {/* Step Indicator */}
      {step < 4 && (
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs uppercase tracking-wider text-[#d0c5af]">
            <span className="text-[#f2ca50] font-bold">
              {language === 'fr' ? `ÉTAPE ${step} SUR 3` : `STEP ${step} OF 3`}
            </span>
            <span className="text-white font-medium">
              {step === 1 && (language === 'fr' ? '1. Suite & Dates du Séjour' : '1. Suite & Dates')}
              {step === 2 && (language === 'fr' ? '2. Packs Romantiques & Add-ons' : '2. Romantic Add-on Packs')}
              {step === 3 && (language === 'fr' ? '3. Coordonnées & Confirmation' : '3. Guest Details & Confirmation')}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#f2ca50] transition-all duration-500 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* STEP 1: SUITE SELECTION & DATES */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-7"
          >
            <div>
              <span className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-widest block mb-1">
                {language === 'fr' ? 'Étape 1 sur 3' : 'Step 1 of 3'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#e5e2e1]">
                {language === 'fr' ? 'Choisissez Votre Suite & Vos Dates' : 'Select Your Suite & Stay Dates'}
              </h2>
            </div>

            {/* Suite Selector Cards with Images */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider">
                {language === 'fr' ? 'Sélectionnez Votre Logement Spa Privatif' : 'Select Your Private Spa Sanctuary'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {FEATURED_APARTMENTS.map((apt) => {
                  const isAptSelected = selectedAptId === apt.id;
                  return (
                    <button
                      key={apt.id}
                      type="button"
                      onClick={() => setSelectedAptId(apt.id)}
                      className={`group rounded-2xl overflow-hidden text-left flex flex-col justify-between transition-all cursor-pointer border relative ${
                        isAptSelected
                          ? 'bg-[#221f17] border-[#f2ca50] shadow-[0_0_25px_rgba(242,202,80,0.2)] ring-1 ring-[#f2ca50]'
                          : 'bg-[#1a1919] border-white/5 hover:border-[#f2ca50]/40'
                      }`}
                    >
                      {/* Apartment Thumbnail */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                        <img
                          src={apt.image}
                          alt={apt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-[#f2ca50] border border-[#f2ca50]/30 backdrop-blur-sm">
                          {apt.badge}
                        </span>
                        {isAptSelected && (
                          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center font-bold text-xs shadow-md">
                            ✓
                          </span>
                        )}
                      </div>

                      {/* Apartment Details */}
                      <div className="p-3.5 flex flex-col justify-between gap-2 flex-grow">
                        <div>
                          <span className="font-serif text-sm sm:text-base font-semibold text-white leading-snug block">
                            {apt.title}
                          </span>
                          <span className="text-[11px] text-[#99907c] font-light">
                            {apt.surfaceM2} m² • Jacuzzi Privatif 24h/24
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between pt-2 border-t border-white/5">
                          <span className="text-[#f2ca50] font-bold text-sm">
                            {language === 'fr' ? 'Dès 110 €' : 'From 110 €'}
                          </span>
                          <span className={`text-[11px] font-semibold ${isAptSelected ? 'text-[#f2ca50]' : 'text-[#d0c5af]'}`}>
                            {isAptSelected ? (language === 'fr' ? '✓ Sélectionné' : '✓ Selected') : (language === 'fr' ? 'Choisir' : 'Select')}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dates & Nights Grid with Instant Stepper */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setIsCalendarModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  className="flex flex-col gap-1.5 p-4 rounded-2xl bg-[#111010] border border-white/10 hover:border-[#f2ca50] cursor-pointer transition-all group shadow-inner"
                >
                  <label className="text-[11px] font-bold text-[#d0c5af] group-hover:text-[#f2ca50] uppercase tracking-wider flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                      <span>{language === 'fr' ? 'Date d’Arrivée' : 'Check-in Date'}</span>
                    </span>
                    <span className="text-[10px] text-[#f2ca50] font-normal underline underline-offset-2">
                      {language === 'fr' ? 'Calendrier' : 'Calendar'}
                    </span>
                  </label>
                  <div className="text-base font-semibold text-white flex items-center justify-between pt-1">
                    <span>{checkInDate || (language === 'fr' ? 'Choisir la date' : 'Select date')}</span>
                    <span className="text-xs text-[#f2ca50] font-normal bg-[#f2ca50]/15 border border-[#f2ca50]/30 px-2 py-0.5 rounded-md">
                      {language === 'fr' ? 'Dès 17h00' : 'From 5 PM'}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setIsCalendarModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  className="flex flex-col gap-1.5 p-4 rounded-2xl bg-[#111010] border border-white/10 hover:border-[#f2ca50] cursor-pointer transition-all group shadow-inner"
                >
                  <label className="text-[11px] font-bold text-[#d0c5af] group-hover:text-[#f2ca50] uppercase tracking-wider flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                      <span>{language === 'fr' ? 'Date de Départ' : 'Check-out Date'}</span>
                    </span>
                    <span className="text-[10px] text-[#f2ca50] font-normal underline underline-offset-2">
                      {language === 'fr' ? 'Calendrier' : 'Calendar'}
                    </span>
                  </label>
                  <div className="text-base font-semibold text-white flex items-center justify-between pt-1">
                    <span>{checkOutDate || (language === 'fr' ? 'Choisir la date' : 'Select date')}</span>
                    <span className="text-xs text-[#f2ca50] font-normal bg-[#f2ca50]/15 border border-[#f2ca50]/30 px-2 py-0.5 rounded-md">
                      {language === 'fr' ? 'Jusqu’à 11h00' : 'Until 11 AM'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Number of Nights Quick Stepper & Open Full Agenda Bar */}
              <div className="p-4 rounded-2xl bg-[#1a1918] border border-[#f2ca50]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-9 h-9 rounded-xl bg-[#f2ca50]/15 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-[#d0c5af]">
                    <div className="text-white font-semibold flex items-center gap-2">
                      <span>{stayPricing ? `${stayPricing.nightsCount} ${language === 'fr' ? 'nuitée(s)' : 'night(s)'}` : '1 nuit'}</span>
                      <span className="text-[#f2ca50] font-bold font-serif text-sm">
                        ({stayPricing.baseAmountEUR} €)
                      </span>
                    </div>
                    <span className="text-[11px] text-[#99907c]">
                      {language === 'fr' ? 'Tarif journalier dynamique selon le jour de la semaine' : 'Dynamic daily rates by day of week'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const inD = new Date(checkInDate + 'T12:00:00');
                      const newNights = Math.max(1, stayPricing.nightsCount - 1);
                      inD.setDate(inD.getDate() + newNights);
                      setCheckOutDate(inD.toISOString().split('T')[0]);
                    }}
                    disabled={stayPricing.nightsCount <= 1}
                    className="w-8 h-8 rounded-lg bg-[#252424] hover:bg-[#323030] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                    title={language === 'fr' ? 'Moins 1 nuit' : '1 less night'}
                  >
                    -
                  </button>

                  <span className="px-3 py-1 rounded-lg bg-[#121110] border border-white/10 text-xs font-bold text-[#f2ca50] min-w-[3rem] text-center">
                    {stayPricing.nightsCount} {language === 'fr' ? 'nuit(s)' : 'nt(s)'}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      const inD = new Date(checkInDate + 'T12:00:00');
                      const newNights = Math.min(30, stayPricing.nightsCount + 1);
                      inD.setDate(inD.getDate() + newNights);
                      setCheckOutDate(inD.toISOString().split('T')[0]);
                    }}
                    disabled={stayPricing.nightsCount >= 30}
                    className="w-8 h-8 rounded-lg bg-[#252424] hover:bg-[#323030] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                    title={language === 'fr' ? 'Plus 1 nuit' : '1 more night'}
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCalendarModalOpen(true)}
                    className="ml-2 px-4 py-2 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'fr' ? 'Agenda 2 mois' : 'Dual Calendar'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown Summary Card */}
            <div className="rounded-2xl bg-[#100f0f] p-5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs shadow-xl">
              <div>
                <span className="text-[#99907c] text-[10px] uppercase font-bold tracking-widest block">
                  {language === 'fr' ? 'GRILLE TARIFAIRE OFFICIELLE' : 'OFFICIAL NIGHTLY RATES'}
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#1e1c19] text-[#e5e2e1] text-[11px] border border-white/5">
                    Lun → Jeu : <strong className="text-[#f2ca50]">120 €</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#1e1c19] text-[#e5e2e1] text-[11px] border border-white/5">
                    Vendredi : <strong className="text-[#f2ca50]">169 €</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#1e1c19] text-[#e5e2e1] text-[11px] border border-white/5">
                    Samedi : <strong className="text-[#f2ca50]">190 €</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#1e1c19] text-[#e5e2e1] text-[11px] border border-white/5">
                    Dimanche : <strong className="text-[#f2ca50]">110 €</strong>
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5 w-full sm:w-auto">
                <span className="text-[#99907c] text-[10px] uppercase font-bold tracking-widest block">
                  {language === 'fr' ? 'SOUS-TOTAL HÉBERGEMENT' : 'SUBTOTAL'}
                </span>
                <span className="font-serif text-3xl font-bold text-[#f2ca50]">
                  {stayPricing.baseAmountEUR} €
                </span>
              </div>
            </div>

            {/* Reassurance notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-[#99907c]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>{language === 'fr' ? 'Caution par simple empreinte bancaire : 250 € (aucun débit)' : 'Deposit hold: €250 (not debited)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50]" />
                <span>{language === 'fr' ? 'Prix tout compris : taxe de séjour & ménage inclus' : 'All-inclusive: tourist tax & cleaning included'}</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-widest luxury-shimmer-btn flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{language === 'fr' ? 'Étape Suivante : Options & Packs' : 'Next: Add-on Packs'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: ROMANTIC PACKS & ADD-ONS */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-widest block mb-1">
                {language === 'fr' ? 'Personnalisez Votre Expérience' : 'Tailor Your Experience'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#e5e2e1]">
                {language === 'fr' ? 'Envie de Prolonger la Parenthèse ?' : 'Select Romantic Add-on Packs'}
              </h2>
              <p className="text-xs sm:text-sm text-[#d0c5af] font-light mt-1">
                {language === 'fr'
                  ? 'Ajoutez des prestations pour sublimer votre nuitée (optionnelles).'
                  : 'Add bespoke extras to make your stay truly memorable (optional).'}
              </p>
            </div>

            {/* Addons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ROMANTIC_ADDONS.map((pack) => {
                const Icon = pack.icon;
                const isSelected = selectedPacks.includes(pack.id);
                return (
                  <div
                    key={pack.id}
                    onClick={() => togglePack(pack.id)}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#262219] border-[#f2ca50] shadow-[0_0_25px_rgba(242,202,80,0.15)]'
                        : 'bg-[#1b1a1a] border-white/5 hover:border-[#f2ca50]/30'
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#f2ca50]">
                          <Icon className="w-5 h-5" />
                          <span className="font-serif text-base sm:text-lg font-semibold text-white">
                            {language === 'fr' ? pack.name : pack.nameEn}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#f2ca50] bg-[#f2ca50]/15 px-2.5 py-0.5 rounded-full">
                          +{pack.price} €
                        </span>
                      </div>

                      <p className="text-xs text-[#c9c6bf] font-light leading-relaxed">
                        {language === 'fr' ? pack.summary : pack.summaryEn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5">
                      <span className="text-[11px] text-[#99907c]">
                        {language === 'fr' ? pack.badge : pack.badgeEn}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-[#22c55e]' : 'text-[#f2ca50]'
                        }`}
                      >
                        {isSelected
                          ? (language === 'fr' ? '✓ Sélectionné' : '✓ Added')
                          : (language === 'fr' ? '+ Ajouter' : '+ Add')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing Recap Box */}
            <div className="rounded-xl bg-[#101010] p-4 sm:p-5 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 text-xs">
              <div>
                <span className="text-[#99907c] block">{language === 'fr' ? 'OPTIONS SÉLECTIONNÉES' : 'SELECTED ADD-ONS'}</span>
                <span className="font-bold text-sm text-white">+{calculatePacksTotal()} €</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[#99907c] block">{language === 'fr' ? 'TOTAL DU SÉJOUR' : 'TOTAL STAY PRICE'}</span>
                <span className="font-serif text-3xl font-bold text-[#f2ca50]">
                  {calculateTotal()} €
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between items-stretch sm:items-center pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#222121] hover:bg-[#2d2c2c] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'fr' ? 'Retour aux Dates' : 'Back to Dates'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>{language === 'fr' ? 'Étape Suivante : Vos Coordonnées' : 'Next: Your Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: GUEST INFORMATION & FINAL CONFIRMATION */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-widest block mb-1">
                {language === 'fr' ? 'Dernière Étape' : 'Final Step'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#e5e2e1]">
                {language === 'fr' ? 'Vos Coordonnées & Confirmation' : 'Guest Details & Instant Booking'}
              </h2>
              <p className="text-xs sm:text-sm text-[#d0c5af] font-light mt-1">
                {language === 'fr'
                  ? 'Votre code d’accès secret vous sera transmis sur ces coordonnées par SMS et email.'
                  : 'Your personal keyless access code will be sent to these contact details.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-[#2a1a1a] border border-[#ef4444]/40 text-[#f87171] text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleConfirm} className="space-y-5">
              {/* Invisible Honeypot Field for Spam Bot Protection */}
              <input
                type="text"
                name="hp_company_field"
                value={hpCompanyField}
                onChange={(e) => setHpCompanyField(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider">
                    {language === 'fr' ? 'Nom Complet *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Alexandre de Valois"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#101010] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#f2ca50] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider">
                    {language === 'fr' ? 'Téléphone Mobile *' : 'Mobile Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="06 00 00 00 00"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#101010] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#f2ca50] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider">
                  {language === 'fr' ? 'Adresse Email *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="alexandre@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[#101010] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#f2ca50] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider">
                  {language === 'fr' ? 'Message ou demande particulière (optionnel)' : 'Special Requests (optional)'}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    language === 'fr'
                      ? 'Heure d’arrivée approximative, mot d’amour pour le pack romance...'
                      : 'Approximate arrival time, special message for romance pack...'
                  }
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#101010] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#f2ca50] transition-colors resize-none"
                />
              </div>

              {/* Order Recap Card */}
              <div className="rounded-2xl bg-[#101010] p-5 border border-[#f2ca50]/20 flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-center text-sm font-semibold text-white">
                  <span>{currentApartment.title}</span>
                  <span className="font-serif text-lg text-[#f2ca50]">{calculateTotal()} €</span>
                </div>
                <div className="text-[#99907c] text-[11px] leading-relaxed flex flex-col gap-1">
                  <span>• Du {checkInDate} au {checkOutDate} ({stayPricing.nightsCount} nuitée(s) : {stayPricing.baseAmountEUR} €)</span>
                  {selectedPacks.length > 0 && (
                    <span>
                      • Options : {selectedPacks.map(id => ROMANTIC_ADDONS.find(p => p.id === id)?.name).filter(Boolean).join(', ')} (+{calculatePacksTotal()} €)
                    </span>
                  )}
                  <span>• Caution par simple empreinte bancaire : 250 € (aucun débit effectué)</span>
                  <span>• Arrivée autonome 24h/24 par serrure connectée</span>
                  <span>• Taxe de séjour & ménage complet inclus</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between items-stretch sm:items-center pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#222121] hover:bg-[#2d2c2c] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'fr' ? 'Retour aux Packs' : 'Back to Packs'}</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-widest luxury-shimmer-btn flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <span>{language === 'fr' ? 'Validation en cours...' : 'Processing...'}</span>
                  ) : (
                    <span>{language === 'fr' ? 'Confirmer la Réservation Immédiate' : 'Confirm Immediate Booking'}</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && confirmedBooking && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto border border-[#22c55e]/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-widest block mb-1">
                {language === 'fr' ? 'Félicitations' : 'Congratulations'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                {language === 'fr' ? 'Votre Réservation est Confirmée !' : 'Your Reservation is Confirmed!'}
              </h2>
              <p className="text-xs sm:text-sm text-[#d0c5af] font-light max-w-md mx-auto mt-2">
                {language === 'fr'
                  ? 'Un récapitulatif ainsi que vos consignes d’accès autonome vous ont été envoyés par email et SMS.'
                  : 'A confirmation summary and keyless access details have been sent to your email and phone.'}
              </p>
            </div>

            {/* Booking Reference Box */}
            <div className="max-w-md mx-auto rounded-2xl bg-[#101010] p-6 border border-[#f2ca50]/30 text-xs flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[#99907c]">{language === 'fr' ? 'NUMÉRO DE RÉSERVATION' : 'BOOKING REFERENCE'}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#f2ca50] text-sm">
                    {confirmedBooking.id}
                  </span>
                  <button
                    onClick={copyBookingCode}
                    className="p-1 hover:text-[#f2ca50] transition-colors cursor-pointer"
                    title="Copier"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[#99907c]">{language === 'fr' ? 'SUITE' : 'SUITE'}</span>
                <span className="font-medium text-white">{currentApartment.title}</span>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[#99907c]">{language === 'fr' ? 'DATES' : 'DATES'}</span>
                <span className="font-medium text-white">{checkInDate} → {checkOutDate}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#99907c]">{language === 'fr' ? 'MONTANT TOTAL' : 'TOTAL AMOUNT'}</span>
                <span className="font-serif text-xl font-bold text-[#f2ca50]">
                  {confirmedBooking.totalAmount || calculateTotal()} €
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onComplete}
                className="px-8 py-3.5 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                {language === 'fr' ? 'Fermer & Continuer' : 'Close & Continue'}
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Dual Month Calendar Modal matching user screenshot */}
      <BookingCalendar
        asModal={true}
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onSelectDates={(newIn, newOut) => {
          setCheckInDate(newIn);
          setCheckOutDate(newOut);
        }}
      />
    </div>
  );
}
