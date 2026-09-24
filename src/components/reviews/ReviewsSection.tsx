'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getApartmentScoresAndReviews, AirbnbReview } from '@/data/apartment';
import { Star, ShieldCheck } from 'lucide-react';
import AirbnbLogo from '@/components/ui/AirbnbLogo';

interface ReviewsSectionProps {
  apartmentId?: string;
}

export default function ReviewsSection({ apartmentId }: ReviewsSectionProps) {
  const { language, t } = useLanguage();
  const [selectedReviewTag, setSelectedReviewTag] = useState<string | null>(null);

  const { scores, reviews: rawReviews, apartmentName } = getApartmentScoresAndReviews(apartmentId);

  const bgImage = (() => {
    const norm = (apartmentId || '').toLowerCase();
    if (norm === 'a1' || norm === 'you-and-me' || norm === 'diamant-noir') return '/a1/Jacuzzi.png';
    if (norm === 'a3' || norm === 'le-reve-luxe' || norm === 'suite-celeste') return '/a3/Jacuzzi.png';
    return '/a2/Jacuzzi.png';
  })();

  const reviews: AirbnbReview[] = selectedReviewTag
    ? rawReviews.filter(
        (r) =>
          r.comment.toLowerCase().includes(selectedReviewTag.toLowerCase()) ||
          r.commentEn.toLowerCase().includes(selectedReviewTag.toLowerCase())
      )
    : rawReviews;

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-24 py-24 overflow-hidden" id="avis-section">
      {/* 4K Background Image with Scrim Overlay */}
      <div
        className="absolute inset-0 bg-4k-hero"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 scrim-4k-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Main Airbnb Header Card */}
        <div className="rounded-2xl bg-[#1c1b1b]/85 backdrop-blur-xl p-6 sm:p-10 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <AirbnbLogo className="w-3.5 h-3.5 text-[#3c2f00]" />
                <span>{language === 'fr' ? 'Coup de Cœur Voyageurs' : 'Guest Favorite'}</span>
              </span>
              <span className="text-xs text-[#d0c5af] inline-flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                <AirbnbLogo className="w-3.5 h-3.5 text-[#FF385C]" />
                <span>{language === 'fr' ? 'Top 10% des logements sur Airbnb' : 'Top 10% of homes on Airbnb'}</span>
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e1] drop-shadow-md">
              {t('reviews.title')}
            </h2>
            <p className="text-sm text-[#d0c5af] font-light max-w-xl">
              {language === 'fr'
                ? `Une note d’excellence de ${scores.overall}★ fondée sur ${scores.reviewsTotal} commentaires certifiés de voyageurs ayant séjourné à ${apartmentName}.`
                : `An excellence score of ${scores.overall}★ backed by ${scores.reviewsTotal} verified traveler reviews who stayed at ${apartmentName}.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[#201f1f]/90 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FF385C]/15 border border-[#FF385C]/30 flex items-center justify-center shrink-0 shadow-inner">
                <AirbnbLogo className="w-6 h-6 text-[#FF385C]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-[#f2ca50]">
                    {scores.overall.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#d0c5af] font-light">/ 5</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#f2ca50]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#d0c5af] font-light">
                    ({scores.reviewsTotal} {language === 'fr' ? 'avis vérifiés' : 'verified reviews'})
                  </span>
                </div>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>

            <div className="flex flex-col text-xs text-[#d0c5af]">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <AirbnbLogo className="w-3.5 h-3.5 text-[#FF385C]" />
                {language === 'fr' ? '100% Avis Airbnb Vérifiés' : '100% Verified Airbnb Reviews'}
              </span>
              <span className="font-light mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                {language === 'fr' ? 'Statut Superhôte confirmé' : 'Confirmed Superhost status'}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Airbnb Category Scores Barometer */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {scores.categories.map((cat) => (
            <div
              key={cat.name}
              className="p-4 rounded-xl bg-[#1c1b1b]/85 backdrop-blur-md border border-white/10 flex flex-col gap-1.5 shadow-lg"
            >
              <span className="text-xs text-[#d0c5af] font-light">
                {language === 'fr' ? cat.name : cat.nameEn}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-xl font-bold text-[#e5e2e1]">
                  {cat.score.toFixed(1)}
                </span>
                <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
              </div>
              {/* Mini progress bar */}
              <div className="w-full bg-[#2a2a2a] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#f2ca50] h-full rounded-full"
                  style={{ width: `${(cat.score / 5.0) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#99907c] uppercase tracking-wider font-semibold mr-2">
            {language === 'fr' ? 'Mots fréquents :' : 'Frequent mentions:'}
          </span>
          <button
            onClick={() => setSelectedReviewTag(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
              selectedReviewTag === null
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-md'
                : 'bg-[#1c1b1b]/80 backdrop-blur-md text-[#c9c6bf] hover:text-[#e5e2e1] border border-white/10'
            }`}
          >
            {language === 'fr' ? `Tous les avis (${rawReviews.length})` : `All reviews (${rawReviews.length})`}
          </button>
          {scores.popularTags.slice(0, 6).map((tag) => (
            <button
              key={tag.label}
              onClick={() =>
                setSelectedReviewTag(selectedReviewTag === tag.label ? null : tag.label)
              }
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                selectedReviewTag === tag.label
                  ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-md'
                  : 'bg-[#1c1b1b]/80 backdrop-blur-md text-[#c9c6bf] hover:text-[#e5e2e1] border border-white/10'
              }`}
            >
              {tag.label} <span className="opacity-60">({tag.count})</span>
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#1c1b1b]/85 backdrop-blur-xl flex flex-col justify-between gap-5 luxury-card border border-white/10 shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#f2ca50]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF385C]/15 text-[#FF385C] text-[10px] font-bold border border-[#FF385C]/25">
                      <AirbnbLogo className="w-3 h-3 text-[#FF385C]" />
                      Airbnb
                    </span>
                  </div>
                  <span className="text-[11px] text-[#99907c] font-light">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#e5e2e1] italic font-light leading-relaxed">
                  « {language === 'fr' ? rev.comment : rev.commentEn} »
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#2a2a2a]/90 border border-[#f2ca50]/30 flex items-center justify-center font-bold text-[#f2ca50] text-xs shadow-md">
                  {rev.author.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-[#d0c5af] font-light flex items-center gap-1">
                    <AirbnbLogo className="w-3 h-3 text-[#FF385C]" />
                    <span>{rev.yearsOnAirbnb}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
