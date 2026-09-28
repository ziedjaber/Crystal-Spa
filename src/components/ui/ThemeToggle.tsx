'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  className?: string;
  variant?: 'pill' | 'full-row';
}

/* ─── Golden star-burst particles ─────────────────────────────────────── */
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function StarBurst({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active &&
        ANGLES.map((deg, i) => (
          <motion.span
            key={`sb-${deg}`}
            className="absolute rounded-full bg-[#f2ca50] pointer-events-none"
            style={{ width: 3, height: 3, top: '50%', left: '50%' }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.4, 0],
              x: Math.cos((deg * Math.PI) / 180) * 20,
              y: Math.sin((deg * Math.PI) / 180) * 20,
              opacity: [1, 0.9, 0],
            }}
            transition={{ duration: 0.55, delay: i * 0.025, ease: 'easeOut' }}
          />
        ))}
    </AnimatePresence>
  );
}

/* ─── Glow ring pulse ──────────────────────────────────────────────────── */
function GlowRing({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          key="glow"
          className="absolute inset-[-4px] rounded-full pointer-events-none"
          style={{ border: '2px solid rgba(242,202,80,0.75)' }}
          initial={{ scale: 1, opacity: 0.85 }}
          animate={{ scale: 2.2, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  );
}

export default function ThemeToggle({ className = '', variant = 'pill' }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleToggle = () => {
    setBurst(true);
    toggleTheme();
    setTimeout(() => setBurst(false), 680);
  };

  /* ── Hydration skeleton ────────────────────────────────────────────── */
  if (!mounted) {
    if (variant === 'pill') {
      return (
        <div className={`theme-pill ${className}`}>
          <div className="w-[56px] h-[28px] rounded-full bg-[#1c1b1b] border border-white/10" />
        </div>
      );
    }
    return <div className={`w-full h-14 rounded-2xl bg-[#1c1b1b] border border-white/10 ${className}`} />;
  }

  /* ─────────────────────────────────────────────────────────────────────
     PILL variant — Navbar desktop
  ───────────────────────────────────────────────────────────────────── */
  if (variant === 'pill') {
    return (
      <div className={`theme-pill relative ${className}`}>
        {/* Outer wrapper: handles hover scale & click tap */}
        <motion.button
          type="button"
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          aria-label={
            isDark
              ? language === 'fr' ? 'Passer en mode clair' : 'Switch to light mode'
              : language === 'fr' ? 'Passer en mode sombre' : 'Switch to dark mode'
          }
          className="relative flex items-center cursor-pointer focus:outline-none"
          style={{
            width: 56,
            height: 28,
            borderRadius: 14,
            background: isDark
              ? 'linear-gradient(135deg,#12100d 0%,#252018 100%)'
              : 'linear-gradient(135deg,#fdeec4 0%,#f8d87e 100%)',
            boxShadow: isDark
              ? 'inset 0 2px 5px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(242,202,80,0.28)'
              : 'inset 0 1px 3px rgba(180,130,0,0.2), 0 0 0 1.5px rgba(184,144,12,0.45), 0 4px 16px rgba(212,175,55,0.35)',
            transition: 'background 0.45s ease, box-shadow 0.45s ease',
          }}
        >
          {/* Twinkle stars (only in dark mode) */}
          <AnimatePresence>
            {isDark && (
              <>
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-[3px] h-[3px] rounded-full bg-white"
                  style={{ top: 6, right: 10 }}
                />
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute w-[2px] h-[2px] rounded-full bg-white"
                  style={{ top: 14, right: 16 }}
                />
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute w-[2px] h-[2px] rounded-full bg-white"
                  style={{ bottom: 7, right: 8 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ── Animated sliding THUMB ────────────────────────────────── */}
          <motion.div
            className="absolute flex items-center justify-center rounded-full"
            animate={{
              x: isDark ? 3 : 26,
              background: isDark
                ? 'linear-gradient(135deg,#2c2620,#1e1b15)'
                : 'linear-gradient(135deg,#fff9e0,#fde87a)',
              boxShadow: isDark
                ? '0 2px 6px rgba(0,0,0,0.8), 0 0 10px rgba(242,202,80,0.15)'
                : '0 2px 8px rgba(160,110,0,0.5), 0 0 14px rgba(242,202,80,0.45)',
            }}
            transition={{
              x: { type: 'spring', stiffness: 420, damping: 28 },
              background: { duration: 0.45, ease: 'easeInOut' },
              boxShadow: { duration: 0.45, ease: 'easeInOut' },
            }}
            style={{ width: 22, height: 22, top: 3 }}
          >
            {/* Glow ring burst */}
            <GlowRing active={burst} />

            {/* Star particles burst */}
            <StarBurst active={burst} />

            {/* Moon / Sun icon — smoothly swaps */}
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center justify-center"
                >
                  <Moon
                    className="w-[13px] h-[13px]"
                    style={{ color: '#f2ca50', fill: 'rgba(242,202,80,0.25)' }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, scale: 0.3, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center justify-center"
                >
                  <Sun
                    className="w-[13px] h-[13px]"
                    style={{ color: '#b8860b', filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.9))' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>

        {/* Tooltip */}
        <div className="theme-pill-tooltip">
          {isDark
            ? language === 'fr' ? 'Thème Clair 5★' : 'Luxury Light'
            : language === 'fr' ? 'Thème Sombre Or' : 'Dark Gold'}
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────
     FULL-ROW variant — Mobile drawer
  ───────────────────────────────────────────────────────────────────── */
  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileTap={{ scale: 0.97 }}
      className={`theme-row-toggle relative overflow-hidden ${className}`}
      data-dark={isDark ? 'true' : 'false'}
      aria-label={
        isDark
          ? language === 'fr' ? 'Activer le thème clair' : 'Switch to light theme'
          : language === 'fr' ? 'Activer le thème sombre' : 'Switch to dark theme'
      }
    >
      {/* Shimmer sweep on toggle */}
      <AnimatePresence>
        {burst && (
          <motion.span
            key="sweep"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg,transparent 0%,rgba(242,202,80,0.18) 50%,transparent 100%)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <div className="theme-row-left">
        {/* Icon box */}
        <div className="theme-row-icon-box relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon-row"
                initial={{ y: 16, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -16, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex items-center justify-center"
              >
                <Moon className="w-4 h-4" style={{ color: '#f2ca50', fill: 'rgba(242,202,80,0.2)' }} />
              </motion.div>
            ) : (
              <motion.div
                key="sun-row"
                initial={{ y: 16, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -16, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex items-center justify-center"
              >
                <Sun className="w-4 h-4" style={{ color: '#B89032', filter: 'drop-shadow(0 0 3px rgba(212,175,55,0.7))' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="theme-row-labels">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? 'dark-lbl' : 'light-lbl'}
              className="theme-row-title"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {isDark
                ? language === 'fr' ? 'Thème Sombre (Or & Obsidienne)' : 'Dark Gold Theme'
                : language === 'fr' ? 'Thème Clair (Ivoire & Or)' : 'Luxury Light Theme'}
            </motion.span>
          </AnimatePresence>
          <span className="theme-row-subtitle">
            {isDark
              ? language === 'fr'
                ? 'Toucher pour passer en thème clair'
                : 'Tap to switch to luxury light'
              : language === 'fr'
              ? 'Toucher pour passer en thème sombre'
              : 'Tap for midnight gold theme'}
          </span>
        </div>
      </div>

      {/* Mini pill — animated */}
      <div className="theme-row-mini-pill" data-dark={isDark ? 'true' : 'false'}>
        <motion.div
          className="theme-row-mini-thumb"
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </div>
    </motion.button>
  );
}
