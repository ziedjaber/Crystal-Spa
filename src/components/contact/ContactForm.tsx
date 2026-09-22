'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'What is included with my treatment booking?',
    a: 'All treatment bookings include 60 minutes of complimentary access to our quiet thermal hydro pool, Himalayan salt cedar sauna, and relaxation lounge prior to or following your session.',
  },
  {
    q: 'What should I wear or bring during my visit?',
    a: 'Plush robes, slippers, towels, and lockable private lockers are provided upon check-in. Swimwear is required for thermal hydro pools.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'We request at least 24 hours advance notice for cancellations or rescheduling to avoid a fee.',
  },
  {
    q: 'Are couples private suites available?',
    a: 'Yes! Our Master Couples Sanctuary includes dual side-by-side treatment tables, private rose petal Jacuzzi hydro-tub, and organic refreshments.',
  },
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [hpWebsiteUrl, setHpWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setIsError(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          hp_website_url: hpWebsiteUrl,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 429) {
        setIsError(true);
        setStatusMsg('Trop de messages envoyés. Veuillez patienter une minute avant de réessayer.');
        return;
      }

      if (data.success) {
        setIsError(false);
        setStatusMsg(data.message);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setIsError(true);
        setStatusMsg(data.error || 'Failed to send message. Please verify your information.');
      }
    } catch (err) {
      setLoading(false);
      setIsError(true);
      setStatusMsg('Secure connection error. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-[#06090e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Side */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border-teal-500/20 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300 block mb-1">
                CONCIERGE DESK
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-100">Send Us an Inquiry</h2>
              <p className="text-xs text-slate-300 mt-1">
                Our spa concierge will assist with custom group bookings, dietary requests, or questions.
              </p>
            </div>

            {statusMsg && (
              <div className="p-4 rounded-xl bg-teal-950/80 border border-teal-700 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-300" />
                <span>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Invisible Honeypot Field */}
              <input
                type="text"
                name="hp_website_url"
                value={hpWebsiteUrl}
                onChange={(e) => setHpWebsiteUrl(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-slate-950 border border-teal-900 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. marcus@example.com"
                    className="w-full bg-slate-950 border border-teal-900 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Private Group Booking Inquiry"
                  className="w-full bg-slate-950 border border-teal-900 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our sanctuary practitioners assist you?"
                  className="w-full bg-slate-950 border border-teal-900 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {loading ? 'SENDING...' : 'DISPATCH MESSAGE'}
              </button>
            </form>
          </div>

          {/* FAQ & Information Side */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-100">Sanctuary Etiquette & Guidance</h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="glass-panel rounded-2xl border-teal-500/20 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex justify-between items-center text-sm font-semibold text-slate-100 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs text-slate-300 font-light leading-relaxed border-t border-teal-900/30 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
