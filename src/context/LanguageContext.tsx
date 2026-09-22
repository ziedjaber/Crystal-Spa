'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// SVG Flag Components
export const FranceFlag = ({ className = 'w-5 h-3.5' }: { className?: string }) => (
  <svg
    className={`${className} rounded-[2px] overflow-hidden shadow-sm inline-block shrink-0 align-middle`}
    viewBox="0 0 3 2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="1" height="2" fill="#002395" />
    <rect width="1" height="2" x="1" fill="#FFFFFF" />
    <rect width="1" height="2" x="2" fill="#ED2939" />
  </svg>
);

export const UsaFlag = ({ className = 'w-5 h-3.5' }: { className?: string }) => (
  <svg
    className={`${className} rounded-[2px] overflow-hidden shadow-sm inline-block shrink-0 align-middle`}
    viewBox="0 0 19 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="19" height="10" fill="#B22234" />
    <rect width="19" height="1" y="1" fill="#FFFFFF" />
    <rect width="19" height="1" y="3" fill="#FFFFFF" />
    <rect width="19" height="1" y="5" fill="#FFFFFF" />
    <rect width="19" height="1" y="7" fill="#FFFFFF" />
    <rect width="19" height="1" y="9" fill="#FFFFFF" />
    <rect width="7.6" height="5.4" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <circle cx="1.5" cy="1" r="0.35" />
      <circle cx="3.8" cy="1" r="0.35" />
      <circle cx="6.1" cy="1" r="0.35" />
      <circle cx="2.65" cy="2.3" r="0.35" />
      <circle cx="4.95" cy="2.3" r="0.35" />
      <circle cx="1.5" cy="3.6" r="0.35" />
      <circle cx="3.8" cy="3.6" r="0.35" />
      <circle cx="6.1" cy="3.6" r="0.35" />
      <circle cx="2.65" cy="4.7" r="0.35" />
      <circle cx="4.95" cy="4.7" r="0.35" />
    </g>
  </svg>
);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation (Single Word per Section)
    'nav.suites': 'Suites',
    'nav.experience': 'Expérience',
    'nav.galerie': 'Galerie',
    'nav.equipements': 'Équipements',
    'nav.reviews': 'Avis',
    'nav.contact': 'Contact',
    'nav.book': 'Réserver',

    // Hero
    'hero.eyebrow': "Écrin d'Exception & Bien-Être Intime",
    'hero.badge': "Écrin d'Exception & Bien-Être Intime",
    'hero.title.part1': "L'art du luxe intime",
    'hero.title.part2': "lâcher-prise absolu",
    'hero.title.pre': "L'art du luxe intime et du",
    'hero.title.accent': "lâcher-prise",
    'hero.title.post': "absolu",
    'hero.desc': "Découvrez nos suites spa privatives haut de gamme avec jacuzzi privatif XXL, sauna finlandais en cèdre et services d’hôtellerie 5 étoiles en totale discrétion.",
    'hero.cta.book': 'Réserver votre Suite',
    'hero.cta.virtual': 'Visite Immersive 360°',
    'hero.trust.privacy': '100% Privatif & Secret',
    'hero.trust.water': 'Eau filtrée & renouvelée',
    'hero.trust.rating': "Note d'Excellence 4.97/5 (Airbnb Top 10%)",

    // Booking Bar
    'booking.suite_label': 'Suite Préférée',
    'booking.all_suites': 'Toutes nos Suites Spa',
    'booking.checkin': 'Arrivée (Dès 17h00)',
    'booking.checkout': "Départ (Jusqu'à 11h00)",
    'booking.pack_label': 'Formule & Packs',
    'booking.pack_romantic': 'Nuitée Romantique Prestige',
    'booking.pack_dayspa': 'Escapade Day Spa (4h)',
    'booking.pack_champagne': 'Pack Champagne & Caviar',
    'booking.pack_duo': 'Rituel Massage Duo (60 min)',
    'booking.search': 'Vérifier la Disponibilité',

    // Switcher Apartment
    'apt.switch.title': 'Nos Deux Adresses d’Exception',
    'apt.switch.sub': 'Choisissez l’écrin de votre prochaine parenthèse romantique',
    'apt.switch.a1': 'Appartement 1 : Suite Diamant Noir (Paris 8e)',
    'apt.switch.a2': 'Appartement 2 : La Vie est Belle (Rouen / Le Petit-Quevilly)',
    'apt.guest_fav': 'Coup de cœur voyageurs • Top 10% Airbnb',
    'apt.host_info': 'Hôte : Laïd (Crystal Spa) • Répond en moins d’une heure',

    // Suites Collection
    'suites.badge': 'Collection Haute Hospitalité',
    'suites.title': "Nos Écrins d'Exception Privatisés",
    'suites.desc': "Chaque suite est pensée comme un sanctuaire sensoriel indépendant : accès totalement autonome par serrure à code confidentiel, isolation phonique studio et installations spa privatives.",
    'suites.available': 'Suites disponibles',
    'suites.per_night': '/ nuitée',
    'suites.reserve': 'Réserver cette suite',
    'suites.select': 'Sélectionner',

    // Equipments
    'equip.title': 'Équipements Inclus & Prestations (42)',
    'equip.desc': 'Tout a été méticuleusement préparé pour vous offrir un séjour sans le moindre compromis.',
    'equip.bath': 'Salle de Bain & Soins',
    'equip.bedroom': 'Chambre & Linge de Lit',
    'equip.entertainment': 'Divertissement & High-Tech',
    'equip.climate': 'Climatisation & Chauffage',
    'equip.security': 'Sécurité & Discrétion',
    'equip.kitchen': 'Cuisine & Boissons Gastronomiques',
    'equip.parking': 'Parking & Jacuzzi 24h/24',
    'equip.services': 'Services & Arrivée Autonome',

    // Gallery
    'gallery.badge': "Galerie d'Atmosphère",
    'gallery.title': "L'Instant Capturé en Images",
    'gallery.all': 'Toutes les Perspectives',
    'gallery.jacuzzi': 'Jacuzzi Spa',
    'gallery.chambre': 'Chambre Master',
    'gallery.salon': 'Salon Cosy',
    'gallery.cuisine': 'Kitchenette & Bar',
    'gallery.salle_de_bain': 'Salle de Bain & Douche',
    'gallery.cour': 'Cour & Accès Privé',
    'gallery.theme': 'Pièce à Thème',

    // Reviews
    'reviews.badge': 'Témoignages & Distinctions Airbnb',
    'reviews.title': 'L’Éloge de Nos Voyageurs',
    'reviews.sub': 'Note Moyenne 4.97 / 5 sur Airbnb (37+ avis certifiés)',
    'reviews.cleanliness': 'Propreté',
    'reviews.accuracy': 'Précision',
    'reviews.checkin': 'Arrivée',
    'reviews.communication': 'Communication',
    'reviews.location': 'Emplacement',
    'reviews.value': 'Qualité-prix',

    // Location
    'loc.badge': 'Localisation Privilégiée',
    'loc.title': 'Un Sanctuaire Secret aux Portes de Rouen',
    'loc.desc': 'Situé au Petit-Quevilly, à proximité immédiate du cœur historique de Rouen et des transports. L’adresse exacte et votre code personnel vous sont communiqués 2h avant votre arrivée pour une discrétion absolue.',
    'loc.parking_free': 'Stationnement gratuit sur place et dans la rue',
    'loc.transport': 'À quelques minutes du centre de Rouen et de la Gare',
    'loc.quiet': 'Zone calme résidentielle avec entrée autonome 24h/24',

    // FAQ
    'faq.badge': 'Transparence & Sérénité',
    'faq.title': 'Questions Fréquentes',
    'faq.desc': 'Toutes les réponses pour préparer votre parenthèse de détente en toute confiance.',

    // Contact
    'contact.badge': 'Conciergerie Privée 24/7',
    'contact.title': 'Une Requête Sur-Mesure ?',
    'contact.desc': 'Notre équipe est à votre disposition immédiate pour organiser une arrivée discrète, préparer une attention spéciale ou réserver un créneau sur-mesure.',
    'contact.whatsapp': 'Échanger via WhatsApp VIP',
    'contact.submit': 'Envoyer ma Demande Confidentielle',

    // Footer
    'footer.slogan': "L'art du lâcher-prise dans un cocon d'exception.",
    'footer.circle': 'Cercle VIP & Offres',
    'footer.join': 'Rejoindre le Cercle',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    // Navigation (Single Word per Section)
    'nav.suites': 'Suites',
    'nav.experience': 'Experience',
    'nav.galerie': 'Gallery',
    'nav.equipements': 'Amenities',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.book': 'Book',

    // Hero
    'hero.eyebrow': 'Exclusive Sanctuary & Intimate Wellness',
    'hero.badge': 'Exclusive Sanctuary & Intimate Wellness',
    'hero.title.part1': 'The art of intimate luxury and',
    'hero.title.part2': 'pure relaxation',
    'hero.title.pre': 'The art of intimate luxury and pure',
    'hero.title.accent': 'relaxation',
    'hero.title.post': 'at its finest',
    'hero.desc': 'Discover our premium private spa suites with XXL private hot tub, Canadian cedar sauna, and 5-star discreet hospitality.',
    'hero.cta.book': 'Book Your Suite',
    'hero.cta.virtual': '360° Virtual Tour',
    'hero.trust.privacy': '100% Private & Discreet',
    'hero.trust.water': 'Sterilized & Filtered Water',
    'hero.trust.rating': '4.97/5 Excellence Score (Airbnb Top 10%)',

    // Booking Bar
    'booking.suite_label': 'Preferred Suite',
    'booking.all_suites': 'All Private Spa Suites',
    'booking.checkin': 'Arrival (From 5:00 PM)',
    'booking.checkout': 'Departure (By 11:00 AM)',
    'booking.pack_label': 'Packages & Extras',
    'booking.pack_romantic': 'Prestige Romantic Night',
    'booking.pack_dayspa': 'Day Spa Escape (4h)',
    'booking.pack_champagne': 'Champagne & Caviar Pack',
    'booking.pack_duo': 'Duo Massage Ritual (60 min)',
    'booking.search': 'Check Availability',

    // Switcher Apartment
    'apt.switch.title': 'Our Two Signature Destinations',
    'apt.switch.sub': 'Choose the private haven for your upcoming romantic escape',
    'apt.switch.a1': 'Apartment 1: Black Diamond Suite (Paris 8th)',
    'apt.switch.a2': 'Apartment 2: La Vie est Belle (Rouen / Le Petit-Quevilly)',
    'apt.guest_fav': "Guest Favorite • Top 10% on Airbnb",
    'apt.host_info': 'Host: Laïd (Crystal Spa) • Responds in under an hour',

    // Suites Collection
    'suites.badge': 'Haute Hospitality Collection',
    'suites.title': 'Our 5 Private Signature Sanctuaries',
    'suites.desc': 'Each suite is conceived as an independent sensory haven: fully autonomous keyless keypad access, studio acoustic soundproofing, and private spa facilities.',
    'suites.available': 'Suites available',
    'suites.per_night': '/ night',
    'suites.reserve': 'Book this suite',
    'suites.select': 'Select',

    // Equipments
    'equip.title': 'Included Amenities & Features (42)',
    'equip.desc': 'Every single detail has been meticulously prepared to provide a seamless, uncompromising stay.',
    'equip.bath': 'Bathroom & Body Care',
    'equip.bedroom': 'Bedroom & Linens',
    'equip.entertainment': 'Entertainment & Smart Tech',
    'equip.climate': 'A/C & Radiant Heating',
    'equip.security': 'Security & Privacy',
    'equip.kitchen': 'Kitchen & Gourmet Coffee',
    'equip.parking': 'Parking & 24/7 Jacuzzi Spa',
    'equip.services': 'Services & Self Check-in',

    // Gallery
    'gallery.badge': 'Atmospheric Gallery',
    'gallery.title': 'Moments Captured in Images',
    'gallery.all': 'All Perspectives',
    'gallery.jacuzzi': 'Private Jacuzzi Spa',
    'gallery.chambre': 'Master Bedroom',
    'gallery.salon': 'Cosy Living Room',
    'gallery.cuisine': 'Kitchenette & Bar',
    'gallery.salle_de_bain': 'Bathroom & Shower',
    'gallery.cour': 'Courtyard & Private Access',
    'gallery.theme': 'Themed Room',

    // Reviews
    'reviews.badge': 'Airbnb Testimonials & Distinctions',
    'reviews.title': 'Praises from Our Guests',
    'reviews.sub': '4.97 / 5 Average Airbnb Rating across 37+ verified stays',
    'reviews.cleanliness': 'Cleanliness',
    'reviews.accuracy': 'Accuracy',
    'reviews.checkin': 'Check-in',
    'reviews.communication': 'Communication',
    'reviews.location': 'Location',
    'reviews.value': 'Value for money',

    // Location
    'loc.badge': 'Prime Location',
    'loc.title': 'A Secret Sanctuary by Historic Rouen',
    'loc.desc': 'Located in Le Petit-Quevilly, close to Rouen historic city center and transit lines. The exact address and your private entry code are delivered 2 hours prior to arrival for full privacy.',
    'loc.parking_free': 'Free on-site and street parking',
    'loc.transport': 'Minutes from Rouen center and Central Station',
    'loc.quiet': 'Quiet residential zone with 24/7 autonomous check-in',

    // FAQ
    'faq.badge': 'Transparency & Peace of Mind',
    'faq.title': 'Frequently Asked Questions',
    'faq.desc': 'All the answers you need to prepare your serene getaway with total confidence.',

    // Contact
    'contact.badge': 'Private Concierge 24/7',
    'contact.title': 'A Tailor-Made Request?',
    'contact.desc': 'Our dedicated team is ready to organize a discreet arrival, prepare a romantic surprise, or reserve a customized stay.',
    'contact.whatsapp': 'Chat via VIP WhatsApp',
    'contact.submit': 'Send Confidential Request',

    // Footer
    'footer.slogan': 'The art of letting go in an exceptional cocoon.',
    'footer.circle': 'VIP Circle & Offers',
    'footer.join': 'Join the Circle',
    'footer.rights': 'All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('crystal_spa_lang') as Language;
    if (saved === 'fr' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('crystal_spa_lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['fr']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
