'use client';

import React, { useState } from 'react';
import { SuiteItem } from './SuitesCollection';
import { useLanguage } from '@/context/LanguageContext';
import SuiteGoodToKnow from './SuiteGoodToKnow';
import { Maximize2, Users, Lock, Waves, Bed, Tv, Coffee, Key, ShieldCheck } from 'lucide-react';

interface SuiteSignatureDetailProps {
  currentSuite: SuiteItem;
  onConfirmBooking: (bookingDetails: {
    suiteTitle: string;
    totalPrice: number;
    extras: string[];
  }) => void;
}

export default function SuiteSignatureDetail({
  currentSuite,
  onConfirmBooking,
}: SuiteSignatureDetailProps) {
  const { language } = useLanguage();
  const [packConfort, setPackConfort] = useState(false);
  const [packRomance, setPackRomance] = useState(false);
  const [packLove, setPackLove] = useState(false);
  const [packPrestige, setPackPrestige] = useState(false);

  const calculateTotal = () => {
    let total = currentSuite.price;
    if (packConfort) total += 29;
    if (packRomance) total += 49;
    if (packLove) total += 59;
    if (packPrestige) total += 79;
    return total;
  };

  const handleBookingClick = () => {
    const extras: string[] = [];
    if (packConfort) extras.push(language === 'fr' ? 'Pack Confort (+29€)' : 'Comfort Pack (+29€)');
    if (packRomance) extras.push(language === 'fr' ? 'Pack Romance (+49€)' : 'Romance Pack (+49€)');
    if (packLove) extras.push(language === 'fr' ? 'Pack Love (+59€)' : 'Love Pack (+59€)');
    if (packPrestige) extras.push(language === 'fr' ? 'Pack Prestige (+79€)' : 'Prestige Pack (+79€)');

    onConfirmBooking({
      suiteTitle: language === 'fr' ? currentSuite.title : currentSuite.titleEn,
      totalPrice: calculateTotal(),
      extras,
    });
  };

  const aptKey = (() => {
    const norm = (currentSuite.id || '').toLowerCase();
    if (norm === 'a1' || norm === 'you-and-me' || norm === 'diamant-noir') return 'a1';
    if (norm === 'a3' || norm === 'le-reve-luxe' || norm === 'suite-celeste') return 'a3';
    return 'a2';
  })();

  // Dynamic photos depending on suite
  const mainImage = aptKey === 'a3' ? '/a3/Jacuzzi.png' : aptKey === 'a1' ? '/a1/Jacuzzi.png' : '/a2/Jacuzzi.png';
  const detailImage1 = aptKey === 'a3' ? '/a3/Chambre.png' : aptKey === 'a1' ? '/a1/Chambre.png' : '/a2/chambre.png';
  const detailImage2 = aptKey === 'a3' ? '/a3/Salon.png' : aptKey === 'a1' ? '/a1/salon.png' : '/a2/salon.png';

  // Dynamic descriptions & features per apartment
  const aptDetails = {
    a1: {
      mainTitle: language === 'fr' ? 'Jacuzzi Spa Privatif & Sauna 24h/24' : 'Private Hydro Spa & Sauna 24/7',
      mainDesc: language === 'fr' ? 'Chauffé à 38°C • Buses d’eau massantes & chromothérapie 7 nuances' : 'Heated at 38°C • Massaging water jets & 7-tone chromotherapy',
      detail1Title: language === 'fr' ? 'Sauna Cèdre Rouge Canadien' : 'Canadian Red Cedar Sauna',
      detail1Desc: language === 'fr' ? 'Chaleur sèche 85°C & aromathérapie pin sibérien' : '85°C dry heat & Siberian pine aromatherapy',
      detail2Title: language === 'fr' ? 'Salon & Espace Repos Cinéma' : 'Cinema Lounge & Relaxation',
      detail2Desc: language === 'fr' ? 'Canapé confortable, Smart TV avec Netflix & Wi-Fi fibre' : 'Plush sofa, Smart TV with Netflix & fiber Wi-Fi',
      bedTitle: language === 'fr' ? 'Lit Queen Size Grand Confort' : 'Queen Size Comfort Bed',
      bedDesc: language === 'fr' ? 'Linge de lit en satin de coton doux, matelas haute densité et oreillers moelleux.' : 'Egyptian cotton linens, high-density mattress, and plush pillows.',
      tvTitle: language === 'fr' ? 'Smart TV 4K avec Netflix & YouTube' : 'Smart 4K TV with Netflix & YouTube',
      tvDesc: language === 'fr' ? 'Grand écran connecté dans l’espace séjour avec accès illimité à vos divertissements.' : 'Large connected screen in living area with unlimited streaming.',
      kitchenTitle: language === 'fr' ? 'Cuisine Équipée & Machine à Café' : 'Full Kitchen & Coffee Station',
      kitchenDesc: language === 'fr' ? 'Cafetière, réfrigérateur, micro-ondes, plaques de cuisson, vaisselle et verres à vin.' : 'Coffee maker, fridge, microwave, stovetop, cookware and wine glasses.',
      parking: language === 'fr' ? 'Gratuit sur place & rue' : 'Free on-site & street',
      parkingGoodToKnow: language === 'fr' ? 'Stationnement gratuit sur place et dans la rue' : 'Free on-site and street parking',
    },
    a2: {
      mainTitle: language === 'fr' ? 'Spa Privatif 24h/24 & Smart TV' : '24/7 Private Hydro Spa & Smart TV',
      mainDesc: language === 'fr' ? 'Température réglable immédiate • Écran face au jacuzzi avec Netflix/Disney+' : 'Instant temperature control • In-front smart screen with Netflix/Disney+',
      detail1Title: language === 'fr' ? 'Chambre Romantique Queen Size' : 'Romantic Queen Size Bedroom',
      detail1Desc: language === 'fr' ? 'Lit confort hôtel, écran mural et rideaux occultants' : 'Hotel-comfort bed, smart TV & blackout curtains',
      detail2Title: language === 'fr' ? 'Salon Cosy & Climatisation' : 'Cosy Lounge & Reversible A/C',
      detail2Desc: language === 'fr' ? 'Canapé confortable, décoration soignée & Wi-Fi fibre gratuit' : 'Plush sofa, refined ambiance & high-speed fiber Wi-Fi',
      bedTitle: language === 'fr' ? 'Lit Queen Size Grand Confort' : 'Queen Size Hotel Bed',
      bedDesc: language === 'fr' ? 'Linge de lit en coton égyptien, matelas haute densité et oreillers moelleux.' : 'Egyptian cotton linens, high-density mattress, and plush pillows.',
      tvTitle: language === 'fr' ? '2 Téléviseurs Smart TV 4K' : '2 Smart 4K TVs',
      tvDesc: language === 'fr' ? 'Un écran face au jacuzzi + un écran dans la chambre avec Netflix, YouTube, Disney+.' : 'One screen facing the jacuzzi + one in bedroom with Netflix, YouTube, Disney+.',
      kitchenTitle: language === 'fr' ? 'Machine Nespresso & Cuisine' : 'Nespresso & Kitchenette',
      kitchenDesc: language === 'fr' ? 'Cafetière expresso, thé, réfrigérateur, micro-ondes, vaisselle et verres à vin.' : 'Espresso maker, tea selection, fridge, microwave, cookware and wine glasses.',
      parking: language === 'fr' ? 'Gratuit sur place & rue' : 'Free on-site & street',
      parkingGoodToKnow: language === 'fr' ? 'Stationnement privé gratuit sur place & rue' : 'Free private on-site & street parking',
    },
    a3: {
      mainTitle: language === 'fr' ? 'Jacuzzi & Sauna Privatifs 24h/24' : 'Private 24/7 Jacuzzi & Sauna',
      mainDesc: language === 'fr' ? 'Bassin balnéo chauffé • TV panoramique face au bain & sauna finlandais' : 'Heated hydro spa • Panoramic TV facing the tub & Finnish sauna',
      detail1Title: language === 'fr' ? 'Chambre Cocon Romantique' : 'Romantic Cocoon Bedroom',
      detail1Desc: language === 'fr' ? 'Literie haut de gamme Queen Size, ambiance tamisée et calme absolu' : 'Premium Queen Size bedding, ambient mood lighting & calm',
      detail2Title: language === 'fr' ? 'Salon Séjour Confort & Écran Connecté' : 'Comfort Lounge & Connected TV',
      detail2Desc: language === 'fr' ? 'Espace lounge raffiné, fauteuils confortables & Wi-Fi fibre' : 'Refined lounge space, comfortable seating & fiber Wi-Fi',
      bedTitle: language === 'fr' ? 'Lit Queen Size Cocon Douillet' : 'Queen Size Plush Cocoon Bed',
      bedDesc: language === 'fr' ? 'Matelas mémoire de forme haute résilience, draps satinés et couette gonflante.' : 'High resilience memory mattress, satin sheets and plush duvet.',
      tvTitle: language === 'fr' ? 'Écran TV Face au Jacuzzi (Cinéma & Spa)' : 'TV Screen Facing Jacuzzi (Cinema & Spa)',
      tvDesc: language === 'fr' ? 'Profitez de vos films et séries Netflix/YouTube directement immergé dans le bain à remous.' : 'Enjoy your favorite movies and series directly while immersed in the hot tub.',
      kitchenTitle: language === 'fr' ? 'Kitchenette Équipée & Cafetière' : 'Equipped Kitchenette & Coffee Station',
      kitchenDesc: language === 'fr' ? 'Four micro-ondes, réfrigérateur, cafetière, verres à pied et vaisselle complète.' : 'Microwave, fridge, coffee maker, stemware and full tableware.',
      parking: language === 'fr' ? 'Gratuit dans la rue' : 'Free on street',
      parkingGoodToKnow: language === 'fr' ? 'Stationnement gratuit très facile dans la rue' : 'Free and easy street parking',
    },
  }[aptKey];

  return (
    <section className="w-full bg-[#0e0e0e] py-20 px-6 md:px-12 lg:px-24" id="suite-signature">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#f2ca50]">
              {language === 'fr' ? 'Pleins Feux sur Notre Suite Vedette' : 'Spotlight on Our Featured Sanctuary'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider border border-[#f2ca50]/30">
              {currentSuite.rating} ★ {currentSuite.reviewsCount}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-serif text-3xl md:text-5xl text-[#e5e2e1]">
              {language === 'fr' ? currentSuite.title : currentSuite.titleEn}
            </h2>
            <div className="flex items-center gap-4 text-[#c9c6bf] text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#f2ca50]" />
                {currentSuite.area}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#f2ca50]" />
                2 {language === 'fr' ? 'Hôtes' : 'Guests'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#f2ca50]" />
                {language === 'fr' ? 'Accès 100% Discret' : '100% Private Access'}
              </span>
            </div>
          </div>
        </div>

        {/* High-End Split Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Cinematic View */}
          <div className="lg:col-span-8 relative rounded-xl overflow-hidden min-h-[380px] lg:min-h-[500px] luxury-card zoom-container group border border-white/5">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${mainImage}')` }}
            />
            <div className="absolute bottom-4 left-4 right-4 p-5 rounded-lg bg-[#131313]/90 backdrop-blur-md flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <Waves className="w-6 h-6 text-[#f2ca50] shrink-0" />
                <div>
                  <p className="font-serif text-sm font-semibold text-[#e5e2e1]">
                    {aptDetails.mainTitle}
                  </p>
                  <p className="text-xs text-[#d0c5af] font-light">
                    {aptDetails.mainDesc}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider hidden sm:inline">
                {language === 'fr' ? 'Chauffé à 38°C' : 'Heated at 38°C'}
              </span>
            </div>
          </div>

          {/* 2 Stacked Auxiliary Details */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="relative rounded-xl overflow-hidden min-h-[235px] luxury-card zoom-container group border border-white/5">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${detailImage1}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[#e5e2e1]">
                <p className="font-serif text-sm font-semibold text-[#e5e2e1]">
                  {aptDetails.detail1Title}
                </p>
                <p className="text-[11px] text-[#d0c5af] font-light">
                  {aptDetails.detail1Desc}
                </p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden min-h-[235px] luxury-card zoom-container group border border-white/5">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${detailImage2}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[#e5e2e1]">
                <p className="font-serif text-sm font-semibold text-[#e5e2e1]">
                  {aptDetails.detail2Title}
                </p>
                <p className="text-[11px] text-[#d0c5af] font-light">
                  {aptDetails.detail2Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Specs and Reservation Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="signature-booking">
          
          {/* Detailed Specifications List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-serif text-2xl text-[#e5e2e1]">
              {language === 'fr' ? 'Équipements d’Excellence Inclus' : 'Signature Amenities Included'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#1c1b1b] flex gap-3.5 items-start luxury-card border border-white/5">
                <Bed className="w-6 h-6 text-[#f2ca50] shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#e5e2e1]">
                    {aptDetails.bedTitle}
                  </h4>
                  <p className="text-xs text-[#d0c5af] font-light mt-0.5 leading-relaxed">
                    {aptDetails.bedDesc}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#1c1b1b] flex gap-3.5 items-start luxury-card border border-white/5">
                <Tv className="w-6 h-6 text-[#f2ca50] shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#e5e2e1]">
                    {aptDetails.tvTitle}
                  </h4>
                  <p className="text-xs text-[#d0c5af] font-light mt-0.5 leading-relaxed">
                    {aptDetails.tvDesc}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#1c1b1b] flex gap-3.5 items-start luxury-card border border-white/5">
                <Coffee className="w-6 h-6 text-[#f2ca50] shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#e5e2e1]">
                    {aptDetails.kitchenTitle}
                  </h4>
                  <p className="text-xs text-[#d0c5af] font-light mt-0.5 leading-relaxed">
                    {aptDetails.kitchenDesc}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#1c1b1b] flex gap-3.5 items-start luxury-card border border-white/5">
                <Key className="w-6 h-6 text-[#f2ca50] shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#e5e2e1]">
                    {language === 'fr' ? 'Arrivée Autonome Serrure Connectée' : 'Smart Lock Keyless Arrival'}
                  </h4>
                  <p className="text-xs text-[#d0c5af] font-light mt-0.5 leading-relaxed">
                    {language === 'fr'
                      ? 'Code secret personnel transmis par message avant votre arrivée pour une discrétion totale.'
                      : 'Personal access code delivered via text message before check-in for total discretion.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Hygiene Protocol Guarantee */}
            <div className="p-5 rounded-xl bg-[#1c1b1b] flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-[#f2ca50] shrink-0" />
                <p className="text-xs text-[#e5e2e1]">
                  {language === 'fr'
                    ? 'Vidange intégrale du jacuzzi & protocole de désinfection ozone après chaque séjour.'
                    : 'Complete hot tub water change & ozone sterilization cycle after every single stay.'}
                </p>
              </div>
              <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider whitespace-nowrap bg-[#f2ca50]/15 px-3 py-1 rounded-full border border-[#f2ca50]/30">
                100% Hygiène Certifiée
              </span>
            </div>
          </div>

          {/* Interactive Direct Booking Calculator */}
          <div className="lg:col-span-5 rounded-xl bg-[#1c1b1b] p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-[#f2ca50]/30">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#f2ca50] tracking-widest">
                  {language === 'fr' ? 'Réservation Directe Meilleur Prix' : 'Direct Booking Best Rate'}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">
                  {language === 'fr' ? currentSuite.title : currentSuite.titleEn}
                </h4>
                <p className="text-[11px] text-[#c9c6bf]">{currentSuite.location}</p>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl sm:text-3xl text-[#f2ca50] font-bold">
                  {currentSuite.price} €
                </span>
                <span className="text-[#d0c5af] text-xs font-light"> / {language === 'fr' ? 'nuit' : 'night'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#201f1f] p-4 rounded-lg border border-white/5 text-xs">
              <div className="flex justify-between text-[#d0c5af]">
                <span>{language === 'fr' ? 'Horaires d’accès :' : 'Check-in / Check-out:'}</span>
                <span className="text-white font-medium">17h00 → 11h00</span>
              </div>
              <div className="flex justify-between text-[#d0c5af]">
                <span>{language === 'fr' ? 'Stationnement :' : 'Parking:'}</span>
                <span className="text-[#f2ca50] font-medium">
                  {aptDetails.parking}
                </span>
              </div>
              <div className="flex justify-between text-[#d0c5af]">
                <span>{language === 'fr' ? 'Capacité :' : 'Capacity:'}</span>
                <span className="text-white font-medium">2 {language === 'fr' ? 'Adultes (Intimité totale)' : 'Adults (Complete Privacy)'}</span>
              </div>
            </div>

            {/* Romantic Packs Add-ons Checkboxes */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-[#c9c6bf] uppercase tracking-wider flex items-center justify-between">
                <span>{language === 'fr' ? 'Packs Romantiques en Option :' : 'Romantic Add-on Packs:'}</span>
                <span className="text-[10px] text-[#f2ca50] font-normal lowercase">{language === 'fr' ? 'au choix' : 'optional'}</span>
              </span>

              {/* Pack Confort */}
              <label className="flex items-center justify-between p-3 rounded-lg bg-[#201f1f] cursor-pointer hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-[#f2ca50]/20">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={packConfort}
                    onChange={(e) => setPackConfort(e.target.checked)}
                    className="w-4 h-4 accent-[#f2ca50] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#e5e2e1] font-medium">
                      {language === 'fr' ? 'Pack Confort' : 'Comfort Pack'}
                    </span>
                    <span className="text-[11px] text-[#99907c]">
                      {language === 'fr' ? 'Arrivée dès 15h / Départ 13h (+4h de spa)' : 'Check-in 3PM / Check-out 1PM (+4h spa)'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#f2ca50] font-bold">+ 29 €</span>
              </label>

              {/* Pack Romance */}
              <label className="flex items-center justify-between p-3 rounded-lg bg-[#201f1f] cursor-pointer hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-[#f2ca50]/20">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={packRomance}
                    onChange={(e) => setPackRomance(e.target.checked)}
                    className="w-4 h-4 accent-[#f2ca50] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#e5e2e1] font-medium">
                      {language === 'fr' ? 'Pack Romance' : 'Romance Pack'}
                    </span>
                    <span className="text-[11px] text-[#99907c]">
                      {language === 'fr' ? 'Pétales de roses, bougies LED, mot personnalisé' : 'Rose petals, LED candles, love note'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#f2ca50] font-bold">+ 49 €</span>
              </label>

              {/* Pack Love */}
              <label className="flex items-center justify-between p-3 rounded-lg bg-[#201f1f] cursor-pointer hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-[#f2ca50]/20">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={packLove}
                    onChange={(e) => setPackLove(e.target.checked)}
                    className="w-4 h-4 accent-[#f2ca50] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#e5e2e1] font-medium">
                      {language === 'fr' ? 'Pack Love (Coup de Cœur)' : 'Love Pack (Favorite)'}
                    </span>
                    <span className="text-[11px] text-[#99907c]">
                      {language === 'fr' ? 'Pack Romance + Demi Champagne & macarons' : 'Romance Pack + Half Champagne & macarons'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#f2ca50] font-bold">+ 59 €</span>
              </label>

              {/* Pack Prestige */}
              <label className="flex items-center justify-between p-3 rounded-lg bg-[#201f1f] cursor-pointer hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-[#f2ca50]/20">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={packPrestige}
                    onChange={(e) => setPackPrestige(e.target.checked)}
                    className="w-4 h-4 accent-[#f2ca50] rounded cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-[#e5e2e1] font-medium">
                      {language === 'fr' ? 'Pack Prestige' : 'Prestige Pack'}
                    </span>
                    <span className="text-[11px] text-[#99907c]">
                      {language === 'fr' ? 'Moët & Chandon, pétales frais & départ tardif' : 'Moët & Chandon bottle, natural petals & late out'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#f2ca50] font-bold">+ 79 €</span>
              </label>
            </div>

            {/* Price Calculation */}
            <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[#e5e2e1]">
              <span className="font-serif text-base sm:text-lg">
                {language === 'fr' ? 'Total estimé du séjour :' : 'Total Stay Price:'}
              </span>
              <span className="font-serif text-3xl text-[#f2ca50] font-bold">
                {calculateTotal()} €
              </span>
            </div>

            <button
              onClick={handleBookingClick}
              className="w-full py-4 rounded-lg bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] font-bold text-xs uppercase tracking-widest luxury-shimmer-btn shadow-xl shadow-[#d4af37]/20 cursor-pointer"
            >
              {language === 'fr' ? 'Réserver en Direct Sans Commission' : 'Book Directly Without Fees'}
            </button>

            {/* Reassurance notes */}
            <div className="text-[11px] text-center text-[#99907c] font-light flex flex-col gap-1">
              <span className="text-[#f2ca50] font-medium">
                {language === 'fr' ? '✓ Caution par empreinte bancaire : 250 € (aucun débit effectué)' : '✓ Security deposit hold: €250 (not debited)'}
              </span>
              <span>
                {language === 'fr'
                  ? 'Paiement 100% sécurisé • Sans création de compte • Confirmation immédiate'
                  : '100% Secure payment • No account required • Instant confirmation'}
              </span>
            </div>
          </div>

        </div>

        {/* Good to Know Practical Block */}
        <SuiteGoodToKnow
          parkingInfo={aptDetails.parkingGoodToKnow}
          className="mt-4"
        />

      </div>
    </section>
  );
}
