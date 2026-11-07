import { defineType, defineField } from './helper';

export const profileType = defineType({
  name: 'profile',
  title: 'Profile & Philosophy',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'kanjiName',
      title: 'Monogram / Initial Inscription (e.g. D / DZ)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Astronomical Subtitle / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Celestial Coordinates (e.g. 06°24\'LS 106°49\'BT)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biography Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'quote',
      title: 'Kutipan Filosofis',
      type: 'object',
      fields: [
        { name: 'text', title: 'Teks Kutipan', type: 'string' },
        { name: 'translation', title: 'Terjemahan / Makna', type: 'string' },
        { name: 'author', title: 'Sumber / Atribusi', type: 'string' },
      ],
    }),
    defineField({
      name: 'avatar',
      title: 'Portrait / Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'resume',
      title: 'Curriculum Vitae (PDF)',
      type: 'file',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'twitter', title: 'X / Twitter URL', type: 'url' },
      ],
    }),
  ],
});
