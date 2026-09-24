'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Play, ShieldCheck, Droplets, Star, Sparkles } from 'lucide-react';
import AirbnbLogo from '@/components/ui/AirbnbLogo';
import { motion } from 'framer-motion';

interface HeroProps {
  onReserveNow?: () => void;
}

export default function Hero({ onReserveNow }: HeroProps) {
  const { language, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  // Bulletproof video loop and playback manager for both desktop & mobile video elements
  useEffect(() => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return;

    const cleanupFns: Array<() => void> = [];

    videos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = true;

      const playVideo = () => {
        if (video.paused) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {});
          }
        }
      };

      const handleEnded = () => {
        video.currentTime = 0;
        playVideo();
      };

      const handleTimeUpdate = () => {
        if (video.duration && video.currentTime >= video.duration - 0.08) {
          video.currentTime = 0;
          playVideo();
        }
      };

      const handlePause = () => {
        if (document.visibilityState === 'visible') {
          playVideo();
        }
      };

      const handleVisibility = () => {
        if (document.visibilityState === 'visible') {
          playVideo();
        }
      };

      video.addEventListener('ended', handleEnded);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('pause', handlePause);
      document.addEventListener('visibilitychange', handleVisibility);

      playVideo();

      cleanupFns.push(() => {
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('pause', handlePause);
        document.removeEventListener('visibilitychange', handleVisibility);
      });
    });

    const watchdog = setInterval(() => {
      if (document.visibilityState === 'visible') {
        videos.forEach((video) => {
          if (video.paused && video.offsetParent !== null) {
            video.currentTime = video.currentTime >= (video.duration || 9) - 0.1 ? 0 : video.currentTime;
            video.play().catch(() => {});
          }
        });
      }
    }, 600);

    return () => {
      cleanupFns.forEach((fn) => fn());
      clearInterval(watchdog);
    };
  }, []);

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
      
      {/* Hero Background Video & Atmospheric Scrim */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Desktop Video (Screen >= 768px) */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero/preview_video.jpg"
          className="hidden md:block w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-90"
          aria-hidden="true"
        >
          <source src="/hero/hero-bg.mp4" type="video/mp4" />
          <source src="/hero/hero-bg.webm" type="video/webm" />
        </video>

        {/* Mobile Video (Screen < 768px vertical portrait optimized) */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero/preview_mobile.jpg"
          className="block md:hidden w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-90"
          aria-hidden="true"
        >
          <source src="/hero/hero-mobile.mp4" type="video/mp4" />
          <source src="/hero/hero-mobile.webm" type="video/webm" />
          <source src="/hero/video mobile.mp4" type="video/mp4" />
        </video>

        {/* Fallback image if video fails to load */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10 pointer-events-none"
          style={{ backgroundImage: "url('/hero/preview_video.jpg')" }}
        />
      </div>
      
      {/* Layered luxury scrims */}
      <div className="absolute inset-0 scrim-4k-overlay pointer-events-none" />
      <div className="absolute inset-0 scrim-radial-gold pointer-events-none" />

      {/* Interactive Golden Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
      />

      {/* Central Content with Framer Motion Entrance */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-12">
        {/* Title & Subtitle with French Luxury Haute-Couture Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >
          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#faf8f5] font-medium tracking-tight leading-[1.08] drop-shadow-2xl">
            {t('hero.title.part1')}
          </h1>

          <p className="font-cormorant italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f2ca50] font-normal tracking-wide mt-2 sm:mt-3 leading-snug drop-shadow-lg max-w-4xl">
            {t('hero.title.part2')}
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[#c9c6bf] max-w-2xl font-light mb-8 leading-relaxed"
        >
          {t('hero.desc')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <a
            href="#suites-collection"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#d4af37] text-[#3c2f00] font-bold text-xs tracking-widest uppercase luxury-shimmer-btn cursor-pointer shadow-xl shadow-[#d4af37]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>{t('hero.cta.book')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#packs-romantiques"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2a2a2a]/70 backdrop-blur-md text-[#e5e2e1] font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#353534] hover:text-[#f2ca50] hover:border hover:border-[#f2ca50]/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 text-[#f2ca50]" />
            <span>{language === 'fr' ? 'Découvrir nos Packs' : 'Explore Romantic Packs'}</span>
          </a>
        </motion.div>

        {/* Micro Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[#d0c5af] text-xs font-medium"
        >
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
          <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 bg-[#1c1b1b]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            <AirbnbLogo className="w-4 h-4 text-[#FF385C]" />
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#f2ca50] fill-current" />
              <span>{t('hero.trust.rating')}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
