import { Experience, Education } from '@/types';
import { Dictionary, Language } from './dictionaries';

export const formatPeriod = (period: string, lang: Language): string => {
  if (!period || lang === 'id') return period;
  return period
    .replace(/Januari/gi, 'January')
    .replace(/Februari/gi, 'February')
    .replace(/Maret/gi, 'March')
    .replace(/April/gi, 'April')
    .replace(/Mei/gi, 'May')
    .replace(/Juni/gi, 'June')
    .replace(/Juli/gi, 'July')
    .replace(/Agustus/gi, 'August')
    .replace(/September/gi, 'September')
    .replace(/Oktober/gi, 'October')
    .replace(/November/gi, 'November')
    .replace(/Desember/gi, 'December')
    .replace(/Sekarang/gi, 'Present')
    .replace(/Saat ini/gi, 'Present');
};

export const getExperienceTranslation = (
  exp: Experience,
  t: Dictionary
) => {
  const c = (exp.company || '').toLowerCase();
  const r = (exp.role || '').toLowerCase();
  if (c.includes('ciptadra') || r.includes('pkl') || r.includes('intern')) {
    return t.timeline.items['ciptadra-softindo'];
  }
  if (c.includes('smkn 1') || r.includes('ekstrakurikuler') || r.includes('penaung')) {
    return t.timeline.items['smkn1-depok-org'];
  }
  if (c.includes('karang taruna') || r.includes('humas') || r.includes('masyarakat')) {
    return t.timeline.items['karang-taruna'];
  }
  return undefined;
};

export const getEducationDegree = (degree: string, lang: Language): string => {
  if (lang === 'id') return degree;
  if (/smk/i.test(degree)) return 'Vocational High School Diploma';
  return degree;
};

export const getEducationField = (field: string | undefined, lang: Language): string => {
  if (!field) return '';
  if (lang === 'id') return field;
  if (/rekayasa perangkat lunak|rpl/i.test(field)) return 'Software Engineering';
  return field;
};
