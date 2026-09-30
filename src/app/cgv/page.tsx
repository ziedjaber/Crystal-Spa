'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { FileText, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CGVPage() {
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
            <FileText className={`w-6 h-6 ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`} />
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              {language === 'fr' ? 'Conditions Générales de Vente (CGV)' : 'Terms & Conditions'}
            </h1>
          </div>
          <p className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-[#666666]'}`}>
            {language === 'fr' ? 'Régissant les réservations de suites spa privatives' : 'Governing private spa suite bookings'}
          </p>
        </div>

        <div className={`p-8 rounded-3xl border space-y-8 text-xs sm:text-sm leading-relaxed ${isDark ? 'bg-[#141312] border-white/10' : 'bg-[#ffffff] border-black/10 shadow-sm'}`}>
          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              1. Objet & Réservation
            </h2>
            <p>
              Les présentes Conditions Générales de Vente s’appliquent à toute réservation effectuée en ligne sur le site officiel de Crystal Spa pour nos suites privatisées avec balnéothérapie/jacuzzi. La confirmation de commande implique l’adhésion pleine et entière aux présentes conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              2. Tarifs & Modalités de Paiement
            </h2>
            <p>
              Les tarifs sont indiqués en Euros (€) toutes taxes comprises (TTC), incluant la taxe de séjour légale et le forfait ménage complet. Le règlement s’effectue en totalité lors de la réservation par carte bancaire sécurisée via notre passerelle certifiée Stripe.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              3. Dépôt de Garantie (Empreinte de Caution)
            </h2>
            <p>
              Pour toute réservation, une empreinte bancaire non débitée de <strong>250 €</strong> est demandée à titre de caution. Cette somme n’est pas débitée de votre compte. Elle est automatiquement libérée dans les 48 heures suivant le départ après état des lieux, sous réserve du respect du règlement intérieur (non-fumeur dans les suites, préservation des équipements spa).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              4. Arrivée & Départ Autonomes
            </h2>
            <p>
              L’accès aux suites s’effectue en toute discrétion et autonomie grâce à nos serrures connectées :
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
              <li><strong>Arrivée (Check-in) :</strong> à partir de 17h00 (ou 15h00 avec le Pack Confort)</li>
              <li><strong>Départ (Check-out) :</strong> jusqu’à 11h00 (ou 13h00 avec le Pack Confort)</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              5. Politique d’Annulation & Report
            </h2>
            <p>
              En cas d’imprévu, toute demande d’annulation ou de report de date doit être formulée par écrit à la conciergerie. L’annulation avec remboursement intégral est possible jusqu’à 7 jours avant la date d’arrivée. Entre 7 jours et 48 heures avant l’arrivée, un avoir ou un report de date est proposé. Moins de 48 heures avant le séjour, le montant demeure acquis.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
