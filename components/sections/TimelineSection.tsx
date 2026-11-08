'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimeTitleCard } from '@/components/celestial/AnimeTitleCard';
import { Experience, Education } from '@/types';
import { Briefcase, GraduationCap, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface TimelineSectionProps {
  experiences: Experience[];
  educations: Education[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  experiences,
  educations,
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  // Maksimal 3 item yang ditampilkan di halaman beranda
  const displayedExperiences = experiences.slice(0, 3);
  const displayedEducations = educations.slice(0, 3);
  const hasMore = experiences.length > 3 || educations.length > 3;

  const tabs = [
    { key: 'experience', label: 'PENGALAMAN KERJA', icon: Briefcase },
    { key: 'education', label: 'PENDIDIKAN', icon: GraduationCap },
  ] as const;

  return (
    <section id="timeline" className="relative py-16 sm:py-24 border-t border-brass/15 bg-transparent scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi Pengalaman & Pendidikan: Judul di Kiri & Link Teks di Kanan Atas */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <AnimeTitleCard
            title="PENGALAMAN & PENDIDIKAN"
            description="Perjalanan karir profesional, pengalaman implementasi sistem perangkat lunak, dan latar belakang akademik."
            className="mb-0"
          />

          <motion.div
            initial={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pb-2 self-start sm:self-end shrink-0"
          >
            <Link
              href="/pendidikan-pengalaman"
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-brass hover:text-brass-light uppercase transition-all duration-200 border-b border-brass/30 hover:border-brass pb-0.5 cursor-pointer"
            >
              <span>LIHAT SELURUH RIWAYAT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Tab Switcher (Kapsul Melengkung Halus - 1 Baris di Layar Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-nowrap items-center justify-start gap-2 sm:gap-3 mb-10 sm:mb-12 select-none overflow-x-auto max-w-full pb-1"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full border text-[11px] sm:text-xs font-mono font-bold tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'border-brass bg-brass text-white dark:text-void-950 shadow-brass-glow'
                    : 'border-brass/30 bg-white/90 dark:bg-black/60 text-slate-700 dark:text-parchment-dim hover:border-brass hover:text-slate-900 dark:hover:text-parchment'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white dark:text-void-950' : 'text-brass'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Single-Side Left-Aligned Vertical Timeline (Menghilangkan Ruang Kosong & Alur Baca Vertikal Terstruktur) */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Garis Vertikal Timeline di Sisi Kiri */}
          <div className="absolute left-[19px] sm:left-[21px] top-6 bottom-6 w-px bg-gradient-to-b from-brass/50 via-brass/25 to-brass/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            {activeTab === 'experience' ? (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 sm:space-y-10"
              >
                {displayedExperiences.map((exp, idx) => (
                  <motion.div
                    key={exp._id || idx}
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-start gap-4 sm:gap-7 group"
                  >
                    {/* Titik Node Orbit di Sisi Kiri Garis */}
                    <div className="relative z-10 w-10 h-10 rounded-full border border-brass/40 bg-white dark:bg-void-950 flex items-center justify-center shrink-0 mt-1 group-hover:border-brass group-hover:scale-110 group-hover:shadow-brass-glow transition-all duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-brass group-hover:bg-brass-light transition-colors" />
                    </div>

                    {/* Kartu Konten Pengalaman (Sejajar Lurus di Kanan Garis) */}
                    <div className="flex-1 rounded-2xl p-5 sm:p-7 border border-brass/20 bg-white/70 dark:bg-void-950/65 backdrop-blur-md hover:border-brass/60 hover:bg-white/85 dark:hover:bg-void-950/80 transition-all duration-300 shadow-sm hover:shadow-md">
                      {/* Baris Header: Jabatan & Periode */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-brass/15">
                        <div>
                          <h4 className="text-xl sm:text-2xl font-serif font-bold text-brass dark:text-parchment group-hover:text-brass-light transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-brass-muted mt-1 font-medium flex items-center flex-wrap gap-2">
                            <span className="font-semibold text-slate-800 dark:text-parchment">{exp.company}</span>
                            {exp.location && (
                              <span className="inline-flex items-center gap-1 text-parchment-dim">
                                <MapPin className="w-3 h-3 text-brass/70" />
                                <span>{exp.location}</span>
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Badge Periode & Status */}
                        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-brass/35 bg-brass/10 dark:bg-void-950/80 text-brass text-xs sm:text-sm font-mono font-bold tracking-wider shadow-sm">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </div>
                          {exp.isCurrent && (
                            <span className="px-2.5 py-0.5 rounded-full bg-brass/15 border border-brass/40 text-[10px] text-brass-light font-bold font-mono tracking-wider uppercase">
                              AKTIF
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Deskripsi Pengalaman */}
                      {exp.description && (
                        <p className="mt-3.5 text-xs sm:text-sm text-slate-700 dark:text-parchment-dim leading-relaxed font-sans">
                          {exp.description}
                        </p>
                      )}

                      {/* Sorotan Pencapaian / Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-700 dark:text-parchment-dim leading-relaxed">
                              <span className="text-brass mt-1 shrink-0 text-sm">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tags Keahlian Terkait */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-brass/10 flex flex-wrap gap-2">
                          {exp.skills.map((s) => (
                            <span
                              key={s}
                              className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-white/90 dark:bg-void-950 border border-brass/25 text-slate-800 dark:text-brass-light shadow-sm"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 sm:space-y-10"
              >
                {displayedEducations.map((edu, idx) => (
                  <motion.div
                    key={edu._id || idx}
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-start gap-4 sm:gap-7 group"
                  >
                    {/* Titik Node Orbit di Sisi Kiri Garis */}
                    <div className="relative z-10 w-10 h-10 rounded-full border border-brass/40 bg-white dark:bg-void-950 flex items-center justify-center shrink-0 mt-1 group-hover:border-brass group-hover:scale-110 group-hover:shadow-brass-glow transition-all duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-brass group-hover:bg-brass-light transition-colors" />
                    </div>

                    {/* Kartu Konten Pendidikan (Sejajar Lurus di Kanan Garis) */}
                    <div className="flex-1 rounded-2xl p-5 sm:p-7 border border-brass/20 bg-white/70 dark:bg-void-950/65 backdrop-blur-md hover:border-brass/60 hover:bg-white/85 dark:hover:bg-void-950/80 transition-all duration-300 shadow-sm hover:shadow-md">
                      {/* Baris Header: Institusi & Periode */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-brass/15">
                        <div>
                          <h4 className="text-xl sm:text-2xl font-serif font-bold text-brass dark:text-parchment group-hover:text-brass-light transition-colors">
                            {edu.institution}
                          </h4>
                          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-brass-muted mt-1 font-medium">
                            <span className="font-semibold text-slate-800 dark:text-parchment">{edu.degree}</span>
                            {edu.field && <span> — {edu.field}</span>}
                          </p>
                        </div>

                        {/* Periode */}
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-brass/35 bg-brass/10 dark:bg-void-950/80 text-brass text-xs sm:text-sm font-mono font-bold tracking-wider self-start sm:self-center shrink-0 shadow-sm">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{edu.period}</span>
                        </div>
                      </div>

                      {/* Deskripsi Pendidikan */}
                      {edu.description && (
                        <p className="mt-3.5 text-xs sm:text-sm text-slate-700 dark:text-parchment-dim leading-relaxed font-sans">
                          {edu.description}
                        </p>
                      )}

                      {/* Highlights Pendidikan */}
                      {edu.highlights && edu.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {edu.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-700 dark:text-parchment-dim leading-relaxed">
                              <span className="text-brass mt-1 shrink-0 text-sm">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tombol Lihat Lebih Banyak jika item > 3 atau untuk membuka halaman arsip */}
          {hasMore && (
            <div className="pt-10 text-center">
              <Link
                href="/pendidikan-pengalaman"
                className="group inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-brass/40 bg-white/70 dark:bg-void-950/80 hover:bg-brass hover:text-white dark:hover:text-void-950 text-brass font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95"
              >
                <span>LIHAT LEBIH BANYAK PENGALAMAN & PENDIDIKAN</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
