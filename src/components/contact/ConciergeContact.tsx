'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, Mail, MessageSquare, CheckCircle2, Send } from 'lucide-react';

export default function ConciergeContact() {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    suite: 'Suite La Vie est Belle (Normandie)',
    date: '',
    notes: '',
    hp_website_url: '',
  });


  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: `Demande VIP: ${formData.suite} (Date souhaitée: ${formData.date || 'Non spécifiée'})`,
          message: formData.notes.trim() || `Demande d'informations pour ${formData.suite}`,
          hp_website_url: formData.hp_website_url,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 429) {
        setErrorMsg(
          language === 'fr'
            ? 'Trop de demandes. Veuillez patienter une minute avant de réessayer.'
            : 'Too many requests. Please wait a minute before retrying.'
        );
        return;
      }

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Erreur lors de l’envoi de votre demande.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Erreur réseau sécurisée. Veuillez réessayer.');
    }
  };

  return (
    <section className="w-full px-3.5 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24 bg-[#131313] border-t border-white/5" id="conciergerie-contact">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 sm:gap-16 items-center">
        
        {/* Contact Info Left */}
        <div className="lg:w-5/12 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f2ca50]">
              {t('contact.badge')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e1] font-normal">
              {t('contact.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#d0c5af] font-light leading-relaxed">
              {t('contact.desc')}
            </p>

            <div className="flex flex-col gap-3.5 pt-4 text-[#e5e2e1]">
              <a
                href="tel:+33756949490"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#2a2a2a]/80 flex items-center justify-center text-[#f2ca50] transition-transform duration-300 group-hover:scale-110 shadow-md border border-[#f2ca50]/20">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm group-hover:text-[#f2ca50] transition-colors font-light">
                  +33 (0)7 56 94 94 90 ({language === 'fr' ? 'Ligne Directe' : 'Direct Line'})
                </span>
              </a>

              <a
                href="mailto:contact@crystal-spa-privatif.com"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#2a2a2a]/80 flex items-center justify-center text-[#f2ca50] transition-transform duration-300 group-hover:scale-110 shadow-md border border-[#f2ca50]/20">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm group-hover:text-[#f2ca50] transition-colors font-light">
                  contact@crystal-spa-privatif.com
                </span>
              </a>
            </div>
          </div>

          {/* WhatsApp VIP direct button */}
          <a
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#2a2a2a]/90 hover:bg-[#353534] text-[#f2ca50] text-xs font-bold uppercase tracking-wider transition-all luxury-shimmer-btn border border-[#f2ca50]/30 shadow-lg"
            href="https://wa.me/33756949490"
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('contact.whatsapp')}</span>
          </a>
        </div>

        {/* Contact Form */}
        <div className="lg:w-7/12 w-full">
          {submitted ? (
            <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center p-8 rounded-xl bg-[#1c1b1b]/90 backdrop-blur-md border border-[#f2ca50]/40 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#f2ca50]/20 border border-[#f2ca50] flex items-center justify-center text-[#f2ca50] shadow-[0_0_25px_rgba(242,202,80,0.4)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-[#e5e2e1]">
                {language === 'fr' ? 'Demande Transmise' : 'Request Received'}
              </h3>
              <p className="text-sm text-[#d0c5af] max-w-md font-light">
                {language === 'fr'
                  ? 'Votre requête confidentielle a bien été prise en charge. Notre équipe vous contactera dans les plus brefs délais avec une proposition sur-mesure.'
                  : 'Your confidential request has been received. Our team will contact you promptly with a tailor-made proposal.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Invisible Honeypot Field for Spam Bot Protection */}
              <input
                type="text"
                name="hp_website_url"
                value={formData.hp_website_url}
                onChange={(e) => setFormData({ ...formData, hp_website_url: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {errorMsg && (
                <div className="p-3 rounded-lg bg-[#2a1a1a] border border-[#ef4444]/40 text-[#f87171] text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="concierge-name"
                    className="text-[10px] font-semibold text-[#c9c6bf] uppercase tracking-wider"
                  >
                    {language === 'fr' ? 'Nom & Prénom' : 'Full Name'}
                  </label>
                  <input
                    required
                    id="concierge-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'fr' ? 'M. / Mme Dupont' : 'Mr. / Mrs. Smith'}
                    className="w-full bg-[#0e0e0e]/80 backdrop-blur-md px-4 py-3 rounded-lg text-[#e5e2e1] text-sm outline-none border border-white/10 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="concierge-phone"
                    className="text-[10px] font-semibold text-[#c9c6bf] uppercase tracking-wider"
                  >
                    {language === 'fr' ? 'Numéro de Téléphone' : 'Phone Number'}
                  </label>
                  <input
                    required
                    id="concierge-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+33 7 00 00 00 00"
                    className="w-full bg-[#0e0e0e]/80 backdrop-blur-md px-4 py-3 rounded-lg text-[#e5e2e1] text-sm outline-none border border-white/10 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="concierge-email"
                    className="text-[10px] font-semibold text-[#c9c6bf] uppercase tracking-wider"
                  >
                    {language === 'fr' ? 'Adresse Email' : 'Email Address'}
                  </label>
                  <input
                    required
                    id="concierge-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@domaine.com"
                    className="w-full bg-[#0e0e0e]/80 backdrop-blur-md px-4 py-3 rounded-lg text-[#e5e2e1] text-sm outline-none border border-white/10 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="concierge-suite"
                    className="text-[10px] font-semibold text-[#c9c6bf] uppercase tracking-wider"
                  >
                    {language === 'fr' ? 'Suite Souhaitée' : 'Preferred Suite'}
                  </label>
                  <select
                    id="concierge-suite"
                    value={formData.suite}
                    onChange={(e) => setFormData({ ...formData, suite: e.target.value })}
                    className="w-full bg-[#0e0e0e]/80 backdrop-blur-md px-4 py-3 rounded-lg text-[#e5e2e1] text-sm outline-none border border-white/10 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] transition-colors cursor-pointer"
                  >
                    <option className="bg-[#1c1b1b]">La Vie est Belle | Spa Privatif (Rouen)</option>
                    <option className="bg-[#1c1b1b]">Suite Diamant Noir (Paris)</option>
                    <option className="bg-[#1c1b1b]">Master Crystal Royale (110m²)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="concierge-notes"
                  className="text-[10px] font-semibold text-[#c9c6bf] uppercase tracking-wider"
                >
                  {language === 'fr' ? 'Demandes Particulières ou Surprise' : 'Special Requests or Surprises'}
                </label>
                <textarea
                  id="concierge-notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    language === 'fr'
                      ? 'Précisez votre heure d’arrivée souhaitée, surprise romantique, pétales, champagne...'
                      : 'Specify desired check-in time, romantic surprises, rose petals, champagne...'
                  }
                  className="w-full bg-[#0e0e0e]/80 backdrop-blur-md p-4 rounded-lg text-[#e5e2e1] text-sm outline-none border border-white/10 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] font-bold text-xs uppercase tracking-widest luxury-shimmer-btn shadow-xl shadow-[#d4af37]/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {loading
                    ? (language === 'fr' ? 'Transmission en cours...' : 'Sending...')
                    : t('contact.submit')}
                </span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
