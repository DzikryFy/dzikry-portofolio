'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, MessageCircle, X } from 'lucide-react';
import { Profile } from '@/types';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface FloatingSocialDockProps {
  profile?: Profile;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const FloatingSocialDock: React.FC<FloatingSocialDockProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const emailTarget = profile?.socialLinks?.email || 'm.dzikryfikry@gmail.com';
  const mailtoHref = emailTarget.startsWith('mailto:')
    ? emailTarget
    : `mailto:${emailTarget}`;

  const githubUrl = profile?.socialLinks?.github || 'https://github.com/DzikryFy';
  const linkedinUrl =
    profile?.socialLinks?.linkedin ||
    'https://www.linkedin.com/in/muhammad-dzikry-fikry';

  const rawPhone = profile?.phone || '+62 812-8838-9457';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  // Tutup speed dial jika user mengklik area luar
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Daftar ikon sosial dengan warna brand asli masing-masing
  // Disusun vertikal: Email di paling atas, disusul GitHub, LinkedIn, dan WhatsApp di atas tombol toggle
  const socialItems = [
    {
      name: 'Email',
      href: mailtoHref,
      icon: <Mail className="w-5 h-5 text-[#EA4335]" />,
      tooltip: emailTarget,
      isExternal: false,
      styleClass:
        'bg-white/95 dark:bg-void-950/95 border border-[#EA4335]/45 hover:border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335]/15 hover:shadow-[0_0_18px_rgba(234,67,53,0.4)]',
    },
    {
      name: 'GitHub',
      href: githubUrl,
      icon: <Github className="w-5 h-5 text-slate-900 dark:text-white" />,
      tooltip: 'github.com/DzikryFy',
      isExternal: true,
      styleClass:
        'bg-white/95 dark:bg-void-950/95 border border-slate-300 dark:border-white/35 hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/15 hover:shadow-[0_0_18px_rgba(255,255,255,0.3)]',
    },
    {
      name: 'LinkedIn',
      href: linkedinUrl,
      icon: <Linkedin className="w-5 h-5 text-[#0A66C2]" />,
      tooltip: 'linkedin.com/in/muhammad-dzikry-fikry',
      isExternal: true,
      styleClass:
        'bg-white/95 dark:bg-void-950/95 border border-[#0A66C2]/45 hover:border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/15 hover:shadow-[0_0_18px_rgba(10,102,194,0.4)]',
    },
    {
      name: 'WhatsApp',
      href: whatsappUrl,
      icon: <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />,
      tooltip: rawPhone,
      isExternal: true,
      styleClass:
        'bg-white/95 dark:bg-void-950/95 border border-[#25D366]/45 hover:border-[#25D366] text-[#25D366] hover:bg-[#25D366]/15 hover:shadow-[0_0_18px_rgba(37,211,102,0.4)]',
    },
  ];

  return (
    <div
      ref={dockRef}
      className="fixed bottom-14 md:bottom-16 right-3 md:right-4 z-40 select-none flex flex-col items-center"
    >
      {/* Daftar Ikon Sosial Muncul Vertikal (Bentuk Bulat Terpisah Tiap Ikon) */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center gap-2.5 mb-2.5">
            {socialItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 15, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.6 }}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 24,
                  delay: (socialItems.length - 1 - idx) * 0.04,
                }}
                className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-200 active:scale-90 cursor-pointer ${item.styleClass}`}
                aria-label={item.name}
                title={item.tooltip}
              >
                {item.icon}

                {/* Floating Tooltip di Sisi Kiri Masing-Masing Lingkaran */}
                <span className="pointer-events-none absolute -left-3 -translate-x-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 px-2.5 py-1 rounded bg-void-950/95 text-parchment border border-brass/35 text-[11px] font-mono whitespace-nowrap shadow-lg z-50">
                  {item.name}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Tombol FAB Utama (Floating Action Button) di Bawah */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border shadow-2xl shadow-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'border-brass bg-brass text-void-950 shadow-brass-glow'
            : 'border-brass/45 bg-white/90 dark:bg-void-950/90 text-brass hover:border-brass hover:text-brass-light hover:shadow-brass-glow'
        }`}
        aria-label={isOpen ? 'Tutup Kontak' : 'Buka Kontak'}
        title={isOpen ? 'Tutup' : language === 'en' ? 'Quick Contact' : 'Hubungi Saya'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-void-950 font-bold" />
          ) : (
            <MessageCircle className="w-5 h-5 text-brass group-hover:scale-110 transition-transform duration-200" />
          )}
        </motion.div>

        {/* Indikator Status Aktif Berkedip saat ditutup */}
        {!isOpen && (
          <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-void-950 animate-pulse" />
        )}

        {/* Floating Tooltip saat Hover Tombol Utama */}
        {!isOpen && (
          <span className="pointer-events-none absolute -left-3 -translate-x-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 px-2.5 py-1 rounded bg-void-950/95 text-parchment border border-brass/35 text-[11px] font-mono whitespace-nowrap shadow-lg z-50">
            {language === 'en' ? 'Quick Contact' : 'Hubungi Saya'}
          </span>
        )}
      </motion.button>
    </div>
  );
};

export const FloatingContactButton = FloatingSocialDock;
