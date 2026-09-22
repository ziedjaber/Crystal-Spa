'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Sparkles, Quote, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '@/data/services';

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [treatmentName, setTreatmentName] = useState('Crystal Quartz & Warm Stone Massage');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hpFaxNumber, setHpFaxNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (e) {
      console.error('Error loading reviews:', e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim(),
          treatmentName: treatmentName.trim(),
          rating,
          comment: comment.trim(),
          hp_fax_number: hpFaxNumber,
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (res.status === 429) {
        setErrorMsg('Too many submissions. Please wait a few minutes before submitting another review.');
        return;
      }

      if (data.success) {
        setSuccessMsg('Thank you for sharing your experience!');
        fetchReviews();
        setTimeout(() => {
          setModalOpen(false);
          setSuccessMsg('');
          setAuthor('');
          setComment('');
        }, 1500);
      } else {
        setErrorMsg(data.error || 'Failed to submit review.');
      }
    } catch (e) {
      setIsSubmitting(false);
      setErrorMsg('Secure connection error. Please try again.');
    }
  };


  return (
    <section className="py-20 bg-[#06090e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 border border-teal-800/60 text-xs font-semibold uppercase tracking-widest text-teal-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" /> GUEST TESTIMONIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
              Words of <span className="gold-gradient-text">Serenity</span>
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            SHARE YOUR EXPERIENCE
          </button>
        </div>

        {/* Swiper Review Slider */}
        {reviews.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="pb-14"
          >
            {reviews.map((rev) => (
              <SwiperSlide key={rev.id}>
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border-teal-500/20 flex flex-col justify-between h-full space-y-4">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                        ))}
                      </div>
                      <Quote className="w-6 h-6 text-teal-800" />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 italic font-light leading-relaxed mb-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-teal-900/40 flex justify-between items-end">
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{rev.author}</h4>
                      <span className="text-[11px] text-teal-300 block">{rev.treatmentName}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{rev.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel border-teal-500/30 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="font-serif text-xl font-bold text-slate-100">Share Your Experience</h3>
                <p className="text-xs text-slate-400">Your review helps us maintain our sanctuary standards.</p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/80 text-red-300 text-xs border border-red-800">
                  {errorMsg}
                </div>
              )}


              {successMsg ? (
                <div className="p-4 rounded-xl bg-teal-950 text-emerald-300 text-xs text-center border border-teal-700">
                  {successMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  {/* Invisible Honeypot Field */}
                  <input
                    type="text"
                    name="hp_fax_number"
                    value={hpFaxNumber}
                    onChange={(e) => setHpFaxNumber(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-slate-950 border border-teal-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Treatment Name</label>
                    <input
                      type="text"
                      value={treatmentName}
                      onChange={(e) => setTreatmentName(e.target.value)}
                      placeholder="e.g. Rose Quartz Facial"
                      className="w-full bg-slate-950 border border-teal-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Rating (1 to 5 Stars)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-300 text-amber-300' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Your Testimonial</label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe your spa session..."
                      className="w-full bg-slate-950 border border-teal-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 transition-all cursor-pointer"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
