'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tag, MessageSquareHeart, ShieldCheck, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export default function DirectBookingPerks() {
  const { language } = useLanguage();

  const perks = [
    {
      icon: Tag,
      badge: language === 'fr' ? 'Meilleur Prix Garanti' : 'Best Rate Guarantee',
      title: language === 'fr' ? 'Zéro Commission de Plateforme' : 'Zero Platform Commissions',
      desc:
        language === 'fr'
          ? 'En réservant en direct sur notre site officiel, vous économisez 15% à 20% par rapport à Airbnb et Booking.com. Vous bénéficiez du tarif le plus bas garanti.'
          : 'By booking directly on our official site, you save 15% to 20% compared to Airbnb and Booking.com. Guaranteed lowest rate for every suite.',
      highlight: language === 'fr' ? '-15% à -20% en direct' : 'Save 15% to 20% direct',
    },
    {
      icon: MessageSquareHeart,
      badge: language === 'fr' ? 'Échange Privilégié' : 'Dedicated Host',
      title: language === 'fr' ? 'Contact Direct & Conciergerie 24/7' : 'Direct Concierge & Support 24/7',
      desc:
        language === 'fr'
          ? 'Un échange direct avec vos hôtes avant et pendant votre séjour, par WhatsApp ou téléphone. Conseils romantiques personnalisés et réactivité instantanée.'
          : 'Direct contact with your private hosts before and during your stay via WhatsApp or call. Personalized recommendations and immediate assistance.',
      highlight: language === 'fr' ? 'Sans intermédiaire' : 'Direct line with host',
    },
    {
      icon: ShieldCheck,
      badge: language === 'fr' ? 'Réservation Sûre' : 'Safe Booking',
      title: language === 'fr' ? 'Caution par Simple Empreinte Bancaire' : 'Security Deposit by Simple Hold',
      desc:
        language === 'fr'
          ? 'Caution de 250 € sécurisée via Stripe/Swikly par simple pré-autorisation : aucun débit n’est effectué sur votre compte bancaire. Déblocage automatique.'
          : '€250 security deposit secured via Stripe/Swikly by pre-authorization only: no funds are ever debited from your card. Automatic release post-checkout.',
      highlight: language === 'fr' ? 'Aucun montant débité' : 'Zero fund deduction',
    },
    {
      icon: Sparkles,
      badge: language === 'fr' ? 'Transparence Totale' : 'All-Inclusive',
      title: language === 'fr' ? 'Prix Tout Compris, Zéro Frais Caché' : 'All-Inclusive Price, Zero Hidden Fees',
      desc:
        language === 'fr'
          ? 'Taxe de séjour incluse, ménage de désinfection professionnel inclus, linge de lit satin de coton, serviettes, peignoirs et capsules Nespresso offerts.'
          : 'Tourist tax included, professional ozone sanitization cleaning included, Egyptian satin bed linens, plush bathrobes, towels and Nespresso pods provided.',
      highlight: language === 'fr' ? 'Taxe de séjour incluse' : 'Taxes & cleaning included',
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16 sm:py-20 bg-[#101010] border-y border-white/5" id="avantages-direct">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/30 w-fit">
              <Lock className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2ca50]">
                {language === 'fr' ? 'Garanties Réservation Directe' : 'Direct Booking Privileges'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e1]">
              {language === 'fr' ? 'Pourquoi Réserver en Direct sur ce Site ?' : 'Why Book Directly on Our Official Site?'}
            </h2>
            <p className="text-sm text-[#d0c5af] font-light leading-relaxed">
              {language === 'fr'
                ? 'Une expérience sans intermédiaire au meilleur tarif du web, avec confirmation instantanée et paiement 100% sécurisé.'
                : 'An intermediary-free experience at the web’s best guaranteed rate, with instant confirmation and 100% secure payment.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#d0c5af]">
            <div className="flex items-center gap-1.5 bg-[#1a1919] px-3.5 py-2 rounded-lg border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-[#f2ca50]" />
              <span>{language === 'fr' ? 'Sans création de compte' : 'No account creation needed'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1a1919] px-3.5 py-2 rounded-lg border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
              <span>{language === 'fr' ? 'Confirmation immédiate' : 'Instant confirmation'}</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#181717] p-6 flex flex-col justify-between gap-6 border border-white/5 hover:border-[#f2ca50]/30 transition-all duration-300 shadow-lg group hover:-translate-y-1"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#24221d] border border-[#f2ca50]/20 flex items-center justify-center text-[#f2ca50] group-hover:scale-110 group-hover:border-[#f2ca50]/50 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider bg-[#f2ca50]/10 px-2.5 py-1 rounded-full border border-[#f2ca50]/20">
                      {perk.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors leading-snug">
                    {perk.title}
                  </h3>

                  <p className="text-xs text-[#c9c6bf] font-light leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#99907c] font-light text-[11px]">
                    {language === 'fr' ? 'Avantage exclusif' : 'Exclusive perk'}
                  </span>
                  <span className="font-semibold text-[#f2ca50]">
                    {perk.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
