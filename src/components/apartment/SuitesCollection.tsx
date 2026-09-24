'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star, CheckCircle } from 'lucide-react';

export interface SuiteItem {
  id: string;
  title: string;
  titleEn: string;
  location: string;
  price: number;
  area: string;
  rating: string;
  reviewsCount: string;
  description: string;
  descriptionEn: string;
  image: string;
  badge?: string;
  badgeEn?: string;
  tags: string[];
  tagsEn: string[];
  featured?: boolean;
}

export const SUITES_DATA: SuiteItem[] = [
  {
    id: 'la-vie-est-belle',
    title: 'La Vie est Belle | Spa Privatif',
    titleEn: 'La Vie est Belle | Private Spa',
    location: 'Le Petit-Quevilly, Rouen, Normandie',
    price: 280,
    area: '75 m²',
    rating: '4.97',
    reviewsCount: '37 avis',
    description:
      'Love room romantique avec spa privatif accessible 24h/24. Deux grands écrans plats avec Netflix/Disney+, douche moderne avec miroir LED, lit queen size, cuisine équipée et stationnement gratuit.',
    descriptionEn:
      'Romantic love room with 24/7 private hydro spa. Two smart TVs with Netflix/Disney+, modern LED mirror shower, queen size bed, equipped kitchen, and free on-premise parking.',
    image: '/a2/Jacuzzi.png',
    badge: 'Coup de Cœur Airbnb Top 10%',
    badgeEn: 'Airbnb Guest Favorite Top 10%',
    tags: ['Spa Privatif 24h/24', '2 TV Netflix & Disney+', 'Lit Queen Size', 'Parking Gratuit'],
    tagsEn: ['24/7 Private Spa', '2 Smart TVs Netflix', 'Queen Size Bed', 'Free Parking'],
    featured: true,
  },
  {
    id: 'diamant-noir',
    title: 'Suite Diamant Noir & Spa Privatif',
    titleEn: 'Black Diamond Suite & Private Spa',
    location: 'Avenue Montaigne, Paris 8ème',
    price: 490,
    area: '85 m²',
    rating: '4.98',
    reviewsCount: '124 avis',
    description:
      'Le joyau parisien. Bassin bouillonnant en pierre de lave taillée, sauna privatif en cèdre rouge du Canada, lit king-size suspendu et cheminée crépitante pour une romance absolue.',
    descriptionEn:
      'The Parisian jewel. Carved volcanic stone bubbling pool, Canadian cedar private sauna, suspended king bed, and modern crackling fireplace.',
    image: '/a1/Jacuzzi.png',
    badge: 'Suite Signature Paris',
    badgeEn: 'Paris Signature Suite',
    tags: ['Jacuzzi Privatif', 'Sauna Finlandais Cèdre', 'Champagne Chanoine', 'Cheminée Ambiance'],
    tagsEn: ['Private Jacuzzi', 'Cedar Finnish Sauna', 'Chanoine Champagne', 'Mood Fireplace'],
    featured: true,
  },
  {
    id: 'marbre-imperial',
    title: 'Suite Marbre Impérial',
    titleEn: 'Imperial Marble Suite',
    location: 'Champs-Élysées, Paris 8ème',
    price: 450,
    area: '78 m²',
    rating: '4.96',
    reviewsCount: '89 avis',
    description:
      'Alliance minérale de marbre noir Marquina veiné d’or, mur d’eau cascade relaxant et grand bain hydromassant chauffé en continu à 37.5°C.',
    descriptionEn:
      'Mineral harmony of gold-veined Marquina black marble, relaxing water wall cascade, and hydromassage bath continuously heated to 37.5°C.',
    image: '/a1/Salle de bain.png',
    tags: ['Cascade Zen', 'Bain 37.5°C', 'Chromothérapie'],
    tagsEn: ['Zen Cascade', '37.5°C Bath', 'Chromotherapy'],
  },
  {
    id: 'celeste',
    title: 'Suite Céleste & Étoiles',
    titleEn: 'Celestial & Starry Suite',
    location: 'Saint-Germain, Paris 6ème',
    price: 520,
    area: '70 m²',
    rating: '5.0',
    reviewsCount: '112 avis',
    description:
      'Ciel nocturne scintillant de 1 200 fibres optiques au-dessus de la literie, sauna infrarouge vitré toute hauteur et baignoire d’eau bouillonnante ovale.',
    descriptionEn:
      'Sparkling night sky of 1,200 optical fibers above the bed, full-height glass infrared sauna, and oval bubbling soaking tub.',
    image: '/a1/Chambre.png',
    badge: 'Coup de Cœur',
    badgeEn: 'Traveler Choice',
    tags: ['Ciel 1200 étoiles', 'Sauna Infrarouge', 'Baignoire Îlot'],
    tagsEn: ['1200 Fiber Stars', 'Infrared Sauna', 'Freestanding Tub'],
  },
  {
    id: 'royale',
    title: 'Master Crystal Royale',
    titleEn: 'Master Crystal Royale Duplex',
    location: 'Triangle d’Or, Paris 8ème',
    price: 650,
    area: 'Duplex 110 m²',
    rating: '4.99',
    reviewsCount: '78 avis',
    description:
      'Espace duplex grandiose. Hammam privatif aux senteurs d’eucalyptus, jacuzzi 4 places à double couchette ergonomique et salon cheminée d’éthanol.',
    descriptionEn:
      'Grandiose duplex sanctuary. Private eucalyptus-infused steam room, 4-person jacuzzi with dual ergonomic loungers, and ethanol fireplace lounge.',
    image: '/a1/salon.png',
    tags: ['Hammam Eucalyptus', 'Bain 4 places', 'Terrasse Privée'],
    tagsEn: ['Eucalyptus Steam', '4-Person Bath', 'Private Terrace'],
  },
];

interface SuitesCollectionProps {
  selectedSuiteId: string;
  onSelectSuite: (suite: SuiteItem) => void;
  onOpenBooking: () => void;
}

export default function SuitesCollection({
  selectedSuiteId,
  onSelectSuite,
  onOpenBooking,
}: SuitesCollectionProps) {
  const { language, t } = useLanguage();

  return (
    <section className="w-full px-3.5 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20" id="suites-collection">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2ca50]">
              {t('suites.badge')}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#e5e2e1]">
              {t('suites.title')}
            </h2>
            <p className="text-sm md:text-base text-[#d0c5af] font-light">
              {t('suites.desc')}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#c9c6bf]">
              5 {t('suites.available')}
            </span>
            <div className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping" />
          </div>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Featured Suite 1: La Vie est Belle (Rouen) */}
          <article
            onClick={() => onSelectSuite(SUITES_DATA[0])}
            className={`lg:col-span-2 group rounded-xl bg-[#1c1b1b] overflow-hidden flex flex-col luxury-card suite-card-selectable cursor-pointer transition-all duration-300 ${
              selectedSuiteId === SUITES_DATA[0].id ? 'is-active border-[#f2ca50]' : 'border-white/5'
            }`}
          >
            <div className="relative aspect-[16/10] sm:aspect-[21/10] overflow-hidden zoom-container">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${SUITES_DATA[0].image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-black/40 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#f2ca50] text-xs font-bold uppercase tracking-wider text-[#3c2f00] shadow-md">
                  {language === 'fr' ? SUITES_DATA[0].badge : SUITES_DATA[0].badgeEn}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#2a2a2a]/80 backdrop-blur-md text-white text-xs tracking-wider border border-white/10 font-semibold">
                  {SUITES_DATA[0].area}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#2a2a2a]/80 backdrop-blur-md text-[#d0c5af] text-xs tracking-wider border border-white/10 hidden sm:inline">
                  {SUITES_DATA[0].location}
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-[#2a2a2a]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#f2ca50] border border-white/10">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-white font-bold">{SUITES_DATA[0].rating}</span>
                <span className="text-[#d0c5af] font-light">({SUITES_DATA[0].reviewsCount})</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors font-medium">
                    {language === 'fr' ? SUITES_DATA[0].title : SUITES_DATA[0].titleEn}
                  </h3>
                  <div className="text-left sm:text-right">
                    <span className="font-serif text-2xl text-[#f2ca50] font-bold">
                      {SUITES_DATA[0].price} €
                    </span>
                    <span className="text-xs text-[#d0c5af] font-light"> {t('suites.per_night')}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#d0c5af] font-light line-clamp-2 mb-5 leading-relaxed">
                  {language === 'fr' ? SUITES_DATA[0].description : SUITES_DATA[0].descriptionEn}
                </p>

                {/* Amenities Chips */}
                <div className="flex flex-wrap gap-2">
                  {(language === 'fr' ? SUITES_DATA[0].tags : SUITES_DATA[0].tagsEn).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#201f1f] text-[#c9c6bf] text-xs flex items-center gap-1.5 border border-white/5 group-hover:border-[#f2ca50]/20 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                <span className="text-xs text-[#c9c6bf] font-light">
                  {language === 'fr'
                    ? 'Arrivée autonome dès 17h00 • Stationnement gratuit sur place'
                    : 'Keyless self check-in from 5:00 PM • Free on-site parking'}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSuite(SUITES_DATA[0]);
                    }}
                    className="px-5 py-2.5 rounded-lg bg-[#2a2a2a] hover:bg-[#353534] text-[#e5e2e1] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {language === 'fr' ? 'Voir en Détail' : 'View Details'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking();
                    }}
                    className="px-5 py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-[#3c2f00] font-bold text-xs uppercase tracking-wider luxury-shimmer-btn cursor-pointer"
                  >
                    {t('suites.reserve')}
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Suites 2, 3, 4, 5 */}
          {SUITES_DATA.slice(1).map((suite) => {
            const isSelected = selectedSuiteId === suite.id;
            return (
              <article
                key={suite.id}
                onClick={() => onSelectSuite(suite)}
                className={`group rounded-xl bg-[#1c1b1b] overflow-hidden flex flex-col luxury-card suite-card-selectable cursor-pointer transition-all duration-300 ${
                  isSelected ? 'is-active border-[#f2ca50]' : 'border-white/5'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden zoom-container">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${suite.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-black/30 pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#2a2a2a]/80 backdrop-blur-md text-white text-[11px] border border-white/10 font-semibold">
                      {suite.area}
                    </span>
                    {suite.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] border border-[#f2ca50]/30 font-bold uppercase">
                        {language === 'fr' ? suite.badge : suite.badgeEn}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-[#2a2a2a]/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] text-[#f2ca50] border border-white/10">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-white font-bold">{suite.rating}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h3 className="font-serif text-lg text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors line-clamp-1 font-medium">
                        {language === 'fr' ? suite.title : suite.titleEn}
                      </h3>
                      <span className="font-serif text-xl text-[#f2ca50] font-bold shrink-0">
                        {suite.price} €
                      </span>
                    </div>

                    <p className="text-xs text-[#d0c5af] font-light line-clamp-2 mb-3 leading-relaxed">
                      {language === 'fr' ? suite.description : suite.descriptionEn}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(language === 'fr' ? suite.tags : suite.tagsEn).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-[#201f1f] text-[#c9c6bf] text-[10px] border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSuite(suite);
                    }}
                    className="w-full text-center py-2.5 rounded-lg bg-[#2a2a2a] hover:bg-[#d4af37] text-white hover:text-[#3c2f00] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {t('suites.select')}
                  </button>
                </div>
              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}
