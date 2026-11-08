'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitHubContributionsData, ContributionDay } from '@/lib/githubContributions';
import { Github, ExternalLink, Flame } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface GitHubContributionsSectionProps {
  initialData?: GitHubContributionsData;
}

const MONTH_NAMES_ID = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

const MONTH_NAMES_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const GitHubContributionsSection: React.FC<GitHubContributionsSectionProps> = ({
  initialData,
}) => {
  const { language, t } = useLanguage();
  const [data] = useState<GitHubContributionsData>(
    initialData || { totalContributions: 319, contributions: [] }
  );

  const [hoveredCell, setHoveredCell] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  // Mengelompokkan kontribusi 365 hari ke dalam kolom pekan (53 minggu x 7 hari)
  const { weeks, monthHeaders } = useMemo(() => {
    const raw = data.contributions;
    if (!raw || raw.length === 0) {
      return { weeks: [], monthHeaders: [] };
    }

    const monthNames = language === 'en' ? MONTH_NAMES_EN : MONTH_NAMES_ID;
    const weeksArr: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Hari pertama dalam set data
    const firstDate = new Date(raw[0].date);
    const startDay = firstDate.getUTCDay(); // 0 = Minggu

    // Isi padding hari jika hari pertama bukan hari Minggu
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }

    for (const day of raw) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArr.push(currentWeek);
    }

    // Hitung posisi label bulan di atas kolom pekan yang sesuai
    const headers: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;

    weeksArr.forEach((w, wIdx) => {
      const firstValidDay = w.find((d) => d !== null);
      if (firstValidDay) {
        const d = new Date(firstValidDay.date);
        const m = d.getUTCMonth();
        if (m !== lastMonth) {
          headers.push({ weekIndex: wIdx, label: monthNames[m] });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksArr, monthHeaders: headers };
  }, [data.contributions, language]);

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-[#0e4429] border border-[#006d32]/40';
      case 2:
        return 'bg-[#006d32] border border-[#26a641]/40';
      case 3:
        return 'bg-[#26a641] border border-[#39d353]/50 shadow-[0_0_8px_rgba(38,166,65,0.4)]';
      case 4:
        return 'bg-[#39d353] border border-[#39d353] shadow-[0_0_12px_rgba(57,211,83,0.65)]';
      default:
        return 'bg-slate-200/80 dark:bg-[#161b22] border border-slate-300/40 dark:border-white/[0.05]';
    }
  };

  return (
    <section className="relative py-12 sm:py-16 border-t border-brass/15 bg-transparent scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-brass/25 bg-white/70 dark:bg-void-950/60 backdrop-blur-md p-5 sm:p-7 md:p-8 shadow-sm overflow-hidden"
        >
          {/* Header Kalender Kontribusi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-brass/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-brass/35 bg-brass/10 dark:bg-void-900 flex items-center justify-center text-brass shadow-sm">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-2xl text-parchment tracking-tight flex items-center gap-2">
                  <span>{t.github.title}</span>
                </h3>
                <a
                  href="https://github.com/DzikryFy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-brass hover:text-brass-light transition-colors group"
                  title="Lihat profil GitHub DzikryFy"
                >
                  <span>@DzikryFy</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Badge Total Kontribusi */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs sm:text-sm font-semibold self-start sm:self-auto select-none shadow-sm">
              <Flame className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>{data.totalContributions} {t.github.yearSummary}</span>
            </div>
          </div>

          {/* Area Grid Scrollable Luas & Proporsional */}
          <div className="relative overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-brass/25 scrollbar-track-transparent">
            <div className="min-w-[950px] sm:min-w-[1100px] lg:min-w-[1180px] select-none py-1">
              {/* Baris Nama Bulan (Tepat di Atas Kolom Pekan Terkait) */}
              <div className="flex items-center mb-2.5 pl-8 sm:pl-9 text-xs font-mono text-slate-500 dark:text-parchment-dim h-5">
                <div className="flex items-center gap-1.5 sm:gap-[6px]">
                  {weeks.map((_, wIdx) => {
                    const header = monthHeaders.find((m) => m.weekIndex === wIdx);
                    return (
                      <div key={wIdx} className="w-3.5 sm:w-4 md:w-[17px] relative">
                        {header && (
                          <span className="absolute left-0 top-0 whitespace-nowrap font-medium text-slate-600 dark:text-parchment-dim text-[11px] sm:text-xs">
                            {header.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grid 7 Baris Hari x 53 Kolom Pekan (Ukuran Lebih Besar & Proporsional) */}
              <div className="flex items-start gap-2">
                {/* Kolom Label Hari (Mon/Sen, Wed/Rab, Fri/Jum) */}
                <div className="flex flex-col gap-1.5 sm:gap-[6px] w-6 sm:w-7 text-[10px] sm:text-[11px] font-mono text-slate-400 dark:text-parchment-dim/60">
                  <span className="h-3.5 sm:h-4 md:h-[17px] flex items-center justify-end pr-1 opacity-0">Sun</span>
                  <span className="h-3.5 sm:h-4 md:h-[17px] flex items-center justify-end pr-1">
                    {language === 'en' ? 'Mon' : 'Sen'}
                  </span>
                  <span className="h-3.5 sm:h-4 md:h-[17px] flex items-center justify-end pr-1 opacity-0">Tue</span>
                  <span className="h-3.5 sm:h-4 md:h-[17px] flex items-center justify-end pr-1">
                    {language === 'en' ? 'Wed' : 'Rab'}
                  </span>
                  <span className="h-3.5 sm:h-4 md:h-[17px] flex items-center justify-end pr-1 opacity-0">Thu</span>
                  <span className="h-3.5 sm:h-4 md:h-[17px] flex items-center justify-end pr-1">
                    {language === 'en' ? 'Fri' : 'Jum'}
                  </span>
                  <span className="h-3.5 sm:h-4 md:h-[17px] flex items-center justify-end pr-1 opacity-0">Sat</span>
                </div>

                {/* Kolom-Kolom Pekan (Weeks) */}
                <div className="flex items-center gap-1.5 sm:gap-[6px]">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1.5 sm:gap-[6px]">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={dIdx}
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[17px] md:h-[17px] rounded-[3px] sm:rounded-[4px] opacity-0"
                            />
                          );
                        }

                        return (
                          <div
                            key={day.date}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredCell({
                                day,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 8,
                              });
                            }}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[17px] md:h-[17px] rounded-[3px] sm:rounded-[4px] transition-transform duration-150 cursor-pointer hover:scale-125 hover:z-30 hover:ring-2 hover:ring-brass/80 ${getCellColor(
                              day.level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Kalender: Total & Legenda Less/More */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-3.5 border-t border-brass/10 text-xs sm:text-sm font-mono text-slate-500 dark:text-parchment-dim">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-parchment">
                    {data.totalContributions} {language === 'en' ? 'contributions' : 'kontribusi'}
                  </span>{' '}
                  {language === 'en' ? 'in the last year' : 'dalam setahun terakhir'}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-mono">
                  <span>{t.github.less}</span>
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-slate-200/80 dark:bg-[#161B22] border border-slate-300/40 dark:border-white/[0.05]" />
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#0e4429] border border-[#006d32]/40" />
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#006d32] border border-[#26a641]/40" />
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#26a641] border border-[#39d353]/50" />
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#39d353] border border-[#39d353]" />
                  <span>{t.github.more}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Interactive Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full px-3 py-1.5 rounded-lg bg-void-950/95 text-parchment border border-brass/40 shadow-xl backdrop-blur-md text-[11px] font-mono whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: hoveredCell.x,
            top: hoveredCell.y,
          }}
        >
          <div className="font-bold text-brass-light">
            {hoveredCell.day.count > 0
              ? language === 'en'
                ? `${hoveredCell.day.count} contribution${hoveredCell.day.count > 1 ? 's' : ''}`
                : `${hoveredCell.day.count} kontribusi`
              : t.github.noContrib}
          </div>
          <div className="text-[10px] text-parchment-dim">
            {formatDate(hoveredCell.day.date)}
          </div>
        </div>
      )}
    </section>
  );
};
