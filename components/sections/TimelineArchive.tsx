'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience, Education } from '@/types';
import { AnimeTitleCard } from '@/components/celestial/AnimeTitleCard';
import { ArrowLeft, Search, Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import {
  formatPeriod,
  getExperienceTranslation,
  getEducationDegree,
  getEducationField,
} from '@/lib/i18n/helpers';

interface TimelineArchiveProps {
  experiences: Experience[];
  educations: Education[];
}

export const TimelineArchive: React.FC<TimelineArchiveProps> = ({
  experiences,
  educations,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperiences = experiences.filter((exp) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const trans = getExperienceTranslation(exp, t);
    const role = (trans?.role || exp.role).toLowerCase();
    const company = (trans?.company || exp.company).toLowerCase();
    const desc = (trans?.description || exp.description || '').toLowerCase();

    return (
      role.includes(q) ||
      company.includes(q) ||
      (exp.location && exp.location.toLowerCase().includes(q)) ||
      desc.includes(q) ||
      (exp.skills && exp.skills.some((s) => s.toLowerCase().includes(q))) ||
      (exp.highlights && exp.highlights.some((h) => h.toLowerCase().includes(q)))
    );
  });

  const filteredEducations = educations.filter((edu) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const degree = getEducationDegree(edu.degree, language).toLowerCase();
    const field = getEducationField(edu.field, language).toLowerCase();

    return (
      edu.institution.toLowerCase().includes(q) ||
      degree.includes(q) ||
      field.includes(q) ||
      (edu.description && edu.description.toLowerCase().includes(q)) ||
      (edu.highlights && edu.highlights.some((h) => h.toLowerCase().includes(q)))
    );
  });

  const tabs = [
    { key: 'experience', label: t.timeline.tabWork, icon: Briefcase, count: filteredExperiences.length },
    { key: 'education', label: t.timeline.tabEducation, icon: GraduationCap, count: filteredEducations.length },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      {/* Tombol Navigasi Kembali ke Beranda */}
      <div className="mb-8">
        <Link
          href="/"
          onClick={() => {
            try {
              sessionStorage.setItem('skip_splash', 'true');
            } catch {}
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-parchment-dim hover:text-brass transition-colors tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{t.archive.backHome}</span>
        </Link>
      </div>

      {/* Header Halaman */}
      <div className="mb-10 pb-8 border-b border-brass/20 space-y-6">
        <AnimeTitleCard
          title={t.archive.timelineTitle}
          description={t.archive.timelineSubtitle}
          className="mb-0"
        />

        {/* Kontrol Pencarian & Tab Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Tab Filter (Pengalaman vs Pendidikan) */}
          <div className="flex items-center gap-2 select-none overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold tracking-wider transition-all duration-200 active:scale-95 shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'border-brass bg-brass text-white dark:text-void-950 shadow-brass-glow'
                      : 'border-brass/30 bg-white/80 dark:bg-void-950/80 text-slate-700 dark:text-parchment-dim hover:border-brass hover:text-slate-900 dark:hover:text-parchment'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-void-950' : 'text-brass'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-white dark:text-void-950' : 'bg-brass/10 text-brass'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Input Pencarian */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-brass/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.archive.searchTimeline}
              className="pl-10 pr-4 py-2 rounded-full border border-brass/25 bg-white/80 dark:bg-void-950/80 text-slate-900 dark:text-parchment text-xs font-mono placeholder:text-slate-400 dark:placeholder:text-parchment-dark focus:outline-none focus:border-brass transition-colors w-full shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Konten Timeline Lengkap */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute left-[19px] sm:left-[21px] top-6 bottom-6 w-px bg-gradient-to-b from-brass/50 via-brass/25 to-brass/10 pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="archive-experience"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 sm:space-y-10"
            >
              {filteredExperiences.length > 0 ? (
                filteredExperiences.map((exp, idx) => {
                  const trans = getExperienceTranslation(exp, t);
                  const role = trans?.role || exp.role;
                  const company = trans?.company || exp.company;
                  const desc = trans?.description || exp.description;
                  const highlights = trans?.highlights || exp.highlights;
                  const period = formatPeriod(exp.period, language);

                  return (
                    <motion.div
                      key={exp._id || idx}
                      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-start gap-4 sm:gap-7 group"
                    >
                      <div className="relative z-10 w-10 h-10 rounded-full border border-brass/40 bg-white dark:bg-void-950 flex items-center justify-center shrink-0 mt-1 group-hover:border-brass group-hover:scale-110 group-hover:shadow-brass-glow transition-all duration-300">
                        <div className="w-2.5 h-2.5 rounded-full bg-brass group-hover:bg-brass-light transition-colors" />
                      </div>

                      <div className="flex-1 rounded-2xl p-5 sm:p-7 border border-brass/20 bg-white/70 dark:bg-void-950/65 backdrop-blur-md hover:border-brass/60 hover:bg-white/85 dark:hover:bg-void-950/80 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-brass/15">
                          <div>
                            <h4 className="text-xl sm:text-2xl font-serif font-bold text-brass dark:text-parchment group-hover:text-brass-light transition-colors">
                              {role}
                            </h4>
                            <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-brass-muted mt-1 font-medium flex items-center flex-wrap gap-2">
                              <span className="font-semibold text-slate-800 dark:text-parchment">{company}</span>
                              {exp.location && (
                                <span className="inline-flex items-center gap-1 text-parchment-dim">
                                  <MapPin className="w-3 h-3 text-brass/70" />
                                  <span>{exp.location}</span>
                                </span>
                              )}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-brass/35 bg-brass/10 dark:bg-void-950/80 text-brass text-xs sm:text-sm font-mono font-bold tracking-wider shadow-sm">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{period}</span>
                            </div>
                            {exp.isCurrent && (
                              <span className="px-2.5 py-0.5 rounded-full bg-brass/15 border border-brass/40 text-[10px] text-brass-light font-bold font-mono tracking-wider uppercase">
                                {t.timeline.activeStatus}
                              </span>
                            )}
                          </div>
                        </div>

                        {desc && (
                          <p className="mt-3.5 text-xs sm:text-sm text-slate-700 dark:text-parchment-dim leading-relaxed font-sans">
                            {desc}
                          </p>
                        )}

                        {highlights && highlights.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-700 dark:text-parchment-dim leading-relaxed">
                                <span className="text-brass mt-1 shrink-0 text-sm">•</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}

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
                  );
                })
              ) : (
                <div className="text-center py-16 border border-brass/15 rounded-2xl bg-white/50 dark:bg-void-950/40">
                  <p className="text-sm font-mono text-parchment-dim">
                    {t.archive.noTimelineMatch} &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="archive-education"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 sm:space-y-10"
            >
              {filteredEducations.length > 0 ? (
                filteredEducations.map((edu, idx) => {
                  const degree = getEducationDegree(edu.degree, language);
                  const field = getEducationField(edu.field, language);
                  const period = formatPeriod(edu.period, language);

                  return (
                    <motion.div
                      key={edu._id || idx}
                      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-start gap-4 sm:gap-7 group"
                    >
                      <div className="relative z-10 w-10 h-10 rounded-full border border-brass/40 bg-white dark:bg-void-950 flex items-center justify-center shrink-0 mt-1 group-hover:border-brass group-hover:scale-110 group-hover:shadow-brass-glow transition-all duration-300">
                        <div className="w-2.5 h-2.5 rounded-full bg-brass group-hover:bg-brass-light transition-colors" />
                      </div>

                      <div className="flex-1 rounded-2xl p-5 sm:p-7 border border-brass/20 bg-white/70 dark:bg-void-950/65 backdrop-blur-md hover:border-brass/60 hover:bg-white/85 dark:hover:bg-void-950/80 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-brass/15">
                          <div>
                            <h4 className="text-xl sm:text-2xl font-serif font-bold text-brass dark:text-parchment group-hover:text-brass-light transition-colors">
                              {edu.institution}
                            </h4>
                            <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-brass-muted mt-1 font-medium">
                              <span className="font-semibold text-slate-800 dark:text-parchment">{degree}</span>
                              {field && <span> — {field}</span>}
                            </p>
                          </div>

                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-brass/35 bg-brass/10 dark:bg-void-950/80 text-brass text-xs sm:text-sm font-mono font-bold tracking-wider self-start sm:self-center shrink-0 shadow-sm">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{period}</span>
                          </div>
                        </div>

                        {edu.description && (
                          <p className="mt-3.5 text-xs sm:text-sm text-slate-700 dark:text-parchment-dim leading-relaxed font-sans">
                            {edu.description}
                          </p>
                        )}

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
                  );
                })
              ) : (
                <div className="text-center py-16 border border-brass/15 rounded-2xl bg-white/50 dark:bg-void-950/40">
                  <p className="text-sm font-mono text-parchment-dim">
                    {t.archive.noTimelineMatch} &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
