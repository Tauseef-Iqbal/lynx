import { ISocialMedia } from 'src/modules/company-profile/interfaces';
import { isValidSocialMediaUrl } from './basic.utils';

export function validateAndTransformSocialMedia(value: any): ISocialMedia | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const validKeys: (keyof ISocialMedia)[] = ['linkedin', 'facebook', 'youtube', 'instagram'];
  const transformedObject: ISocialMedia = {};

  for (const key of validKeys) {
    if (key in value) {
      const url = value[key];
      if (typeof url !== 'string' || !isValidSocialMediaUrl(url, key)) {
        throw new Error(`Invalid URL for ${key}.`);
      }
      transformedObject[key] = url;
    }
  }

  return transformedObject;
}
