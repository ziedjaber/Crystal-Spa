'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Navigation, ExternalLink, ShoppingBag, Train, Plane, Compass, Car, Key } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LocationMap() {
  const { language } = useLanguage();
  const [activeApt, setActiveApt] = useState<'a2' | 'a1'>('a2');

  const locations = {
    a2: {
      title: 'La Vie est Belle | Spa Privatif',
      city: 'Le Petit-Quevilly, Rouen, Normandie',
      address: 'Le Petit-Quevilly, 76140 (Rouen Métropole)',
      gps: '49.4312° N, 1.0558° E',
      query: '49.4312,1.0558',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=49.4312,1.0558',
      badge: 'NORMANDIE • ROUEN',
      desc: language === 'fr' 
        ? 'Situé à Le Petit-Quevilly aux portes de Rouen. Accès facile, stationnement gratuit et entrée autonome discrète.'
        : 'Situated in Le Petit-Quevilly by Rouen historic center. Easy access, free parking, and discreet self check-in.',
      points: [
        { icon: Car, label: language === 'fr' ? 'Stationnement gratuit sur place & rue' : 'Free on-site & street parking', dist: '0m' },
        { icon: Train, label: language === 'fr' ? 'Métro / Tramway (Accès Rouen)' : 'Tram line to Rouen center', dist: '5 mins' },
        { icon: Compass, label: language === 'fr' ? 'Gare Centrale de Rouen' : 'Rouen Central Station', dist: '10 mins' },
        { icon: Key, label: language === 'fr' ? 'Entrée autonome serrure connectée' : 'Smart lock keyless access', dist: '24h/24' },
      ],
    },
    a1: {
      title: 'Suite Diamant Noir | Spa Privatif',
      city: 'Paris 8ème Arrondissement',
      address: '14 Avenue Montaigne, 75008 Paris',
      gps: '48.8661° N, 2.3045° E',
      query: '48.8661,2.3045',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=48.8661,2.3045',
      badge: 'TRIANGLE D\'OR PARIS',
      desc: language === 'fr'
        ? 'Situé sur l’Avenue Montaigne dans le 8ème arrondissement de Paris. À deux pas des Champs-Élysées et de la Seine.'
        : 'Located on Avenue Montaigne in Paris 8th district. Steps from Champs-Élysées and the Seine river.',
      points: [
        { icon: ShoppingBag, label: language === 'fr' ? 'Boutiques Haute Couture (Avenue Montaigne)' : 'Haute Couture Boutiques', dist: '50m' },
        { icon: Train, label: language === 'fr' ? 'Métro Alma-Marceau (Ligne 9)' : 'Alma-Marceau Metro (Line 9)', dist: '2 mins' },
        { icon: Navigation, label: language === 'fr' ? 'Proximité Tour Eiffel & Seine' : 'Eiffel Tower & Seine proximity', dist: '8 mins' },
        { icon: Plane, label: language === 'fr' ? 'Aéroport Paris CDG / Orly' : 'Paris CDG / Orly Airports', dist: '35 mins' },
      ],
    }
  };

  const current = locations[activeApt];

  return (
    <section className="py-24 bg-[#121212] relative overflow-hidden" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header with Logo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Crystal Spa Logo"
                width={48}
                height={48}
                className="h-10 w-auto object-contain"
                unoptimized
              />
              <span className="badge-luxury">LOCALISATIONS DE PRESTIGE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-wide">
              {language === 'fr' ? 'Deux Adresses' : 'Two Locations'} & <span className="text-[#F5D97A]">{language === 'fr' ? 'Cartes' : 'Maps'}</span>
            </h2>
          </div>

          {/* Location Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#1c1b1b] p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveApt('a2')}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeApt === 'a2'
                  ? 'bg-[#d4af37] text-[#3c2f00] shadow-md'
                  : 'text-[#B8B8B8] hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Appartement 2 : Rouen / Normandie</span>
            </button>
            <button
              onClick={() => setActiveApt('a1')}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeApt === 'a1'
                  ? 'bg-[#d4af37] text-[#3c2f00] shadow-md'
                  : 'text-[#B8B8B8] hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Appartement 1 : Paris 8e</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Map Frame */}
          <div className="lg:col-span-2 card-luxury relative min-h-[440px] overflow-hidden group border border-white/10 shadow-2xl">
            <iframe
              key={activeApt}
              title={`Crystal Spa ${current.title} Location Map`}
              width="100%"
              height="100%"
              className="absolute inset-0 border-0 grayscale invert opacity-80 group-hover:opacity-95 transition-opacity"
              src={`https://maps.google.com/maps?q=${current.query}&z=15&output=embed`}
            />

            <div className="absolute top-6 left-6 z-10 glass-panel-luxury p-4 space-y-1 backdrop-blur-md">
              <span className="badge-luxury">{current.badge}</span>
              <span className="font-mono text-xs font-bold text-[#FAFAFA] block pt-1">{current.gps}</span>
              <span className="text-xs text-[#B8B8B8] block">{current.address}</span>
            </div>

            <div className="absolute bottom-6 right-6 z-10">
              <a
                href={current.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-primary text-xs py-3 px-5 shadow-xl"
              >
                Ouvrir sur Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Location Proximity Info Card */}
          <div className="card-luxury p-8 flex flex-col justify-between space-y-8 border border-white/10">
            <div>
              <span className="badge-luxury mb-2 inline-block">{current.badge}</span>
              <h3 className="font-serif text-2xl font-bold text-[#FAFAFA]">
                {current.title}
              </h3>
              <p className="text-xs text-[#d0c5af] mt-[2px] font-medium">{current.city}</p>
              <p className="text-xs text-[#B8B8B8] mt-3 leading-relaxed font-light">
                {current.desc}
              </p>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6">
              {current.points.map((pt, idx) => {
                const IconComponent = pt.icon;
                return (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2.5 text-[#FAFAFA] font-medium">
                      <IconComponent className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{pt.label}</span>
                    </span>
                    <span className="text-[#D4AF37] font-bold whitespace-nowrap">{pt.dist}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/5">
              <a
                href={current.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-secondary w-full text-xs py-3"
              >
                <Compass className="w-4 h-4" />
                {language === 'fr' ? 'Itinéraire d’accès sécurisé' : 'Get Directions'}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
