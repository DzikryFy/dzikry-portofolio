import type { Metadata } from 'next';
import { getPortfolioData } from '@/lib/sanityFetch';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingSocialDock } from '@/components/layout/FloatingSocialDock';
import { MilkyWayGalaxy } from '@/components/celestial/MilkyWayGalaxy';
import { TimelineArchive } from '@/components/sections/TimelineArchive';

export const revalidate = 3600; // ISR revalidation setiap 1 jam

export const metadata: Metadata = {
  title: 'Seluruh Pengalaman & Pendidikan — Dzikry Portofolio',
  description:
    'Daftar lengkap riwayat karir profesional, pengalaman implementasi sistem perangkat lunak, peran kepemimpinan organisasi, dan latar belakang akademik Dzikry.',
};

export default async function PendidikanPengalamanPage() {
  const data = await getPortfolioData();

  return (
    <div className="relative min-h-screen bg-transparent text-parchment overflow-x-hidden">
      {/* 1. Global Solar System Canvas Background (z-0, pointer-events-none) */}
      <MilkyWayGalaxy
        mode="fullscreen"
        showHUD={true}
        contentTargetId="main-timeline-archive"
      />

      {/* 2. Navbar Layer */}
      <Navbar
        monogram={data.profile.name?.[0] || 'D'}
        name={data.profile.name}
      />

      {/* 2.5 Floating Social Dock */}
      <FloatingSocialDock profile={data.profile} />

      {/* 3. Main Content Layer (z-10, bg-transparent) */}
      <main id="main-timeline-archive" className="relative z-10 bg-transparent">
        <TimelineArchive
          experiences={data.experiences}
          educations={data.educations}
        />
      </main>

      {/* 4. Occlusion Layer Footer (z-20, Solid Dynamic Occlusion) */}
      <Footer
        profile={data.profile}
        astronomyQuote={data.siteSettings.astronomyQuote}
        className="relative z-20 bg-footer"
      />
    </div>
  );
}
