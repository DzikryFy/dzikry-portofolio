'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Profile } from '@/types';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface FloatingSocialDockProps {
  profile?: Profile;
}

export const FloatingSocialDock: React.FC<FloatingSocialDockProps> = () => {
  const { language } = useLanguage();

  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const label = language === 'en' ? 'CONTACT ME' : 'HUBUNGI SAYA';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-14 md:bottom-16 right-3 md:right-4 z-40 select-none"
    >
      <a
        href="#footer"
        onClick={scrollToFooter}
        className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full border border-brass/45 bg-void-950/90 hover:bg-brass/15 text-parchment hover:text-brass-light hover:border-brass hover:shadow-brass-glow shadow-xl shadow-black/40 backdrop-blur-md font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer"
        aria-label={label}
        title={label}
      >
        <Mail className="w-4 h-4 text-brass group-hover:scale-110 transition-transform duration-200 shrink-0" />
        <span className="whitespace-nowrap">{label}</span>
      </a>
    </motion.div>
  );
};

export const FloatingContactButton = FloatingSocialDock;
