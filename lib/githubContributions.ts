import fallbackData from './githubContributionsFallback.json';

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionsData {
  totalContributions: number;
  contributions: ContributionDay[];
}

/**
 * Mengambil data kontribusi GitHub publik secara real-time dengan caching 1 jam di server
 */
export async function getGitHubContributions(
  username: string = 'DzikryFy'
): Promise<GitHubContributionsData> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 }, // Caching 1 jam via Next.js ISR
      }
    );

    if (!res.ok) {
      throw new Error(`Gagal mengambil data kontribusi GitHub: ${res.statusText}`);
    }

    const json = await res.json();
    return {
      totalContributions: json.total?.lastYear || 319,
      contributions: json.contributions || (fallbackData.contributions as ContributionDay[]),
    };
  } catch (err) {
    console.warn('Menggunakan fallback data kontribusi GitHub:', err);
    return {
      totalContributions: fallbackData.total?.lastYear || 319,
      contributions: fallbackData.contributions as ContributionDay[],
    };
  }
}
