import { defineType, defineField } from './helper';

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (e.g. Depok, ID or Remote)',
      type: 'string',
    }),
    defineField({
      name: 'period',
      title: 'Time Period (e.g. 2023 — Present)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Currently Active Role?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Summary Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'highlights',
      title: 'Key Milestones & Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'skills',
      title: 'Instruments Used (Tech Skills)',
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
