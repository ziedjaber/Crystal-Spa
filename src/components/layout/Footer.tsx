'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, CheckCircle2, Star, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0e0e0e] text-[#d0c5af] border-t border-white/5">
      <div className="w-full px-3.5 sm:px-6 md:px-12 lg:px-24 pt-12 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Crystal Spa Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(242,202,80,0.3)]"
              />
              <span className="font-serif text-xl text-[#f2ca50] tracking-wide font-medium">
                Crystal Spa
              </span>
            </div>

            <p className="font-serif text-xl sm:text-2xl italic text-[#e5e2e1] max-w-sm font-normal">
              {t('footer.slogan')}
            </p>

            <p className="text-xs sm:text-sm text-[#d0c5af] font-light leading-relaxed">
              {language === 'fr'
                ? 'Sanctuaire secret dédié au bien-être d’intimité absolue. Nos suites privatisées offrent spa bouillonnant d’hydrothérapie, sauna traditionnel et rituels signature sur mesure.'
                : 'Secret haven dedicated to absolute intimate wellness. Our private suites offer hydrotherapy spas, traditional saunas, and tailor-made romantic rituals.'}
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs">
              <a
                href="mailto:Crystalspa76@gmail.com"
                className="flex items-center gap-2 text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span>Crystalspa76@gmail.com</span>
              </a>
              <a
                href="https://wa.me/33629866909"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#d0c5af] hover:text-[#25D366] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>06 29 86 69 09 (WhatsApp & Appel)</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#f2ca50]">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {language === 'fr'
                  ? 'Hôtellerie & Spa de Luxe • Suite 100% privatisée sans vis-à-vis'
                  : 'Luxury Hospitality & Spa • 100% Private suites with no vis-à-vis'}
              </span>
            </div>
          </div>

          {/* Suites & Séjours */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-semibold text-[#f2ca50] uppercase tracking-wider">
              {t('nav.suites')}
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/suites/la-vie-est-belle" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                La Vie est Belle (Rouen)
              </Link>
              <Link href="/suites/diamant-noir" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                Suite Diamant Noir (Paris)
              </Link>
              <Link href="/suites/master-crystal-royale" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                Master Crystal Royale
              </Link>
              <Link href="#packs-romantiques" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                {language === 'fr' ? 'Packs Romantiques' : 'Romantic Add-on Packs'}
              </Link>
            </nav>
          </div>

          {/* L'Expérience */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-semibold text-[#f2ca50] uppercase tracking-wider">
              {language === 'fr' ? 'Prestations' : 'Amenities'}
            </h3>
            <nav className="flex flex-col gap-2.5">
              <a href="#equipements-section" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                {language === 'fr' ? 'Jacuzzi Privatif 24h/24' : '24/7 Private Hydro Spa'}
              </a>
              <a href="#equipements-section" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                {language === 'fr' ? 'Double Smart TV 4K' : 'Dual 4K Smart TVs'}
              </a>
              <a href="#avantages-direct" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                {language === 'fr' ? 'Réservation Directe' : 'Direct Booking'}
              </a>
              <Link href="/gift-cards" className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                {language === 'fr' ? 'Carte Cadeau Romantique' : 'Romantic Gift Card'}
              </Link>
            </nav>
          </div>

          {/* Cercle Privé Newsletter */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-semibold text-[#f2ca50] uppercase tracking-wider">
              {t('footer.circle')}
            </h3>
            <p className="text-xs text-[#d0c5af] font-light">
              {language === 'fr'
                ? 'Recevez nos invitations confidentielles et ouvertures de créneaux exclusifs.'
                : 'Receive our private invitations and exclusive booking openings.'}
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#1c1b1b] border border-[#f2ca50]/50 text-[#f2ca50] text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'fr' ? 'Bienvenue au Cercle Privé.' : 'Welcome to the VIP Circle.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  required
                  type="email"
                  id="newsletter-email-input"
                  aria-label={language === 'fr' ? 'Adresse email pour la newsletter' : 'Email address for newsletter'}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={language === 'fr' ? 'Votre adresse confidentielle' : 'Your private email'}
                  className="w-full bg-[#1c1b1b] px-3.5 py-2.5 rounded-lg text-[#e5e2e1] text-xs outline-none border border-transparent focus:border-[#f2ca50]/40 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2a2a2a] hover:bg-[#d4af37] text-[#e5e2e1] hover:text-[#3c2f00] transition-all py-2.5 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider luxury-shimmer-btn cursor-pointer"
                >
                  {t('footer.join')}
                </button>
              </form>
            )}

            <div className="flex items-center gap-2 pt-2 text-[#d0c5af]">
              <Star className="w-3.5 h-3.5 text-[#f2ca50] fill-current" />
              <span className="text-[11px]">Airbnb 4.97★ • Top 10% Coup de Cœur</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#c9c6bf] font-light">
          <span>© {new Date().getFullYear()} Crystal Spa – Suite Spa Privative. {t('footer.rights')}</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#e5e2e1] transition-colors">
              {language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
            </Link>
            <Link href="/" className="hover:text-[#e5e2e1] transition-colors">
              {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
