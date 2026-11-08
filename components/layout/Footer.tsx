'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Profile } from '@/types';

interface FooterProps {
  profile: Profile;
  astronomyQuote?: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  className = '',
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const email = profile.socialLinks?.email || 'm.dzikryfikry@gmail.com';
  const mailHref = email.startsWith('mailto:') ? email : `mailto:${email}`;
  const githubUrl = profile.socialLinks?.github || 'https://github.com/DzikryFy';
  const githubDisplay = githubUrl.replace(/^https?:\/\/(www\.)?github\.com\/?/i, 'github.com/') || 'github.com/DzikryFy';
  const phone = profile.phone || '+62 812-8838-9457';
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
  const address = profile.location || 'Depok, Jawa Barat, Indonesia';

  // Site map disesuaikan sesuai navigasi: PROFILE, KEAHLIAN, PENGALAMAN
  const siteMapLinks = [
    { label: 'PROFILE', href: '/#about' },
    { label: 'KEAHLIAN', href: '/#tech-stack' },
    { label: 'PENGALAMAN', href: '/#timeline' },
  ];

  return (
    <footer
      id="footer"
      className={`relative z-20 bg-footer border-t border-brass/25 pt-14 pb-8 select-none transition-colors duration-300 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Utama Layout Footer (Brand di Kiri, Site Map & Legal di Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
          {/* Kolom Kiri: Brand, Deskripsi & Ikon Sosial (Span 6 Kolom) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Nama Brand */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-brass dark:text-parchment">
                DZIKRY
              </h3>

              {/* Deskripsi Singkat */}
              <p className="mt-4 text-xs sm:text-sm text-parchment-dim font-sans leading-relaxed max-w-md">
                {Array.isArray(profile.bio) && profile.bio.length > 0
                  ? profile.bio[0]
                  : 'Hello, Saya Muhammad Dzikry Fikry, seorang Software Engineer & Web Developer yang berfokus pada pembangunan sistem web modern, performa tinggi, dan pengalaman pengguna yang responsif.'}
              </p>
            </div>

            {/* Ikon Sosial Media (Bulat Melengkung) */}
            <div className="flex items-center gap-3 mt-6">
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brass/25 bg-void-950/80 text-parchment-dim hover:border-brass hover:text-brass flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brass/25 bg-void-950/80 text-parchment-dim hover:border-brass hover:text-brass flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks?.email && (
                <a
                  href={mailHref}
                  className="w-10 h-10 rounded-full border border-brass/25 bg-void-950/80 text-parchment-dim hover:border-brass hover:text-brass flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Kolom Kanan: 2 Kolom (Site Map & Kontak) (Span 6 Kolom) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {/* Kolom Site Map */}
            <div>
              <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-brass dark:text-parchment">
                Site Map
              </h4>
              <ul className="mt-4 space-y-2.5">
                {siteMapLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-mono tracking-wider text-parchment-dim hover:text-brass transition-colors inline-block uppercase"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom Kontak (Teks Bersih Sederhana Tanpa Border, Tanpa Ikon & Tanpa Title) */}
            <div>
              <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-brass dark:text-parchment">
                Kontak
              </h4>
              <ul className="mt-4 space-y-2.5">
                {/* Email dengan Tombol Salin Cepat */}
                <li>
                  <a
                    href={mailHref}
                    className="text-xs font-mono tracking-wider text-parchment-dim hover:text-brass transition-colors inline-block break-all sm:break-normal"
                  >
                    {email}
                  </a>
                </li>

                {/* GitHub */}
                <li>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono tracking-wider text-parchment-dim hover:text-brass transition-colors inline-block break-all sm:break-normal"
                  >
                    {githubDisplay}
                  </a>
                </li>

                {/* Nomor Telfon / WhatsApp */}
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono tracking-wider text-parchment-dim hover:text-brass transition-colors inline-block"
                    title="Hubungi via WhatsApp"
                  >
                    {phone}
                  </a>
                </li>

                {/* Alamat */}
                <li>
                  <span className="text-xs font-mono tracking-wider text-parchment-dim inline-block">
                    {address}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator Garis Batas Bawah */}
        <div className="border-t border-brass/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-parchment-dim text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name || 'Muhammad Dzikry Fikry'}. Seluruh hak cipta dilindungi.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-parchment-dim hover:text-brass transition-colors group cursor-pointer"
            aria-label="Kembali ke atas"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};