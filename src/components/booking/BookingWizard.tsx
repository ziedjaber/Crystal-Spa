'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Download,
  Copy,
  Check,
  Plus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Service, SERVICES_DATA, THERAPISTS_DATA, Therapist } from '@/data/services';
import LuxuryLoader from '@/components/ui/LuxuryLoader';

interface BookingWizardProps {
  initialService?: Service | null;
  onComplete?: () => void;
}

const ADD_ONS = [
  { id: 'aromatherapy', name: 'Custom Essential Oil Aromatherapy', price: 25 },
  { id: 'scalp-massage', name: '15-Min Quartz Scalp Treatment', price: 35 },
  { id: 'mud-wrap', name: 'Geothermal Hydrating Back Mask', price: 40 },
];

const TIME_SLOTS = [
  '09:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'
];

export default function BookingWizard({ initialService, onComplete }: BookingWizardProps) {
  const [step, setStep] = useState<number>(1);
  
  // Form State
  const [selectedService, setSelectedService] = useState<Service>(initialService || SERVICES_DATA[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [bookingTime, setBookingTime] = useState<string>('02:30 PM');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [hpCompanyField, setHpCompanyField] = useState<string>('');

  // Status State
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    let base = selectedService ? selectedService.priceUSD : 0;
    selectedAddons.forEach((id) => {
      const found = ADD_ONS.find((a) => a.id === id);
      if (found) base += found.price;
    });
    return base;
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      setErrorMsg('Please fill in your name, email, and phone number.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentId: 'a2',
          serviceId: selectedService.id,
          serviceTitle: selectedService.title,
          therapistName: selectedTherapist ? selectedTherapist.name : 'Any Available Master Specialist',
          date: `${bookingDate} → ${bookingDate}`,
          checkInDate: bookingDate,
          checkOutDate: bookingDate,
          timeSlot: bookingTime,
          guestName: guestName.trim(),
          guestEmail: guestEmail.trim(),
          guestPhone: guestPhone.trim(),
          notes: notes.trim(),
          hp_company_field: hpCompanyField,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 429) {
        setErrorMsg('Too many requests. Please wait a minute before trying again.');
        return;
      }

      if (data.success) {
        setConfirmedBooking(data.data);
        setStep(5);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMsg(data.error || 'Failed to complete reservation. Please check your information.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg('Secure connection error. Please try again.');
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 relative">
      {/* Luxury Loader Overlay during confirmation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070707]/90 backdrop-blur-xl p-4"
          >
            <LuxuryLoader
              variant="modal"
              title="CRYSTAL SANCTUARY"
              subtitle="Sécurisation de votre réservation d’exception..."
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Step Indicator Header */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
            <span className="text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" /> STEP {step} OF 4
            </span>
            <span>
              {step === 1 && 'Select Ritual & Upgrades'}
              {step === 2 && 'Select Practitioner'}
              {step === 3 && 'Pick Date & Time'}
              {step === 4 && 'Guest Details & Confirm'}
            </span>
          </div>
          
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-teal-900/40">
            <motion.div
              className="bg-gradient-to-r from-teal-400 via-amber-400 to-amber-500 h-full rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${step * 25}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      {/* Main Form Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border-teal-500/25 shadow-2xl relative">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SERVICE & ADDONS */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                  Select Your Treatment Ritual
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Choose your primary service. Includes complimentary thermal hydro bath access.
                </p>
              </div>

              {/* Service Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES_DATA.map((srv) => {
                  const isSelected = selectedService.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'bg-teal-950/80 border-amber-400 shadow-lg shadow-amber-500/10'
                          : 'bg-slate-900/60 border-teal-900/50 hover:border-teal-700/60'
                      }`}
                    >
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold text-slate-100 line-clamp-1">{srv.title}</h3>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                          </div>
                          <span className="text-xs text-teal-300">{srv.durationMinutes} Mins</span>
                        </div>
                        <span className="text-sm font-serif font-bold text-amber-300">${srv.priceUSD}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-ons Section */}
              <div className="pt-6 border-t border-teal-900/40 space-y-4">
                <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  Enhance Your Ritual (Optional Add-ons)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ADD_ONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-amber-500/10 border-amber-400 text-amber-200'
                            : 'bg-slate-950/60 border-teal-900/50 text-slate-300 hover:border-teal-700'
                        }`}
                      >
                        <div>
                          <span className="block font-medium">{addon.name}</span>
                          <span className="text-amber-300 font-bold">+${addon.price}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isChecked ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-600'}`}>
                          {isChecked ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer step button */}
              <div className="pt-6 border-t border-teal-900/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Investment</span>
                  <span className="text-2xl font-serif font-bold text-amber-300">${calculateTotal()}</span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all flex items-center gap-2 cursor-pointer"
                >
                  NEXT: PRACTITIONER
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELECT THERAPIST */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                  Choose Practitioner
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Select a master therapist or allow us to assign the first available practitioner.
                </p>
              </div>

              {/* Any available option */}
              <div
                onClick={() => setSelectedTherapist(null)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedTherapist === null
                    ? 'bg-teal-950/80 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-teal-900/50 hover:border-teal-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-900/60 border border-teal-700/50 flex items-center justify-center text-teal-300 font-bold">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">Any Available Specialist</h3>
                    <p className="text-xs text-slate-400">Assigned automatically based on optimal time slot availability.</p>
                  </div>
                </div>
                {selectedTherapist === null && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
              </div>

              {/* Therapist Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {THERAPISTS_DATA.map((t) => {
                  const isSelected = selectedTherapist?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTherapist(t)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'bg-teal-950/80 border-amber-400 shadow-lg shadow-amber-500/10'
                          : 'bg-slate-900/60 border-teal-900/50 hover:border-teal-700'
                      }`}
                    >
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover shrink-0 border border-teal-700/50"
                      />
                      <div className="flex flex-col justify-center flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-slate-100">{t.name}</h3>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </div>
                        <span className="text-xs text-amber-300/90">{t.title}</span>
                        <span className="text-[11px] text-slate-400">{t.specialty}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer step buttons */}
              <div className="pt-6 border-t border-teal-900/40 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all flex items-center gap-2 cursor-pointer"
                >
                  NEXT: DATE & TIME
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PICK DATE & TIME */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                  Select Date & Time Slot
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Pick your preferred appointment date and private suite arrival time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-950/80 border border-teal-800/60 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                    Selected Therapist
                  </label>
                  <div className="p-3 bg-slate-950/80 border border-teal-800/60 rounded-xl text-xs text-slate-200 flex items-center justify-between">
                    <span>{selectedTherapist ? selectedTherapist.name : 'Any Available Specialist'}</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider">
                  Available Arrival Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = bookingTime === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setBookingTime(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                            : 'bg-slate-950/60 border-teal-900/50 text-slate-300 hover:border-teal-700'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer step buttons */}
              <div className="pt-6 border-t border-teal-900/40 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all flex items-center gap-2 cursor-pointer"
                >
                  NEXT: GUEST INFO
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: GUEST INFO & CONFIRM */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                  Guest Information & Final Confirmation
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Please provide your contact details for confirmation notifications and concierge check-in.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleConfirmBooking} className="space-y-4">
                {/* Invisible Honeypot Field */}
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
                  <div>
                    <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Victoria Sterling"
                      className="w-full bg-slate-950/80 border border-teal-800/60 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. victoria@example.com"
                      className="w-full bg-slate-950/80 border border-teal-800/60 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-950/80 border border-teal-800/60 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                      Special Requests / Notes
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Allergies, pressure preference, etc."
                      className="w-full bg-slate-950/80 border border-teal-800/60 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Booking Summary Box */}
                <div className="p-4 rounded-2xl bg-teal-950/50 border border-teal-800/50 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Treatment:</span>
                    <span className="font-bold text-slate-100">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="font-bold text-amber-300">{bookingDate} at {bookingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Practitioner:</span>
                    <span>{selectedTherapist ? selectedTherapist.name : 'Any Available Specialist'}</span>
                  </div>
                  <div className="flex justify-between border-t border-teal-900/60 pt-2 font-bold text-sm">
                    <span>Total Amount Due at Check-in:</span>
                    <span className="text-amber-300 font-serif text-lg">${calculateTotal()}</span>
                  </div>
                </div>

                {/* Footer step buttons */}
                <div className="pt-6 border-t border-teal-900/40 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> BACK
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'CONFIRMING...' : 'CONFIRM RESERVATION'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS CONFIRMATION RECEIPT */}
          {step === 5 && confirmedBooking && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-teal-500/30">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                  RESERVATION CONFIRMED
                </span>
                <h2 className="font-serif text-3xl font-bold text-slate-100 mt-1">
                  We Look Forward to Welcoming You
                </h2>
                <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                  A confirmation email has been dispatched to <span className="text-amber-300">{confirmedBooking.guestEmail}</span>.
                </p>
              </div>

              {/* Receipt Ticket Box */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-950/90 border border-amber-500/30 text-left space-y-3 relative shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block">BOOKING REFERENCE</span>
                    <span className="font-mono text-lg font-bold text-amber-300">{confirmedBooking.id}</span>
                  </div>
                  <button
                    onClick={copyBookingCode}
                    className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 p-1.5 rounded bg-teal-950/80"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Guest Name:</span>
                    <span className="font-medium text-slate-100">{confirmedBooking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Treatment:</span>
                    <span className="font-medium text-slate-100">{confirmedBooking.serviceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="font-bold text-amber-300">{confirmedBooking.date} @ {confirmedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Practitioner:</span>
                    <span>{confirmedBooking.therapistName}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Amount Payable at Spa:</span>
                  <span className="font-serif font-bold text-xl text-amber-300">${confirmedBooking.totalAmount}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setStep(1);
                    if (onComplete) onComplete();
                  }}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 transition-all cursor-pointer"
                >
                  DONE / BOOK ANOTHER
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
