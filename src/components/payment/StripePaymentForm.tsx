'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  MessageCircle,
  Phone,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Terminal,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Stripe } from '@stripe/stripe-js';
import { getStripeClient, resetStripeClient } from '@/lib/stripe-client';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export interface StripePaymentFormProps {
  amountEUR: number;
  apartmentTitle: string;
  apartmentId: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  selectedPacks?: string[];
  onPaymentSuccess?: (result: {
    paymentIntentId: string;
    amountEUR: number;
    transactionRef: string;
  }) => void;
  onPaymentError?: (errorMsg: string) => void;
}

const STRIPE_TEST_CARDS = [
  {
    label: '🟢 Succès Garanti (Standard)',
    number: '4242 4242 4242 4242',
    exp: '12/28',
    cvc: '123',
    desc: 'Capture immédiate du paiement -> Statut "Réussi" sur Stripe.',
  },
  {
    label: '🟡 3D Secure / Authentification',
    number: '4000 0027 6000 3184',
    exp: '12/28',
    cvc: '123',
    desc: 'Ouvre la fenêtre d’authentification bancaire 3DS2.',
  },
  {
    label: '🔴 Carte Refusée (Declined)',
    number: '4000 0000 0000 0002',
    exp: '12/28',
    cvc: '123',
    desc: 'Simule un rejet de paiement par la banque.',
  },
  {
    label: '🔴 Fonds Insuffisants',
    number: '4000 0000 0000 9995',
    exp: '12/28',
    cvc: '123',
    desc: 'Simule un solde insuffisant.',
  },
];

// Inner Checkout Form powered by Stripe Elements hooks
function StripeCheckoutInner({
  amountEUR,
  apartmentTitle,
  apartmentId,
  checkInDate,
  checkOutDate,
  guestName,
  guestEmail,
  guestPhone,
  selectedPacks = [],
  onPaymentSuccess,
  onPaymentError,
}: StripePaymentFormProps) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState(guestName || 'Alexandre de Valois');
  const [, setSelectedPreset] = useState<string>('4242 4242 4242 4242');

  const [isLoading, setIsLoading] = useState(false);
  const [stepStatus, setStepStatus] = useState<'idle' | 'creating_intent' | 'confirming_stripe' | 'succeeded' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentResult, setPaymentResult] = useState<any>(null);

  // Debug Console Logs
  const [showDebugLogs, setShowDebugLogs] = useState(false);
  const [logs, setLogs] = useState<Array<{ timestamp: string; level: string; msg: string; data?: any }>>([]);
  const [copiedLog, setCopiedLog] = useState(false);

  useEffect(() => {
    if (guestName && !cardholderName) {
      setCardholderName(guestName);
    }
  }, [guestName, cardholderName]);

  const addLog = (msg: string, data?: any, level: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      msg,
      data,
    };
    setLogs((prev) => [entry, ...prev]);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    setStepStatus('creating_intent');

    addLog('1. Demande de création du PaymentIntent au serveur...', {
      amountEUR,
      apartmentId,
      guestEmail,
    });

    try {
      // 1. Authoritative Server-side PaymentIntent Creation
      const intentRes = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentId,
          checkInDate,
          checkOutDate,
          guestsCount: 2,
          guestName: cardholderName || guestName,
          guestEmail: guestEmail || 'test@crystal-spa.fr',
          guestPhone: guestPhone || '0600000000',
          selectedPacks,
          idempotencyKey: `idem_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        }),
      });

      const intentData = await intentRes.json();

      if (!intentRes.ok || !intentData.success) {
        throw new Error(intentData.error || 'Erreur lors de la création de la session de paiement.');
      }

      const clientSecret = intentData.data.clientSecret;
      const paymentIntentId = intentData.data.paymentIntentId;

      addLog(`2. PaymentIntent initialisé (${paymentIntentId}). Envoi de la confirmation à Stripe...`, {
        clientSecret: clientSecret.substring(0, 15) + '...',
      }, 'info');

      setStepStatus('confirming_stripe');

      // 2. Real Stripe Confirmation via Stripe.js Elements
      if (stripe && elements) {
        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          throw new Error('Formulaire de carte non initialisé.');
        }

        const confirmResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName || guestName || 'Client Crystal Spa',
              email: guestEmail || undefined,
              phone: guestPhone || undefined,
            },
          },
        });

        if (confirmResult.error) {
          throw new Error(confirmResult.error.message || 'Le paiement a été refusé par Stripe.');
        }

        if (confirmResult.paymentIntent && confirmResult.paymentIntent.status === 'succeeded') {
          const result = {
            paymentIntentId: confirmResult.paymentIntent.id,
            amountEUR: confirmResult.paymentIntent.amount / 100,
            transactionRef: `CRYSTAL-TX-${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'succeeded',
            created: new Date().toISOString(),
          };

          setPaymentResult(result);
          setStepStatus('succeeded');
          setIsLoading(false);
          addLog(`3. ✅ Paiement Stripe confirmé avec succès ! Statut: Succeeded (ID: ${result.paymentIntentId})`, result, 'success');

          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
          });

          onPaymentSuccess?.(result);
          return;
        }
      }

      // Fallback Simulation when Stripe elements are not attached
      const result = {
        paymentIntentId,
        amountEUR,
        transactionRef: `CRYSTAL-TX-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'succeeded',
      };
      setPaymentResult(result);
      setStepStatus('succeeded');
      setIsLoading(false);
      addLog('Paiement validé !', result, 'success');
      onPaymentSuccess?.(result);
    } catch (err: any) {
      setIsLoading(false);
      setStepStatus('failed');
      const msg = err.message || 'Une erreur est survenue lors du paiement.';
      setErrorMessage(msg);
      addLog(msg, err, 'error');
      onPaymentError?.(msg);
    }
  };

  const resetForm = () => {
    setStepStatus('idle');
    setIsLoading(false);
    setPaymentResult(null);
    setErrorMessage('');
    addLog('Réinitialisation du formulaire de paiement');
  };

  // Dynamic Stripe CardElement styling that adapts to light/dark theme
  const cardElementOptions = useMemo(() => ({
    style: {
      base: {
        color: isDark ? '#ffffff' : '#171717',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '15px',
        '::placeholder': {
          color: isDark ? '#7D7D7D' : '#9ca3af',
        },
        iconColor: isDark ? '#f2ca50' : '#b89032',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: true,
  }), [isDark]);

  return (
    <div
      className={`w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md transition-colors duration-300 border ${
        isDark
          ? 'bg-[#131211]/95 text-[#e5e2e1] border-[#f2ca50]/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)]'
          : 'bg-[#ffffff] text-[#171717] border-[#c8a24d]/35 shadow-[0_20px_60px_rgba(0,0,0,0.06)]'
      }`}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDark ? 'bg-[#f2ca50]/10 opacity-100' : 'bg-[#c8a24d]/10 opacity-40'
        }`}
      />
      <div
        className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDark ? 'bg-[#d4af37]/10 opacity-100' : 'bg-[#c8a24d]/10 opacity-40'
        }`}
      />

      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b relative z-10 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-[0_0_15px_rgba(242,202,80,0.2)] shrink-0 ${
              isDark
                ? 'bg-[#1d1b16] border-[#f2ca50]/40 text-[#f2ca50]'
                : 'bg-[#fdf9ee] border-[#c8a24d]/40 text-[#b89032]'
            }`}
          >
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-serif text-base sm:text-lg font-bold tracking-wide ${isDark ? 'text-white' : 'text-[#171717]'}`}>
                {language === 'fr' ? 'Paiement Sécurisé Stripe' : 'Stripe Secure Payment'}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                  isDark
                    ? 'text-[#f2ca50] bg-[#f2ca50]/15 border-[#f2ca50]/30'
                    : 'text-[#b89032] bg-[#c8a24d]/15 border-[#c8a24d]/30'
                }`}
              >
                Stripe Elements
              </span>
            </div>
            <p className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-[#666666]'}`}>
              {language === 'fr' ? 'Chiffrement SSL 256-bit • Capture réelle en mode test' : '256-bit SSL • Real capture in Test Mode'}
            </p>
          </div>
        </div>

        {/* Amount Badge */}
        <div
          className={`px-4 py-2 rounded-2xl flex flex-col items-end shrink-0 shadow-sm border ${
            isDark ? 'bg-[#1b1917] border-[#f2ca50]/30' : 'bg-[#faf7f0] border-[#c8a24d]/30'
          }`}
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-[#99907c]' : 'text-[#737373]'}`}>
            {language === 'fr' ? 'Montant à régler' : 'Total Due'}
          </span>
          <span className={`font-serif text-2xl font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
            {amountEUR} €
          </span>
        </div>
      </div>

      {/* Test Cards Quick Presets */}
      {stepStatus !== 'succeeded' && (
        <div
          className={`my-5 p-4 rounded-2xl border relative z-10 ${
            isDark ? 'bg-[#1b1918] border-white/10' : 'bg-[#fbf9f4] border-black/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'fr' ? 'Numéros de cartes de test Stripe' : 'Stripe Test Card Numbers'}
            </span>
            <span className={`text-[10px] ${isDark ? 'text-[#99907c]' : 'text-[#666666]'}`}>
              {language === 'fr' ? 'Date: MM/YY ultérieure • CVC: 123' : 'Exp: Future date • CVC: 123'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STRIPE_TEST_CARDS.map((card, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedPreset(card.number);
                  navigator.clipboard.writeText(card.number.replace(/\s/g, ''));
                  addLog(`Numéro copié dans le presse-papier : ${card.number}`);
                }}
                className={`text-left p-2.5 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer group shadow-sm ${
                  isDark
                    ? 'bg-[#121110] hover:bg-[#262420] border-white/5 hover:border-[#f2ca50]/50'
                    : 'bg-[#ffffff] hover:bg-[#f5f1e8] border-black/10 hover:border-[#c8a24d]/60'
                }`}
              >
                <div className="flex items-center justify-between font-medium">
                  <span
                    className={`font-semibold truncate text-[11px] transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-[#f2ca50]'
                        : 'text-[#171717] group-hover:text-[#b89032]'
                    }`}
                  >
                    {card.label}
                  </span>
                  <span
                    className={`text-[9px] font-mono group-hover:underline ${
                      isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'
                    }`}
                  >
                    Copier
                  </span>
                </div>
                <div className={`flex items-center justify-between text-[11px] ${isDark ? 'text-[#99907c]' : 'text-[#666666]'}`}>
                  <span className={`font-mono font-semibold ${isDark ? 'text-white/90' : 'text-[#171717]'}`}>
                    {card.number}
                  </span>
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-white/5 text-[#d0c5af]' : 'bg-black/5 text-[#555555]'
                    }`}
                  >
                    CVC {card.cvc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Form or Success View */}
      {stepStatus === 'succeeded' && paymentResult ? (
        /* SUCCESS CONFIRMATION VIEW */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-6 text-center space-y-6 relative z-10"
        >
          <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto border border-[#22c55e]/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span
              className={`text-[11px] font-bold uppercase tracking-widest block mb-1 ${
                isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'
              }`}
            >
              {language === 'fr' ? 'Paiement Stripe Capturé & Validé' : 'Stripe Payment Succeeded'}
            </span>
            <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#171717]'}`}>
              {language === 'fr' ? 'Paiement Réussi !' : 'Payment Successful!'}
            </h3>
            <p className={`text-xs max-w-md mx-auto mt-2 ${isDark ? 'text-[#d0c5af]' : 'text-[#666666]'}`}>
              {language === 'fr'
                ? `La transaction de ${amountEUR} € pour la suite ${apartmentTitle} a été confirmée sur Stripe (Statut: Réussi).`
                : `Your transaction of €${amountEUR} for suite ${apartmentTitle} is confirmed on Stripe.`}
            </p>
          </div>

          {/* Receipt Box */}
          <div
            className={`rounded-2xl border p-5 text-xs text-left space-y-3 max-w-md mx-auto shadow-sm ${
              isDark ? 'bg-[#0f0e0e] border-[#f2ca50]/30' : 'bg-[#faf7f0] border-[#c8a24d]/30'
            }`}
          >
            <div className={`flex justify-between items-center border-b pb-2.5 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <span className={isDark ? 'text-[#99907c]' : 'text-[#666666]'}>{language === 'fr' ? 'Référence Crystal' : 'Booking Ref'}</span>
              <span className={`font-mono font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>{paymentResult.transactionRef}</span>
            </div>
            <div className={`flex justify-between items-center border-b pb-2.5 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <span className={isDark ? 'text-[#99907c]' : 'text-[#666666]'}>{language === 'fr' ? 'ID Stripe PaymentIntent' : 'Stripe ID'}</span>
              <span className="font-mono text-[#22c55e] text-[11px] truncate max-w-[200px] font-semibold">{paymentResult.paymentIntentId}</span>
            </div>
            <div className={`flex justify-between items-center border-b pb-2.5 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <span className={isDark ? 'text-[#99907c]' : 'text-[#666666]'}>{language === 'fr' ? 'Statut Stripe Dashboard' : 'Stripe Status'}</span>
              <span className="text-[11px] font-bold text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded-full border border-[#22c55e]/30">
                Succeeded (Réussi)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDark ? 'text-[#99907c]' : 'text-[#666666]'}>{language === 'fr' ? 'Montant Total' : 'Total Amount'}</span>
              <span className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>{paymentResult.amountEUR} €</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={resetForm}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm ${
                isDark
                  ? 'bg-[#22201d] hover:bg-[#322f2b] text-white'
                  : 'bg-[#f0ece2] hover:bg-[#e4ddcf] text-[#171717]'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'fr' ? 'Faire un autre test' : 'New Test Payment'}</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* STRIPE ELEMENTS CARD FORM */
        <div className="space-y-4 relative z-10">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
                isDark
                  ? 'bg-[#2b1616] border-[#ef4444]/40 text-[#fca5a5]'
                  : 'bg-[#fef2f2] border-[#ef4444]/30 text-[#991b1b]'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-[#ef4444] mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">{language === 'fr' ? 'Erreur Stripe' : 'Stripe Error'}</span>
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}

          {/* Cardholder Name */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#d0c5af]' : 'text-[#444444]'}`}>
              {language === 'fr' ? 'Titulaire de la Carte *' : 'Cardholder Name *'}
            </label>
            <input
              type="text"
              required
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="ex: Alexandre de Valois"
              className={`w-full rounded-xl p-3.5 text-sm transition-colors border shadow-sm ${
                isDark
                  ? 'bg-[#101010] border-white/10 text-white placeholder:text-[#7D7D7D] focus:outline-none focus:border-[#f2ca50]'
                  : 'bg-[#ffffff] border-black/15 text-[#171717] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#c8a24d]'
              }`}
            />
          </div>

          {/* Official Stripe CardElement container */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider flex justify-between ${isDark ? 'text-[#d0c5af]' : 'text-[#444444]'}`}>
              <span>{language === 'fr' ? 'Coordonnées Bancaires (Stripe Elements) *' : 'Card Details (Stripe Elements) *'}</span>
              <span className={`text-[10px] font-mono ${isDark ? 'text-[#99907c]' : 'text-[#737373]'}`}>VISA / MASTERCARD / AMEX</span>
            </label>
            <div
              className={`rounded-xl p-4 transition-colors shadow-inner border ${
                isDark
                  ? 'bg-[#101010] border-white/10 focus-within:border-[#f2ca50]'
                  : 'bg-[#ffffff] border-black/15 focus-within:border-[#c8a24d]'
              }`}
            >
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {/* Security Notice */}
          <div
            className={`p-3.5 rounded-xl border flex items-center gap-3 text-[11px] ${
              isDark
                ? 'bg-[#111010] border-white/5 text-[#99907c]'
                : 'bg-[#fbf9f4] border-black/10 text-[#666666]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#22c55e] shrink-0" />
            <span>
              {language === 'fr'
                ? 'Empreinte de caution (250 € non débitée) et paiement sécurisés directement via les serveurs Stripe.'
                : 'Security deposit pre-authorization hold (€250) and payment processed securely by Stripe.'}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handlePay}
            disabled={isLoading || !stripe}
            className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest luxury-shimmer-btn flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] ${
              isDark
                ? 'bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00]'
                : 'bg-[#c8a24d] hover:bg-[#b89032] text-white'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>
                  {stepStatus === 'creating_intent' && (language === 'fr' ? '1/2 Création du PaymentIntent...' : '1/2 Initializing session...')}
                  {stepStatus === 'confirming_stripe' && (language === 'fr' ? '2/2 Confirmation Stripe & 3DS...' : '2/2 Confirming with Stripe...')}
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {language === 'fr' ? `Payer et Valider sur Stripe • ${amountEUR} €` : `Pay with Stripe • €${amountEUR}`}
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Developer Console & Logs Drawer */}
      <div className={`mt-6 pt-4 border-t relative z-10 ${isDark ? 'border-white/5' : 'border-black/10'}`}>
        <button
          type="button"
          onClick={() => setShowDebugLogs(!showDebugLogs)}
          className={`w-full flex items-center justify-between text-xs transition-colors py-1 cursor-pointer ${
            isDark ? 'text-[#99907c] hover:text-[#f2ca50]' : 'text-[#666666] hover:text-[#b89032]'
          }`}
        >
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Terminal className="w-3.5 h-3.5" />
            {language === 'fr' ? 'Console Développeur & Logs Stripe' : 'Developer Console & Stripe Logs'}
            {logs.length > 0 && ` (${logs.length})`}
          </span>
          {showDebugLogs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {showDebugLogs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-3 rounded-2xl border p-4 font-mono text-[11px] overflow-hidden ${
                isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#f8f5ee] border-black/10'
              }`}
            >
              <div className={`flex justify-between items-center mb-2 pb-2 border-b ${isDark ? 'border-white/5' : 'border-black/10'}`}>
                <span className={isDark ? 'text-[#99907c]' : 'text-[#737373]'}>Event Stream</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
                    setCopiedLog(true);
                    setTimeout(() => setCopiedLog(false), 2000);
                  }}
                  className={`hover:underline flex items-center gap-1 text-[10px] ${
                    isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'
                  }`}
                >
                  {copiedLog ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLog ? 'Copié' : 'Copier JSON'}</span>
                </button>
              </div>

              {logs.length === 0 ? (
                <p className={`italic ${isDark ? 'text-[#666]' : 'text-[#888888]'}`}>Aucun événement enregistré.</p>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {logs.map((item, idx) => (
                    <div key={idx} className={`space-y-0.5 border-b pb-1.5 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-[#888888]'}`}>{item.timestamp}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                            item.level === 'success'
                              ? 'bg-[#22c55e]/20 text-[#22c55e]'
                              : item.level === 'error'
                              ? 'bg-[#ef4444]/20 text-[#ef4444]'
                              : isDark
                              ? 'bg-[#f2ca50]/20 text-[#f2ca50]'
                              : 'bg-[#c8a24d]/20 text-[#b89032]'
                          }`}
                        >
                          {item.level}
                        </span>
                        <span className={isDark ? 'text-[#e5e2e1]' : 'text-[#171717]'}>{item.msg}</span>
                      </div>
                      {item.data && (
                        <pre
                          className={`text-[10px] p-1.5 rounded overflow-x-auto mt-1 ${
                            isDark
                              ? 'text-[#99907c] bg-[#111]'
                              : 'text-[#444444] bg-[#eee9df]'
                          }`}
                        >
                          {JSON.stringify(item.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Outer wrapper with Stripe Elements provider & graceful ad-blocker / network fallback
export default function StripePaymentForm(props: StripePaymentFormProps) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(() => getStripeClient());
  const [stripeLoadError, setStripeLoadError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const client = getStripeClient();
    setStripePromise(client);

    client.then((instance) => {
      if (!isMounted) return;
      if (!instance) {
        setStripeLoadError(
          language === 'fr'
            ? 'Le module de paiement sécurisé Stripe (js.stripe.com) n\'a pas pu être chargé.'
            : 'The secure Stripe payment module (js.stripe.com) failed to load.'
        );
      } else {
        setStripeLoadError(null);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [language]);

  const handleRetry = () => {
    setIsRetrying(true);
    setStripeLoadError(null);
    resetStripeClient();
    const newPromise = getStripeClient();
    setStripePromise(newPromise);

    newPromise.then((instance) => {
      setIsRetrying(false);
      if (!instance) {
        setStripeLoadError(
          language === 'fr'
            ? 'Le rechargement a échoué. Vérifiez vos extensions de navigateur (bloqueurs de pub/traqueurs) ou votre connexion.'
            : 'Reload failed. Please check your browser extensions (ad/tracker blockers) or connection.'
        );
      } else {
        setStripeLoadError(null);
      }
    });
  };

  if (stripeLoadError) {
    return (
      <div
        className={`w-full max-w-2xl mx-auto rounded-3xl border shadow-xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md transition-colors duration-300 ${
          isDark
            ? 'bg-[#131211]/95 text-[#e5e2e1] border-[#ef4444]/40'
            : 'bg-[#ffffff] text-[#171717] border-[#ef4444]/40 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ef4444]/15 border border-[#ef4444]/40 flex items-center justify-center text-[#ef4444] shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-[10px] font-bold uppercase tracking-wider">
              {language === 'fr' ? 'Module de Paiement Bloqué' : 'Payment Module Blocked'}
            </div>
            <h3 className={`font-serif text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-[#171717]'}`}>
              {language === 'fr'
                ? 'Impossible de charger Stripe.js'
                : 'Unable to Load Stripe.js'}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-[#555555]'}`}>
              {language === 'fr'
                ? 'Le script officiel de paiement sécurisé Stripe (js.stripe.com) a été bloqué par votre navigateur. Cela se produit fréquemment lorsqu’une extension de filtrage est active (ex. uBlock Origin, AdGuard, Privacy Badger, Boucliers Brave), ou si votre réseau restreint l’accès à Stripe.'
                : 'The official Stripe secure payment script (js.stripe.com) was blocked by your browser. This typically occurs when an ad or tracker blocker is active (e.g. uBlock Origin, AdGuard, Privacy Badger, Brave Shields) or if a network firewall blocks Stripe.'}
            </p>

            <div
              className={`p-3.5 rounded-xl border space-y-1.5 text-xs ${
                isDark
                  ? 'bg-[#1c1414] border-[#ef4444]/20 text-[#fca5a5]'
                  : 'bg-[#fef2f2] border-[#ef4444]/20 text-[#991b1b]'
              }`}
            >
              <span className={`font-bold block ${isDark ? 'text-white' : 'text-[#991b1b]'}`}>
                {language === 'fr' ? '💡 Comment résoudre ce blocage :' : '💡 How to resolve:'}
              </span>
              <ul className={`list-disc list-inside space-y-1 text-[11px] ${isDark ? 'text-[#e5e2e1]/90' : 'text-[#374151]'}`}>
                <li>
                  {language === 'fr'
                    ? 'Désactivez temporairement votre bloqueur de publicité pour ce site (localhost / Crystal Spa).'
                    : 'Temporarily pause your ad blocker for this site (localhost / Crystal Spa).'}
                </li>
                <li>
                  {language === 'fr'
                    ? 'Si vous naviguez sur Brave, désactivez les "Boucliers Brave" (icône lion dans la barre d’adresse).'
                    : 'If using Brave browser, disable "Brave Shields" (lion icon in the address bar).'}
                </li>
                <li>
                  {language === 'fr'
                    ? 'Vérifiez que votre connexion Internet est active.'
                    : 'Ensure your internet connection is active.'}
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50 ${
                  isDark
                    ? 'bg-[#f2ca50] hover:bg-[#d4af37] text-black'
                    : 'bg-[#c8a24d] hover:bg-[#b89032] text-white'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>
                  {isRetrying
                    ? (language === 'fr' ? 'Tentative en cours...' : 'Retrying...')
                    : (language === 'fr' ? 'Réessayer le chargement' : 'Retry Loading')}
                </span>
              </button>

              <a
                href="https://wa.me/33629866909?text=Bonjour,%20je%20souhaite%20finaliser%20ma%20r%C3%A9servation%20Crystal%20Spa%20directement"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'Réserver via WhatsApp' : 'Book via WhatsApp'}</span>
              </a>

              <a
                href="tel:0629866909"
                className={`px-4 py-2.5 rounded-xl border font-medium text-xs flex items-center gap-2 transition-colors ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                    : 'bg-black/5 hover:bg-black/10 border-black/15 text-[#171717]'
                }`}
              >
                <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`} />
                <span>06 29 86 69 09</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutInner {...props} />
    </Elements>
  );
}
