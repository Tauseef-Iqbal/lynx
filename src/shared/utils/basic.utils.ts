import _ from 'lodash';
import { S3Service } from 'src/modules/global/providers';
import { ISocialMedia } from 'src/modules/company-profile/interfaces';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/typeorm/models';

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
  if (!platformPattern) throw new Error(`Unsupported platform: ${platform}`);

  return platformPattern.test(url);
}

export const uploadFilesToS3 = async (user: any, files: Express.Multer.File[], folderName: string, s3Service: S3Service, configService: ConfigService, maxFileSizeBytes?: number, maxFileSizeMb?: number): Promise<string[]> => {
  files.forEach((file) => {
    if (file.size > maxFileSizeBytes) {
      throw new Error(`File ${file.originalname} exceeds the maximum size of ${maxFileSizeMb} MB.`);
    }
  });

  return Promise.all(
    files.map(async (file) => {
      const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
      const key = `${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/${sanitizedFilename}`;
      await s3Service.uploadBuffer(file.buffer, key);
      return `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${key}`;
    }),
  );
};

export const uploadSingleFileToS3 = async (user: any, file: Express.Multer.File, folderName: string, s3Service: S3Service, configService: ConfigService, maxFileSizeBytes?: number, maxFileSizeMb?: number): Promise<string> => {
  const allowedMimeTypes = ['image/png', 'image/jpeg'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only PNG and JPEG are allowed.');
  }

  if (file.size > maxFileSizeBytes) {
    throw new Error(`File ${file.originalname} exceeds the maximum size of ${maxFileSizeMb} MB.`);
  }

  const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
  const key = `${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/${sanitizedFilename}`;
  await s3Service.uploadBuffer(file.buffer, key);

  return `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${key}`;
};

export const singleFileToUpdate = async (user: any, file: Express.Multer.File, existingFile: string | null | undefined, folderName: string, s3Service: S3Service, configService: ConfigService, maxFileSizeBytes?: number, maxFileSizeMb?: number): Promise<string> => {
  existingFile = existingFile || '';

  const allowedMimeTypes = ['image/png', 'image/jpeg'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only PNG and JPEG are allowed.');
  }

  const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
  const blobPath = `${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/${sanitizedFilename}`;
  const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${blobPath}`;

  if (maxFileSizeBytes && file.size > maxFileSizeBytes) {
    throw new Error(`File ${file.originalname} exceeds the maximum size of ${maxFileSizeMb} MB.`);
  }

  const existingBlobName = existingFile ? existingFile.split(`${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/`).pop() : null;
  const fileAlreadyExists = existingBlobName === sanitizedFilename;

  // Handle existing file
  if (fileAlreadyExists) {
    await s3Service.deleteFile(blobPath); // Delete the old file
  } else {
    existingFile = fileUrl;
  }

  await s3Service.uploadBuffer(file.buffer, blobPath);

  return fileUrl;
};

export const filesToUpdate = async (user: any, files: Express.Multer.File[], existingFiles: string[] | null | undefined, folderName: string, s3Service: S3Service, configService: ConfigService, maxFileSizeBytes?: number, maxFileSizeMb?: number): Promise<string[]> => {
  const incomingFiles: string[] = [];

  // Initialize existingFiles if it's null or undefined
  existingFiles = existingFiles || [];

  for (const file of files) {
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
    const blobPath = `${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/${sanitizedFilename}`;
    const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${blobPath}`;
    incomingFiles.push(fileUrl);

    const existingFileIndex = existingFiles.findIndex((asset) => {
      if (!asset) {
        return false;
      }
      const existingBlobName = asset.split(`${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/`).pop();
      return existingBlobName === sanitizedFilename;
    });

    if (existingFileIndex !== -1) {
      await s3Service.deleteFile(blobPath);
      existingFiles[existingFileIndex] = fileUrl;
    } else {
      existingFiles.push(fileUrl);
    }

    if (file.size > maxFileSizeBytes) {
      throw new Error(`File ${file.originalname} exceeds the maximum size of ${maxFileSizeMb} MB.`);
    }

    await s3Service.uploadBuffer(file.buffer, blobPath);
  }

  // Determine files to delete
  const filesToDelete = existingFiles.filter((existingFile) => {
    const existingBlobName = existingFile.split(`${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/`).pop();
    return !incomingFiles.some((incomingAsset) => {
      const incomingBlobName = incomingAsset.split(`${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/`).pop();
      return existingBlobName === incomingBlobName;
    });
  });

  // Delete outdated files
  for (const file of filesToDelete) {
    await s3Service.deleteFile(file.split(`${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/`).pop());
    existingFiles.splice(existingFiles.indexOf(file), 1);
  }

  return existingFiles;
};

export const filesToDelete = async (user: any, urls: string[], s3Service: S3Service, folderName: string) => {
  for (const url of urls) {
    if (url) {
      const fileName = url.split(`${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/`).pop();
      if (fileName) {
        await s3Service.deleteFile(fileName);
      }
    }
  }
};

export function isS3Url(str: string): boolean {
  const s3UrlPattern = /^https:\/\/[a-zA-Z0-9.-]+\.s3\.amazonaws\.com\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=%\s-]*$/;
  return s3UrlPattern.test(str);
}

export const uploadSingleBase64ToS3 = async (user: UserEntity, base64File: string, folderName: string, s3Service: S3Service, configService: ConfigService, maxFileSizeBytes?: number, maxFileSizeMb?: number): Promise<string> => {
  const [metadata, base64Data] = base64File.split(',');
  const buffer = Buffer.from(base64Data, 'base64');

  if (buffer.length > maxFileSizeBytes) {
    throw new Error(`File exceeds the maximum size of ${maxFileSizeMb} MB.`);
  }

  const mimeType = metadata.match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const extension = mimeType.split('/')[1];

  const timestamp = Date.now();
  const sanitizedFilename = `file_${timestamp}.${extension}`;
  const key = `${user.companyProfile.name.replace(/\s+/g, '_')}/${folderName.replace(/\s+/g, '_')}/${sanitizedFilename}`;

  // Upload to S3
  await s3Service.uploadBuffer(buffer, key);
  const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${key}`;

  return fileUrl;
};
