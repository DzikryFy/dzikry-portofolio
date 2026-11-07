import type { Metadata } from 'next';
import { getPortfolioData } from '@/lib/sanityFetch';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MilkyWayGalaxy } from '@/components/celestial/MilkyWayGalaxy';
import { ProjectsArchive } from '@/components/sections/ProjectsArchive';

export const revalidate = 3600; // ISR revalidation setiap 1 jam (atau instan via on-demand webhook)

export const metadata: Metadata = {
  title: 'Seluruh Proyek — Dzikry Portofolio',
  description:
    'Daftar lengkap seluruh proyek, arsitektur sistem, dan aplikasi web yang telah dibangun oleh Dzikry.',
};

export default async function ProyekPage() {
  const data = await getPortfolioData();

  return (
    <div className="relative min-h-screen bg-transparent text-parchment overflow-x-hidden">
      {/* 1. Global Solar System Canvas Background (z-0, pointer-events-none) */}
      <MilkyWayGalaxy
        mode="fullscreen"
        showHUD={true}
        contentTargetId="main-projects-archive"
      />

      {/* 2. Navbar Layer */}
      <Navbar
        monogram={data.profile.name?.[0] || 'D'}
        name={data.profile.name}
      />

      {/* 3. Main Content Layer (z-10, bg-transparent) */}
      <main id="main-projects-archive" className="relative z-10 bg-transparent">
        <ProjectsArchive projects={data.projects} />
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
