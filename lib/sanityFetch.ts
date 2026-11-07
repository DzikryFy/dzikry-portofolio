import { cache } from 'react';
import { client } from '@/sanity/client';
import { portfolioQuery } from '@/sanity/queries';
import { fallbackPortfolioData } from './fallbackData';
import { PortfolioData } from '@/types';

/**
 * Mengambil data portofolio dari Sanity dengan:
 * 1. React.cache() -> Request memoization & deduplikasi query dalam 1 siklus render halaman
 * 2. Next.js Extended Fetch Cache -> ISR revalidation berkala (1 jam / 3600 detik)
 * 3. Next.js Cache Tags -> Memungkinkan on-demand revalidation instan via Sanity webhook
 */
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  if (!client) {
    return fallbackPortfolioData;
  }

  try {
    const data = await client.fetch<Partial<PortfolioData>>(
      portfolioQuery,
      {},
      {
        next: {
          revalidate: 3600, // ISR Cache selama 1 jam (3600s)
          tags: ['portfolio-content', 'project', 'profile', 'experience', 'techStack', 'education'],
        },
      }
    );

    return {
      profile: data?.profile?.name ? (data.profile as any) : fallbackPortfolioData.profile,
      projects: data?.projects && data.projects.length > 0 ? data.projects : fallbackPortfolioData.projects,
      experiences: data?.experiences && data.experiences.length > 0 ? data.experiences : fallbackPortfolioData.experiences,
      educations: data?.educations && data.educations.length > 0 ? data.educations : fallbackPortfolioData.educations,
      techStack: data?.techStack && data.techStack.length > 0 ? data.techStack : fallbackPortfolioData.techStack,
      siteSettings: data?.siteSettings?.title ? data.siteSettings : fallbackPortfolioData.siteSettings,
    };
  } catch (error) {
    console.warn('Sanity fetch failed or not configured, using fallback data:', error);
    return fallbackPortfolioData;
  }
});
