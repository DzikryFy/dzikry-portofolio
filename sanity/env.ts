export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const useCdn = process.env.NODE_ENV === 'production';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
