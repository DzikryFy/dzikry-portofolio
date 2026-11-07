'use client';

import React from 'react';
import { AnimeTitleCard } from '@/components/celestial/AnimeTitleCard';
import { Profile } from '@/types';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const stats = [
    { label: 'PENGALAMAN', value: '5+ Thn', desc: 'Software Engineering' },
    { label: 'PROYEK SELESAI', value: '25+', desc: 'Aplikasi Web & Sistem' },
  ];

  return (
    <section id="about" className="relative py-24 border-t border-brass/15 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi Profil */}
        <AnimeTitleCard
          title="TENTANG SAYA"
          description="Latar belakang profesional, fokus keahlian rekayasa perangkat lunak, dan pendekatan dalam membangun solusi digital."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Kolom Kiri: Biografi & Prinsip */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-parchment-dim font-sans text-sm sm:text-base leading-relaxed">
              {profile.bio && profile.bio.length > 0 ? (
                profile.bio.map((para, idx) => (
                  <p key={idx} className="relative pl-4 border-l border-brass/30">
                    {para}
                  </p>
                ))
              ) : (
                <p>
                  Sebagai insinyur perangkat lunak, saya mendedikasikan diri untuk merancang sistem yang efisien, handal, dan estetik.
                </p>
              )}
            </div>

            {/* Statistik Orbit */}
            <div className="pt-6 border-t border-brass/15 grid grid-cols-2 max-w-md gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-3 border border-brass/10 bg-void-950/40 rounded-sm flex flex-col"
                >
                  <span className="text-2xl font-serif font-bold text-brass-light">
                    {s.value}
                  </span>
                  <span className="text-[10px] font-mono text-parchment uppercase tracking-wider mt-1">
                    {s.label}
                  </span>
                  <span className="text-[9px] font-mono text-parchment-dark mt-0.5">
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Potret dengan Stempel Segel Heresi */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-sm border border-brass/30 bg-void-950 p-4 shadow-brass-glow">
              {/* Sudut Ornamen */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-brass" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-brass" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-brass" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-brass" />

              {/* Bingkai Potret */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-brass/20 bg-void-900">
                <img
                  src={profile.avatarUrl || '/profile.png'}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Catatan Telemetri */}
              <div className="mt-4 pt-3 border-t border-brass/15 flex items-center justify-between text-[11px] font-mono text-parchment-dim">
                <span className="text-brass">IDENTITAS: {profile.name.toUpperCase()}</span>
                <span>{profile.coordinates || '06°24\'LS 106°49\'BT'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
