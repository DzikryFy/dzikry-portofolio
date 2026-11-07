import { defineType, defineField } from './helper';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Meta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'astronomyQuote',
      title: 'Hero Astronomy Quote',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Primary Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Geographic Location / Base',
      type: 'string',
    }),
    defineField({
      name: 'hankoText',
      title: 'Teks Stempel Segel (contoh: BUMI / SAH / D)',
      type: 'string',
      initialValue: 'BUMI',
    }),
  ],
});
