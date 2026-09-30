'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { ShieldCheck, Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MentionsLegalesPage() {
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
            <Scale className={`w-6 h-6 ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`} />
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              {language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
            </h1>
          </div>
          <p className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-[#666666]'}`}>
            {language === 'fr' ? 'Dernière mise à jour : Octobre 2026' : 'Last updated: October 2026'}
          </p>
        </div>

        <div className={`p-8 rounded-3xl border space-y-8 text-xs sm:text-sm leading-relaxed ${isDark ? 'bg-[#141312] border-white/10' : 'bg-[#ffffff] border-black/10 shadow-sm'}`}>
          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              1. Éditeur du Site
            </h2>
            <p>
              Le site <strong>Crystal Spa</strong> (accessible via le domaine officiel) est édité par la société exploitante des suites avec spa privatif Crystal Spa.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
              <li><strong>Raison sociale :</strong> Crystal Spa SAS / SARL (en cours d’immatriculation)</li>
              <li><strong>Siège social :</strong> Rouen & Région Parisienne, France</li>
              <li><strong>Téléphone Conciergerie :</strong> +33 (0)6 29 86 69 09</li>
              <li><strong>Email :</strong> contact@crystal-spa.fr</li>
              <li><strong>Directeur de la publication :</strong> La Direction Crystal Spa</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              2. Hébergement & Infrastructure
            </h2>
            <p>
              L’infrastructure web haute performance et sécurisée est hébergée par :
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
              <li><strong>Hébergeur :</strong> Vercel Inc. (ou Railway / AWS Cloud)</li>
              <li><strong>Adresse :</strong> 340 S Lemon Ave #1142 Walnut, CA 91789, USA</li>
              <li><strong>Chiffrement :</strong> Certificat SSL/TLS Let’s Encrypt 256-bit avec protocole HTTPS obligatoire.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              3. Propriété Intellectuelle
            </h2>
            <p>
              L’ensemble des éléments visuels, photographies des suites, vidéos immersives, textes, logotypes, charte graphique et code source composant le site sont la propriété exclusive de Crystal Spa ou font l’objet d’une licence d’exploitation régulière. Toute reproduction ou distribution sans accord écrit préalable est formellement prohibée.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-[#b89032]'}`}>
              4. Médiation de la Consommation
            </h2>
            <p>
              Conformément à l’article L. 612-1 du Code de la consommation, en cas de litige non résolu à l’amiable avec notre service conciergerie, le client consommateur a le droit de recourir gratuitement à un médiateur de la consommation agréé (ex. Médiation Tourisme et Voyage - MTV).
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
