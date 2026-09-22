'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Play, ShieldCheck, Droplets, Star } from 'lucide-react';

interface HeroProps {
  onReserveNow?: () => void;
}

export default function Hero({ onReserveNow }: HeroProps) {
  const { language, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle luxury gold stardust particles
    const particleCount = Math.min(35, Math.floor(width / 35));
    const particles: Array<{
      x: number;
      y: number;
      r: number;
      alpha: number;
      speedY: number;
      speedX: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 202, 80, ${Math.max(0.1, Math.min(0.75, p.alpha))})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[940px] flex items-center justify-center overflow-hidden -mt-20">
      
      {/* Hero Background Image & Atmospheric Scrim */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/a2/Jacuzzi.png')" }}
      />
      
      {/* Layered luxury scrims */}
      <div className="absolute inset-0 scrim-4k-overlay pointer-events-none" />
      <div className="absolute inset-0 scrim-radial-gold pointer-events-none" />

      {/* Interactive Golden Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
      />

      {/* Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-12">
        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#e5e2e1] font-extrabold tracking-tight leading-[1.05] mb-6 drop-shadow-2xl">
          {t('hero.title.part1')} <br className="hidden sm:inline" />
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-[#f2ca50] via-[#ffe894] to-[#d4af37] bg-clip-text text-transparent">
            {t('hero.title.part2')}
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-[#c9c6bf] max-w-2xl font-light mb-8 leading-relaxed">
          {t('hero.desc')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a
            href="#suites-collection"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#d4af37] text-[#3c2f00] font-bold text-xs tracking-widest uppercase luxury-shimmer-btn cursor-pointer"
          >
            <span>{t('hero.cta.book')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#packs-romantiques"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2a2a2a]/60 backdrop-blur-md text-[#e5e2e1] font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#353534] hover:text-[#f2ca50] hover:border hover:border-[#f2ca50]/40"
          >
            <Play className="w-4 h-4 text-[#f2ca50]" />
            <span>{language === 'fr' ? 'Découvrir nos Packs' : 'Explore Romantic Packs'}</span>
          </a>
        </div>

        {/* Micro Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[#d0c5af] text-xs font-medium">
          <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
            <span>{t('hero.trust.privacy')}</span>
          </div>
          <div className="hidden sm:inline opacity-30">•</div>
          <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
            <Droplets className="w-4 h-4 text-[#f2ca50]" />
            <span>{t('hero.trust.water')}</span>
          </div>
          <div className="hidden sm:inline opacity-30">•</div>
          <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
            <Star className="w-4 h-4 text-[#f2ca50] fill-current" />
            <span>{t('hero.trust.rating')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
