export interface RoomImage {
  id: string;
  title: string;
  category: 'jacuzzi' | 'chambre' | 'salon' | 'cuisine' | 'salle-de-bain' | 'cour' | 'theme';
  categoryLabel: string;
  src: string;
  description: string;
}

export interface AmenityCategory {
  category: string;
  categoryEn: string;
  icon: string;
  items: {
    title: string;
    titleEn: string;
    description?: string;
    descriptionEn?: string;
  }[];
}

export interface AirbnbReview {
  id: string;
  author: string;
  yearsOnAirbnb: string;
  rating: number;
  date: string;
  stayType: string;
  comment: string;
  commentEn: string;
}

export interface ApartmentItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  locationDetails: string;
  pricePerNightEUR: number;
  rating: number;
  reviewsCount: number;
  capacityGuests: number;
  bedroomsCount: number;
  bedsCount: number;
  bathroomsCount: number;
  surfaceM2: number;
  image: string;
  badge: string;
  featured?: boolean;
  amenities: string[];
  description: string;
  descriptionEn: string;
  host: {
    name: string;
    experience: string;
    rating: number;
    reviewsCount: number;
    responseRate: string;
    responseTime: string;
    bio: string;
  };
  lat?: number;
  lng?: number;
}

// -------------------------------------------------------------
// THE 3 DISTINCT APARTMENTS DATA (Authentic Airbnb Collection)
// -------------------------------------------------------------
export const FEATURED_APARTMENTS: ApartmentItem[] = [
  {
    id: 'a1',
    slug: 'you-and-me',
    title: 'Y0U AND ME • Jacuzzi • Sauna • Spa privé',
    subtitle: 'Love Room Romantique avec Jacuzzi & Sauna Privatifs 24h/24',
    location: 'Le Petit-Quevilly, Normandie, France',
    locationDetails: 'À 5 minutes du centre historique de Rouen & 100% 5★ Emplacement',
    pricePerNightEUR: 110,
    rating: 5.0,
    reviewsCount: 8,
    capacityGuests: 2,
    bedroomsCount: 1,
    bedsCount: 1,
    bathroomsCount: 1,
    surfaceM2: 80,
    image: '/a1/Jacuzzi.png',
    badge: 'COUP DE CŒUR VOYAGEURS TOP 5%',
    featured: true,
    amenities: [
      'Jacuzzi Spa Privatif 24h/24',
      'Sauna Privatif Chauffant',
      'Lit Queen Size & Canapé Confort',
      'Smart TV avec Netflix & YouTube',
      'Cuisine Équipée & Réfrigérateur',
      'Stationnement Gratuit sur Place',
      'Arrivée Autonome Serrure Connectée',
      'Climatisation Réversible',
    ],
    description:
      'Bienvenue chez You and Me, une parenthèse romantique pensée pour se retrouver à deux. Profitez d’un jacuzzi privatif, d’un sauna et d’un espace spa dans une ambiance élégante et intimiste. Chambre cosy, cuisine équipée, salle de bain soignée et Netflix complètent votre séjour.',
    descriptionEn:
      'Welcome to You and Me, a romantic retreat designed for couples. Enjoy a private hot tub jacuzzi, private sauna, and spa sanctuary in an elegant atmosphere. Cosy bedroom, equipped kitchen, sleek bathroom, and smart TV with Netflix.',
    host: {
      name: 'Laïd (Crystal Spa)',
      experience: '2 mois d’expérience en tant qu’hôte',
      rating: 4.96,
      reviewsCount: 72,
      responseRate: '100%',
      responseTime: 'Répond dans l’heure',
      bio: 'Bonjour je m’appelle Crystal Spa. Entrepreneur dans l’immobilier et l’hôtellerie intime d’exception.',
    },
    lat: 49.42427,
    lng: 1.061738,
  },
  {
    id: 'a2',
    slug: 'la-vie-est-belle',
    title: 'La Vie est Belle | Spa Privatif',
    subtitle: 'Love Room Romantique avec Spa Privatif 24h/24 & 2 Écrans TV',
    location: 'Le Petit-Quevilly, Normandie, France',
    locationDetails: 'À 5 minutes du centre de Rouen & transports en commun',
    pricePerNightEUR: 110,
    rating: 4.97,
    reviewsCount: 37,
    capacityGuests: 2,
    bedroomsCount: 1,
    bedsCount: 1,
    bathroomsCount: 1,
    surfaceM2: 75,
    image: '/a2/Jacuzzi.png',
    badge: 'COUP DE CŒUR VOYAGEURS TOP 10%',
    featured: true,
    amenities: [
      'Spa Privatif 24h/24 Réglable Immédiat',
      '2 Écrans TV (Jacuzzi + Chambre)',
      'Netflix, YouTube, Disney+',
      'Lit Queen Size & Canapé Confort',
      'Douche Italienne & Miroir LED Tactile',
      'Stationnement Gratuit sur Place & Rue',
      'Arrivée Autonome Serrure Connectée',
      'Cuisine Équipée & Machine Nespresso',
    ],
    description:
      'Bienvenue à La Vie est Belle, une love room pensée pour une parenthèse romantique à deux. Profitez d’un spa privatif accessible 24h/24, d’une ambiance chaleureuse et d’une décoration élégante pour vivre un moment de détente en toute intimité. Deux écrans TV connectés face au jacuzzi et dans la chambre.',
    descriptionEn:
      'Welcome to La Vie est Belle, a romantic love room tailored for couples. Enjoy a private hot tub spa accessible 24/7, a warm atmosphere, and elegant decor for intimate relaxation. Two smart TVs with Netflix, YouTube, Disney+.',
    host: {
      name: 'Laïd (Crystal Spa)',
      experience: '2 mois d’expérience en tant qu’hôte',
      rating: 4.96,
      reviewsCount: 72,
      responseRate: '100%',
      responseTime: 'Répond dans l’heure',
      bio: 'Bonjour je m’appelle Crystal Spa. Passionné par l’hospitalité romantique et le bien-être absolu.',
    },
    lat: 49.42427,
    lng: 1.061738,
  },
  {
    id: 'a3',
    slug: 'le-reve-luxe',
    title: 'Le Rêve Luxe • Spa Privatif | Jacuzzi & Sauna',
    subtitle: 'Suite Privative Jacuzzi & Sauna avec Écran Cinéma Face au Bain',
    location: 'Le Petit-Quevilly, Normandie, France',
    locationDetails: 'Quartier calme et résidentiel, accessible à pied',
    pricePerNightEUR: 110,
    rating: 4.93,
    reviewsCount: 27,
    capacityGuests: 2,
    bedroomsCount: 1,
    bedsCount: 1,
    bathroomsCount: 1,
    surfaceM2: 85,
    image: '/a3/Jacuzzi.png',
    badge: 'COUP DE CŒUR VOYAGEURS',
    featured: true,
    amenities: [
      'Jacuzzi & Sauna Privatifs 24h/24',
      'TV Face au Jacuzzi (Cinéma & Spa)',
      'Lit Queen Size & Canapé Confort',
      'Wi-Fi Fibre Haut Débit',
      'Cuisine Équipée & Four Micro-ondes',
      'Stationnement Gratuit dans la Rue',
      'Arrivée Autonome Serrure Connectée',
      'Climatisation Réversible',
    ],
    description:
      'Bienvenue au Rêve Luxe, une suite entièrement privative pensée pour vous offrir un véritable moment d’évasion à deux. Profitez d’un jacuzzi et d’un sauna privés, accessibles 24h/24 pendant votre séjour, dans une ambiance élégante, chaleureuse et intimiste. TV face au jacuzzi pour profiter d’un moment cinéma et détente.',
    descriptionEn:
      'Welcome to Le Rêve Luxe, an entirely private suite designed for romantic escapes. Enjoy a private jacuzzi and sauna accessible 24/7 in an intimate atmosphere. TV positioned right in front of the jacuzzi for movie and relaxation time.',
    host: {
      name: 'Laïd (Crystal Spa)',
      experience: '2 mois d’expérience en tant qu’hôte',
      rating: 4.96,
      reviewsCount: 72,
      responseRate: '100%',
      responseTime: 'Répond dans l’heure',
      bio: 'Bonjour je m’appelle Crystal Spa. Fondateur des suites privatives Crystal Spa.',
    },
    lat: 49.42427,
    lng: 1.061738,
  },
];

// Helper lookup supporting all slugs and identifiers
export function getApartmentBySlug(slug: string): ApartmentItem | undefined {
  if (!slug) return FEATURED_APARTMENTS[0];
  const norm = slug.toLowerCase();
  if (norm === 'a1' || norm === 'you-and-me' || norm === 'diamant-noir') {
    return FEATURED_APARTMENTS[0];
  }
  if (norm === 'a2' || norm === 'la-vie-est-belle') {
    return FEATURED_APARTMENTS[1];
  }
  if (norm === 'a3' || norm === 'le-reve-luxe' || norm === 'suite-celeste') {
    return FEATURED_APARTMENTS[2];
  }
  return FEATURED_APARTMENTS.find(
    (apt) => apt.slug === norm || apt.id === norm
  ) || FEATURED_APARTMENTS[0];
}


export const AIRBNB_SCORES_A1 = {
  overall: 5.0,
  reviewsTotal: 8,
  categories: [
    { name: 'Propreté', nameEn: 'Cleanliness', score: 5.0 },
    { name: 'Précision', nameEn: 'Accuracy', score: 5.0 },
    { name: 'Arrivée', nameEn: 'Check-in', score: 5.0 },
    { name: 'Communication', nameEn: 'Communication', score: 5.0 },
    { name: 'Emplacement', nameEn: 'Location', score: 5.0 },
    { name: 'Qualité-prix', nameEn: 'Value', score: 4.9 },
  ],
  popularTags: [
    { label: 'Sauna Privatif', count: 6 },
    { label: 'Jacuzzi', count: 8 },
    { label: 'Propreté', count: 7 },
    { label: 'Ambiance Romantique', count: 5 },
    { label: 'Communication', count: 5 },
  ],
};

export const AIRBNB_SCORES_A3 = {
  overall: 4.93,
  reviewsTotal: 27,
  categories: [
    { name: 'Propreté', nameEn: 'Cleanliness', score: 5.0 },
    { name: 'Précision', nameEn: 'Accuracy', score: 4.9 },
    { name: 'Arrivée', nameEn: 'Check-in', score: 5.0 },
    { name: 'Communication', nameEn: 'Communication', score: 5.0 },
    { name: 'Emplacement', nameEn: 'Location', score: 4.9 },
    { name: 'Qualité-prix', nameEn: 'Value', score: 4.8 },
  ],
  popularTags: [
    { label: 'TV Face au Jacuzzi', count: 18 },
    { label: 'Sauna', count: 14 },
    { label: 'Propreté', count: 20 },
    { label: 'Détente', count: 12 },
    { label: 'Stationnement', count: 9 },
  ],
};

// -------------------------------------------------------------
// AIRBNB CATEGORY SCORES
// -------------------------------------------------------------
export const AIRBNB_SCORES_A2 = {
  overall: 4.97,
  reviewsTotal: 37,
  categories: [
    { name: 'Propreté', nameEn: 'Cleanliness', score: 5.0 },
    { name: 'Précision', nameEn: 'Accuracy', score: 5.0 },
    { name: 'Arrivée', nameEn: 'Check-in', score: 5.0 },
    { name: 'Communication', nameEn: 'Communication', score: 5.0 },
    { name: 'Emplacement', nameEn: 'Location', score: 4.9 },
    { name: 'Qualité-prix', nameEn: 'Value', score: 4.8 },
  ],
  popularTags: [
    { label: 'Jacuzzi', count: 12 },
    { label: 'Propreté', count: 17 },
    { label: 'Hospitalité', count: 15 },
    { label: 'Espaces intérieurs', count: 6 },
    { label: 'Précision', count: 5 },
    { label: 'Stationnement', count: 2 },
    { label: 'État du logement', count: 4 },
    { label: 'Confort', count: 3 },
    { label: 'Décoration', count: 3 },
    { label: 'Accès', count: 2 },
  ],
};

export const REVIEWS_A1: AirbnbReview[] = [
  {
    id: 'rev-a1-1',
    author: 'Camille & Julien',
    yearsOnAirbnb: '4 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 3 semaines',
    stayType: 'Séjour d’une nuit',
    comment:
      'Un lieu magique pour se retrouver ! Le jacuzzi et le sauna privatif sont d’une qualité exceptionnelle, la literie est digne des plus grands palaces. Laïd est un hôte aux petits soins, très disponible et prévenant. Nous reviendrons sans hésiter !',
    commentEn:
      'A magical place for couples! The hot tub and private sauna are of exceptional quality, and the bedding is worthy of a 5-star palace. Laïd is a caring, highly responsive host. We will definitely return!',
  },
  {
    id: 'rev-a1-2',
    author: 'Maxime',
    yearsOnAirbnb: '2 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 1 mois',
    stayType: 'Séjour d’une nuit',
    comment:
      'Tout était parfait. Propreté irréprochable, équipements haut de gamme et atmosphère tamisée romantique. Le sauna chauffe très vite et le jacuzzi est toujours à température idéale.',
    commentEn:
      'Everything was spotless and perfect. High-end amenities and romantic lighting. The sauna heats up quickly and the jacuzzi is always at the perfect temperature.',
  },
  {
    id: 'rev-a1-3',
    author: 'Élodie',
    yearsOnAirbnb: '6 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 1 mois',
    stayType: 'Séjour de 2 nuits',
    comment:
      'Superbe séjour, la discrétion de l’arrivée autonome et la réactivité de Laïd font toute la différence. Le salon et l’espace spa forment un vrai havre de paix.',
    commentEn:
      'Superb stay, keyless private check-in and host responsiveness made all the difference. The lounge and spa area create a peaceful sanctuary.',
  },
];

export const REVIEWS_A3: AirbnbReview[] = [
  {
    id: 'rev-a3-1',
    author: 'Thomas & Léa',
    yearsOnAirbnb: '3 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 2 semaines',
    stayType: 'Séjour d’une nuit',
    comment:
      'L’écran TV positionné juste en face du jacuzzi est tout simplement génial ! Regarder un film dans l’eau chaude avec les bulles puis enchaîner avec le sauna... Un pur moment de détente. Appartement ultra propre et hôte parfait.',
    commentEn:
      'The TV positioned directly in front of the hot tub is simply genius! Watching a movie while soaking in bubbles then heading into the sauna... Pure bliss. Spotless apartment and wonderful host.',
  },
  {
    id: 'rev-a3-2',
    author: 'Sarah',
    yearsOnAirbnb: '5 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 3 semaines',
    stayType: 'Séjour d’une nuit',
    comment:
      'Le Rêve Luxe porte bien son nom. Literie extrêmement confortable, cuisine bien pensée et propreté exemplaire. Merci à Laïd pour son accueil chaleureux et ses explications claires.',
    commentEn:
      'Le Rêve Luxe lives up to its name. Extremely comfortable bedding, well-equipped kitchenette and spotless cleanliness. Thank you Laïd for the warm guidance.',
  },
  {
    id: 'rev-a3-3',
    author: 'Benjamin',
    yearsOnAirbnb: '4 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 1 mois',
    stayType: 'Séjour d’une nuit',
    comment:
      'Excellente prestation, sauna très agréable et jacuzzi spacieux. Stationnement gratuit très facile dans la rue. Nous recommandons vivement !',
    commentEn:
      'Excellent experience, very pleasant sauna and spacious hot tub. Easy free street parking. Highly recommended!',
  },
];

// -------------------------------------------------------------
// AUTHENTIC AIRBNB REVIEWS
// -------------------------------------------------------------
export const REVIEWS_A2: AirbnbReview[] = [
  {
    id: 'rev-syllia',
    author: 'Syllia',
    yearsOnAirbnb: '5 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 2 semaines',
    stayType: 'Séjour d’une nuit',
    comment:
      'Si vous cherchez un bon Airbnb sur Rouen et ses alentours, je vous recommande Crystal Spa, situé au Petit-Quevilly. Je le recommande à 100 % ! Il est proche de tout et des transports en commun. Si vous êtes véhiculé, il y a largement de quoi vous garer. La climatisation et la température du jacuzzi se règlent comme vous voulez, avec un effet immédiat. Il y a deux écrans plats : un en face du jacuzzi et un dans la chambre, avec Netflix, YouTube, Disney+ et bien d’autres applications. La douche et le miroir LED sont incroyables. Le lit et le canapé sont très confortables. Frigo, café, petit-déjeuner, bouteilles d’eau, peignoirs, claquettes, sèche-cheveux, gel douche et shampoing : il y a vraiment tout. Bref, c’est incroyable !',
    commentEn:
      'If you are looking for a great Airbnb in Rouen and its surroundings, I highly recommend Crystal Spa in Le Petit-Quevilly. 100% recommended! Close to everything and transit. Free parking is easy. The A/C and jacuzzi temperature can be adjusted instantly. Two smart screens with Netflix, YouTube, Disney+. Wonderful LED mirror shower. Extremely comfortable bed and sofa. Robes, slippers, breakfast, coffee, water bottles: everything was provided. Truly amazing!',
  },
  {
    id: 'rev-alison',
    author: 'Alison',
    yearsOnAirbnb: '10 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 2 semaines',
    stayType: 'Séjour de quelques nuits',
    comment:
      'Logement incroyable, parfaitement fidèle aux photos et à la description. Hôtes très sympathique, bienveillant et très actif. Totalement à l’écoute de chaque besoin. Je recommande vivement !!',
    commentEn:
      'Incredible accommodation, perfectly true to the photos and description. Very friendly, caring, and responsive host. Attentive to every need. Highly recommended!!',
  },
  {
    id: 'rev-leroux',
    author: 'Leroux',
    yearsOnAirbnb: '3 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 1 semaine',
    stayType: 'Séjour d’une nuit',
    comment:
      'Airbnb parfait ! Le logement était propre et très bien situé. Le jacuzzi était nickel. La communication avec l’hôte était parfaite, rien à redire. Je recommande vivement !',
    commentEn:
      'Perfect Airbnb! The place was spotless and in a great location. The hot tub was pristine. Communication with the host was flawless, nothing to complain about. Highly recommended!',
  },
  {
    id: 'rev-alan',
    author: 'Alan',
    yearsOnAirbnb: '6 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 2 jours',
    stayType: 'Séjour de quelques nuits',
    comment: 'Logement parfait rien à dire. Identique à la description.',
    commentEn: 'Perfect accommodation, nothing to say. Exactly like the description.',
  },
  {
    id: 'rev-dylan',
    author: 'Dylan',
    yearsOnAirbnb: '2 ans sur Airbnb',
    rating: 5,
    date: 'Il y a 1 semaine',
    stayType: 'Séjour d’une nuit',
    comment: 'Super agréable, je serai bien resté plus longtemps 😉',
    commentEn: 'Super enjoyable, I would have loved to stay longer 😉',
  },
  {
    id: 'rev-kyllian',
    author: 'Kyllian',
    yearsOnAirbnb: '7 ans sur Airbnb',
    rating: 4,
    date: 'Il y a 1 semaine',
    stayType: 'Séjour d’une nuit',
    comment: 'Exceptionnel séjour, Airbnb de qualité et propre je recommande',
    commentEn: 'Exceptional stay, high quality and clean Airbnb, I recommend',
  },
];

// -------------------------------------------------------------
// COMPLETE 42 AMENITIES (Categorized)
// -------------------------------------------------------------
export const APARTMENT_AMENITIES_42: AmenityCategory[] = [
  {
    category: 'Salle de bain',
    categoryEn: 'Bathroom',
    icon: 'shower',
    items: [
      { title: 'Produits de nettoyage', titleEn: 'Cleaning products' },
      { title: 'Shampoing de qualité', titleEn: 'Premium shampoo' },
      { title: 'Après-shampoing', titleEn: 'Hair conditioner' },
      { title: 'Savon pour le corps & gel douche', titleEn: 'Body soap & shower gel' },
      { title: 'Eau chaude continue', titleEn: 'Continuous hot water' },
      { title: 'Douche sensorielle & Miroir LED tactile', titleEn: 'Sensory shower & Touch LED mirror' },
      { title: 'Sèche-cheveux & peignoirs velours', titleEn: 'Hairdryer & plush bathrobes' },
    ],
  },
  {
    category: 'Chambre et linge',
    categoryEn: 'Bedroom and laundry',
    icon: 'bed',
    items: [
      { title: 'Produits de base', titleEn: 'Essentials', description: 'Serviettes, draps, savon et papier toilette', descriptionEn: 'Towels, bedsheets, soap, toilet paper' },
      { title: 'Linge de lit en coton d’Égypte', titleEn: 'Egyptian cotton bed linen' },
      { title: 'Stores ou rideaux 100% occultants', titleEn: 'Blackout shades and curtains' },
      { title: 'Espace de rangement pour les vêtements', titleEn: 'Clothing storage and wardrobe' },
      { title: 'Lit Queen Size grand confort hôtel', titleEn: 'Hotel-grade Queen Size Bed' },
    ],
  },
  {
    category: 'Divertissement',
    categoryEn: 'Entertainment',
    icon: 'tv',
    items: [
      { title: '2 Téléviseurs Smart TV grand écran', titleEn: '2 Smart TVs (bedroom & jacuzzi)' },
      { title: 'Cinéma & Applications', titleEn: 'Cinema & Streaming', description: 'Netflix, YouTube, Disney+ inclus', descriptionEn: 'Netflix, YouTube, Disney+ included' },
    ],
  },
  {
    category: 'Chauffage et climatisation',
    categoryEn: 'Heating and cooling',
    icon: 'ac_unit',
    items: [
      { title: 'Climatisation réversible', titleEn: 'Air conditioning', description: 'Réglage de température immédiat', descriptionEn: 'Instant temperature adjustment' },
      { title: 'Chauffage radiant', titleEn: 'Radiant heating' },
    ],
  },
  {
    category: 'Sécurité à la maison',
    categoryEn: 'Home safety',
    icon: 'shield',
    items: [
      { title: 'Caméras de surveillance extérieures', titleEn: 'Exterior security cameras', description: 'Présentes à l’entrée pour votre sécurité', descriptionEn: 'Located at the entrance for safety' },
      { title: 'Détecteur de fumée connecté', titleEn: 'Connected smoke alarm' },
      { title: 'Détecteur de monoxyde de carbone', titleEn: 'Carbon monoxide alarm' },
    ],
  },
  {
    category: 'Internet et bureau',
    categoryEn: 'Internet and office',
    icon: 'wifi',
    items: [
      { title: 'Wi-Fi Fibre haut débit gratuit', titleEn: 'Free high-speed fiber Wi-Fi' },
      { title: 'Routeur Wi-Fi portable', titleEn: 'Portable Wi-Fi router' },
    ],
  },
  {
    category: 'Cuisine et salle à manger',
    categoryEn: 'Kitchen and dining',
    icon: 'restaurant',
    items: [
      { title: 'Cuisine toute équipée', titleEn: 'Fully equipped kitchen', description: 'Espace complet où cuisiner', descriptionEn: 'Complete space for cooking' },
      { title: 'Réfrigérateur & Mini réfrigérateur', titleEn: 'Refrigerator & Mini fridge' },
      { title: 'Four à micro-ondes', titleEn: 'Microwave oven' },
      { title: 'Tout le nécessaire pour cuisiner', titleEn: 'Cooking basics', description: 'Casseroles, poêles, huile, sel et poivre', descriptionEn: 'Pots, pans, oil, salt and pepper' },
      { title: 'Vaisselle et couverts complets', titleEn: 'Dishes and silverware', description: 'Bols, assiettes, tasses, verres à vin', descriptionEn: 'Bowls, plates, cups, wine glasses' },
      { title: 'Congélateur', titleEn: 'Freezer' },
      { title: 'Cuisinière électrique & plaques de cuisson', titleEn: 'Electric stove & cooktop' },
      { title: 'Cafetière : machine à expresso, Nespresso', titleEn: 'Coffee maker: Espresso machine, Nespresso' },
      { title: 'Café & Thé offerts au réveil', titleEn: 'Complimentary morning coffee & tea' },
    ],
  },
  {
    category: 'Caractéristiques de l’emplacement',
    categoryEn: 'Location features',
    icon: 'door_front',
    items: [
      { title: 'Entrée privée indépendante', titleEn: 'Private independent entrance', description: 'Accès par rue séparée sans croiser personne', descriptionEn: 'Separate street access in total privacy' },
      { title: 'Laverie automatique à proximité', titleEn: 'Laundromat nearby' },
    ],
  },
  {
    category: 'Parking et installations',
    categoryEn: 'Parking and facilities',
    icon: 'hot_tub',
    items: [
      { title: 'Jacuzzi spa privatif 24h/24', titleEn: 'Private hot tub spa 24/7', description: 'Température réglable avec effet immédiat', descriptionEn: 'Instant custom temperature control' },
      { title: 'Stationnement gratuit sur place', titleEn: 'Free on-premise parking' },
      { title: 'Stationnement gratuit dans la rue', titleEn: 'Free street parking' },
      { title: 'Résidence calme et protégée', titleEn: 'Quiet protected residence' },
    ],
  },
  {
    category: 'Services & séjour',
    categoryEn: 'Services',
    icon: 'key',
    items: [
      { title: 'Arrivée autonome avec serrure connectée', titleEn: 'Self check-in with smart lock', description: 'Code d’accès personnel envoyé par message', descriptionEn: 'Personal secure entry code via text' },
      { title: 'Animaux acceptés', titleEn: 'Pets allowed', description: 'Animaux d’assistance toujours autorisés', descriptionEn: 'Service animals always allowed' },
      { title: 'Dépôt de bagages autorisé', titleEn: 'Luggage dropoff allowed', description: 'En cas d’arrivée anticipée ou départ tardif', descriptionEn: 'For early arrival or late departure comfort' },
      { title: 'Séjours longue durée autorisés', titleEn: 'Long term stays allowed', description: 'Séjours de 28 jours ou plus autorisés', descriptionEn: 'Stays of 28+ days welcome' },
    ],
  },
];

// -------------------------------------------------------------
// 31 REAL PHOTOS FOR APARTMENT 3 (public/a3)
// -------------------------------------------------------------
export const ROOM_IMAGES_A3: RoomImage[] = [
  // JACUZZI
  {
    id: 'a3-jacuzzi-main',
    title: 'Jacuzzi Spa Privatif Céleste',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a3/Jacuzzi.png',
    description: 'Bassin spa chauffé sous plafond étoilé en fibre optique.',
  },
  {
    id: 'a3-jacuzzi-1',
    title: 'Jacuzzi & Éclairage Étoilé',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a3/Jacuzzi 1.png',
    description: 'Ambiance céleste féerique pour une déconnexion intégrale.',
  },
  {
    id: 'a3-jacuzzi-2',
    title: 'Vue d’Ensemble Bain Spa',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a3/Jacuzzi 2.png',
    description: 'Buses d’hydromassage lombaires et chromothérapie.',
  },
  {
    id: 'a3-jacuzzi-3',
    title: 'Bassin & Espace Repos',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a3/Jacuzzi 3.png',
    description: 'Accès fluide entre l’espace relaxation et le séjour.',
  },
  {
    id: 'a3-jacuzzi-4',
    title: 'Ambience Lumineuse Nocturne',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a3/Jacuzzi 4.png',
    description: 'Banquette lounge et serviettes moelleuses d’accueil.',
  },
  {
    id: 'a3-jacuzzi-5',
    title: 'Jets d’Eau & Effet Bouillonnant',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a3/Jacuzzi 5.png',
    description: 'Eau stérilisée filtrée chauffée à 38°C.',
  },
  {
    id: 'a3-jacuzzi-6',
    title: 'Perspective Spa Penthouse',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a3/Jacuzzi 6.png',
    description: 'Finitions somptueuses et intimité absolue.',
  },

  // CHAMBRE
  {
    id: 'a3-chambre-main',
    title: 'Chambre Master King Size Céleste',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre.png',
    description: 'Grand lit King Size avec tête de lit capitonnée et ciel étoilé.',
  },
  {
    id: 'a3-chambre-1',
    title: 'Détail Literie Palace',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre 1.png',
    description: 'Draps en satin de coton et oreillers à mémoire de forme.',
  },
  {
    id: 'a3-chambre-2',
    title: 'Éclairage LED Tamisé Chambre',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre 2.png',
    description: 'Ambiance romantique et chaleureuse.',
  },
  {
    id: 'a3-chambre-3',
    title: 'Vue d’Ensemble Suite Nuit',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre 3.png',
    description: 'Grand écran TV mural avec Netflix et YouTube.',
  },
  {
    id: 'a3-chambre-4',
    title: 'Espace Rangement & Dressing',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre 4.png',
    description: 'Penderie intégrée et rangement pour vêtements.',
  },
  {
    id: 'a3-chambre-5',
    title: 'Coin Nuit Cosy',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre 5.png',
    description: 'Espace feutré pour des nuits réparatrices.',
  },
  {
    id: 'a3-chambre-6',
    title: 'Chevets & Luminaires Design',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre 6.png',
    description: 'Touches dorées et finitions épurées.',
  },
  {
    id: 'a3-chambre-7',
    title: 'Perspective Suite & Ciel',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a3/Chambre 7.png',
    description: 'Un cocon de douceur d’exception.',
  },

  // SALON
  {
    id: 'a3-salon-main',
    title: 'Salon Penthouse Panoramique',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a3/Salon.png',
    description: 'Grand canapé d’angle design et écran plat 4K Smart TV.',
  },
  {
    id: 'a3-salon-1',
    title: 'Espace Séjour & Climatisation',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a3/salon 1.png',
    description: 'Climatisation réversible et éclairage tamisé.',
  },
  {
    id: 'a3-salon-2',
    title: 'Perspective Open Space',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a3/salon 2.png',
    description: 'Espace fluide reliant salon, bar et spa.',
  },
  {
    id: 'a3-salon-4',
    title: 'Coin Repos & Décoration',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a3/salon 4.png',
    description: 'Fauteuils confortables et table basse contemporaine.',
  },
  {
    id: 'a3-salon-5',
    title: 'Éclairage d’Ambiance Salon',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a3/salon 5.png',
    description: 'Bandeaux LED dorés et miroir d’art.',
  },
  {
    id: 'a3-salon-6',
    title: 'Vue d’Ensemble Séjour Luxe',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a3/salon 6.png',
    description: 'Confort et esthétique moderne.',
  },

  // KITCHENETTE
  {
    id: 'a3-kitchen-main',
    title: 'Kitchenette Équipée & Comptoir',
    category: 'cuisine',
    categoryLabel: 'KITCHENETTE',
    src: '/a3/Kitchenette.png',
    description: 'Machine Nespresso, plaques de cuisson et réfrigérateur.',
  },
  {
    id: 'a3-kitchen-1',
    title: 'Bar & Machine Nespresso',
    category: 'cuisine',
    categoryLabel: 'KITCHENETTE',
    src: '/a3/Kitchenette 1.png',
    description: 'Sélection de cafés et thés offerts.',
  },
  {
    id: 'a3-kitchen-2',
    title: 'Ustensiles & Vaisselle Completes',
    category: 'cuisine',
    categoryLabel: 'KITCHENETTE',
    src: '/a3/Kitchenette 2.png',
    description: 'Tout le nécessaire pour vos repas intimes.',
  },

  // SALLE DE BAIN
  {
    id: 'a3-bath-main',
    title: 'Salle de Bain de Luxe',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a3/Salle de bain.png',
    description: 'Miroir rétroéclairé LED et meuble vasque sur mesure.',
  },
  {
    id: 'a3-bath-1',
    title: 'Douche Italienne Pluie',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a3/Salle de bain 1.png',
    description: 'Ciel de pluie tropicale avec gel douche et shampooing fournis.',
  },
  {
    id: 'a3-bath-2',
    title: 'Double Vasque & Finitions',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a3/Salle de bain 2.png',
    description: 'Carrelage sombre et finitions laiton doré.',
  },
  {
    id: 'a3-bath-3',
    title: 'Espace Douche & Peignoirs',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a3/Salle de bain 3.png',
    description: 'Peignoirs moelleux et serviettes de bain d’accueil.',
  },
  {
    id: 'a3-bath-4',
    title: 'Vue d’Ensemble Salle d’Eau',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a3/Salle de bain 4.png',
    description: 'Propreté absolue et confort d’exception.',
  },

  // COUR D'ENTRÉE & ACCÈS SÉCURISÉ
  {
    id: 'a3-door-entrance',
    title: 'Porte d’Entrée Sécurisée & Hall',
    category: 'cour',
    categoryLabel: 'PORTE & ACCÈS',
    src: '/entry/door-1.jpeg',
    description: 'Double porte contemporaine sécurisée et hall d’accès privatif avec éclairage chaleureux.',
  },
  {
    id: 'a3-door-keypad',
    title: 'Digicode & Serrure Connectée 24h/24',
    category: 'cour',
    categoryLabel: 'PORTE & ACCÈS',
    src: '/entry/door.jpeg',
    description: 'Serrure numérique sécurisée à code confidentiel pour une arrivée autonome en toute discrétion.',
  },
  {
    id: 'a3-cour-main',
    title: 'Cour Extérieure & Accès Discret',
    category: 'cour',
    categoryLabel: 'COUR PRIVÉE',
    src: '/a3/Cour d\'entrée.png',
    description: 'Entrée indépendante et sécurisée.',
  },
  {
    id: 'a3-cour-1',
    title: 'Accès Autonome Serrure Numérique',
    category: 'cour',
    categoryLabel: 'COUR PRIVÉE',
    src: '/a3/Cour d\'entrée 1.png',
    description: 'Code d’accès confidentiel unique généré pour votre venue.',
  },
];

// -------------------------------------------------------------
// 30 REAL PHOTOS FOR APARTMENT 2 (public/a2)
// -------------------------------------------------------------
export const ROOM_IMAGES_A2: RoomImage[] = [
  // JACUZZI
  {
    id: 'a2-jacuzzi-main',
    title: 'Jacuzzi Privatif 24h/24',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a2/Jacuzzi.png',
    description: 'Spa privatif grand format avec jets hydromassants et ambiance tamisée.',
  },
  {
    id: 'a2-jacuzzi-1',
    title: 'Bassin Bouillonnant & Écran TV',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a2/Jacuzzi 1.png',
    description: 'Écran plat face au jacuzzi avec Netflix et YouTube en immersion.',
  },
  {
    id: 'a2-jacuzzi-2',
    title: 'Ambiance Romantique Jacuzzi',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a2/Jacuzzi 2.png',
    description: 'Chromothérapie LED et eau chaude à température personnalisable.',
  },
  {
    id: 'a2-jacuzzi-3',
    title: 'Détail Jets de Massage',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a2/Jacuzzi 3.png',
    description: 'Buses d’hydromassage lombaires pour une déconnexion intégrale.',
  },
  {
    id: 'a2-jacuzzi-4',
    title: 'Espace Spa Intime',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a2/Jacuzzi 4.png',
    description: 'Ambiance cosy avec serviettes moelleuses et peignoirs.',
  },
  {
    id: 'a2-jacuzzi-5',
    title: 'Perspective Spa et Séjour',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a2/Jacuzzi 5.png',
    description: 'Accès fluide entre le spa et les espaces de vie.',
  },

  // CHAMBRE
  {
    id: 'a2-chambre-main',
    title: 'Chambre Queen Size Romantique',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a2/chambre.png',
    description: 'Lit Queen Size confortable avec literie coton et TV murale.',
  },
  {
    id: 'a2-chambre-1',
    title: 'Espace Sommeil & Décoration',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a2/chambre 1.png',
    description: 'Lumières douces, chevets design et rideaux occultants.',
  },
  {
    id: 'a2-chambre-3',
    title: 'Vue d’Ensemble Suite Nuit',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a2/chambre 3.png',
    description: 'Cocon feutré parfait pour des nuits réparatrices.',
  },

  // SALON
  {
    id: 'a2-salon-main',
    title: 'Salon Cosy & Détente',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a2/salon.png',
    description: 'Canapé confortable, table basse et éclairage chaleureux.',
  },
  {
    id: 'a2-salon-1',
    title: 'Espace Séjour & Climatisation',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a2/salon 1.png',
    description: 'Climatisation réversible pour une température idéale en toute saison.',
  },
  {
    id: 'a2-salon-2',
    title: 'Perspective Espace de Vie',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a2/salon 2.png',
    description: 'Ambiance harmonieuse alliant modernité et confort intime.',
  },

  // PIÈCE À THÈME
  {
    id: 'a2-theme-main',
    title: 'Pièce Romantique & Ambiance',
    category: 'theme',
    categoryLabel: 'PIÈCE À THÈME',
    src: '/a2/Pièce à thème.png',
    description: 'Mise en scène passionnée pour célébrer l’amour à deux.',
  },
  {
    id: 'a2-theme-1',
    title: 'Atmosphère Feutrée',
    category: 'theme',
    categoryLabel: 'PIÈCE À THÈME',
    src: '/a2/Pièce à thème 1.png',
    description: 'Éclairage thématique et éléments de décoration exclusifs.',
  },
  {
    id: 'a2-theme-2',
    title: 'Coin Intimité',
    category: 'theme',
    categoryLabel: 'PIÈCE À THÈME',
    src: '/a2/Pièce à thème 2.png',
    description: 'Écrin discret pensé pour les moments complices.',
  },
  {
    id: 'a2-theme-3',
    title: 'Jeux de Lumière & Décors',
    category: 'theme',
    categoryLabel: 'PIÈCE À THÈME',
    src: '/a2/Pièce à thème 3.png',
    description: 'Ambiance lounge tamisée pour couper avec le quotidien.',
  },
  {
    id: 'a2-theme-4',
    title: 'Perspective Chambre Passion',
    category: 'theme',
    categoryLabel: 'PIÈCE À THÈME',
    src: '/a2/Pièce à thème 4.png',
    description: 'Une parenthèse inoubliable pour anniversaires et demandes.',
  },

  // KITCHENETTE
  {
    id: 'a2-kitchen-main',
    title: 'Kitchenette Équipée & Bar',
    category: 'cuisine',
    categoryLabel: 'KITCHENETTE',
    src: '/a2/Kitchenette.png',
    description: 'Plan de travail complet avec machine expresso et verres à vin.',
  },
  {
    id: 'a2-kitchen-2',
    title: 'Espace Préparation Culinaire',
    category: 'cuisine',
    categoryLabel: 'KITCHENETTE',
    src: '/a2/Kitchenette 2.png',
    description: 'Plaques de cuisson, micro-ondes et réfrigérateur à disposition.',
  },
  {
    id: 'a2-kitchen-3',
    title: 'Vaisselle & Électroménager',
    category: 'cuisine',
    categoryLabel: 'KITCHENETTE',
    src: '/a2/Kitchenette 3.png',
    description: 'Tout le nécessaire pour préparer un dîner en amoureux.',
  },
  {
    id: 'a2-kitchen-4',
    title: 'Comptoir & Cafetière Nespresso',
    category: 'cuisine',
    categoryLabel: 'KITCHENETTE',
    src: '/a2/Kitchenette 4.png',
    description: 'Capsules de café, thés et gourmandises pour votre séjour.',
  },

  // SALLE DE BAIN
  {
    id: 'a2-bath-main',
    title: 'Salle de Bain Moderne & Miroir LED',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a2/Salle de bain.png',
    description: 'Miroir rétroéclairé LED tactile et meuble vasque contemporain.',
  },
  {
    id: 'a2-bath-1',
    title: 'Douche Sensorielle Italienne',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a2/Salle de bain 1.png',
    description: 'Ciel de pluie tropicale avec gel douche et shampoing offerts.',
  },
  {
    id: 'a2-bath-3',
    title: 'Finitions Haut de Gamme',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a2/Salle de bain 3.png',
    description: 'Carrelage soigné et propreté chirurgicale certifiée.',
  },
  {
    id: 'a2-bath-4',
    title: 'Espace Douche & Soins',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a2/Salle de bain 4.png',
    description: 'Robinetterie thermostatique moderne et eau chaude continue.',
  },
  {
    id: 'a2-bath-5',
    title: 'Perspective Salle d’Eau',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a2/Salle de bain 5.png',
    description: 'Rangements, serviettes fraîches et produits d’accueil.',
  },

  // COUR D'ENTRÉE & EXTÉRIEUR
  {
    id: 'a2-door-entrance',
    title: 'Porte d’Entrée Sécurisée & Hall',
    category: 'cour',
    categoryLabel: 'PORTE & ACCÈS',
    src: '/entry/door-1.jpeg',
    description: 'Double porte contemporaine sécurisée et hall d’accès privatif avec éclairage soigné.',
  },
  {
    id: 'a2-door-keypad',
    title: 'Digicode & Serrure Connectée 24h/24',
    category: 'cour',
    categoryLabel: 'PORTE & ACCÈS',
    src: '/entry/door.jpeg',
    description: 'Serrure numérique sécurisée à code confidentiel pour une autonomie totale dès 17h00.',
  },
  {
    id: 'a2-cour-main',
    title: 'Cour d’Entrée & Accès Privé',
    category: 'cour',
    categoryLabel: 'COUR PRIVÉE',
    src: '/a2/Cour d\'entrée.png',
    description: 'Entrée indépendante et sécurisée sans vis-à-vis.',
  },
  {
    id: 'a2-cour-2',
    title: 'Accès Autonome & Serrure Connectée',
    category: 'cour',
    categoryLabel: 'COUR PRIVÉE',
    src: '/a2/Cour d\'entrée 2.png',
    description: 'Porte équipée d’une serrure numérique à code personnel.',
  },
  {
    id: 'a2-cour-3',
    title: 'Cour Extérieure Calme',
    category: 'cour',
    categoryLabel: 'COUR PRIVÉE',
    src: '/a2/Cour d\'entrée 3.png',
    description: 'Environnement paisible dans un quartier résidentiel de choix.',
  },
  {
    id: 'a2-cour-4',
    title: 'Abords & Stationnement',
    category: 'cour',
    categoryLabel: 'COUR PRIVÉE',
    src: '/a2/Cour d\'entrée 4.png',
    description: 'Stationnement gratuit sur place et stationnement facile dans la rue.',
  },
];

// -------------------------------------------------------------
// 23 REAL PHOTOS FOR APARTMENT 1 (public/a1)
// -------------------------------------------------------------
export const ROOM_IMAGES_A1: RoomImage[] = [
  // JACUZZI
  {
    id: 'jacuzzi-1',
    title: 'Jacuzzi Privatif Chauffé 38°C',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a1/Jacuzzi.png',
    description: 'Bassin d’hydro-massage privatif avec éclairage d’ambiance nocturne.',
  },
  {
    id: 'jacuzzi-2',
    title: 'Espace Relaxation Jacuzzi',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a1/Jacuzzi 2.png',
    description: 'Banquette lounge et serviettes moelleuses à disposition.',
  },
  {
    id: 'jacuzzi-3',
    title: 'Ambience Lumineuse Hydro',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a1/Jacuzzi 3.png',
    description: 'Chromothérapie et buses de massage ciblées.',
  },
  {
    id: 'jacuzzi-4',
    title: 'Espace Spa Pierre Sombre',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a1/Jacuzzi 4.png',
    description: 'Finition pierre naturelle et atmosphère apaisante.',
  },
  {
    id: 'jacuzzi-5',
    title: 'Vue d’Ensemble Suite Spa',
    category: 'jacuzzi',
    categoryLabel: 'JACUZZI',
    src: '/a1/Jacuzzi 5.png',
    description: 'Bassin chauffé accessible 24/7.',
  },

  // CHAMBRE
  {
    id: 'chambre-1',
    title: 'Chambre Master King Suite',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a1/Chambre.png',
    description: 'Grand lit King-size avec drap de lit en coton égyptien.',
  },
  {
    id: 'chambre-2',
    title: 'Décoration & Dressing Suite',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a1/Chambre 2.png',
    description: 'Rangements intégrés et finitions haut de gamme.',
  },
  {
    id: 'chambre-3',
    title: 'Détails Literie de Luxe',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a1/Chambre 3.png',
    description: 'Éclairage LED tamisé et matelas à mémoire de forme.',
  },
  {
    id: 'chambre-4',
    title: 'Seconde Chambre d’Hôtes',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a1/chambre 4.png',
    description: 'Deuxième suite spacieuse et calme.',
  },
  {
    id: 'chambre-5',
    title: 'Coin Repos Chambre',
    category: 'chambre',
    categoryLabel: 'CHAMBRE',
    src: '/a1/chambre 5.png',
    description: 'Fauteuil de lecture et espace détente.',
  },

  // SALON
  {
    id: 'salon-1',
    title: 'Salon Principal Cinéma',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a1/salon.png',
    description: 'Canapé design, écran 4K OLED et système audio surround.',
  },
  {
    id: 'salon-2',
    title: 'Coin Séjour & TV Smart',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a1/salon 1.png',
    description: 'Accès Netflix, Prime et musique haute fidélité.',
  },
  {
    id: 'salon-3',
    title: 'Perspective Open Space',
    category: 'salon',
    categoryLabel: 'SALON',
    src: '/a1/salon 2.png',
    description: 'Espace ouvert lumineux reliant séjour et salle à manger.',
  },

  // CUISINE
  {
    id: 'cuisine-1',
    title: 'Cuisine Équipée Quartz Noir',
    category: 'cuisine',
    categoryLabel: 'CUISINE',
    src: '/a1/cuisine.png',
    description: 'Plan de travail en quartz avec électroménager moderne.',
  },
  {
    id: 'cuisine-2',
    title: 'Îlot & Bar à Café',
    category: 'cuisine',
    categoryLabel: 'CUISINE',
    src: '/a1/Cuisine 2.png',
    description: 'Machine Nespresso, sélection de thés bio et verres à vin.',
  },
  {
    id: 'cuisine-3',
    title: 'Plaques à Induction & Four',
    category: 'cuisine',
    categoryLabel: 'CUISINE',
    src: '/a1/cuisine 3.png',
    description: 'Tout le nécessaire pour vos repas privés.',
  },
  {
    id: 'cuisine-4',
    title: 'Espace Repas & Comptoir',
    category: 'cuisine',
    categoryLabel: 'CUISINE',
    src: '/a1/cuisine 4.png',
    description: 'Comptoir convivial pour dîners intimes.',
  },
  {
    id: 'cuisine-5',
    title: 'Équipements Culinaire Complètes',
    category: 'cuisine',
    categoryLabel: 'CUISINE',
    src: '/a1/cuisine 5.png',
    description: 'Casseroles, ustensiles et cave à vin à disposition.',
  },

  // SALLE DE BAIN
  {
    id: 'salle-de-bain-1',
    title: 'Salle de Bain de Luxe',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a1/Salle de bain.png',
    description: 'Double vasque sur marbre sombre.',
  },
  {
    id: 'salle-de-bain-2',
    title: 'Douche Italienne Pluie',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a1/Salle de bain 2.png',
    description: 'Douche spacieuse à effet pluie tropicale.',
  },
  {
    id: 'salle-de-bain-3',
    title: 'Miroir Rétroéclairé halo',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a1/Salle de bain 3.png',
    description: 'Éclairage vanity doux et finitions épurées.',
  },
  {
    id: 'salle-de-bain-4',
    title: 'Produits d’Accueil Organiques',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a1/Salle de bain 4.png',
    description: 'Shampooing, savon et peignoirs doux fournis.',
  },
  {
    id: 'salle-de-bain-5',
    title: 'Vue Complète Salle de Bain',
    category: 'salle-de-bain',
    categoryLabel: 'SALLE DE BAIN',
    src: '/a1/Salle de bain 5.png',
    description: 'Espace d’hygiène et de bien-être haut de gamme.',
  },

  // COUR D'ENTRÉE & ACCÈS SÉCURISÉ
  {
    id: 'a1-door-entrance',
    title: 'Porte d’Entrée Sécurisée & Hall',
    category: 'cour',
    categoryLabel: 'PORTE & ACCÈS',
    src: '/entry/door-1.jpeg',
    description: 'Double porte contemporaine sécurisée et hall d’accès privatif avec éclairage soigné.',
  },
  {
    id: 'a1-door-keypad',
    title: 'Digicode & Serrure Connectée 24h/24',
    category: 'cour',
    categoryLabel: 'PORTE & ACCÈS',
    src: '/entry/door.jpeg',
    description: 'Serrure numérique sécurisée à code confidentiel pour une autonomie totale.',
  },
];

// -------------------------------------------------------------
// LEGACY COMPATIBILITY EXPORTS
// -------------------------------------------------------------
export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

export const EXPERIENCES_LIST: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Private Spa & Hydro Jacuzzi',
    subtitle: 'Relaxation & Hydromassage',
    description: 'Plongez dans un bassin privatif avec jets de massage ciblés et chromothérapie douce.',
    image: '/a2/Jacuzzi.png',
    badge: 'DETENTE ABSOLUE',
  },
  {
    id: 'exp-2',
    title: 'Escapade Romantique Suite',
    subtitle: 'Pétales & Champagne Welcome',
    description: 'Surprenez votre partenaire avec un accueil personnalisé: pétale de rose, bouteille de champagne et bougies.',
    image: '/a2/chambre.png',
    badge: 'ROMANTISME',
  },
  {
    id: 'exp-3',
    title: 'Décoration Luxe & Ambiance',
    subtitle: 'Mise en Scène Sur-Mesure',
    description: 'Atmosphère tamisée, 2 écrans Netflix et senteurs botaniques d’exception dès votre arrivée.',
    image: '/a2/salon.png',
    badge: 'EXCLUSIVITÉ',
  },
];

// -------------------------------------------------------------
// TOP HIGHLIGHT IMAGES (6-7 PHOTOS) FOR APARTMENT DETAILS HEADER
// -------------------------------------------------------------
export function getTopApartmentImages(identifier: string): RoomImage[] {
  const norm = (identifier || '').toLowerCase();
  if (norm === 'a1' || norm === 'you-and-me' || norm === 'diamant-noir') {
    return [
      ROOM_IMAGES_A1.find((i) => i.src === '/a1/Jacuzzi.png') || ROOM_IMAGES_A1[0],
      ROOM_IMAGES_A1.find((i) => i.src === '/a1/Chambre.png') || ROOM_IMAGES_A1[1],
      ROOM_IMAGES_A1.find((i) => i.src === '/a1/salon.png') || ROOM_IMAGES_A1[2],
      ROOM_IMAGES_A1.find((i) => i.src === '/a1/cuisine.png') || ROOM_IMAGES_A1[3],
      ROOM_IMAGES_A1.find((i) => i.src === '/a1/Salle de bain.png') || ROOM_IMAGES_A1[4],
      ROOM_IMAGES_A1.find((i) => i.src === '/a1/Jacuzzi 2.png') || ROOM_IMAGES_A1[5],
      ROOM_IMAGES_A1.find((i) => i.src === '/a1/Chambre 3.png') || ROOM_IMAGES_A1[6],
    ].filter(Boolean);
  }

  if (norm === 'a3' || norm === 'le-reve-luxe' || norm === 'suite-celeste') {
    return [
      ROOM_IMAGES_A3.find((i) => i.src === '/a3/Jacuzzi.png') || ROOM_IMAGES_A3[0],
      ROOM_IMAGES_A3.find((i) => i.src === '/a3/Chambre.png') || ROOM_IMAGES_A3[1],
      ROOM_IMAGES_A3.find((i) => i.src === '/a3/Salon.png') || ROOM_IMAGES_A3[2],
      ROOM_IMAGES_A3.find((i) => i.src === '/a3/Kitchenette.png') || ROOM_IMAGES_A3[3],
      ROOM_IMAGES_A3.find((i) => i.src === '/a3/Salle de bain.png') || ROOM_IMAGES_A3[4],
      ROOM_IMAGES_A3.find((i) => i.src === '/a3/Jacuzzi 1.png') || ROOM_IMAGES_A3[5],
      ROOM_IMAGES_A3.find((i) => i.src === "/a3/Cour d'entrée.png") || ROOM_IMAGES_A3[6],
    ].filter(Boolean);
  }

  // Default to A2 (la-vie-est-belle)
  return [
    ROOM_IMAGES_A2.find((i) => i.src === '/a2/Jacuzzi.png') || ROOM_IMAGES_A2[0],
    ROOM_IMAGES_A2.find((i) => i.src === '/a2/chambre.png') || ROOM_IMAGES_A2[1],
    ROOM_IMAGES_A2.find((i) => i.src === '/a2/Pièce à thème.png') || ROOM_IMAGES_A2[2],
    ROOM_IMAGES_A2.find((i) => i.src === '/a2/salon.png') || ROOM_IMAGES_A2[3],
    ROOM_IMAGES_A2.find((i) => i.src === '/a2/Kitchenette.png') || ROOM_IMAGES_A2[4],
    ROOM_IMAGES_A2.find((i) => i.src === '/a2/Salle de bain.png') || ROOM_IMAGES_A2[5],
    ROOM_IMAGES_A2.find((i) => i.src === "/a2/Cour d'entrée.png") || ROOM_IMAGES_A2[6],
  ].filter(Boolean);
}

export function getApartmentScoresAndReviews(identifier?: string): {
  scores: typeof AIRBNB_SCORES_A2;
  reviews: AirbnbReview[];
  apartmentName: string;
} {
  const norm = (identifier || '').toLowerCase();
  if (norm === 'a1' || norm === 'you-and-me' || norm === 'diamant-noir') {
    return {
      scores: AIRBNB_SCORES_A1,
      reviews: REVIEWS_A1,
      apartmentName: 'Y0U AND ME • Jacuzzi • Sauna • Spa privé',
    };
  }
  if (norm === 'a3' || norm === 'le-reve-luxe' || norm === 'suite-celeste') {
    return {
      scores: AIRBNB_SCORES_A3,
      reviews: REVIEWS_A3,
      apartmentName: 'Le Rêve Luxe • Spa Privatif | Jacuzzi & Sauna',
    };
  }
  return {
    scores: AIRBNB_SCORES_A2,
    reviews: REVIEWS_A2,
    apartmentName: 'La Vie est Belle | Spa Privatif',
  };
}

// -------------------------------------------------------------
// ROMANTIC ADDONS & PACKS CATALOG (Server-authoritative pricing)
// -------------------------------------------------------------
export interface RomanticAddonItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  badge: string;
  badgeEn: string;
  summary: string;
  summaryEn: string;
}

export const ROMANTIC_ADDONS_DATA: RomanticAddonItem[] = [
  {
    id: 'pack-confort',
    name: 'Pack Confort',
    nameEn: 'Comfort Pack',
    price: 29,
    badge: 'Horaires Étendus',
    badgeEn: 'Extra Hours',
    summary: 'Arrivée dès 15h00 & départ tardif jusqu’à 13h00 (+4h de spa)',
    summaryEn: 'Early check-in 3PM & late check-out 1PM (+4h spa access)',
  },
  {
    id: 'pack-romance',
    name: 'Pack Romance',
    nameEn: 'Romance Pack',
    price: 29,
    badge: 'Ambiance Féerique',
    badgeEn: 'Fairy Tale Mood',
    summary: 'Pétales de roses sur lit & spa, bougies LED chaleureuses, mot d’amour calligraphié personnalisé (sans alcool, sans chocolat)',
    summaryEn: 'Silky rose petals on bed & spa, warm LED candles, handwritten personalized love letter (alcohol-free, chocolate-free)',
  },
];

// -------------------------------------------------------------
// DYNAMIC DAILY PRICING SCHEDULE (For all apartments)
// Lundi -> Jeudi : 120 €
// Vendredi : 169 €
// Samedi : 190 €
// Dimanche : 110 €
// -------------------------------------------------------------
export const APARTMENT_DAILY_PRICING: Record<number, number> = {
  0: 110, // Dimanche
  1: 120, // Lundi
  2: 120, // Mardi
  3: 120, // Mercredi
  4: 120, // Jeudi
  5: 169, // Vendredi
  6: 190, // Samedi
};

export const PRICING_SCHEDULE_ITEMS = [
  { day: 'Dimanche', dayEn: 'Sunday', price: 110, tag: 'Meilleur Tarif', tagEn: 'Best Value' },
  { day: 'Lundi au Jeudi', dayEn: 'Monday to Thursday', price: 120, tag: 'Semaine Romantique', tagEn: 'Weekday Romance' },
  { day: 'Vendredi', dayEn: 'Friday', price: 169, tag: 'Week-end Spa', tagEn: 'Weekend Spa' },
  { day: 'Samedi', dayEn: 'Saturday', price: 190, tag: 'Nuit d’Exception', tagEn: 'Signature Night' },
];

export function getNightPriceEUR(dateOrDay: Date | string | number): number {
  let dayOfWeek = 0;
  if (typeof dateOrDay === 'number') {
    dayOfWeek = dateOrDay;
  } else if (typeof dateOrDay === 'string') {
    const cleanDate = dateOrDay.split('T')[0];
    const d = new Date(cleanDate + 'T12:00:00');
    dayOfWeek = d.getDay();
  } else {
    dayOfWeek = dateOrDay.getDay();
  }
  return APARTMENT_DAILY_PRICING[dayOfWeek] ?? 120;
}

export interface NightPricingDetail {
  date: string;
  dayOfWeek: number;
  dayNameFr: string;
  dayNameEn: string;
  priceEUR: number;
}

export interface StayPricingBreakdown {
  nightsCount: number;
  breakdown: NightPricingDetail[];
  baseAmountEUR: number;
  averageNightlyEUR: number;
}

export function calculateStayPricing(checkInDate: string, checkOutDate: string): StayPricingBreakdown {
  const cleanIn = (checkInDate || new Date().toISOString().split('T')[0]).split('T')[0];
  const cleanOut = (checkOutDate || cleanIn).split('T')[0];

  const d1 = new Date(cleanIn + 'T12:00:00');
  const d2 = new Date(cleanOut + 'T12:00:00');
  const diffDays = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  const nightsCount = Math.max(1, diffDays);

  const breakdown: NightPricingDetail[] = [];
  let total = 0;
  const current = new Date(d1);

  const frDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const enDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let i = 0; i < nightsCount; i++) {
    const day = current.getDay();
    const price = APARTMENT_DAILY_PRICING[day] ?? 120;
    const dateStr = current.toISOString().split('T')[0];
    breakdown.push({
      date: dateStr,
      dayOfWeek: day,
      dayNameFr: frDays[day],
      dayNameEn: enDays[day],
      priceEUR: price,
    });
    total += price;
    current.setDate(current.getDate() + 1);
  }

  return {
    nightsCount,
    breakdown,
    baseAmountEUR: total,
    averageNightlyEUR: Math.round(total / nightsCount),
  };
}


