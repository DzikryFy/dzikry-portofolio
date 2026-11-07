import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'dzikry_celestial_studio',
  title: 'Orb: Arsip Astronomi CMS',
  projectId: projectId || 't689t86z',
  dataset: dataset || 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
