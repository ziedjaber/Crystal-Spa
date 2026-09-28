'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const COOKIE_KEY = 'crystal_spa_cookies_consent';

type ConsentState = 'accepted' | 'rejected' | null;

function getCookieConsent(): ConsentState {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )crystal_spa_cookies_consent=([^;]*)/);
  return match ? (decodeURIComponent(match[1]) as ConsentState) : null;
}

function setConsentCookie(value: 'accepted' | 'rejected') {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE_KEY}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      // Small delay so the banner slides in after the page loads
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (choice: 'accepted' | 'rejected') => {
    setConsentCookie(choice);
    setLeaving(true);
    setTimeout(() => setVisible(false), 500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Préférences de cookies"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-xl"
        >
          {/* Glass card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: isDark
                ? 'rgba(14,13,13,0.96)'
                : 'rgba(253,251,248,0.97)',
              border: `1px solid ${isDark ? 'rgba(242,202,80,0.22)' : 'rgba(184,144,50,0.28)'}`,
              boxShadow: isDark
                ? '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(242,202,80,0.08)'
                : '0 20px 60px rgba(30,20,0,0.12), 0 0 0 1px rgba(200,162,77,0.10)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Gold top accent line */}
            <div
              className="h-[2px] w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #f2ca50 30%, #d4af37 70%, transparent)',
              }}
            />

            <div className="px-5 py-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg,#2a1f00,#1a1300)'
                        : 'linear-gradient(135deg,#fef9ec,#fcefc5)',
                      border: `1px solid ${isDark ? 'rgba(242,202,80,0.35)' : 'rgba(184,144,50,0.40)'}`,
                    }}
                  >
                    <Cookie className="w-4 h-4 text-[#f2ca50]" />
                  </div>
                  <div>
                    <p
                      className="text-[13px] font-bold tracking-wide"
                      style={{ color: isDark ? '#eae8e6' : '#1c1a16' }}
                    >
                      Votre expérience, votre choix
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-widest font-medium"
                      style={{ color: isDark ? '#f2ca50' : '#B89032' }}
                    >
                      Crystal Spa · Confidentialité
                    </p>
                  </div>
                </div>

                {/* Close (reject) */}
                <button
                  type="button"
                  onClick={() => dismiss('rejected')}
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-all cursor-pointer hover:scale-110"
                  style={{ color: isDark ? '#d0c5af' : '#6b5e3a' }}
                  aria-label="Refuser et fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p
                className="mt-3 text-[12px] leading-relaxed"
                style={{ color: isDark ? '#c9c6bf' : '#5a4e33' }}
              >
                Nous utilisons des cookies pour améliorer votre navigation, mémoriser vos préférences de thème et mesurer l'audience de manière anonyme.
                Aucune donnée personnelle n'est vendue à des tiers.
              </p>

              {/* Expandable details */}
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer hover:opacity-80"
                style={{ color: isDark ? '#f2ca50' : '#B89032' }}
              >
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {expanded ? 'Masquer les détails' : 'Voir les détails'}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mt-3 rounded-xl p-3 space-y-2"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
                      }}
                    >
                      {[
                        { icon: '🔒', title: 'Essentiels', desc: 'Thème, langue, session — toujours actifs' },
                        { icon: '📊', title: 'Analytiques', desc: 'Visites anonymisées via Vercel Analytics' },
                        { icon: '💳', title: 'Paiement', desc: 'Stripe — sécurité PCI-DSS, aucune carte stockée ici' },
                      ].map((item) => (
                        <div key={item.title} className="flex items-start gap-2">
                          <span className="text-sm mt-0.5">{item.icon}</span>
                          <div>
                            <p
                              className="text-[11px] font-bold"
                              style={{ color: isDark ? '#eae8e6' : '#1c1a16' }}
                            >
                              {item.title}
                            </p>
                            <p
                              className="text-[11px]"
                              style={{ color: isDark ? '#99907c' : '#7a6a4a' }}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2">
                {/* Accept — primary CTA */}
                <motion.button
                  type="button"
                  onClick={() => dismiss('accepted')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest cursor-pointer relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #f2ca50, #d4af37)',
                    color: '#3c2f00',
                    boxShadow: '0 4px 16px rgba(212,175,55,0.35)',
                  }}
                >
                  {/* Shimmer */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                  />
                  <Shield className="inline w-3 h-3 mr-1.5 -mt-0.5" />
                  Tout accepter
                </motion.button>

                {/* Reject — secondary */}
                <motion.button
                  type="button"
                  onClick={() => dismiss('rejected')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#99907c' : '#7a6a4a',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'}`,
                  }}
                >
                  Refuser
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
