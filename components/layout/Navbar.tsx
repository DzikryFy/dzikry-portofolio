'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavbarProps {
  monogram?: string;
  kanjiName?: string; // fallback
  name?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  name = 'DZIKRY',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigasi diselaraskan: hanya PROFILE, KEAHLIAN (menggantikan PROYEK), PENGALAMAN
  const navLinks = [
    { href: '/#about', label: 'PROFILE' },
    { href: '/#tech-stack', label: 'KEAHLIAN' },
    { href: '/#timeline', label: 'PENGALAMAN' },
  ];

  const scrollToFooter = (e: React.MouseEvent) => {
    const footer = document.getElementById('footer');
    if (footer) {
      e.preventDefault();
      footer.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    // Jika sedang berada di beranda, picu animasi splash screen langsung secara mulus
    if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'instant' });
      setMobileMenuOpen(false);
      window.dispatchEvent(new CustomEvent('trigger-splash'));
    } else {
      // Jika dari halaman lain (seperti /proyek), bersihkan storage agar splash screen terpicu saat kembali ke beranda
      try {
        sessionStorage.removeItem('skip_splash');
        sessionStorage.removeItem('has_seen_splash');
        localStorage.removeItem('has_seen_splash');
      } catch {}
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-void-950/75 dark:bg-void-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-brass/15 py-3 sm:py-3.5 shadow-sm'
          : 'bg-transparent border-b border-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo (Kiri) - Teks DZIKRY (Memencet logo akan memicu splash animasi) */}
        <Link
          href="/?splash=true"
          onClick={handleLogoClick}
          className="group z-10 shrink-0 inline-flex items-center cursor-pointer"
          title="Tampilkan Animasi Splash"
        >
          <span className="font-serif font-extrabold text-brass dark:text-parchment tracking-widest text-base sm:text-lg transition-colors group-hover:text-brass-light">
            {name}
          </span>
        </Link>

        {/* Desktop Navigation Links (Pusat / Tengah: PROFILE, KEAHLIAN, PENGALAMAN) */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-mono font-semibold tracking-widest text-parchment-dim hover:text-brass-light transition-colors duration-200 uppercase py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brass transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Aksi Kanan: Tombol Contact (ke Footer) & Mode Tema (Theme Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 z-10">
          {/* Tombol Contact Samping Mode Tema (Desktop & Tablet) */}
          <Link
            href="/#footer"
            onClick={scrollToFooter}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brass/35 bg-white/70 dark:bg-void-950/80 hover:border-brass hover:bg-brass/10 hover:shadow-brass-glow text-slate-800 dark:text-parchment hover:text-brass transition-all duration-200 text-xs font-mono font-bold tracking-wider uppercase active:scale-95 shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-brass" />
            <span>CONTACT</span>
          </Link>

          {/* Tombol Ganti Tema (Desktop & Tablet) */}
          <ThemeToggle className="hidden sm:inline-flex" />

          {/* Mobile Buttons (Contact, Theme Toggle, Hamburger Menu) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/#footer"
              onClick={scrollToFooter}
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-brass/35 bg-white/80 dark:bg-void-950/90 text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-parchment hover:text-brass transition-colors active:scale-95"
            >
              <Mail className="w-3 h-3 text-brass" />
              <span>CONTACT</span>
            </Link>

            <ThemeToggle className="sm:hidden" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-parchment border border-brass/25 rounded-full bg-void-900/60 active:scale-95 transition-transform"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-brass" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Layar Kecil / Ponsel) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-void-950/95 border-b border-brass/20 backdrop-blur-xl px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 text-sm border-b border-brass/10 font-mono tracking-widest text-parchment hover:text-brass transition-colors uppercase"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/#footer"
              onClick={scrollToFooter}
              className="w-full py-2.5 rounded-full border border-brass/40 bg-brass/15 hover:bg-brass/25 text-center font-mono text-xs font-bold tracking-widest text-parchment uppercase transition-colors inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-brass" />
              <span>CONTACT</span>
            </Link>

            {/* Theme Toggle di dalam Drawer */}
            <ThemeToggle showLabel className="w-full py-2.5 justify-center" />
          </div>
        </div>
      )}
    </header>
  );
};