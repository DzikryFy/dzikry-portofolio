import { defineType, defineField } from './helper';

export const educationType = defineType({
  name: 'education',
  title: 'Education & Academics',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution / University',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree / Certificate',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'field',
      title: 'Field of Study / Major',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Period (e.g. 2017 — 2021)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / Thesis / Focus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'highlights',
      title: 'Scholarly Honors / Activities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
