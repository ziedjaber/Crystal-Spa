'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  Bed,
  Sparkles,
  ShieldCheck,
  Image as ImageIcon,
  Star,
  MapPin,
  Calendar,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, FranceFlag, UsaFlag } from '@/context/LanguageContext';

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.suites'), icon: Bed, href: '#suites-collection' },
    { name: t('nav.experience'), icon: Sparkles, href: '#experience-section' },
    { name: t('nav.equipements'), icon: ShieldCheck, href: '#equipements-section' },
    { name: t('nav.galerie'), icon: ImageIcon, href: '#galerie-section' },
    { name: t('nav.reviews'), icon: Star, href: '#avis-section' },
    { name: t('nav.contact'), icon: MapPin, href: '#localisation-section' },
  ];

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0e0e0e]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] border-b border-white/5 py-3'
            : 'bg-[#131313]/70 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-4'
        }`}
      >
        <div className="h-14 w-full px-3.5 sm:px-6 md:px-12 lg:px-24 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer" aria-label="Crystal Spa Accueil">
            <Image
              src="/logo.png"
              alt="Crystal Spa Logo"
              width={40}
              height={40}
              priority
              className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(242,202,80,0.3)]"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl text-[#f2ca50] tracking-wide transition-colors group-hover:text-[#ffe088] font-medium leading-none">
                Crystal Spa
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#d0c5af] uppercase font-light -mt-0.5">
                Suites Privatives
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Single Words with Icons Beside */}
          <nav className="hidden xl:flex items-center gap-6" aria-label="Navigation Principale">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#d0c5af] uppercase tracking-[0.18em] transition-all hover:text-[#f2ca50] group py-1"
                >
                  <Icon className="w-3.5 h-3.5 text-[#f2ca50] group-hover:scale-110 transition-transform" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions on right */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
            
            {/* Language Switcher with USA and France Flags (Hidden on mobile < sm, available in mobile drawer) */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-lg bg-[#1c1b1b] border border-white/10 shadow-inner">
              {/* French Button */}
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all cursor-pointer ${
                  language === 'fr'
                    ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                    : 'text-[#d0c5af] hover:text-white opacity-70 hover:opacity-100'
                }`}
                title="Français"
                aria-label="Passer en Français"
              >
                <FranceFlag className="w-4 h-3" />
                <span className="text-[10px] font-bold">FR</span>
              </button>

              {/* English Button */}
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                    : 'text-[#d0c5af] hover:text-white opacity-70 hover:opacity-100'
                }`}
                title="English (US)"
                aria-label="Switch to English"
              >
                <UsaFlag className="w-4 h-3" />
                <span className="text-[10px] font-bold">EN</span>
              </button>
            </div>

            {/* Reserve CTA button */}
            <button
              onClick={onOpenBookingModal}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#d4af37] text-[#3c2f00] font-bold text-[11px] uppercase tracking-widest luxury-shimmer-btn cursor-pointer shadow-md shadow-[#d4af37]/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('nav.book')}</span>
            </button>

            {/* Profile / Account Icon */}
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer shadow-[0_0_12px_rgba(242,202,80,0.3)]"
              title="Espace Réservation"
              aria-label="Ouvrir le formulaire de réservation"
            >
              <User className="w-4 h-4 text-[#3c2f00]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#e5e2e1] hover:text-[#f2ca50] transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden fixed top-16 left-0 right-0 z-40 bg-[#0e0e0e]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl px-5 sm:px-6 py-6 sm:py-8 max-h-[calc(100vh-4.5rem)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs text-[#d0c5af] font-medium uppercase tracking-wider">
                  {language === 'fr' ? 'Langue / Language' : 'Language / Langue'}
                </span>
                <div className="flex items-center gap-2 p-1 rounded-lg bg-[#1c1b1b]">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs ${
                      language === 'fr'
                        ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                        : 'text-[#d0c5af]'
                    }`}
                  >
                    <FranceFlag className="w-4 h-3" />
                    <span>FR</span>
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs ${
                      language === 'en'
                        ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                        : 'text-[#d0c5af]'
                    }`}
                  >
                    <UsaFlag className="w-4 h-3" />
                    <span>EN</span>
                  </button>
                </div>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-base font-serif text-[#e5e2e1] hover:text-[#f2ca50] py-2 border-b border-white/5 uppercase tracking-wider"
                  >
                    <Icon className="w-4 h-4 text-[#f2ca50]" />
                    <span>{link.name}</span>
                  </a>
                );
              })}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenBookingModal) onOpenBookingModal();
                  }}
                  className="w-full py-3.5 rounded-lg bg-[#d4af37] text-[#3c2f00] font-bold text-xs uppercase tracking-widest luxury-shimmer-btn flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('nav.book')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
