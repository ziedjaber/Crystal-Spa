'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, FranceFlag, UsaFlag, SpainFlag } from '@/context/LanguageContext';

interface NavbarProps {
  onOpenBookingModal?: () => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Bulletproof scroll listener for mobile & desktop
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      setScrolled(scrollPos > 25);

      // Detect active section on scroll
      const sections = [
        'suites-collection',
        'experience-section',
        'equipements-section',
        'galerie-section',
        'avis-section',
        'localisation-section',
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Listen on multiple events to support iOS/Android touch scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  const navLinks = [
    { id: 'suites-collection', name: t('nav.suites'), icon: Bed, href: '#suites-collection' },
    { id: 'experience-section', name: t('nav.experience'), icon: Sparkles, href: '#experience-section' },
    { id: 'equipements-section', name: t('nav.equipements'), icon: ShieldCheck, href: '#equipements-section' },
    { id: 'galerie-section', name: t('nav.galerie'), icon: ImageIcon, href: '#galerie-section' },
    { id: 'avis-section', name: t('nav.reviews'), icon: Star, href: '#avis-section' },
    { id: 'localisation-section', name: t('nav.contact'), icon: MapPin, href: '#localisation-section' },
  ];

  // Smooth scroll handler with offset calculation
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        const el = document.getElementById(targetId);
        if (el) {
          const navOffset = 72;
          const targetPosition =
            el.getBoundingClientRect().top + (window.pageYOffset || window.scrollY) - navOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    },
    []
  );

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d0c0c]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-[#f2ca50]/25 py-2.5 sm:py-3'
            : 'bg-[#131313]/70 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-4'
        }`}
      >
        <div className="h-12 sm:h-14 w-full px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer" aria-label="Crystal Spa Accueil">
            <Image
              src="/logo.png"
              alt="Crystal Spa Logo"
              width={40}
              height={40}
              priority
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(242,202,80,0.4)]"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl text-[#f2ca50] tracking-wide transition-colors group-hover:text-[#ffe088] font-medium leading-none">
                Crystal Spa
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#d0c5af] uppercase font-light mt-0.5">
                Suites Privatives
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6" aria-label="Navigation Principale">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all py-1 relative ${
                    isActive
                      ? 'text-[#f2ca50]'
                      : 'text-[#d0c5af] hover:text-[#f2ca50]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#f2ca50] transition-transform" />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f2ca50] rounded-full shadow-[0_0_8px_rgba(242,202,80,0.8)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions on right */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
            
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-[#1c1b1b] border border-white/10 shadow-inner">
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

              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all cursor-pointer ${
                  language === 'es'
                    ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                    : 'text-[#d0c5af] hover:text-white opacity-70 hover:opacity-100'
                }`}
                title="Español"
                aria-label="Cambiar a Español"
              >
                <SpainFlag className="w-4 h-3" />
                <span className="text-[10px] font-bold">ES</span>
              </button>
            </div>

            {/* Reserve CTA button */}
            <button
              onClick={onOpenBookingModal}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#d4af37] text-[#3c2f00] font-bold text-[11px] uppercase tracking-widest luxury-shimmer-btn cursor-pointer shadow-md shadow-[#d4af37]/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('nav.book')}</span>
            </button>

            {/* Profile / Account Icon */}
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(242,202,80,0.3)]"
              title="Espace Réservation"
              aria-label="Ouvrir le formulaire de réservation"
            >
              <User className="w-4 h-4 text-[#3c2f00]" />
            </button>

            {/* Mobile Menu Button with Animated Rotation */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#1c1b1b] border border-white/10 text-[#f2ca50] hover:bg-[#252424] transition-all cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer with Staggered Framer Motion Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="xl:hidden fixed top-[54px] sm:top-16 left-0 right-0 z-40 bg-[#0c0b0b]/98 backdrop-blur-2xl border-b border-[#f2ca50]/30 shadow-2xl px-5 sm:px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs text-[#d0c5af] font-medium uppercase tracking-wider">
                  {language === 'fr' ? 'Langue / Language' : 'Language / Langue'}
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1c1b1b] border border-white/10">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all ${
                      language === 'fr'
                        ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                        : 'text-[#d0c5af]'
                    }`}
                  >
                    <FranceFlag className="w-4 h-3" />
                    <span>FR</span>
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all ${
                      language === 'en'
                        ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                        : 'text-[#d0c5af]'
                    }`}
                  >
                    <UsaFlag className="w-4 h-3" />
                    <span>EN</span>
                  </button>
                  <button
                    onClick={() => setLanguage('es')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all ${
                      language === 'es'
                        ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                        : 'text-[#d0c5af]'
                    }`}
                  >
                    <SpainFlag className="w-4 h-3" />
                    <span>ES</span>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.25 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between py-3 px-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#221f17] text-[#f2ca50] border border-[#f2ca50]/30 font-semibold'
                          : 'text-[#e5e2e1] hover:bg-white/5 hover:text-[#f2ca50]'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-medium">
                        <Icon className="w-4 h-4 text-[#f2ca50]" />
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#99907c]" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile Reserve CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenBookingModal) onOpenBookingModal();
                  }}
                  className="w-full py-4 rounded-xl bg-[#d4af37] text-[#3c2f00] font-bold text-xs uppercase tracking-widest luxury-shimmer-btn flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25"
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
