'use client';

import React from 'react';
import Link from 'next/link';
import { HeroPortrait } from '@/components/celestial/HeroPortrait';
import { Profile } from '@/types';
import { ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface HeroSectionProps {
  profile: Profile;
  projectCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const { t, language } = useLanguage();

  const handleExploreProjects = async () => {
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#C5A059', '#E6CA7E', '#7DD3FC', '#EDE7D8'],
      ticks: 180,
    });
  };

  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const bioParagraphs =
    language === 'en'
      ? t.hero.bio
      : profile.bio && profile.bio.length > 0
      ? profile.bio
      : t.hero.bio;

  return (
    <section
      id="about"
      className="relative flex items-end justify-center pt-24 sm:pt-28 lg:pt-24 pb-0 overflow-hidden bg-transparent"
    >
      {/* Background Star Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.75px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* Atmospheric Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brass/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Kolom Kiri: Tentang Saya & Profil Personal (Render Instan untuk Skor LCP Mobile <1.8s) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 space-y-4 sm:space-y-6 self-center pt-2 pb-6 sm:pb-8 relative">
            {/* Subtle Readability Ambient Backlight: menjaga keterbacaan teks tanpa menutupi estetika kosmik */}
            <div className="absolute -inset-4 sm:-inset-6 bg-white/40 dark:bg-void-950/35 rounded-3xl blur-2xl -z-10 pointer-events-none" />

            {/* Nama & Subjudul Tipografi Cinzel Serasi */}
            <div className="space-y-1.5">
              <h1
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    window.dispatchEvent(new CustomEvent('trigger-splash'));
                  }
                }}
                className="text-5xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-brass dark:text-parchment tracking-tight cursor-pointer hover:opacity-90 transition-opacity select-none"
                title="Tampilkan Animasi Splash"
              >
                {profile.name}
              </h1>
              <p className="font-serif text-sm sm:text-base font-semibold tracking-[0.25em] uppercase text-brass dark:text-brass-light">
                {profile.title || t.hero.role}
              </p>
            </div>

            {/* Narasi Biografi Tentang Saya (Multilingual) */}
            <div className="space-y-3 text-base sm:text-lg text-parchment-dim font-sans leading-relaxed max-w-xl">
              {bioParagraphs.map((para, idx) => (
                <p key={idx} className="relative pl-4 border-l-2 border-brass/40">
                  {para}
                </p>
              ))}
            </div>

            {/* Tombol Aksi (Kapsul Melengkung Halus & Kontras Tinggi) */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4 w-full">
              <Link
                href="/proyek"
                onClick={handleExploreProjects}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full border border-brass bg-brass text-white dark:text-void-950 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-brass-light transition-all duration-200 shadow-brass-glow active:scale-95"
              >
                <span>{t.hero.btnProjects}</span>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#footer"
                onClick={scrollToFooter}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full border border-brass/50 bg-white dark:bg-black text-slate-900 dark:text-parchment font-mono text-xs sm:text-sm font-bold uppercase tracking-widest hover:border-brass hover:text-brass transition-all duration-200 shadow-sm dark:shadow-md dark:shadow-black active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-brass" />
                <span>{t.hero.btnContact}</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Foto Profil Frameless Cutout yang Menempel ke Batas Bawah Hero (Render Instan untuk Skor LCP Maksimal) */}
          <div className="lg:col-span-5 flex items-end justify-center lg:justify-end relative self-end">
            <HeroPortrait profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
};
