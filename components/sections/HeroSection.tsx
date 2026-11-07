'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HeroPortrait } from '@/components/celestial/HeroPortrait';
import { Profile } from '@/types';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';

interface HeroSectionProps {
  profile: Profile;
  projectCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const emailTarget =
    profile.socialLinks?.email || 'm.dzikryfikry@gmail.com';
  const mailtoHref = emailTarget.startsWith('mailto:')
    ? emailTarget
    : `mailto:${emailTarget}`;

  const githubUrl = profile.socialLinks?.github || 'https://github.com/DzikryFy';
  const linkedinUrl =
    profile.socialLinks?.linkedin ||
    'https://www.linkedin.com/in/muhammad-dzikry-fikry';

  const handleExploreProjects = () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#C5A059', '#E6CA7E', '#7DD3FC', '#EDE7D8'],
      ticks: 180,
    });
  };

  return (
    <section
      id="about"
      className="relative flex items-end justify-center pt-8 sm:pt-12 lg:pt-10 pb-0 overflow-hidden bg-transparent"
    >
      {/* Background Star Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.75px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* Atmospheric Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brass/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Kolom Kiri: Tentang Saya & Profil Personal (Seimbang Tanpa Ruang Kosong Berlebih) */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10 space-y-4 sm:space-y-5 self-center pt-2 pb-6 sm:pb-8"
          >
            {/* Nama & Subjudul Tipografi Cinzel Serasi */}
            <div className="space-y-1">
              <h1
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    window.dispatchEvent(new CustomEvent('trigger-splash'));
                  }
                }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-brass dark:text-parchment tracking-tight cursor-pointer hover:opacity-90 transition-opacity select-none"
                title="Tampilkan Animasi Splash"
              >
                {profile.name}
              </h1>
              <p className="font-serif text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-brass dark:text-brass-light">
                {profile.title || 'Software Engineer & Web Developer'}
              </p>
            </div>

            {/* Narasi Biografi Tentang Saya (Lugas & Autentik) */}
            <div className="space-y-2.5 text-sm sm:text-base text-parchment-dim font-sans leading-relaxed max-w-xl">
              {profile.bio && profile.bio.length > 0 ? (
                profile.bio.map((para, idx) => (
                  <p key={idx} className="relative pl-4 border-l border-brass/30">
                    {para}
                  </p>
                ))
              ) : (
                <p className="relative pl-4 border-l border-brass/30">
                  Hello, Saya Muhammad Dzikry Fikry, seorang Software Engineer &amp; Web Developer yang berfokus pada pengembangan sistem web full-stack, integrasi CMS modern, serta arsitektur backend yang rapi dan terukur.
                </p>
              )}
            </div>

            {/* Tombol Aksi (Kapsul Melengkung Halus & Kontras Tinggi) */}
            <div className="pt-1 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full">
              <Link
                href="/proyek"
                onClick={handleExploreProjects}
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-brass bg-brass text-white dark:text-void-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-brass-light transition-all duration-200 shadow-brass-glow active:scale-95"
              >
                <span>LIHAT PROYEK</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-brass/50 bg-white dark:bg-black text-slate-900 dark:text-parchment font-mono text-xs font-bold uppercase tracking-widest hover:border-brass hover:text-brass transition-all duration-200 shadow-sm dark:shadow-md dark:shadow-black active:scale-95"
              >
                <Mail className="w-4 h-4 text-brass" />
                <span>HUBUNGI SAYA</span>
              </a>
            </div>

            {/* Deretan Link Ikonik Minimalis (GitHub, LinkedIn, Email) */}
            <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-2.5 text-parchment-dim font-mono text-xs">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brass/25 bg-white/70 dark:bg-void-950/70 hover:border-brass hover:bg-brass/10 hover:text-brass transition-all duration-200 shadow-sm"
                title="Profil GitHub"
              >
                <Github className="w-3.5 h-3.5 text-brass group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-[11px] tracking-wider uppercase">GitHub</span>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brass/25 bg-white/70 dark:bg-void-950/70 hover:border-brass hover:bg-brass/10 hover:text-brass transition-all duration-200 shadow-sm"
                title="Profil LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-brass group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-[11px] tracking-wider uppercase">LinkedIn</span>
              </a>

              <a
                href={mailtoHref}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brass/25 bg-white/70 dark:bg-void-950/70 hover:border-brass hover:bg-brass/10 hover:text-brass transition-all duration-200 shadow-sm"
                title="Kirim Email"
              >
                <Mail className="w-3.5 h-3.5 text-brass group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-[11px] tracking-wider uppercase">Email</span>
              </a>
            </div>
          </motion.div>

          {/* Kolom Kanan: Foto Profil Frameless Cutout yang Menempel ke Batas Bawah Hero */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-end justify-center lg:justify-end relative self-end"
          >
            <HeroPortrait profile={profile} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
