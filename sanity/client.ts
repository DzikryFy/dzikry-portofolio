import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './env';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      perspective: 'published',
    })
  : null;
