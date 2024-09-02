import _ from 'lodash';
import { ISocialMedia } from 'src/modules/company-profile/interfaces';

export const convertKeysToCamelCase = (obj) => _.mapKeys(obj, (value, key) => _.camelCase(key));

export function generateRandomPassword() {
  const length = 10;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const specialChars = '!@$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';

  // Ensure at least one uppercase letter
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));

  // Ensure at least one special character
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

  // Fill the rest of the password
  for (let i = 2; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Shuffle the password to mix the special character and uppercase letter
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
}

export const getDomain = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    // console.log({ parsedUrl })
    const domainUrl = `${parsedUrl.protocol ?? 'http:'}//${parsedUrl.hostname}`;

    return domainUrl;
  } catch (e) {
    return null;
  }
};

export function isValidSocialMediaUrl(url: string, platform: keyof ISocialMedia): boolean {
  const patterns: Record<keyof ISocialMedia, RegExp> = {
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com(\/.*)?$/i,
    facebook: /^(https?:\/\/)?(www\.)?facebook\.com(\/.*)?$/i,
    youtube: /^(https?:\/\/)?(www\.)?youtube\.com(\/.*)?$/i,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com(\/.*)?$/i,
  };

  const platformPattern = patterns[platform];
  if (!platformPattern) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  return platformPattern.test(url);
}

export function isS3Url(str: string): boolean {
  const s3UrlPattern = /^https:\/\/[a-zA-Z0-9.-]+\.s3\.amazonaws\.com\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=%\s-]*$/;
  return s3UrlPattern.test(str);
}
