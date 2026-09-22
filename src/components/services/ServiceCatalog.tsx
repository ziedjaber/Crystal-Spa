'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Filter, X, Clock, CheckCircle2, Calendar, ShieldCheck, Star } from 'lucide-react';
import { Service, SERVICES_DATA } from '@/data/services';
import ServiceCard from './ServiceCard';

interface ServiceCatalogProps {
  onBookService: (service: Service) => void;
  limit?: number;
}

export default function ServiceCatalog({ onBookService, limit }: ServiceCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  const categories = [
    { id: 'all', label: 'All Rituals' },
    { id: 'massage', label: 'Crystal Massage' },
    { id: 'facial', label: 'Quartz Facials' },
    { id: 'hydrotherapy', label: 'Thermal Hydro' },
    { id: 'body-ritual', label: 'Salt Sauna & Detox' },
    { id: 'couples', label: 'Couples Sanctuary' },
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedServices = limit ? filteredServices.slice(0, limit) : filteredServices;

  return (
    <section className="py-20 bg-[#06090e] relative overflow-hidden" id="treatments">
      {/* Glow background circles */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 border border-teal-800/60 text-xs font-semibold uppercase tracking-widest text-teal-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-accent" /> BESPOKE TREATMENT MENU
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
            Curated Therapies & <span className="gold-gradient-text">Crystal Rituals</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Every session is personalized by our master practitioners using pure cold-pressed organic botanicals, high-frequency quartz crystals, and heated basalt stones.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-3 rounded-2xl border-teal-500/20">
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-teal-900/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rituals or ingredients..."
                className="w-full bg-slate-950/80 border border-teal-900/60 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {displayedServices.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBookNow={onBookService}
                onViewDetails={(s) => setSelectedServiceDetail(s)}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl border-dashed border-teal-900/50">
            <Filter className="w-10 h-10 text-teal-400 mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-slate-200">No Rituals Match Your Search</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your category filter or search keywords to discover our available treatments.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel border-teal-500/30 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-teal-800/60 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 space-y-6">
                <div className="relative h-64 w-full rounded-2xl overflow-hidden">
                  <img
                    src={selectedServiceDetail.image}
                    alt={selectedServiceDetail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      ${selectedServiceDetail.priceUSD} USD
                    </span>
                    <span className="bg-teal-950/90 text-teal-300 border border-teal-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {selectedServiceDetail.durationMinutes} Minutes
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-100 mb-2">
                    {selectedServiceDetail.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-4">
                    <Star className="w-4 h-4 fill-amber-300" />
                    <span>{selectedServiceDetail.rating} Rating</span>
                    <span className="text-slate-400">({selectedServiceDetail.reviewsCount} verified guest reviews)</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {selectedServiceDetail.fullDescription}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">Therapeutic Benefits</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedServiceDetail.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-teal-950/40 p-2.5 rounded-xl border border-teal-900/40">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Includes */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">Ritual Package Includes</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedServiceDetail.includes.map((inc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-teal-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-teal-400" />
                      <span>Complimentary Thermal Hydro Bath access included</span>
                    </div>
                    <button
                      onClick={() => {
                        const s = selectedServiceDetail;
                        setSelectedServiceDetail(null);
                        onBookService(s);
                      }}
                      className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      RESERVE NOW
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
