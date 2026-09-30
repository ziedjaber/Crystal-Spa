'use client';

import React, { useState } from 'react';
import { SuiteItem } from './SuitesCollection';
import { useLanguage } from '@/context/LanguageContext';
import {
  Bed,
  Tv,
  Coffee,
  Key,
  ShieldCheck,
  Wifi,
  Sparkles,
  Heart,
  Clock,
  Car,
  Users,
  ShieldAlert,
  Phone,
  Calendar,
  CheckCircle2,
  Droplets,
  Flame,
  Bath,
  Star,
} from 'lucide-react';

interface SuiteSignatureDetailProps {
  currentSuite: SuiteItem;
  onConfirmBooking: (bookingDetails: {
    suiteTitle: string;
    totalPrice: number;
    extras: string[];
    packIds: string[];
    checkIn?: string;
    checkOut?: string;
  }) => void;
}

export default function SuiteSignatureDetail({
  currentSuite,
  onConfirmBooking,
}: SuiteSignatureDetailProps) {
  const { language } = useLanguage();
  const [packConfort, setPackConfort] = useState(false);
  const [packRomance, setPackRomance] = useState(false);
  const [checkInDate, setCheckInDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [checkOutDate, setCheckOutDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );

  const calculateTotal = () => {
    let total = currentSuite.price;
    if (packConfort) total += 29;
    if (packRomance) total += 29;
    return total;
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const extras: string[] = [];
    const packIds: string[] = [];
    if (packConfort) {
      extras.push(language === 'fr' ? 'Pack Confort (+29€)' : 'Comfort Pack (+29€)');
      packIds.push('pack-confort');
    }
    if (packRomance) {
      extras.push(language === 'fr' ? 'Pack Romance (+29€)' : 'Romance Pack (+29€)');
      packIds.push('pack-romance');
    }

    onConfirmBooking({
      suiteTitle: language === 'fr' ? currentSuite.title : currentSuite.titleEn,
      totalPrice: calculateTotal(),
      extras,
      packIds,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });
  };

  const aptKey = (() => {
    const norm = (currentSuite.id || '').toLowerCase();
    if (norm === 'a1' || norm === 'you-and-me' || norm === 'diamant-noir') return 'a1';
    if (norm === 'a3' || norm === 'le-reve-luxe' || norm === 'suite-celeste') return 'a3';
    return 'a2';
  })();

  // Dynamic descriptions & features per apartment
  const aptDetails = {
    a1: {
      spaTitle: language === 'fr' ? 'Jacuzzi Spa Balnéo 24h/24' : 'Private Hydro Spa 24/7',
      spaBadge: language === 'fr' ? '38°C Continu' : '38°C Always Warm',
      spaDesc:
        language === 'fr'
          ? 'Bassin balnéothérapie XXL avec jets hydromassants lombaires et plantaires réglables. Système de chromothérapie 7 couleurs personnalisable et eau constamment filtrée, chauffée et traitée selon les normes hôtelières les plus strictes.'
          : 'XXL hydrotherapy bath with adjustable lumbar and plantar massage jets, 7-color chromotherapy, and continuous ozone filtration.',
      saunaTitle: language === 'fr' ? 'Sauna Traditionnel en Cèdre Rouge Canadien' : 'Canadian Red Cedar Sauna',
      saunaBadge: language === 'fr' ? 'Chaleur Sèche 85°C' : 'Dry Heat 85°C',
      saunaDesc:
        language === 'fr'
          ? 'Baigné d’effluves naturels et bienfaisants d’eucalyptus et de pin sibérien. Pierres volcaniques avec louche en bois pour libérer la vapeur et éliminer les toxines dans une atmosphère feutrée.'
          : 'Natural aromatherapy scents of eucalyptus and Siberian pine with volcanic lava stones and cedarwood benches.',
      loungeTitle: language === 'fr' ? 'Salon Lounge & Espace Cinéma' : 'Cinema Lounge & Relaxation Space',
      loungeBadge: language === 'fr' ? 'Smart TV 4K' : 'Smart 4K TV',
      loungeDesc:
        language === 'fr'
          ? 'Grand écran 4K avec accès direct et illimité à Netflix, YouTube et bouquet streaming. Canapé design moelleux, table basse et éclairage indirect ajustable pour prolonger la détente.'
          : 'Large connected 4K screen with unlimited Netflix and streaming, plush designer sofa, and adjustable ambient lighting.',
      bedTitle: language === 'fr' ? 'Lit Queen Size Grand Confort' : 'Queen Size Hotel Comfort Bed',
      bedDesc:
        language === 'fr'
          ? 'Linge de lit en satin de coton doux, matelas haute densité à mémoire de forme et oreillers moelleux hypoallergéniques.'
          : 'Soft Egyptian cotton sheets, high-density memory mattress, and plush hypoallergenic pillows.',
      kitchenTitle: language === 'fr' ? 'Cuisine Équipée & Machine à Café' : 'Full Kitchen & Nespresso Bar',
      kitchenDesc:
        language === 'fr'
          ? 'Cafetière Nespresso, capsules offertes, réfrigérateur silencieux, micro-ondes, verres à champagne & vaisselle soignée.'
          : 'Nespresso coffee station with complimentary pods, silent fridge, microwave, flutes and cookware.',
      showerTitle: language === 'fr' ? 'Douche Pluie & Peignoirs Douillets' : 'Rain Shower & Plush Robes',
      showerDesc:
        language === 'fr'
          ? 'Douche à l’italienne spacieuse, gel douche et shampoing rituel spa, peignoirs de bain velours brodés et chaussons inclus.'
          : 'Walk-in rain shower, botanical spa bath products, luxury velour bathrobes, and slippers included.',
      parking: language === 'fr' ? 'Gratuit sur place & rue' : 'Free on-site & street',
    },
    a2: {
      spaTitle: language === 'fr' ? 'Spa Privatif 24h/24 Réglable Immédiat' : '24/7 Instant Hydro Spa',
      spaBadge: language === 'fr' ? '38°C Continu' : '38°C Always Warm',
      spaDesc:
        language === 'fr'
          ? 'Bain à remous privatif accessible sans limitation d’horaire. Écran TV face au jacuzzi pour regarder vos séries préférées immergé dans l’eau chaude.'
          : '24/7 private hot tub with an in-front smart TV to stream Netflix and movies directly while immersed in warm water.',
      saunaTitle: language === 'fr' ? '2 Écrans Smart TV 4K Connectés' : '2 Smart 4K TVs (Jacuzzi & Bedroom)',
      saunaBadge: language === 'fr' ? 'Netflix & Disney+' : 'Netflix & Disney+',
      saunaDesc:
        language === 'fr'
          ? 'Profitez d’un double écran : un téléviseur dédié face au spa balnéo et un second écran dans la chambre romantique avec comptes streaming inclus.'
          : 'Dual-screen setup: one dedicated screen facing the hot tub and a second in the bedroom with unlimited streaming.',
      loungeTitle: language === 'fr' ? 'Salon Cosy & Décoration Romantique' : 'Cosy Living Area & Romance Ambiance',
      loungeBadge: language === 'fr' ? 'Climatisation' : 'Reversible A/C',
      loungeDesc:
        language === 'fr'
          ? 'Canapé velours confortable, décoration chaleureuse avec cheminée d’ambiance, table basse en marbre et climatisation réversible silencieuse.'
          : 'Plush velvet sofa, romantic ambient fireplace, marble accents, and whisper-quiet climate control.',
      bedTitle: language === 'fr' ? 'Lit Queen Size Cocon Romantique' : 'Queen Size Romantic Bed',
      bedDesc:
        language === 'fr'
          ? 'Literie 5 étoiles avec satin de coton égyptien, tête de lit capitonnée, éclairage LED tamisé et rideaux occultants.'
          : '5-star luxury bedding with Egyptian cotton, padded headboard, ambient LED backlights, and blackout curtains.',
      kitchenTitle: language === 'fr' ? 'Machine Nespresso & Kitchenette' : 'Nespresso Machine & Kitchenette',
      kitchenDesc:
        language === 'fr'
          ? 'Machine à expresso, sélection de thés, réfrigérateur avec compartiment freezer, micro-ondes et flûtes en cristal.'
          : 'Espresso machine, organic tea selection, silent fridge with freezer, microwave, and crystal glasses.',
      showerTitle: language === 'fr' ? 'Douche Italienne & Miroir LED' : 'Walk-in Shower & LED Mirror',
      showerDesc:
        language === 'fr'
          ? 'Salle de bain élégante avec douche à l’italienne carrelée, miroir tactile anti-buée, serviettes et peignoirs brodés.'
          : 'Sleek tiled walk-in shower, touch-activated anti-fog LED mirror, plush embroidered towels and robes.',
      parking: language === 'fr' ? 'Gratuit sur place & rue' : 'Free on-site & street',
    },
    a3: {
      spaTitle: language === 'fr' ? 'Jacuzzi Spa XXL & TV Panoramique' : 'XXL Hydro Spa & Panoramic TV',
      spaBadge: language === 'fr' ? '38°C Continu' : '38°C Always Warm',
      spaDesc:
        language === 'fr'
          ? 'Bassin spa balnéo d’exception avec double couchette ergonomique, jets de massage pulsés et écran panoramique cinéma face au bain.'
          : 'Spacious ergonomic double hydro-massage spa with pulsed jets and panoramic cinema screen facing the tub.',
      saunaTitle: language === 'fr' ? 'Sauna Finlandais Vitré Toute Hauteur' : 'Full-Height Glass Finnish Sauna',
      saunaBadge: language === 'fr' ? 'Chaleur Sèche 85°C' : 'Dry Heat 85°C',
      saunaDesc:
        language === 'fr'
          ? 'Sauna contemporain avec cabine en verre trempé, lattes de bois scandinaves, pierres volcaniques et aromathérapie purifiante.'
          : 'Contemporary glass-enclosed sauna with Scandinavian timber, natural lava rocks, and soothing essential oils.',
      loungeTitle: language === 'fr' ? 'Espace Loft Séjour & Bar Marbre' : 'Loft Living Space & Marble Bar',
      loungeBadge: language === 'fr' ? 'Loft 85 m²' : '85 m² Loft',
      loungeDesc:
        language === 'fr'
          ? 'Conception loft moderne avec verrière d’atelier, coin salon design, bar de dégustation et acoustique soignée.'
          : 'Modern loft layout with industrial glass partitions, designer lounge seating, and tasting bar counter.',
      bedTitle: language === 'fr' ? 'Lit Queen Size Ciel Étoilé' : 'Starry Night Queen Bed',
      bedDesc:
        language === 'fr'
          ? 'Literie haut de gamme avec ciel de fibres optiques scintillantes, draps soyeux et ambiance feutrée.'
          : 'Premium luxury mattress with fiber-optic twinkling starry ceiling, satin linens, and calm ambiance.',
      kitchenTitle: language === 'fr' ? 'Kitchenette Bar & Cafetière' : 'Bar Kitchenette & Coffee Station',
      kitchenDesc:
        language === 'fr'
          ? 'Comptoir bar avec tabourets hauts, machine à café, réfrigérateur, micro-ondes, verres à pied et vaisselle complète.'
          : 'Bar counter with high stools, coffee machine, fridge, microwave, stemware and full tableware.',
      showerTitle: language === 'fr' ? 'Salle de Bain Design & Peignoirs' : 'Designer Bathroom & Bathrobes',
      showerDesc:
        language === 'fr'
          ? 'Douche ciel de pluie, sèche-serviettes chauffant, peignoirs douillets 600g/m² et produits d’accueil spa.'
          : 'Rainfall shower, heated towel rack, luxury 600g/m² velour bathrobes, and botanical body care amenities.',
      parking: language === 'fr' ? 'Gratuit dans la rue' : 'Free street parking',
    },
  }[aptKey];

  const practicalRules = [
    {
      icon: Clock,
      title: language === 'fr' ? 'Arrivée Autonome Dès 17h00' : 'Self Check-in from 5:00 PM',
      desc:
        language === 'fr'
          ? 'Entrée 24h/24 via boîte à clé sécurisée ou serrure numérique. Possibilité d’arrivée avancée dès 15h00 avec le Pack Confort.'
          : '24/7 keyless arrival via smart lock. Early check-in from 3:00 PM available with Comfort Pack.',
    },
    {
      icon: Clock,
      title: language === 'fr' ? 'Départ Au Plus Tard 11h00' : 'Check-out by 11:00 AM',
      desc:
        language === 'fr'
          ? 'Profitez du spa jusqu’à la dernière minute. Départ tardif possible jusqu’à 13h00 avec le Pack Confort pour savourer votre matinée.'
          : 'Enjoy the spa until the very last minute. Late check-out until 1:00 PM available with Comfort Pack.',
    },
    {
      icon: Users,
      title: language === 'fr' ? 'Capacité 2 Personnes Strictement' : 'Strictly 2 Guests Maximum',
      desc:
        language === 'fr'
          ? 'Sanctuaire réservé aux couples majeurs. Fêtes, soirées et invités supplémentaires strictement interdits afin de préserver le calme.'
          : 'Sanctuary reserved exclusively for adult couples. Parties and extra visitors are strictly prohibited.',
    },
    {
      icon: ShieldAlert,
      title: language === 'fr' ? 'Caution Empreinte Bancaire 250 €' : '€250 Security Deposit Hold',
      desc:
        language === 'fr'
          ? 'Gérée en toute sécurité via le leader certifié Stripe/Swikly. Aucun montant débité de votre compte bancaire.'
          : 'Handled securely via Stripe/Swikly pre-authorization. Zero funds are debited from your card.',
    },
    {
      icon: Car,
      title: language === 'fr' ? 'Stationnement Gratuit Garanti' : 'Guaranteed Free Parking',
      desc:
        language === 'fr'
          ? 'Places disponibles gratuitement sur place et dans la rue adjacente sans frais de parcmètre. Quartier résidentiel paisible.'
          : 'Free parking spaces directly on site and on the quiet residential adjacent street.',
    },
    {
      icon: Sparkles,
      title: language === 'fr' ? 'Hygiène Spa 100% Garantie' : '100% Guaranteed Spa Hygiene',
      desc:
        language === 'fr'
          ? 'Vidange systématique et désinfection ozone entre chaque séjour. Eau pure, équilibrée et prête à votre entrée.'
          : 'Complete water renewal and ozone sanitization before every guest arrival. Pure fresh water ready at 38°C.',
    },
  ];

  return (
    <section className="w-full bg-[#131313] [data-theme=light]:bg-[#FAF8F5] pb-20 transition-colors" id="experience-section">
      <div id="suite-signature" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col gap-16">
        
        {/* ============================================================ */}
        {/* 1. MAIN SPLIT SCREEN: Left Story & Right Sticky Booking Card */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Detailed Suite Architecture (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Lead Section Intro */}
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-[#C5A059] [data-theme=light]:text-[#775a19] text-[11px] font-bold uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-[#C5A059] [data-theme=light]:bg-[#775a19]" />
                <span>{language === 'fr' ? 'Sanctuaire Romantique Sans Vis-à-Vis' : 'Private Romantic Sanctuary'}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                {language === 'fr' ? 'Pleins Feux sur Notre Suite Vedette' : 'Spotlight on Our Signature Suite'}
              </h2>
              <p className="text-sm sm:text-base text-[#d0c5af] [data-theme=light]:text-[#5C554E] leading-relaxed font-light">
                {language === 'fr' ? (
                  <>
                    Découvrez <strong className="text-[#e5e2e1] [data-theme=light]:text-[#231F1C] font-semibold">{currentSuite.title}</strong>, un appartement d&apos;exception de {currentSuite.area} entièrement dédié au bien-être et à l&apos;intimité des couples. Situé aux portes de Rouen dans un cadre confidentiel avec accès 100% autonome et discret, cette suite allie la chaleur des matières nobles à la modernité d&apos;un véritable centre de balnéothérapie privatisé.
                  </>
                ) : (
                  <>
                    Experience <strong className="text-[#e5e2e1] [data-theme=light]:text-[#231F1C] font-semibold">{currentSuite.title}</strong>, an exceptional {currentSuite.area} private spa apartment dedicated to romance and couple relaxation with 24/7 keyless arrival and 5-star hotel comfort.
                  </>
                )}
              </p>
            </div>

            {/* 3 Highlight Wellness Blocks */}
            <div className="flex flex-col gap-5">
              
              {/* Wellness Card 1: Jacuzzi */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex flex-col sm:flex-row gap-5 items-start luxury-card">
                <div className="w-13 h-13 rounded-2xl bg-[#2a2720] [data-theme=light]:bg-white text-[#C5A059] [data-theme=light]:text-[#775a19] flex items-center justify-center shrink-0 shadow-sm">
                  <Droplets className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-serif text-lg text-[#e5e2e1] [data-theme=light]:text-[#231F1C] font-medium">
                      {aptDetails.spaTitle}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] [data-theme=light]:text-[#775a19] text-[10px] font-bold uppercase tracking-wider border border-[#C5A059]/30">
                      {aptDetails.spaBadge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light leading-relaxed">
                    {aptDetails.spaDesc}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 text-xs text-[#d0c5af] [data-theme=light]:text-[#4d4438]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19]" />
                      <span>{language === 'fr' ? 'Vidange intégrale après chaque hôte' : 'Full water change each stay'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19]" />
                      <span>{language === 'fr' ? 'Buses massantes multi-points' : 'Multi-point massage jets'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Wellness Card 2: Sauna */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex flex-col sm:flex-row gap-5 items-start luxury-card">
                <div className="w-13 h-13 rounded-2xl bg-[#2a2720] [data-theme=light]:bg-white text-[#C5A059] [data-theme=light]:text-[#775a19] flex items-center justify-center shrink-0 shadow-sm">
                  <Flame className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-serif text-lg text-[#e5e2e1] [data-theme=light]:text-[#231F1C] font-medium">
                      {aptDetails.saunaTitle}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] [data-theme=light]:text-[#775a19] text-[10px] font-bold uppercase tracking-wider border border-[#C5A059]/30">
                      {aptDetails.saunaBadge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light leading-relaxed">
                    {aptDetails.saunaDesc}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 text-xs text-[#d0c5af] [data-theme=light]:text-[#4d4438]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19]" />
                      <span>{language === 'fr' ? 'Huiles essentielles offertes' : 'Essential oils provided'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19]" />
                      <span>{language === 'fr' ? 'Éclairage tamisé zen' : 'Ambient zen lighting'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Wellness Card 3: Lounge */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex flex-col sm:flex-row gap-5 items-start luxury-card">
                <div className="w-13 h-13 rounded-2xl bg-[#2a2720] [data-theme=light]:bg-white text-[#C5A059] [data-theme=light]:text-[#775a19] flex items-center justify-center shrink-0 shadow-sm">
                  <Tv className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="font-serif text-lg text-[#e5e2e1] [data-theme=light]:text-[#231F1C] font-medium">
                      {aptDetails.loungeTitle}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 text-[#C5A059] [data-theme=light]:text-[#775a19] text-[10px] font-bold uppercase tracking-wider border border-[#C5A059]/30">
                      {aptDetails.loungeBadge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light leading-relaxed">
                    {aptDetails.loungeDesc}
                  </p>
                </div>
              </div>

            </div>

            {/* 6 Équipements d'Excellence Inclus Bento Cards */}
            <div className="flex flex-col gap-5">
              <h3 className="font-serif text-2xl text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                {language === 'fr' ? 'Équipements d’Excellence Inclus' : 'Signature Amenities Included'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-white border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex items-start gap-3.5 luxury-card">
                  <Bed className="w-6 h-6 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                      {aptDetails.bedTitle}
                    </h4>
                    <p className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light mt-1 leading-relaxed">
                      {aptDetails.bedDesc}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-white border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex items-start gap-3.5 luxury-card">
                  <Coffee className="w-6 h-6 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                      {aptDetails.kitchenTitle}
                    </h4>
                    <p className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light mt-1 leading-relaxed">
                      {aptDetails.kitchenDesc}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-white border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex items-start gap-3.5 luxury-card">
                  <Bath className="w-6 h-6 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                      {aptDetails.showerTitle}
                    </h4>
                    <p className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light mt-1 leading-relaxed">
                      {aptDetails.showerDesc}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-white border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex items-start gap-3.5 luxury-card">
                  <Key className="w-6 h-6 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                      {language === 'fr' ? 'Arrivée Autonome Serrure Connectée' : 'Smart Lock Keyless Arrival'}
                    </h4>
                    <p className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light mt-1 leading-relaxed">
                      {language === 'fr'
                        ? 'Code secret unique envoyé le jour de l’arrivée pour une entrée fluide et discrète sans contrainte 24h/24.'
                        : 'Unique secret code sent on check-in day for seamless, discrete arrival anytime 24/7.'}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-white border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex items-start gap-3.5 luxury-card">
                  <ShieldCheck className="w-6 h-6 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                      {language === 'fr' ? '100% Hygiène Certifiée Palace' : '100% Palace Certified Hygiene'}
                    </h4>
                    <p className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light mt-1 leading-relaxed">
                      {language === 'fr'
                        ? 'Nettoyage complet, renouvellement intégral de l’eau du spa et protocole de désinfection ozone après chaque hôte.'
                        : 'Full deep clean, 100% fresh water renewal, and ozone sterilization protocol between each guest.'}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1c1b1b] [data-theme=light]:bg-white border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex items-start gap-3.5 luxury-card">
                  <Wifi className="w-6 h-6 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                      {language === 'fr' ? 'Wi-Fi Fibre Très Haut Débit' : 'Ultra High-Speed Fiber Wi-Fi'}
                    </h4>
                    <p className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light mt-1 leading-relaxed">
                      {language === 'fr'
                        ? 'Connexion sans fil rapide et stable dans l’ensemble de la suite, idéale pour diffuser vos playlists ou films.'
                        : 'Fast and reliable Wi-Fi throughout the suite for smooth streaming of your favorite audio and video.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Story Paragraphs */}
            <div className="p-8 rounded-3xl bg-[#1c1b1b] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex flex-col gap-3">
              <h3 className="font-serif text-xl text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                {language === 'fr' ? 'Un Séjour Conçu Pour Votre Évasion' : 'A Stay Designed for Your Escape'}
              </h3>
              <p className="text-xs sm:text-sm text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light leading-relaxed">
                {language === 'fr'
                  ? 'Que ce soit pour célébrer un anniversaire, une demande en mariage, la Saint-Valentin ou simplement vous retrouver loin du tumulte quotidien, le Domaine Crystal Spa vous accueille dans un cocon pensé dans les moindres détails.'
                  : 'Whether celebrating an anniversary, a romantic proposal, or simply escaping daily routine, Crystal Spa welcomes you to an enchanting sanctuary.'}
              </p>
              <p className="text-xs sm:text-sm text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light leading-relaxed">
                {language === 'fr'
                  ? 'Dès votre franchissement de porte, l’ambiance lumineuse feutrée, le parfum délicat d’aromathérapie et la douce chaleur de l’eau à 38°C vous plongent instantanément dans une parenthèse hors du temps. Notre équipe et votre hôte dévoué, Laïd, restent joignables 24h/24 pour personnaliser votre expérience.'
                  : 'From the moment you step in, soft ambient lighting, gentle aromatherapy, and warm 38°C water welcome you to timeless intimacy.'}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Direct Booking Engine Card (5 cols) */}
          <div className="lg:col-span-5" id="tarifs">
            <div className="sticky top-28 flex flex-col gap-6">
              
              {/* Luxury Booking Engine Container */}
              <div className="rounded-3xl bg-[#1c1b1b] [data-theme=light]:bg-white p-6 sm:p-8 shadow-2xl border border-[#C5A059]/40 [data-theme=light]:border-[#C5A059]/40 flex flex-col gap-6 relative overflow-hidden">
                
                {/* Header Price & Rating */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10 [data-theme=light]:border-[#EAE5DC]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] [data-theme=light]:text-[#775a19] block">
                      {language === 'fr' ? 'Tarif Direct Garanti' : 'Guaranteed Direct Rate'}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                        {currentSuite.price} €
                      </span>
                      <span className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light">
                        / {language === 'fr' ? 'nuit' : 'night'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-[#C5A059] [data-theme=light]:text-[#775a19]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                        {currentSuite.rating}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#d0c5af] [data-theme=light]:text-[#7f7667]">
                      {currentSuite.reviewsCount} {language === 'fr' ? 'avis certifiés' : 'verified reviews'}
                    </span>
                  </div>
                </div>

                {/* 4 Quick Meta Highlights Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E]">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#201f1f] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC]">
                    <Clock className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0" />
                    <span>17h00 → 11h00</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#201f1f] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC]">
                    <Car className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0" />
                    <span>{language === 'fr' ? 'Parking Gratuit' : 'Free Parking'}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#201f1f] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC]">
                    <Users className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0" />
                    <span>2 {language === 'fr' ? 'Adultes Max' : 'Guests Max'}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#201f1f] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC]">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059] [data-theme=light]:text-[#775a19] shrink-0" />
                    <span>{language === 'fr' ? 'Caution 0€ débit' : 'Deposit 0€ debit'}</span>
                  </div>
                </div>

                {/* Date Picker Form */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#201f1f] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC]">
                  <div>
                    <label htmlFor="suite-calc-checkin" className="block text-[10px] font-bold uppercase tracking-wider text-[#d0c5af] [data-theme=light]:text-[#4d4438] mb-1">
                      {language === 'fr' ? 'ARRIVÉE' : 'CHECK-IN'}
                    </label>
                    <input
                      id="suite-calc-checkin"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-[#e5e2e1] [data-theme=light]:text-[#231F1C] focus:outline-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="suite-calc-checkout" className="block text-[10px] font-bold uppercase tracking-wider text-[#d0c5af] [data-theme=light]:text-[#4d4438] mb-1">
                      {language === 'fr' ? 'DÉPART' : 'CHECK-OUT'}
                    </label>
                    <input
                      id="suite-calc-checkout"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-[#e5e2e1] [data-theme=light]:text-[#231F1C] focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Romantic Add-on Packages Checkboxes */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] [data-theme=light]:text-[#775a19]">
                    {language === 'fr' ? 'Packs Romantiques en Option' : 'Romantic Add-on Packages'}
                  </span>

                  {/* Pack Confort */}
                  <label htmlFor="suite-pack-confort" className="flex items-center justify-between p-3.5 rounded-2xl bg-[#201f1f] [data-theme=light]:bg-[#FAF7F2] hover:bg-[#282727] [data-theme=light]:hover:bg-[#F4EFE8] cursor-pointer transition-all border border-white/5 [data-theme=light]:border-[#EAE5DC]">
                    <div className="flex items-center gap-3">
                      <input
                        id="suite-pack-confort"
                        aria-label={language === 'fr' ? 'Pack Confort (+4h de Spa)' : 'Comfort Pack (+4h Spa)'}
                        type="checkbox"
                        checked={packConfort}
                        onChange={(e) => setPackConfort(e.target.checked)}
                        className="w-4 h-4 accent-[#C5A059] rounded cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                          {language === 'fr' ? 'Pack Confort (+4h de Spa)' : 'Comfort Pack (+4h Spa)'}
                        </span>
                        <span className="text-[11px] text-[#d0c5af] [data-theme=light]:text-[#4d4438]">
                          {language === 'fr' ? 'Arrivée dès 15h & départ tardif à 13h' : 'Early check-in 3PM & late check-out 1PM'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#C5A059] [data-theme=light]:text-[#775a19]">
                      +29 €
                    </span>
                  </label>

                  {/* Pack Romance */}
                  <label htmlFor="suite-pack-romance" className="flex items-center justify-between p-3.5 rounded-2xl bg-[#201f1f] [data-theme=light]:bg-[#FAF7F2] hover:bg-[#282727] [data-theme=light]:hover:bg-[#F4EFE8] cursor-pointer transition-all border border-white/5 [data-theme=light]:border-[#EAE5DC]">
                    <div className="flex items-center gap-3">
                      <input
                        id="suite-pack-romance"
                        aria-label={language === 'fr' ? 'Pack Romance & Pétales' : 'Romance & Petals Pack'}
                        type="checkbox"
                        checked={packRomance}
                        onChange={(e) => setPackRomance(e.target.checked)}
                        className="w-4 h-4 accent-[#C5A059] rounded cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                          {language === 'fr' ? 'Pack Romance & Pétales' : 'Romance & Petals Pack'}
                        </span>
                        <span className="text-[11px] text-[#d0c5af] [data-theme=light]:text-[#4d4438]">
                          {language === 'fr' ? 'Pétales de roses, bougies LED, mot personnalisé' : 'Rose petals, LED candles, love letter'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#C5A059] [data-theme=light]:text-[#775a19]">
                      +29 €
                    </span>
                  </label>
                </div>

                {/* Dynamic Price Breakdown */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10 [data-theme=light]:border-[#EAE5DC] text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E]">
                  <div className="flex justify-between">
                    <span>1 {language === 'fr' ? 'nuitée' : 'night'} x {currentSuite.price} €</span>
                    <span className="font-semibold text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">{currentSuite.price} €</span>
                  </div>
                  {packConfort && (
                    <div className="flex justify-between text-[#C5A059] [data-theme=light]:text-[#775a19]">
                      <span>Pack Confort (+4h de Spa)</span>
                      <span>+29 €</span>
                    </div>
                  )}
                  {packRomance && (
                    <div className="flex justify-between text-[#C5A059] [data-theme=light]:text-[#775a19]">
                      <span>Pack Romance & Pétales</span>
                      <span>+29 €</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Ménage, peignoirs et serviettes de luxe' : 'Cleaning, bathrobes & towels'}</span>
                    <span className="text-[#C5A059] [data-theme=light]:text-[#775a19] font-medium">
                      {language === 'fr' ? 'Inclus (Offert)' : 'Included'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Taxe de séjour & accès spa illimité' : 'Tourist tax & unlimited spa'}</span>
                    <span className="text-[#C5A059] [data-theme=light]:text-[#775a19] font-medium">
                      {language === 'fr' ? 'Inclus' : 'Included'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? 'Frais de réservation de plateforme' : 'Platform booking fees'}</span>
                    <span className="text-[#22c55e] font-semibold">
                      0 € ({language === 'fr' ? 'Zéro commission' : 'Zero commission'})
                    </span>
                  </div>

                  <div className="pt-3 mt-1 border-t border-white/10 [data-theme=light]:border-[#EAE5DC] flex justify-between items-center text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
                    <span className="font-serif text-base sm:text-lg font-bold">
                      {language === 'fr' ? 'Total estimé' : 'Estimated Total'}
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A059] [data-theme=light]:text-[#775a19]">
                      {calculateTotal()} €
                    </span>
                  </div>
                </div>

                {/* Direct Booking CTA Button */}
                <button
                  onClick={handleBookingClick}
                  className="w-full py-4 px-6 rounded-2xl bg-[#C5A059] hover:bg-[#b89047] text-[#211904] font-bold text-xs sm:text-sm uppercase tracking-wider luxury-shimmer-btn shadow-xl shadow-[#C5A059]/25 cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'fr' ? 'Réserver en Direct Sans Commission' : 'Book Directly Without Fees'}</span>
                </button>

                {/* Security Reassurance Notes */}
                <div className="flex flex-col gap-1.5 text-center text-[11px] text-[#99907c] [data-theme=light]:text-[#7f7667]">
                  <div className="flex items-center justify-center gap-1.5 text-[#C5A059] [data-theme=light]:text-[#775a19] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>{language === 'fr' ? 'Caution par empreinte bancaire : 250 € (aucun débit)' : 'Security deposit hold: €250 (not debited)'}</span>
                  </div>
                  <p>
                    {language === 'fr'
                      ? 'Paiement 100% sécurisé SSL • Sans création de compte • Confirmation instantanée'
                      : '100% Secure SSL payment • No account required • Instant confirmation'}
                  </p>
                </div>

              </div>

              {/* Direct Host Helpline Callout Card */}
              <div className="p-6 rounded-3xl bg-[#1c1b1b] [data-theme=light]:bg-[#FAF7F2] border border-white/5 [data-theme=light]:border-[#EAE5DC] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 text-[#C5A059] [data-theme=light]:text-[#775a19] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] [data-theme=light]:text-[#775a19]">
                    {language === 'fr' ? 'Une Question ou Demande Spéciale ?' : 'A Question or Special Request?'}
                  </p>
                  <p className="text-xs text-[#d0c5af] [data-theme=light]:text-[#5C554E] mt-0.5 font-light">
                    {language === 'fr' ? 'Contactez Laïd, votre hôte dédié :' : 'Contact Laïd, your private host:'}
                  </p>
                  <a
                    href="tel:0629866909"
                    className="font-serif text-base sm:text-lg font-bold text-[#e5e2e1] [data-theme=light]:text-[#231F1C] hover:text-[#C5A059] [data-theme=light]:hover:text-[#775a19] transition-colors"
                  >
                    06 29 86 69 09
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. INFORMATIONS PRATIQUES & BON À SAVOIR (6 Cards Grid) */}
        {/* ============================================================ */}
        <div className="w-full flex flex-col gap-8 pt-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059] [data-theme=light]:text-[#775a19]">
              {language === 'fr' ? 'Transparence & Sérénité' : 'Peace of Mind & Guidelines'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e1] [data-theme=light]:text-[#231F1C]">
              {language === 'fr' ? 'Informations Pratiques & Bon à Savoir' : 'Practical Information & Good to Know'}
            </h2>
            <p className="text-xs sm:text-sm text-[#d0c5af] [data-theme=light]:text-[#5C554E] font-light">
              {language === 'fr'
                ? 'Tout est organisé pour que votre escapade se déroule dans la plus totale fluidité.'
                : 'Everything is tailored for a seamless and peaceful stay.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {practicalRules.map((rule, idx) => {
              const Icon = rule.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#1c1b1b] border border-white/5 shadow-sm flex flex-col gap-3.5 luxury-card transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#2a2720] text-[#C5A059] flex items-center justify-center shrink-0 practical-icon-box shadow-sm border border-white/5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#e5e2e1] leading-snug">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-[#d0c5af] font-light leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
