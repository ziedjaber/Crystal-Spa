export interface Service {
  id: string;
  title: string;
  category: 'massage' | 'facial' | 'hydrotherapy' | 'body-ritual' | 'couples';
  description: string;
  fullDescription: string;
  durationMinutes: number;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  popular?: boolean;
  benefits: string[];
  includes: string[];
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  avatar: string;
  bio: string;
}

export interface Facility {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  temperature?: string;
  image: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  treatmentName: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'crystal-quartz-massage',
    title: 'Crystal Quartz & Warm Stone Massage',
    category: 'massage',
    description: 'Deep therapeutic bodywork using heated obsidian basalt and clear quartz crystals infused with lavender essential oils.',
    fullDescription: 'Unwind completely with our signature bodywork. Heated basalt stones release muscle tension while polished clear quartz crystals align energetic meridians. Accompanied by cold-pressed organic jojoba and French lavender aromatherapy oils.',
    durationMinutes: 90,
    priceUSD: 240,
    rating: 4.9,
    reviewsCount: 128,
    image: '/images/massage.jpg',
    popular: true,
    benefits: ['Deep muscle tension release', 'Energetic alignment', 'Promotes deep restful sleep'],
    includes: ['90-min Full Body Massage', 'Warm Obsidian Stones', 'Crystal Chakra Balancing', 'Complimentary Herbal Elixir'],
  },
  {
    id: 'rose-quartz-facial',
    title: 'Rose Quartz Illuminating Facial',
    category: 'facial',
    description: 'A radiant facial ritual utilizing chilled rose quartz rollers, hyaluronic acid, and botanical stem cells for luminous skin.',
    fullDescription: 'Designed for cellular renewal and glowing skin tone. Begins with a double botanical cleansing and enzymatic papaya exfoliation, followed by targeted gua sha lymphatic drainage with hand-carved rose quartz stones and collagen-boosting serums.',
    durationMinutes: 75,
    priceUSD: 215,
    rating: 4.95,
    reviewsCount: 94,
    image: '/images/facial.jpg',
    popular: true,
    benefits: ['Boosts microcirculation & glow', 'Reduces puffiness & fine lines', 'Deeply hydrates matrix layers'],
    includes: ['Enzymatic Exfoliation', 'Rose Quartz Gua Sha Ritual', 'Peptide Infusion Mask', 'Scalp & Neck Massage'],
  },
  {
    id: 'thermal-hydro-immersion',
    title: 'Thermal Hydrotherapy & mineral Soak',
    category: 'hydrotherapy',
    description: 'Submerge into a private geothermal mineral pool enriched with magnesium salts, Dead Sea minerals, and ozone micro-bubbles.',
    fullDescription: 'Step into pure weightlessness in our private thermal suites. Sourced from mineral-rich geothermal springs, enriched with Epsom salts and essential eucalyptus vapor for complete neuromuscular decompression.',
    durationMinutes: 60,
    priceUSD: 180,
    rating: 4.88,
    reviewsCount: 76,
    image: '/images/hero.jpg',
    popular: false,
    benefits: ['Detoxifies lymphatic system', 'Soothes joint inflammation', 'Restores magnesium levels'],
    includes: ['60-min Private Hydrotherapy Suite', 'Eucalyptus Steam Inhalation', 'Artisanal Infused Mineral Water'],
  },
  {
    id: 'himalayan-salt-sauna-detox',
    title: 'Himalayan Salt & Cedar Sauna Ritual',
    category: 'body-ritual',
    description: 'Infrared cedar sauna session surrounded by lit Himalayan salt walls, followed by cold plunges and cold press juice.',
    fullDescription: 'A bio-reset body ritual. Infrared heat penetrates deep into joints to release deep toxins while negative ions from glowing salt walls clear respiratory pathways. Concludes with a brisk 50°F cold plunge pool shower.',
    durationMinutes: 60,
    priceUSD: 160,
    rating: 4.92,
    reviewsCount: 65,
    image: '/images/sauna.jpg',
    popular: true,
    benefits: ['Cardiovascular stimulation', 'Cellular detoxification', 'Endorphin surge & immunity boost'],
    includes: ['45-min Infrared Sauna', 'Cryo Cold Plunge Access', 'Organic Detox Cold-Pressed Juice'],
  },
  {
    id: 'couples-sanctuary-escape',
    title: 'Couples Crystal Sanctuary Escape',
    category: 'couples',
    description: 'Private suite side-by-side aromatherapy massage, Champagne hydro-soak, and artisanal dark chocolate tasting.',
    fullDescription: 'Share an unforgettable sensory escape with a companion in our secluded Master Sanctuary Suite. Features dual side-by-side customized massages, private Jacuzzi hydro-tub with rose petals, and vintage Champagne.',
    durationMinutes: 120,
    priceUSD: 490,
    rating: 5.0,
    reviewsCount: 112,
    image: '/images/hero.jpg',
    popular: true,
    benefits: ['Ultimate romantic relaxation', 'Dual tailored massages', 'Exclusive private suite access'],
    includes: ['90-min Side-by-Side Massage', '30-min Private Rose Hydro Bath', 'Sommelier-selected Champagne & Truffles'],
  },
  {
    id: 'deep-tissue-magnesium-bodysculpt',
    title: 'Deep Tissue Magnesium Body Sculpt',
    category: 'massage',
    description: 'Targeted deep muscle tension relief using concentrated marine magnesium gel and firm pressure release techniques.',
    fullDescription: 'Specifically formulated for athletes and high-stress lifestyle clients. Concentrated marine magnesium gel rapidly breaks down lactic acid knots while targeted trigger point techniques relieve chronic stiffness.',
    durationMinutes: 75,
    priceUSD: 210,
    rating: 4.86,
    reviewsCount: 58,
    image: '/images/massage.jpg',
    popular: false,
    benefits: ['Eliminates muscle knots', 'Restores joint flexibility', 'Accelerates recovery'],
    includes: ['Targeted Deep Tissue Massage', 'Marine Magnesium Gel Application', 'Hot Towel Compress'],
  }
];

export const THERAPISTS_DATA: Therapist[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    title: 'Master Holistic Therapist',
    specialty: 'Crystal Energy & Deep Tissue',
    rating: 4.98,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'With over 12 years of experience in holistic bodywork and energetic meridian alignment in Bali and Zurich.',
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    title: 'Senior Hydrotherapy Specialist',
    specialty: 'Neuromuscular Recovery & Thermal Baths',
    rating: 4.95,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Specialized in hydro-massage and thermal wellness contrast therapy for ultimate nervous system resetting.',
  },
  {
    id: 'sophia-laurent',
    name: 'Sophia Laurent',
    title: 'Aesthetician & Skin Ritualist',
    specialty: 'Rose Quartz Gua Sha & Cellular Facials',
    rating: 4.99,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Trained in Paris, Sophia combines organic botanical active ingredients with ancient facial stone massages.',
  },
  {
    id: 'julian-ross',
    name: 'Julian Ross',
    title: 'Wellness & Sound Practitioner',
    specialty: 'Aromatherapy & Himalayan Salt Sauna',
    rating: 4.92,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Focuses on deep relaxation through aromatherapy blends, sound vibration resonance, and heat therapies.',
  },
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'hydrotherapy-pool',
    title: 'Geothermal Crystal Thermal Pool',
    subtitle: 'Mineral Hydro-Immersion',
    description: 'Surrounded by emerald marble and quiet glass walls, our heated thermal pool maintains a serene 98.6°F year-round.',
    temperature: '98.6°F / 37°C',
    image: '/images/hero.jpg',
    tags: ['Thermal Pool', 'Geothermal Minerals', 'Ambient Water Jets'],
  },
  {
    id: 'salt-sauna',
    title: 'Himalayan Salt & Cedar Sauna',
    subtitle: 'Infrared & Bio-Heating',
    description: 'Natural hand-carved Himalayan salt bricks emit soothing warm ambient amber light while detoxifying respiratory systems.',
    temperature: '175°F / 79°C',
    image: '/images/sauna.jpg',
    tags: ['Infrared Heat', 'Salt Ions', 'Aromatic Cedar'],
  },
  {
    id: 'massage-suites',
    title: 'Private Crystal Treatment Suites',
    subtitle: 'Bespoke Sanctuary Rooms',
    description: 'Sound-proof private suites equipped with heated memory-foam treatment tables, ambient crystal lighting, and private showers.',
    image: '/images/massage.jpg',
    tags: ['Private Bathrooms', 'Soundproof', 'Adjustable Lighting'],
  },
  {
    id: 'facial-lounge',
    title: 'Luminous Skincare & Gua Sha Atelier',
    subtitle: 'Cellular Botanical Clinic',
    description: 'Dedicated facial sanctuary featuring chilled quartz crystals, organic botanical serums, and peaceful relaxation recliners.',
    image: '/images/facial.jpg',
    tags: ['Botanical Skincare', 'Rose Quartz', 'Oxygen Infusion'],
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Clara Montrose',
    role: 'Verified Guest',
    rating: 5,
    date: 'September 14, 2026',
    comment: 'The Crystal Quartz & Warm Stone Massage was hands down the best spa experience of my life. The ambience, emerald lighting, and attention to detail are unrivaled.',
    treatmentName: 'Crystal Quartz & Warm Stone Massage',
  },
  {
    id: 'rev-2',
    author: 'David & Sarah K.',
    role: 'Couples Sanctuary Guest',
    rating: 5,
    date: 'September 10, 2026',
    comment: 'We booked the Couples Sanctuary Escape for our 5th anniversary. Champagne in the private rose hydro-tub followed by dual massages left us walking on clouds!',
    treatmentName: 'Couples Crystal Sanctuary Escape',
  },
  {
    id: 'rev-3',
    author: 'Genevieve Vance',
    role: 'Frequent Member',
    rating: 5,
    date: 'August 28, 2026',
    comment: 'The Rose Quartz Facial gave my skin an unbelievable glow for days. Sophia is a true artist with Gua Sha techniques!',
    treatmentName: 'Rose Quartz Illuminating Facial',
  },
  {
    id: 'rev-4',
    author: 'Alexander Sterling',
    role: 'Verified Guest',
    rating: 5,
    date: 'August 19, 2026',
    comment: 'The Himalayan Salt Sauna combined with cold plunges completely eliminated my lower back tension after a week of travel.',
    treatmentName: 'Himalayan Salt & Cedar Sauna Ritual',
  }
];
