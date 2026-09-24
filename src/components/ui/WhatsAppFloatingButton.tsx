'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '0629866909';
  const internationalPhone = '+33629866909';
  const whatsappUrl = `https://wa.me/33629866909?text=${encodeURIComponent(
    'Bonjour Crystal Spa, je souhaite des renseignements pour une réservation.'
  )}`;

  return (
    <aside
      aria-label="Contact WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 font-sans"
    >
      {/* Expanded quick chat popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="whatsapp-chat-title"
          className="w-72 sm:w-80 rounded-2xl bg-[#181717] border border-[#25D366]/40 shadow-2xl p-4 text-[#e5e2e1] flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <div className="flex flex-col">
                <span id="whatsapp-chat-title" className="text-xs font-bold text-white leading-none">
                  Conciergerie Crystal Spa
                </span>
                <span className="text-[10px] text-[#25D366] mt-0.5">En ligne • Répond rapidement</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#d0c5af] leading-relaxed">
            Une question sur nos suites privatives, les disponibilités ou nos packs romantiques ? Discutez directement avec nous sur WhatsApp au{' '}
            <strong className="text-white font-semibold">{phoneNumber}</strong>.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ouvrir WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main floating circular button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-[#181717]/95 border border-[#25D366]/30 text-xs text-white shadow-lg backdrop-blur-md">
            Besoin d’aide ? <strong className="text-[#25D366]">06 29 86 69 09</strong>
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contacter la conciergerie sur WhatsApp"
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          <MessageCircle className="w-7 h-7 text-white fill-white transition-transform group-hover:scale-110" />
        </button>
      </div>
    </aside>
  );
}
