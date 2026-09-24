'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: "Comment se déroule l'arrivée autonome 24h/24 ?",
    questionEn: "How does 24/7 keyless self check-in work?",
    answer:
      "Votre arrivée s'effectue en totale autonomie et discrétion dès 17h00 (ou dès 15h00 avec le Pack Confort). Vous recevez par SMS et email votre code secret personnel pour déverrouiller la serrure connectée. Vous pouvez ainsi arriver à l’heure qui vous convient, même tard dans la nuit (22h, 1h du matin...), sans contrainte de rendez-vous.",
    answerEn:
      "Your arrival is 100% autonomous and discreet from 5:00 PM (or 3:00 PM with the Comfort Pack). You receive your personal private passcode via text and email to unlock the electronic smart lock. Arrive whenever you wish, even late at night, without any appointment constraint."
  },
  {
    id: 'faq-2',
    question: "Comment fonctionne la caution de 250 € par empreinte bancaire ?",
    questionEn: "How does the €250 security deposit hold work?",
    answer:
      "La caution de 250 € est une simple pré-autorisation par empreinte bancaire sécurisée (Swikly / Stripe). Aucun montant n’est débité de votre compte bancaire. Le plafond est automatiquement libéré après votre départ et la vérification de la suite par notre équipe d’entretien.",
    answerEn:
      "The €250 security deposit is a simple secure pre-authorization hold (via Swikly / Stripe). No funds are debited from your bank account. The hold is automatically released after your departure and suite inspection by our housekeeping team."
  },
  {
    id: 'faq-3',
    question: "Pourquoi réserver en direct sur ce site plutôt que sur Airbnb ou Booking ?",
    questionEn: "Why book directly on this official site rather than Airbnb or Booking?",
    answer:
      "En réservant directement sur notre site officiel, vous payez 15% à 20% moins cher car il n'y a aucune commission d'intermédiaire de plateforme. Vous profitez en outre du contact direct avec vos hôtes, de la possibilité d'ajouter des Packs Romantiques exclusifs et d'une confirmation immédiate garantie.",
    answerEn:
      "Booking directly on our official website saves you 15% to 20% by avoiding third-party platform fees. You also gain direct WhatsApp/phone contact with your private hosts, access to exclusive Romantic Add-on Packs, and instant guaranteed confirmation."
  },
  {
    id: 'faq-4',
    question: "L'eau du jacuzzi spa est-elle changée et désinfectée entre chaque voyageur ?",
    questionEn: "Is the hydro spa water changed and sanitized between each guest?",
    answer:
      "Oui, impérativement et systématiquement. À la différence des hôtels traditionnels ou spas partagés, nos jacuzzis font l'objet d'une vidange complète, d'une désinfection à l'ozone et aux UV, puis d'un remplissage avec une eau pure à température réglable (38°C) avant chaque nouvel arrivant.",
    answerEn:
      "Yes, strictly and systematically. Unlike public spas, our private hydro tubs undergo a full water drain, ozone and UV sanitization cycle, and are refilled with pure, fresh water heated to your ideal temperature (38°C) before every stay."
  },
  {
    id: 'faq-5',
    question: "Quels sont les horaires de check-in et check-out ?",
    questionEn: "What are the check-in and check-out times?",
    answer:
      "L'accès débute dès 17h00 et le départ est fixé à 11h00. Si vous souhaitez prolonger votre parenthèse à deux, notre 'Pack Confort' (+29 €) vous permet d'arriver dès 15h00 et de partir jusqu'à 13h00 le lendemain (soit 4 heures de détente privative supplémentaires).",
    answerEn:
      "Standard check-in begins at 5:00 PM and check-out is at 11:00 AM. To extend your romantic stay, our 'Comfort Pack' (+€29) enables early arrival from 3:00 PM and late departure until 1:00 PM (+4 hours of private wellness)."
  },
  {
    id: 'faq-6',
    question: "Y a-t-il un parking pour garer notre véhicule en toute sécurité ?",
    questionEn: "Is there secure parking available for our car?",
    answer:
      "Oui, un stationnement gratuit et sécurisé est disponible pour chaque suite (parking privé ou garage fermé privatif selon l’adresse choisie). Vous recevez l’adresse exacte et les consignes d'accès détaillées dès confirmation de votre réservation.",
    answerEn:
      "Yes, free secure parking is provided for each suite (private parking space or enclosed private garage depending on the chosen suite). Full location details and access directions are sent upon reservation."
  },
  {
    id: 'faq-7',
    question: "Fumeurs, animaux de compagnie et fêtes : quelles sont les règles ?",
    questionEn: "Smoking, pets, and parties: what are the house rules?",
    answer:
      "Afin de garantir un calme absolu et une hygiène irréprochable aux amoureux, toutes nos suites sont strictement non-fumeurs. Les animaux ne sont pas admis et les fêtes ou rassemblements sont formellement proscrits. Les suites sont exclusivement réservées à 2 personnes adultes.",
    answerEn:
      "To ensure absolute tranquility and pristine hygiene, all our suites are strictly non-smoking. Pets are not allowed, and parties or external gatherings are strictly prohibited. Suites are exclusively reserved for 2 adult guests."
  },
  {
    id: 'faq-8',
    question: "Proposez-vous des cartes cadeaux pour offrir un séjour romantique ?",
    questionEn: "Do you offer gift cards for a romantic spa escape?",
    answer:
      "Oui ! Nos cartes cadeaux Crystal Spa sont disponibles avec un montant personnalisé ou pour une nuitée complète avec champagne et spa. Elles sont valables 1 an sur toutes nos suites et envoyées instantanément par email ou par coffret cadeau.",
    answerEn:
      "Yes! Crystal Spa gift cards can be ordered for a custom amount or an all-inclusive romantic night with champagne. Valid for 12 months across all suites and delivered instantly via email or physical luxury gift box."
  }
];

export default function FaqSection() {
  const { language, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-20 bg-[#131313] border-t border-white/5" id="faq-accordion">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-14">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f2ca50]">
            {language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#e5e2e1] font-normal">
            {language === 'fr' ? 'Tout ce Qu’il Faut Savoir' : 'Everything You Need to Know'}
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] font-light max-w-xl">
            {language === 'fr'
              ? 'Arrivée autonome, caution, hygiène du spa privatif : toutes les réponses à vos interrogations pour un séjour en toute sérénité.'
              : 'Keyless arrival, deposit pre-authorization, private spa hygiene: all answers for a tranquil romantic getaway.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`group rounded-xl bg-[#1c1b1b] p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
                  isOpen
                    ? 'border-[#f2ca50]/40 shadow-[0_0_25px_rgba(242,202,80,0.1)]'
                    : 'border-white/5 hover:border-[#f2ca50]/20'
                }`}
              >
                <div className="flex justify-between items-center text-[#e5e2e1] select-none gap-4">
                  <span className="font-sans font-medium text-base sm:text-lg group-hover:text-[#f2ca50] transition-colors">
                    {language === 'fr' ? item.question : item.questionEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#f2ca50] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/5 text-sm sm:text-base text-[#d0c5af] font-light leading-relaxed animate-fadeIn">
                    {language === 'fr' ? item.answer : item.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra contact helper */}
        <div className="text-center text-xs text-[#99907c] font-light flex items-center justify-center gap-2">
          <span>{language === 'fr' ? 'Une autre question ? Notre conciergerie vous répond 24/7 au' : 'Another question? Contact our concierge 24/7 at'}</span>
          <a href="tel:+33629866909" className="text-[#f2ca50] font-semibold hover:underline">
            06 29 86 69 09
          </a>
        </div>
      </div>
    </section>
  );
}
