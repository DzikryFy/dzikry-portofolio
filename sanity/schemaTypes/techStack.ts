import { defineType, defineField } from './helper';

export const techStackType = defineType({
  name: 'techStack',
  title: 'Tech Stack & Keahlian',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Teknologi',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend (UI & Logika Klien)', value: 'core' },
          { title: 'Backend & Data (Server, Database, API)', value: 'engine' },
          { title: 'DevOps & Tools (Cloud, CI/CD, Kontrol Versi)', value: 'navigation' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category Label (Optional override)',
      type: 'string',
    }),
    defineField({
      name: 'level',
      title: 'Tingkat Kemahiran (contoh: Mahir, Berpengalaman)',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Lucide Icon Name (e.g. Code2, Globe, Database, Server)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Usage / Role of this instrument',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
