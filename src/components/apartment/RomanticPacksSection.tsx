'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, Clock, Wine, Crown, Sparkles, Check } from 'lucide-react';

interface RomanticPacksSectionProps {
  onSelectPack?: (packId: string) => void;
  selectedPackId?: string | null;
}

export const ROMANTIC_PACKS = [
  {
    id: 'pack-confort',
    name: 'Pack Confort',
    nameEn: 'Comfort Pack',
    price: 29,
    tag: 'Temps Additionnel',
    tagEn: 'Extra Hours',
    popular: false,
    icon: Clock,
    summary: 'Arrivée dès 15h / Départ 13h (+4h de spa)',
    summaryEn: 'Early check-in 3PM / Late check-out 1PM (+4h spa)',
    description:
      'Prolongez votre parenthèse avec 4 heures de spa supplémentaires : arrivée anticipée dès 15h00 et départ tardif jusqu’à 13h00.',
    descriptionEn:
      'Extend your romantic stay with 4 extra hours: early arrival from 3:00 PM and late departure until 1:00 PM.',
    features: [
      'Arrivée anticipée dès 15h00 (au lieu de 17h00)',
      'Départ tardif jusqu’à 13h00 (au lieu de 11h00)',
      '+4 heures d’accès au jacuzzi privatif',
      'Profitez d’une matinée sans précipitation',
    ],
    featuresEn: [
      'Early check-in at 3:00 PM (instead of 5:00 PM)',
      'Late check-out until 1:00 PM (instead of 11:00 AM)',
      '+4 extra hours of private hydro spa access',
      'Enjoy a peaceful, unhurried morning',
    ],
  },
  {
    id: 'pack-romance',
    name: 'Pack Romance',
    nameEn: 'Romance Pack',
    price: 49,
    tag: 'Ambiance Tamisée',
    tagEn: 'Romantic Mood',
    popular: false,
    icon: Heart,
    summary: 'Pétales de roses, bougies & chocolats fins',
    summaryEn: 'Rose petals, candles & fine chocolates',
    description:
      'Une atmosphère romantique féerique prête dès votre ouverture de porte pour émerveiller votre moitié.',
    descriptionEn:
      'A fairytale romantic atmosphere ready upon door opening to enchant your significant other.',
    features: [
      'Pétales de roses soyeux dispersés sur lit & jacuzzi',
      'Bougies d’ambiance LED chaleureuses allumées',
      'Mot d’amour calligraphié sous pli scellé',
      'Coffret de chocolats artisanaux d’exception',
    ],
    featuresEn: [
      'Silky rose petals sprinkled on bed & spa',
      'Warm LED mood candles illuminated upon arrival',
      'Personalized handwritten love letter in sealed envelope',
      'Artisanal fine chocolate gift box',
    ],
  },
  {
    id: 'pack-love',
    name: 'Pack Love',
    nameEn: 'Love Pack',
    price: 59,
    tag: 'Coup de Cœur',
    tagEn: 'Most Popular',
    popular: true,
    icon: Wine,
    summary: 'Pack Romance + Demi-bouteille de Champagne & macarons',
    summaryEn: 'Romance Pack + Half-bottle Champagne & macarons',
    description:
      'L’équilibre parfait : l’ambiance romantique complète accompagnée de bulles fraîches et de douceurs raffinées.',
    descriptionEn:
      'The perfect romantic balance: complete romantic décor accompanied by chilled champagne bubbles and delicacies.',
    features: [
      'Tous les privilèges du Pack Romance (pétales & bougies)',
      'Demi-bouteille de champagne frais de Maison',
      'Seau à glace rafraîchi et flûtes en cristal',
      'Duo de macarons parisiens artisanaux',
    ],
    featuresEn: [
      'All Romance Pack privileges (petals & candles)',
      'Chilled half-bottle of Maison Champagne',
      'Cooled ice bucket and crystal flutes ready',
      'Duo of Parisian artisanal macarons',
    ],
  },
  {
    id: 'pack-prestige',
    name: 'Pack Prestige',
    nameEn: 'Prestige Pack',
    price: 79,
    tag: 'Expérience Ultime',
    tagEn: 'Ultimate Luxury',
    popular: false,
    icon: Crown,
    summary: 'Bouteille Moët & Chandon, pétales naturels & départ tardif',
    summaryEn: 'Moët & Chandon bottle, natural petals & late check-out',
    description:
      'Le summum du luxe : grande bouteille de champagne de prestige, décoration grandiose et départ tardif offert.',
    descriptionEn:
      'The pinnacle of luxury: full bottle of prestige champagne, spectacular natural floral setup, and late departure.',
    features: [
      'Bouteille entière de Moët & Chandon Brut Impérial au frais',
      'Chemin féerique de pétales de roses fraîches naturelles',
      'Coffret dégustation prestige mignardises & chocolats',
      'Départ tardif inclus jusqu’à 12h30',
    ],
    featuresEn: [
      'Full bottle of chilled Moët & Chandon Brut Impérial',
      'Fairy trail of fresh natural rose petals',
      'Prestige gourmet tasting box (macarons & treats)',
      'Complimentary late check-out until 12:30 PM',
    ],
  },
];

export default function RomanticPacksSection({
  onSelectPack,
  selectedPackId,
}: RomanticPacksSectionProps) {
  const { language } = useLanguage();

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-20 bg-[#0e0e0e]" id="packs-romantiques">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2ca50]">
              {language === 'fr' ? 'Envie de Prolonger la Parenthèse ?' : 'Enhance Your Romantic Escape'}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#e5e2e1]">
            {language === 'fr' ? 'Nos 4 Packs Romantiques d’Exception' : 'Our 4 Signature Romantic Add-on Packs'}
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] font-light leading-relaxed">
            {language === 'fr'
              ? 'Personnalisez votre séjour avec des attentions préparées avec soin par notre conciergerie avant votre arrivée.'
              : 'Tailor your private stay with bespoke romantic setups arranged by our private concierge team prior to your arrival.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {ROMANTIC_PACKS.map((pack) => {
            const Icon = pack.icon;
            const isSelected = selectedPackId === pack.id;

            return (
              <div
                key={pack.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all duration-300 relative ${
                  pack.popular
                    ? 'bg-[#1a1813] border-2 border-[#f2ca50] shadow-[0_10px_35px_rgba(242,202,80,0.15)] -translate-y-1'
                    : isSelected
                    ? 'bg-[#1e1c18] border-2 border-[#f2ca50] shadow-xl'
                    : 'bg-[#181717] border border-white/5 hover:border-[#f2ca50]/30 hover:shadow-xl'
                }`}
              >
                {/* Popular Ribbon */}
                {pack.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f2ca50] text-[#3c2f00] text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                    {language === 'fr' ? 'Le Plus Choisi par les Couples' : 'Couples’ Favorite'}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#22201b] border border-[#f2ca50]/20 flex items-center justify-center text-[#f2ca50]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider bg-[#f2ca50]/10 px-2.5 py-1 rounded-full border border-[#f2ca50]/20">
                      {language === 'fr' ? pack.tag : pack.tagEn}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-[#e5e2e1] font-semibold">
                      {language === 'fr' ? pack.name : pack.nameEn}
                    </h3>
                    <p className="text-xs text-[#f2ca50] font-medium mt-1">
                      {language === 'fr' ? pack.summary : pack.summaryEn}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 pt-2 border-t border-white/5">
                    <span className="font-serif text-3xl font-bold text-[#f2ca50]">
                      +{pack.price} €
                    </span>
                    <span className="text-xs text-[#d0c5af] font-light">
                      {language === 'fr' ? 'en option à la réservation' : 'optional add-on'}
                    </span>
                  </div>

                  <p className="text-xs text-[#c9c6bf] font-light leading-relaxed">
                    {language === 'fr' ? pack.description : pack.descriptionEn}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    {(language === 'fr' ? pack.features : pack.featuresEn).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#d0c5af]">
                        <Check className="w-3.5 h-3.5 text-[#f2ca50] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={() => onSelectPack && onSelectPack(pack.id)}
                  className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#22c55e] text-white shadow-lg'
                      : pack.popular
                      ? 'bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] shadow-md hover:shadow-lg'
                      : 'bg-[#222121] hover:bg-[#2e2d2d] text-[#e5e2e1] hover:text-[#f2ca50] border border-white/10'
                  }`}
                >
                  {isSelected
                    ? (language === 'fr' ? '✓ Pack Sélectionné' : '✓ Pack Selected')
                    : (language === 'fr' ? 'Ajouter ce Pack' : 'Select this Pack')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Reassurance Footer note */}
        <p className="text-xs text-center text-[#99907c] font-light -mt-4">
          {language === 'fr'
            ? '✦ Ces packs peuvent être choisis directement lors de votre réservation en ligne ou ajoutés ultérieurement par SMS.'
            : '✦ These packs can be selected directly upon booking online or added later by text message.'}
        </p>

      </div>
    </section>
  );
}
