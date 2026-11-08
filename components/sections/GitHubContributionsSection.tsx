'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitHubContributionsData, ContributionDay } from '@/lib/githubContributions';
import { Github, ExternalLink, Flame } from 'lucide-react';

interface GitHubContributionsSectionProps {
  initialData?: GitHubContributionsData;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEKDAY_LABELS = [
  { dayIndex: 1, label: 'Mon' },
  { dayIndex: 3, label: 'Wed' },
  { dayIndex: 5, label: 'Fri' },
];

export const GitHubContributionsSection: React.FC<GitHubContributionsSectionProps> = ({
  initialData,
}) => {
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
          headers.push({ weekIndex: wIdx, label: MONTH_NAMES[m] });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksArr, monthHeaders: headers };
  }, [data.contributions]);

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return new Intl.DateTimeFormat('id-ID', {
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
        return 'bg-[#26a641] border border-[#39d353]/50 shadow-[0_0_6px_rgba(38,166,65,0.35)]';
      case 4:
        return 'bg-[#39d353] border border-[#39d353] shadow-[0_0_10px_rgba(57,211,83,0.6)]';
      default:
        return 'bg-slate-200/80 dark:bg-[#161b22] border border-slate-300/40 dark:border-white/[0.04]';
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
          className="relative rounded-2xl border border-brass/25 bg-white/70 dark:bg-void-950/60 backdrop-blur-md p-5 sm:p-7 shadow-sm overflow-hidden"
        >
          {/* Header Kalender Kontribusi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-brass/15">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-brass/35 bg-brass/10 dark:bg-void-900 flex items-center justify-center text-brass shadow-sm">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-parchment tracking-tight flex items-center gap-2">
                  <span>GitHub Contributions:</span>
                </h3>
                <a
                  href="https://github.com/DzikryFy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-brass hover:text-brass-light transition-colors group"
                  title="Lihat profil GitHub DzikryFy"
                >
                  <span>@DzikryFy</span>
                  <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Badge Total Kontribusi */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold self-start sm:self-auto select-none shadow-sm">
              <Flame className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>{data.totalContributions} kontribusi setahun terakhir</span>
            </div>
          </div>

          {/* Area Grid Scrollable (Nyaman di Mobile & Desktop) */}
          <div className="relative overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brass/20 scrollbar-track-transparent">
            <div className="min-w-[720px] select-none">
              {/* Baris Nama Bulan */}
              <div className="flex items-center mb-2 pl-7 sm:pl-8 text-[11px] font-mono text-slate-500 dark:text-parchment-dim h-4 relative">
                {monthHeaders.map((m, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `calc(${m.weekIndex * 13.5}px + 28px)` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Grid 7 Baris Hari x Kolom Pekan */}
              <div className="flex items-start gap-1">
                {/* Kolom Label Hari (Mon, Wed, Fri) */}
                <div className="flex flex-col gap-1 w-6 sm:w-7 text-[9px] font-mono text-slate-400 dark:text-parchment-dim/60 pt-0.5">
                  <span className="h-3 flex items-center justify-end pr-1 opacity-0">Sun</span>
                  <span className="h-3 flex items-center justify-end pr-1">Mon</span>
                  <span className="h-3 flex items-center justify-end pr-1 opacity-0">Tue</span>
                  <span className="h-3 flex items-center justify-end pr-1">Wed</span>
                  <span className="h-3 flex items-center justify-end pr-1 opacity-0">Thu</span>
                  <span className="h-3 flex items-center justify-end pr-1">Fri</span>
                  <span className="h-3 flex items-center justify-end pr-1 opacity-0">Sat</span>
                </div>

                {/* Kolom-Kolom Pekan (Weeks) */}
                <div className="flex items-center gap-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return <div key={dIdx} className="w-3 h-3 rounded-[2.5px] opacity-0" />;
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
                            className={`w-3 h-3 rounded-[2.5px] transition-transform duration-150 cursor-pointer hover:scale-125 hover:z-20 ${getCellColor(
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-brass/10 text-xs font-mono text-slate-500 dark:text-parchment-dim">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-parchment">
                    {data.totalContributions} contributions
                  </span>{' '}
                  in the last year
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto text-[11px]">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-200 dark:bg-[#161B22] border border-slate-300/40 dark:border-white/[0.04]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
                  <span>More</span>
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
              ? `${hoveredCell.day.count} kontribusi`
              : 'Tidak ada kontribusi'}
          </div>
          <div className="text-[10px] text-parchment-dim">
            {formatDate(hoveredCell.day.date)}
          </div>
        </div>
      )}
    </section>
  );
};
