'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, KeyRound, Users, ShieldAlert, Car, Sparkles, CigaretteOff, PartyPopper } from 'lucide-react';

interface SuiteGoodToKnowProps {
  parkingInfo?: string;
  className?: string;
}

export default function SuiteGoodToKnow({ parkingInfo, className = '' }: SuiteGoodToKnowProps) {
  const { language } = useLanguage();

  const rules = [
    {
      icon: Clock,
      title: language === 'fr' ? 'Arrivée' : 'Check-in',
      primary: language === 'fr' ? 'Dès 17h00' : 'From 5:00 PM',
      secondary: language === 'fr' ? 'Check-in autonome 24h/24' : '24/7 keyless arrival',
      badge: language === 'fr' ? 'Dès 15h avec Pack Confort' : 'From 3PM with Comfort Pack',
    },
    {
      icon: Clock,
      title: language === 'fr' ? 'Départ' : 'Check-out',
      primary: language === 'fr' ? 'Au plus tard 11h00' : 'By 11:00 AM',
      secondary: language === 'fr' ? 'Option tardive disponible' : 'Late check-out available',
      badge: language === 'fr' ? 'Jusqu’à 13h avec Pack Confort' : 'Until 1PM with Comfort Pack',
    },
    {
      icon: Users,
      title: language === 'fr' ? 'Capacité' : 'Capacity',
      primary: language === 'fr' ? '2 Personnes Exclusivement' : '2 Guests Exclusively',
      secondary: language === 'fr' ? 'Sanctuaire pour les couples' : 'Couples sanctuary',
      badge: language === 'fr' ? 'Intimité & Calme' : 'Privacy & Calm',
    },
    {
      icon: ShieldAlert,
      title: language === 'fr' ? 'Caution' : 'Security Deposit',
      primary: language === 'fr' ? '250 € par empreinte' : '€250 pre-authorization',
      secondary: language === 'fr' ? 'Aucun débit bancaire effectué' : 'Zero amount debited',
      badge: language === 'fr' ? 'Sécurisé Stripe/Swikly' : 'Secure Stripe hold',
    },
    {
      icon: Car,
      title: language === 'fr' ? 'Stationnement' : 'Parking',
      primary: parkingInfo || (language === 'fr' ? 'Privé Gratuit' : 'Free Private Parking'),
      secondary: language === 'fr' ? 'Accès direct et sécurisé' : 'Direct & secure access',
      badge: language === 'fr' ? 'Inclus sans supplément' : 'Included free of charge',
    },
    {
      icon: Sparkles,
      title: language === 'fr' ? 'Hygiène Spa 100%' : '100% Spa Hygiene',
      primary: language === 'fr' ? 'Eau Pure & Renouvelée' : 'Fresh Clean Water',
      secondary: language === 'fr' ? 'Vidange & ozone entre chaque hôte' : 'Drained & ozone cleaned each stay',
      badge: language === 'fr' ? 'Protocole Palace' : 'Hospitality Standard',
    },
  ];

  return (
    <div className={`rounded-2xl bg-[#161515] p-6 sm:p-8 border border-white/5 flex flex-col gap-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest">
            {language === 'fr' ? 'Informations Pratiques' : 'Practical Guidelines'}
          </span>
          <h3 className="font-serif text-2xl text-[#e5e2e1] font-medium">
            {language === 'fr' ? 'Bon à Savoir' : 'Good to Know'}
          </h3>
        </div>

        {/* Prohibitions tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-[#f87171] bg-[#2a1b1b] px-3 py-1 rounded-full border border-[#f87171]/20">
            <CigaretteOff className="w-3.5 h-3.5" />
            <span>{language === 'fr' ? 'Strictement Non-Fumeur' : 'Strictly Non-Smoking'}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#f87171] bg-[#2a1b1b] px-3 py-1 rounded-full border border-[#f87171]/20">
            <PartyPopper className="w-3.5 h-3.5" />
            <span>{language === 'fr' ? 'Fêtes & Soirées Interdites' : 'No Parties or Events'}</span>
          </span>
        </div>
      </div>

      {/* Grid of 6 rules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule, idx) => {
          const Icon = rule.icon;
          return (
            <div
              key={idx}
              className="rounded-xl bg-[#1d1c1c] p-4 flex flex-col justify-between gap-3 border border-white/5 hover:border-[#f2ca50]/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#f2ca50]">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d0c5af]">
                    {rule.title}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-[#f2ca50] bg-[#f2ca50]/10 px-2 py-0.5 rounded-full">
                  {rule.badge}
                </span>
              </div>

              <div>
                <p className="font-serif text-base text-[#e5e2e1] font-semibold">
                  {rule.primary}
                </p>
                <p className="text-xs text-[#99907c] font-light mt-0.5">
                  {rule.secondary}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
