import dynamic from 'next/dynamic';
import { getPortfolioData } from '@/lib/sanityFetch';
import { getGitHubContributions } from '@/lib/githubContributions';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingSocialDock } from '@/components/layout/FloatingSocialDock';
import { HeroSection } from '@/components/sections/HeroSection';
import { SplashScreen } from '@/components/celestial/SplashScreen';
import { MilkyWayGalaxy } from '@/components/celestial/MilkyWayGalaxy';

const TechStackSection = dynamic(
  () => import('@/components/sections/TechStackSection').then((m) => m.TechStackSection),
  { ssr: true }
);

const ProjectsSection = dynamic(
  () => import('@/components/sections/ProjectsSection').then((m) => m.ProjectsSection),
  { ssr: true }
);

const GitHubContributionsSection = dynamic(
  () => import('@/components/sections/GitHubContributionsSection').then((m) => m.GitHubContributionsSection),
  { ssr: true }
);

const TimelineSection = dynamic(
  () => import('@/components/sections/TimelineSection').then((m) => m.TimelineSection),
  { ssr: true }
);

export const revalidate = 3600; // ISR revalidation setiap 1 jam (atau instan via on-demand webhook)

export default async function HomePage() {
  const [data, githubContributions] = await Promise.all([
    getPortfolioData(),
    getGitHubContributions('DzikryFy'),
  ]);

  return (
    <div className="relative min-h-screen bg-transparent text-parchment overflow-x-hidden">
      {/* 0. Cinematic Celestial Splash Screen (Concentric Star Trails & Warp Fade-Out) */}
      <SplashScreen />

      {/* 1. Global Solar System Canvas Background (z-0, pointer-events-none) */}
      <MilkyWayGalaxy
        mode="fullscreen"
        showHUD={true}
        contentTargetId="main-content"
      />

      {/* 2. Navbar Layer */}
      <Navbar
        monogram={data.profile.name?.[0] || 'D'}
        name={data.profile.name}
      />

      {/* 2.5 Floating Quick Social Dock (Pojok Kanan Bawah, di atas Telemetri/Koordinat) */}
      <FloatingSocialDock profile={data.profile} />

      {/* 3. Main Content Layer (Z-10, Transparent) */}
      <main id="main-content" className="relative z-10 bg-transparent">
        {/* Bagian Utama: Tentang Saya (Profil, Bio, Metrik, & Foto) */}
        <HeroSection
          profile={data.profile}
          projectCount={data.projects?.length || 3}
        />

        {/* Marquee Ticker: Tech Stack & Keahlian (Langsung di bawah Profile) */}
        <TechStackSection techStack={data.techStack} />

        {/* Bagian 01: Proyek Unggulan */}
        <ProjectsSection projects={data.projects} />

        {/* Bagian Interaktif: Kalender Kontribusi & Aktivitas GitHub */}
        <GitHubContributionsSection initialData={githubContributions} />

        {/* Bagian 02: Pengalaman & Pendidikan */}
        <TimelineSection
          experiences={data.experiences}
          educations={data.educations}
        />
      </main>

      {/* 4. Occlusion Layer Footer (Z-20, Solid Dynamic Occlusion) */}
      <Footer
        profile={data.profile}
        astronomyQuote={data.siteSettings.astronomyQuote}
        className="relative z-20 bg-footer"
      />
    </div>
  );
}