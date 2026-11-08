import { NextResponse } from 'next/server';
import { getGitHubContributions } from '@/lib/githubContributions';

export const revalidate = 3600;

export async function GET() {
  const data = await getGitHubContributions('DzikryFy');
  return NextResponse.json(data);
}
