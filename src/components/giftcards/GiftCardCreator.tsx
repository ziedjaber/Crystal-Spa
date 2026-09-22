'use client';

import React, { useState } from 'react';
import { Sparkles, Gift, Copy, Check, Heart, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GiftCardCreator() {
  const [amount, setAmount] = useState<number>(250);
  const [recipient, setRecipient] = useState<string>('Eleanor Vance');
  const [sender, setSender] = useState<string>('Sophia');
  const [message, setMessage] = useState<string>('Wishing you a day of pure relaxation & crystal bliss!');
  const [theme, setTheme] = useState<'gold' | 'emerald' | 'rose'>('gold');

  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `GIFT-CRYSTAL-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedCode(code);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const copyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-20 bg-[#06090e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 border border-teal-800/60 text-xs font-semibold uppercase tracking-widest text-teal-300">
            <Gift className="w-3.5 h-3.5 text-gold-accent" /> DIGITAL E-GIFT CARDS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
            Give the Gift of <span className="gold-gradient-text">Pure Serenity</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Instantly deliverable digital spa gift vouchers for loved ones, applicable toward any treatment or hydrotherapy experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-teal-500/20 space-y-6">
            <form onSubmit={handleCreateVoucher} className="space-y-5">
              
              {/* Amount Presets */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                  1. Select Voucher Value
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[150, 250, 500, 1000].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        amount === val
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950/60 border border-teal-900/60 text-slate-300 hover:border-teal-700'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Presets */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                  2. Voucher Aesthetic Theme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme('gold')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      theme === 'gold' ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-300' : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    Champagne Gold
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('emerald')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      theme === 'emerald' ? 'bg-teal-500/20 border-2 border-teal-400 text-teal-300' : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    Emerald Crystal
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('rose')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      theme === 'rose' ? 'bg-rose-500/20 border-2 border-rose-400 text-rose-300' : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    Rose Quartz
                  </button>
                </div>
              </div>

              {/* Recipient & Sender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-slate-950 border border-teal-900 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full bg-slate-950 border border-teal-900 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                  Personal Note
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-teal-900 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:from-amber-200 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                GENERATE GIFT VOUCHER ($ {amount})
              </button>
            </form>
          </div>

          {/* Live Card Preview */}
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 block mb-1">LIVE PREVIEW</span>
              <h3 className="font-serif text-xl font-bold text-slate-100">Digital Gift Pass</h3>
            </div>

            <div
              className={`p-8 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-500 ${
                theme === 'gold'
                  ? 'bg-gradient-to-br from-[#1c180e] via-[#2d2512] to-[#0f0d07] border-2 border-amber-500/40 text-amber-100'
                  : theme === 'emerald'
                  ? 'bg-gradient-to-br from-[#06201b] via-[#0b332b] to-[#04120f] border-2 border-teal-500/40 text-teal-100'
                  : 'bg-gradient-to-br from-[#241318] via-[#3d1e26] to-[#140a0d] border-2 border-rose-400/40 text-rose-100'
              }`}
            >
              {/* Watermark Logo */}
              <Sparkles className="w-48 h-48 absolute -bottom-10 -right-10 opacity-10 pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-64">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-serif text-2xl font-bold tracking-widest block">CRYSTAL SPA</span>
                    <span className="text-[9px] tracking-[0.2em] uppercase opacity-75">LUXURY SANCTUARY GIFT</span>
                  </div>
                  <span className="font-serif text-3xl font-bold">${amount}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs italic font-light opacity-90 line-clamp-2">
                    "{message || 'A serene wellness experience awaits you.'}"
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span>TO: <strong className="font-bold">{recipient || 'Valued Guest'}</strong></span>
                    <span>FROM: <strong className="font-bold">{sender || 'Generous Friend'}</strong></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] tracking-wider opacity-80">
                  <span>VALID FOR ALL TREATMENTS & HYDROTHERAPY</span>
                  <span>CRYSTAL-SPA.COM</span>
                </div>
              </div>
            </div>

            {/* Generated Voucher Code Box */}
            {generatedCode && (
              <div className="p-4 rounded-2xl bg-teal-950/80 border border-amber-400 text-xs text-slate-200 flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] text-teal-400 block uppercase font-bold">VOUCHER CODE GENERATED</span>
                  <span className="font-mono text-base font-bold text-amber-300">{generatedCode}</span>
                </div>
                <button
                  onClick={copyCode}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-amber-300 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
