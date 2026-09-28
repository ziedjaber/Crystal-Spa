'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bed,
  Sparkles,
  ShieldCheck,
  Image as ImageIcon,
  Star,
  MapPin,
  Calendar,
  User,
  ChevronRight,
  Menu,
  X,
  Compass,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, FranceFlag, UsaFlag, SpainFlag } from '@/context/LanguageContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { ApartmentItem } from '@/data/apartment';

interface SuiteNavbarProps {
  apartment: ApartmentItem;
  onOpenBookingModal?: () => void;
}

export default function SuiteNavbar({ apartment, onOpenBookingModal }: SuiteNavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const { isDark } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('suite-hero');

  // Bulletproof scroll listener for section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      setScrolled(scrollPos > 25);

      const sections = [
        'suite-hero',
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  const navLinks = [
    {
      id: 'suite-hero',
      name: language === 'fr' ? 'Aperçu' : language === 'es' ? 'Visión General' : 'Overview',
      icon: Compass,
      href: '#suite-hero',
    },
    {
      id: 'experience-section',
      name: language === 'fr' ? 'Prestations' : language === 'es' ? 'Servicios' : 'Signature',
      icon: Sparkles,
      href: '#experience-section',
    },
    {
      id: 'equipements-section',
      name: language === 'fr' ? 'Équipements' : language === 'es' ? 'Equipamiento' : 'Amenities',
      icon: ShieldCheck,
      href: '#equipements-section',
    },
    {
      id: 'galerie-section',
      name: language === 'fr' ? 'Galerie' : language === 'es' ? 'Galería' : 'Gallery',
      icon: ImageIcon,
      href: '#galerie-section',
    },
    {
      id: 'avis-section',
      name: language === 'fr' ? 'Avis' : language === 'es' ? 'Reseñas' : 'Reviews',
      icon: Star,
      href: '#avis-section',
    },
    {
      id: 'localisation-section',
      name: language === 'fr' ? 'Accès' : language === 'es' ? 'Ubicación' : 'Location',
      icon: MapPin,
      href: '#localisation-section',
    },
  ];

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
        } else if (pathname !== '/') {
          router.push(`/${href}`);
        }
      } else {
        router.push(href);
      }
    },
    [pathname, router]
  );

  const navScrolledStyle = scrolled
    ? isDark
      ? { background: 'rgba(10,9,9,0.97)', borderBottomColor: 'rgba(242,202,80,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.75)' }
      : { background: 'rgba(250,248,245,0.96)', borderBottomColor: 'rgba(200,162,77,0.30)', boxShadow: '0 8px 32px rgba(15,23,42,0.08)' }
    : isDark
      ? { background: 'rgba(15,14,14,0.40)', borderBottomColor: 'rgba(255,255,255,0.10)' }
      : { background: 'rgba(250,248,245,0.85)', borderBottomColor: 'rgba(0,0,0,0.06)' };

  return (
    <>
      <header
        id="suite-main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
          scrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4'
        }`}
        style={navScrolledStyle}
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
              <span className={`font-serif text-lg sm:text-2xl tracking-wide transition-colors font-medium leading-none ${!isDark ? 'text-[#B89032] group-hover:text-[#9A7410]' : 'text-[#f2ca50] group-hover:text-[#ffe088]'}`}>
                Crystal Spa
              </span>
              <span className={`text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-light mt-0.5 ${!isDark ? 'text-[#666666]' : 'text-[#d0c5af]'}`}>
                Suites Spa Privées
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6" aria-label="Navigation de la Suite">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all py-1 relative cursor-pointer ${
                    isActive
                      ? !isDark ? 'text-[#B89032]' : 'text-[#f2ca50]'
                      : !isDark ? 'text-[#444444] hover:text-[#B89032]' : 'text-[#d0c5af] hover:text-[#f2ca50]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-transform ${!isDark ? 'text-[#B89032]' : 'text-[#f2ca50]'}`} />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSuiteNavIndicator"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${!isDark ? 'bg-[#B89032] shadow-[0_0_8px_rgba(184,144,50,0.4)]' : 'bg-[#f2ca50] shadow-[0_0_8px_rgba(242,202,80,0.8)]'}`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions on right */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            
            {/* Theme Toggle Button (Light / Dark Mode) */}
            <ThemeToggle variant="pill" />

            {/* Language Switcher */}
            <div
              className="hidden sm:flex items-center gap-1 p-1 rounded-xl border shadow-sm transition-colors"
              style={{
                background: !isDark ? '#FFFFFF' : '#1c1b1b',
                borderColor: !isDark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.10)',
              }}
            >
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'fr'
                    ? !isDark
                      ? 'bg-[#C8A24D] text-white font-bold shadow-sm'
                      : 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={language !== 'fr' ? { color: !isDark ? '#666666' : '#d0c5af' } : {}}
                title="Français"
                aria-label="Passer en Français"
              >
                <FranceFlag className="w-4 h-3" />
                <span className="text-[10px] font-bold">FR</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? !isDark
                      ? 'bg-[#C8A24D] text-white font-bold shadow-sm'
                      : 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={language !== 'en' ? { color: !isDark ? '#666666' : '#d0c5af' } : {}}
                title="English"
                aria-label="Switch to English"
              >
                <UsaFlag className="w-4 h-3" />
                <span className="text-[10px] font-bold">EN</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'es'
                    ? !isDark
                      ? 'bg-[#C8A24D] text-white font-bold shadow-sm'
                      : 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={language !== 'es' ? { color: !isDark ? '#666666' : '#d0c5af' } : {}}
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
              className={`hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest luxury-shimmer-btn cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all ${
                !isDark ? 'bg-[#C8A24D] text-white shadow-[#C8A24D]/25' : 'bg-[#d4af37] text-[#3c2f00] shadow-[#d4af37]/20'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {language === 'fr'
                  ? 'Réserver'
                  : language === 'es'
                  ? 'Reservar'
                  : 'Book'}
              </span>
            </button>

            {/* Profile / Account Icon */}
            <button
              type="button"
              onClick={onOpenBookingModal}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-md ${
                !isDark ? 'bg-[#C8A24D] text-white shadow-[#C8A24D]/30' : 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_12px_rgba(242,202,80,0.3)]'
              }`}
              title="Espace Réservation"
              aria-label="Ouvrir le formulaire de réservation"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button with Animated Rotation */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border transition-all cursor-pointer shadow-sm"
              style={{
                color: !isDark ? '#B89032' : '#f2ca50',
                background: !isDark ? '#FFFFFF' : '#1c1b1b',
                borderColor: !isDark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.10)',
              }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="xl:hidden fixed top-[54px] sm:top-16 left-0 right-0 z-40 backdrop-blur-2xl border-b shadow-2xl px-5 sm:px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto"
            style={{
              background: isDark ? 'rgba(10,9,9,0.98)' : 'rgba(255,252,247,0.99)',
              borderBottomColor: isDark ? 'rgba(242,202,80,0.28)' : 'rgba(184,144,12,0.25)',
              boxShadow: isDark ? '0 24px 50px rgba(0,0,0,0.8)' : '0 24px 50px rgba(60,47,0,0.10)',
            }}
          >
            <div className="flex flex-col space-y-4">
              {/* Theme Selector in Mobile Drawer */}
              <ThemeToggle variant="full-row" />

              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderBottomColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(160,130,80,0.18)' }}>
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: isDark ? '#d0c5af' : '#6b6050' }}>
                  {language === 'fr' ? 'Langue / Language' : 'Language / Langue'}
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-xl border" style={{ background: isDark ? '#1c1b1b' : '#f5f0e8', borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(160,130,80,0.20)' }}>
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
              <div className="flex flex-col space-y-1" role="navigation" aria-label="Mobile navigation">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.25 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between py-3 px-3 rounded-xl transition-all border ${
                        isActive ? 'font-semibold' : ''
                      }`}
                      style={isActive
                        ? { background: isDark ? '#221f17' : '#fdf6e3', color: isDark ? '#f2ca50' : '#8a6a08', borderColor: isDark ? 'rgba(242,202,80,0.30)' : 'rgba(184,144,12,0.28)' }
                        : { color: isDark ? '#e5e2e1' : '#1c1a16', borderColor: 'transparent' }}
                    >
                      <div className="flex items-center gap-3 text-sm uppercase tracking-wider font-medium">
                        <Icon className="w-4 h-4 text-[#f2ca50]" />
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" style={{ color: isDark ? '#99907c' : '#8c7e6a' }} />
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
