import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './env';

const imageBuilder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export const urlForImage = (source: any) => {
  if (!imageBuilder || !source) return '';
  return imageBuilder.image(source).auto('format').fit('max').url();
};
