'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onExplore?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onExplore }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLightMode, setIsLightMode] = useState(true); // Default mode terang
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedMultiplierRef = useRef(1.0);

  const setCanvasRef = React.useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    setCanvasElement(node);
  }, []);

  // Kunci scroll body saat splash screen aktif & deteksi tema aktif
  useEffect(() => {
    setIsMounted(true);

    // Deteksi apakah sedang dalam mode terang atau gelap
    const checkIsLight = () => {
      const isLight =
        document.documentElement.classList.contains('light') ||
        !document.documentElement.classList.contains('dark');
      setIsLightMode(isLight);
    };

    checkIsLight();

    // Pastikan splash screen selalu muncul saat awal masuk web.
    // Bersihkan residu localStorage lama agar tidak memblokir kemunculan splash.
    try {
      localStorage.removeItem('has_seen_splash');

      const urlParams = new URLSearchParams(window.location.search);
      const forceSplash = urlParams.get('splash') === 'true';

      const skipSplash =
        !forceSplash && sessionStorage.getItem('skip_splash') === 'true';

      if (skipSplash) {
        sessionStorage.removeItem('skip_splash');
        setIsVisible(false);
      } else {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
      }
    } catch {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }

    // Listener custom event untuk memicu kemunculan kembali splash screen (misal klik brand DZIKRY di navbar)
    const handleTriggerSplash = () => {
      checkIsLight();
      setIsExiting(false);
      speedMultiplierRef.current = 1.0;
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    };

    window.addEventListener('trigger-splash', handleTriggerSplash);

    // Observer jika ada pergantian kelas di <html>
    const observer = new MutationObserver(checkIsLight);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      document.body.style.overflow = 'unset';
      observer.disconnect();
      window.removeEventListener('trigger-splash', handleTriggerSplash);
    };
  }, []);

  // Animasi Concentric Star Trails di HTML5 Canvas (Mendukung Mode Terang & Gelap)
  useEffect(() => {
    if (!isVisible || !canvasElement) return;
    const canvas = canvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isDestroyed = false;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let lightGlow: CanvasGradient;
    let darkGlow: CanvasGradient;

    const buildGradients = (w: number, h: number) => {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const mr = Math.hypot(w, h) * 0.78;

      lightGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, mr);
      lightGlow.addColorStop(0, 'rgba(224, 242, 254, 0.75)');
      lightGlow.addColorStop(0.35, 'rgba(240, 249, 255, 0.45)');
      lightGlow.addColorStop(0.7, 'rgba(248, 250, 252, 0.25)');
      lightGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

      darkGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, mr);
      darkGlow.addColorStop(0, 'rgba(12, 24, 48, 0.85)');
      darkGlow.addColorStop(0.35, 'rgba(8, 14, 28, 0.6)');
      darkGlow.addColorStop(0.7, 'rgba(5, 8, 17, 0.3)');
      darkGlow.addColorStop(1, 'rgba(3, 5, 9, 0)');
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      buildGradients(width, height);
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    buildGradients(width, height);

    window.addEventListener('resize', handleResize);

    // ==========================================
    // GENERATE CONCENTRIC STAR TRAILS (ORB MOTIF)
    // ==========================================
    const maxRadius = Math.hypot(width, height) * 0.78;
    const TRAIL_COUNT = width < 768 ? 75 : 340;

    interface StarTrail {
      r: number;
      angle: number;
      arcLength: number;
      width: number;
      darkColor: string;
      lightColor: string;
      alpha: number;
      hasHeadStar: boolean;
    }

    // Palet Mode Gelap: Bintang kosmis malam
    const TRAIL_COLORS_DARK = [
      '#FFFFFF', // Putih Murni
      '#EDE7D8', // Parchment Lembut
      '#7DD3FC', // Biru Es (Cyan)
      '#93C5FD', // Biru Langit Malam
      '#BAE6FD', // Biru Es Terang
      '#E6CA7E', // Emas Kosmik Pucat
      '#C7D2FE', // Lavender Bintang
    ];

    // Palet Mode Terang: Celestial Azure Blue bertema manga Chi
    const TRAIL_COLORS_LIGHT = [
      '#0284C7', // Chi Manga Celestial Azure
      '#0EA5E9', // Sky Cyan Blue
      '#38BDF8', // Electric Cyan
      '#0369A1', // Deep Azure
      '#2563EB', // Royal Azure
      '#67E8F9', // Ethereal Cyan
      '#F59E0B', // Sun Gold Accent
      '#0F172A', // Slate Navy Ink
    ];

    const trails: StarTrail[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const r = Math.pow(Math.random(), 1.32) * maxRadius + 25;
      const angle = Math.random() * Math.PI * 2;
      const arcLength = Math.random() * 0.3 + 0.08;
      const isBrightMajor = Math.random() < 0.14;
      const trailWidth = isBrightMajor
        ? Math.random() * 1.0 + 1.4
        : Math.random() * 0.6 + 0.6;

      trails.push({
        r,
        angle,
        arcLength,
        width: trailWidth,
        darkColor: TRAIL_COLORS_DARK[Math.floor(Math.random() * TRAIL_COLORS_DARK.length)],
        lightColor: TRAIL_COLORS_LIGHT[Math.floor(Math.random() * TRAIL_COLORS_LIGHT.length)],
        alpha: Math.random() * 0.65 + 0.3,
        hasHeadStar: isBrightMajor || Math.random() < 0.4,
      });
    }

    let rotationAngle = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      if (isDestroyed) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Kecepatan putaran bintang konsentris mengelilingi titik pusat searah jarum jam (Clockwise)
      // Saat tombol dipencet, akselerasi warp melesat kencang searah jarum jam
      rotationAngle += dt * 0.045 * speedMultiplierRef.current;

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      const isLight =
        document.documentElement.classList.contains('light') ||
        !document.documentElement.classList.contains('dark');

      if (isLight) {
        // Mode Terang: Latar Putih Bersih dengan Pendaran Celestial Azure
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        if (lightGlow) {
          ctx.fillStyle = lightGlow;
          ctx.fillRect(0, 0, width, height);
        }
      } else {
        // Mode Gelap: Latar Kosmis Hitam Pekat dengan Inti Biru Dongker
        ctx.fillStyle = '#030509';
        ctx.fillRect(0, 0, width, height);

        if (darkGlow) {
          ctx.fillStyle = darkGlow;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // 2. Gambar Ratusan Jejak Bintang Konsentris (Circular Star Trails)
      for (let i = 0; i < trails.length; i++) {
        const t = trails[i];
        const start = t.angle + rotationAngle;
        const end = start + t.arcLength;

        ctx.beginPath();
        ctx.arc(centerX, centerY, t.r, start, end);
        ctx.strokeStyle = isLight ? t.lightColor : t.darkColor;
        ctx.lineWidth = t.width;
        ctx.lineCap = 'round';
        ctx.globalAlpha = isLight ? Math.min(t.alpha * 0.85, 0.75) : t.alpha;
        ctx.stroke();

        // Titik bintang bercahaya di ujung kepala jejak
        if (t.hasHeadStar) {
          const hx = centerX + Math.cos(end) * t.r;
          const hy = centerY + Math.sin(end) * t.r;
          ctx.beginPath();
          ctx.arc(hx, hy, t.width * 1.15, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? '#0284C7' : '#FFFFFF';
          ctx.globalAlpha = Math.min(t.alpha + 0.35, 1);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, canvasElement]);

  // Handler saat splash screen atau tombol JELAJAHI diklik
  const handleExplore = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Bersihkan storage residu
    try {
      sessionStorage.removeItem('has_seen_splash');
      localStorage.removeItem('has_seen_splash');
      if (typeof window !== 'undefined' && window.location.search.includes('splash=true')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch {
      // Ignore if storage blocked
    }

    // Efek warp: akselerasi rotasi bintang saat transisi keluar (Cepat & Sinkron)
    let startTime: number | null = null;
    const rampWarp = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / 700, 1);
      speedMultiplierRef.current = 1.0 + Math.pow(progress, 2) * 6.0;
      if (progress < 1) {
        requestAnimationFrame(rampWarp);
      }
    };
    requestAnimationFrame(rampWarp);

    onExplore?.();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('splash-dismissed'));
    }

    setTimeout(() => {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
    }, 750);
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div
      id="splash-screen-root"
      onClick={handleExplore}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none cursor-pointer ${
        isLightMode ? 'bg-white' : 'bg-[#030509]'
      } ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none transition-all duration-500 delay-150 ease-out'
          : 'opacity-100 scale-100 transition-all duration-400 ease-out'
      }`}
      aria-label="Layar Pembuka Splash Screen - Klik di mana saja untuk masuk"
      title="Klik di mana saja untuk menjelajahi portofolio"
    >
      {/* 1. Background Animasi Canvas Star Trails */}
      <canvas
        ref={setCanvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* 2. Elemen SVG Dekoratif Lengkung Orbit & Planet (Motif Cover Orb: Gerakan Bumi) */}
      <svg
        className={`absolute pointer-events-none w-[340px] sm:w-[480px] md:w-[620px] h-[240px] sm:h-[320px] md:h-[380px] z-10 transition-all duration-500 ${
          isLightMode
            ? 'opacity-85 drop-shadow-[0_0_20px_rgba(2,132,199,0.35)]'
            : 'opacity-75 drop-shadow-[0_0_15px_rgba(125,211,252,0.35)]'
        }`}
        viewBox="0 0 600 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbitGlowGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="orbitGlowGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#E6CA7E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="planetGlowGradientLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#0284C7" stopOpacity="1" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="planetGlowGradientDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Busur Lengkung Orbit Minimalis di Belakang Teks (Tetap stabil di jalurnya dan memudar anggun saat keluar) */}
        <motion.g
          animate={
            isExiting
              ? {
                  opacity: [1, 0.6, 0],
                  transition: { duration: 0.7, ease: 'easeOut' },
                }
              : { opacity: 1 }
          }
        >
          <path
            d="M 40 230 C 180 290, 420 280, 560 130"
            stroke={isLightMode ? 'url(#orbitGlowGradientLight)' : 'url(#orbitGlowGradientDark)'}
            strokeWidth="1.5"
          />
          <path
            d="M 60 225 C 190 275, 410 268, 540 135"
            stroke={isLightMode ? 'rgba(2, 132, 199, 0.35)' : 'rgba(255, 255, 255, 0.25)'}
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
        </motion.g>

        {/* Cincin & Planet Kecil: Meluncur menyusuri lengkung orbit dari kanan ke kiri dengan kecepatan selaras fade-out splash */}
        <motion.g
          initial={{ x: 450, y: 195 }}
          animate={
            isExiting
              ? {
                  x: [450, 395, 335, 275, 215, 155, 95, 40, -35, -120],
                  y: [195, 235, 253, 263, 264, 260, 249, 230, 195, 150],
                  rotate: [0, 60, 130, 210, 300, 390, 470, 540, 610, 680],
                  scale: [1, 1.08, 1.12, 1.12, 1.1, 1.05, 0.98, 0.88, 0.7, 0.45],
                  opacity: [1, 1, 1, 1, 1, 0.95, 0.9, 0.7, 0.3, 0],
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.71, 0.82, 0.92, 1],
                  },
                }
              : {
                  x: 450,
                  y: 195,
                  rotate: [0, 360],
                  scale: 1,
                  opacity: 1,
                  transition: {
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  },
                }
          }
        >
          {/* Cincin Orbit Planet */}
          <circle
            cx="0"
            cy="0"
            r="32"
            stroke={isLightMode ? 'rgba(2, 132, 199, 0.35)' : 'rgba(255, 255, 255, 0.45)'}
            strokeWidth="1.2"
            strokeDasharray="3 4"
          />
          <circle
            cx="0"
            cy="0"
            r="26"
            stroke={isLightMode ? 'rgba(2, 132, 199, 0.7)' : 'rgba(125, 211, 252, 0.7)'}
            strokeWidth="1.4"
          />

          {/* Planet Kecil Bercahaya */}
          <circle
            cx="18"
            cy="-18"
            r="9"
            fill={isLightMode ? 'url(#planetGlowGradientLight)' : 'url(#planetGlowGradientDark)'}
          />
          <circle cx="18" cy="-18" r="4" fill="#FFFFFF" />
          <circle
            cx="18"
            cy="-18"
            r="7.5"
            stroke={isLightMode ? 'rgba(245, 158, 11, 0.8)' : 'rgba(230, 202, 126, 0.6)'}
            strokeWidth="1"
          />
        </motion.g>
      </svg>

      {/* 3. Tipografi & Konten Centered (Font Cinzel Staggered Fade-In) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto font-serif">
        {/* Judul Utama: DZIKRY */}
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase pl-[0.25em] sm:pl-[0.3em] transition-colors duration-500 ${
            isLightMode
              ? 'text-[#0284C7] drop-shadow-[0_0_35px_rgba(2,132,199,0.35)] drop-shadow-[0_0_15px_rgba(14,165,233,0.25)]'
              : 'text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.45)] drop-shadow-[0_0_15px_rgba(125,211,252,0.35)]'
          }`}
        >
          DZIKRY
        </motion.h1>

        {/* Subjudul: — SOFTWARE ENGINEER & WEB DEVELOPER — */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-5 my-5 sm:my-6 max-w-lg w-full"
        >
          <div
            className={`h-[1px] flex-1 ${
              isLightMode
                ? 'bg-gradient-to-r from-transparent via-[#0284C7]/30 to-[#0284C7]/60'
                : 'bg-gradient-to-r from-transparent via-white/30 to-white/60'
            }`}
          />
          <p
            className={`text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.35em] uppercase whitespace-nowrap pl-[0.3em] ${
              isLightMode ? 'text-slate-700' : 'text-[#EDE7D8]/90 font-normal'
            }`}
          >
            SOFTWARE ENGINEER &amp; WEB DEVELOPER
          </p>
          <div
            className={`h-[1px] flex-1 ${
              isLightMode
                ? 'bg-gradient-to-l from-transparent via-[#0284C7]/30 to-[#0284C7]/60'
                : 'bg-gradient-to-l from-transparent via-white/30 to-white/60'
            }`}
          />
        </motion.div>

        {/* Tombol Interaktif: JELAJAHI (Celestial Capsule dengan Efek Aura & Shimmer) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-9 flex justify-center w-full"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleExplore();
            }}
            className={`group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-full border text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md select-none ${
              isLightMode
                ? 'border-[#0284C7]/45 bg-white/95 hover:bg-[#0284C7] text-[#0369A1] hover:text-white shadow-sky-500/10 hover:shadow-sky-500/25'
                : 'border-white/30 bg-void-950/60 hover:bg-white/15 text-parchment hover:text-white shadow-black/50 hover:border-cyan-300 hover:shadow-cyan-500/20'
            } backdrop-blur-md`}
            title="Masuk ke Portofolio"
          >
            {/* Pendaran Cahaya Kosmis Halus di Belakang Tombol */}
            <span
              className={`absolute -inset-0.5 rounded-full blur-sm opacity-30 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none ${
                isLightMode
                  ? 'bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-sky-400/20'
                  : 'bg-gradient-to-r from-cyan-500/20 via-white/20 to-blue-500/20'
              }`}
            />

            {/* Efek Kilatan Sinar Menyapu (Shimmer Sweep) */}
            <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </span>

            {/* Titik Orbit Indikator (Bersih, Tajam, & Elegan Tanpa Blur Bleeding) */}
            <span className="relative flex items-center justify-center h-2 w-2 z-10 shrink-0">
              <span
                className={`animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full opacity-40 ${
                  isLightMode ? 'bg-[#0284C7]' : 'bg-cyan-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isLightMode
                    ? 'bg-[#0284C7] group-hover:bg-white'
                    : 'bg-cyan-400 group-hover:bg-white'
                } transition-colors`}
              />
            </span>

            {/* Label Teks (Tajam, Terbaca Jelas, & Kontras Tinggi) */}
            <span
              className={`relative z-10 font-sans tracking-[0.22em] transition-colors ${
                isLightMode
                  ? 'text-[#0369A1] group-hover:text-white font-bold'
                  : 'text-parchment group-hover:text-white font-medium'
              }`}
            >
              JELAJAHI
            </span>

            {/* Ikon Panah Orbit Minimalis */}
            <svg
              className={`relative z-10 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1 shrink-0 ${
                isLightMode
                  ? 'text-[#0284C7] group-hover:text-white'
                  : 'text-parchment/80 group-hover:text-white'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
