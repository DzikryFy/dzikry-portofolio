'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TechIcon } from '@/components/icons/TechIcons';
import { TechStackItem } from '@/types';

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

/**
 * Membersihkan nama teknologi agar hanya nama murni (tanpa embel-embel versi / router)
 */
export const cleanTechName = (rawName: string): string => {
  let name = rawName.trim();
  // Hapus teks di dalam kurung seperti (App Router), (SSR), dll
  name = name.replace(/\s*\([^)]*\)/g, '');
  // Standarisasi nama murni
  if (/^react/i.test(name)) return 'React';
  if (/^next/i.test(name)) return 'Next.js';
  if (/^tailwind/i.test(name)) return 'Tailwind CSS';
  if (/^bootstrap/i.test(name)) return 'Bootstrap';
  if (/^css/i.test(name)) return 'CSS3';
  if (/^type\s*script/i.test(name)) return 'TypeScript';
  if (/^java\s*script/i.test(name)) return 'JavaScript';
  if (/^html/i.test(name)) return 'HTML5';
  if (/^node/i.test(name)) return 'Node.js';
  if (/^laravel/i.test(name)) return 'Laravel';
  if (/^php/i.test(name)) return 'PHP';
  if (/^sql/i.test(name)) return 'SQL';
  if (/^postgres/i.test(name)) return 'PostgreSQL';
  if (/^mysql/i.test(name)) return 'MySQL';
  if (/^sanity/i.test(name)) return 'Sanity CMS';
  if (/^docker/i.test(name)) return 'Docker';
  if (/^gitlab/i.test(name)) return 'GitLab';
  if (/^git/i.test(name)) return 'Git & GitHub';
  if (/^figma/i.test(name)) return 'Figma';
  if (/^linux/i.test(name)) return 'Linux';
  if (/^framer/i.test(name)) return 'Framer Motion';
  if (/^ci\s*\/?\s*cd/i.test(name)) return 'CI / CD';
  if (/^rest/i.test(name)) return 'REST API';
  if (/^vercel/i.test(name)) return 'Vercel';
  return name;
};

export const TechStackSection: React.FC<TechStackSectionProps> = ({ techStack }) => {
  // Gandakan item 3 kali untuk animasi berjalan mulus tanpa jeda (infinite seamless loop)
  const marqueeItems = [...techStack, ...techStack, ...techStack];

  return (
    <section
      id="tech-stack"
      className="relative py-4 sm:py-5 border-y border-brass/15 bg-white/[0.02] dark:bg-void-950/[0.25] backdrop-blur-[2px] overflow-hidden select-none"
    >
      {/* Marquee Ticker 1 Baris Otomatis Bergerak Mulus dari Kanan ke Kiri Tanpa Judul & Deskripsi */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <motion.div
          className="flex items-center gap-3 sm:gap-4.5 w-max"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {marqueeItems.map((item, idx) => {
            const cleanName = cleanTechName(item.name);
            return (
              <div
                key={`${item.name}-${idx}`}
                className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full border border-brass/25 bg-white/85 dark:bg-void-950/90 hover:border-brass hover:bg-brass/10 hover:shadow-brass-glow transition-all duration-200 group active:scale-95 shadow-sm shrink-0 cursor-default"
              >
                {/* Ikon Bulat Resmi Teknologi */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brass/30 bg-slate-100 dark:bg-void-900 flex items-center justify-center p-1.5 text-brass group-hover:border-brass group-hover:text-brass-light group-hover:scale-105 transition-all shadow-sm shrink-0">
                  <TechIcon name={cleanName} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Nama Teknologi */}
                <span className="font-serif font-bold text-slate-900 dark:text-parchment text-xs sm:text-sm tracking-wider uppercase group-hover:text-brass-light transition-colors whitespace-nowrap pr-1">
                  {cleanName}
                </span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};