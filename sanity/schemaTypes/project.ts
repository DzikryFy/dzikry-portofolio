import { defineType, defineField } from './helper';

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'japaneseTitle',
      title: 'Tag Kategori / Sub-judul Proyek',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Extended Manuscript Notes',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tech Stack Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Source Code / Repository URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured in Main Orbit?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'epoch',
      title: 'Astronomical Epoch (e.g. Cycle 2024)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'japaneseTitle',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: subtitle || '',
        media: media && typeof media === 'object' && media.asset ? media : undefined,
      };
    },
  },
});
