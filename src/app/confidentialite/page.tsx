'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ConfidentialitePage() {
  const { language } = useLanguage();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#0f0e0e] text-[#e5e2e1]' : 'bg-[#FAF8F5] text-[#171717]'}`}>
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        <div>
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-6 transition-colors ${
              isDark ? 'text-[#f2ca50] hover:underline' : 'text-[#b89032] hover:underline'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'fr' ? 'Retour à l’accueil' : 'Back to Home'}</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Lock className={`w-6 h-6 ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`} />
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              {language === 'fr' ? 'Politique de Confidentialité (RGPD)' : 'Privacy Policy (GDPR)'}
            </h1>
          </div>
          <p className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-[#666666]'}`}>
            {language === 'fr' ? 'Protection de vos données personnelles' : 'Protecting your personal information'}
          </p>
        </div>

        <div className={`p-8 rounded-3xl border space-y-8 text-xs sm:text-sm leading-relaxed ${isDark ? 'bg-[#141312] border-white/10' : 'bg-[#ffffff] border-black/10 shadow-sm'}`}>
          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              1. Collecte des Données
            </h2>
            <p>
              Dans le cadre de votre réservation de suite avec spa privatif, nous collectons uniquement les données strictement nécessaires au bon déroulement de votre séjour : nom, prénom, adresse e-mail, numéro de téléphone portable et dates de réservation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              2. Sécurité des Paiements (Stripe)
            </h2>
            <p>
              Vos coordonnées bancaires (numéro de carte, CVC, date d’expiration) ne transitent jamais et ne sont jamais stockées sur nos serveurs. Elles sont chiffrées de bout en bout et traitées directement par notre prestataire certifié <strong>Stripe Inc.</strong> (conforme au standard bancaire de sécurité le plus élevé PCI-DSS Niveau 1).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              3. Vos Droits Informatique et Libertés
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit permanent d’accès, de rectification, de portabilité et de suppression de vos données personnelles. Vous pouvez exercer ce droit à tout moment en écrivant à notre DPO à : <strong>dpo@crystal-spa.fr</strong> ou via WhatsApp au <strong>06 29 86 69 09</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
