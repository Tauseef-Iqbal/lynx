import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import { FinancialHealthSectionFilesCategory } from 'src/modules/financial-health/enums';
import { S3Service } from 'src/modules/global/providers';
import { CompanyProfileEntity } from 'src/typeorm/models';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../constants';

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

export const processFilesToAdd = async (user: any, files: Express.Multer.File[], fileType: FinancialHealthSectionFilesCategory, s3Service: S3Service): Promise<string[]> => {
  const uploadedFileUrls: string[] = [];

  for (const file of files) {
    const key = `${user.companyProfile.name}/${fileType}/${file.originalname}`;
    await s3Service.uploadBuffer(file.buffer, key);
    const fileUrl = `${process.env.AWS_S3_PUBLIC_LINK}${key}`;
    uploadedFileUrls.push(fileUrl);
  }

  return uploadedFileUrls;
};

export const processCpLegalStructureFilesToAdd = async (user: any, files: Express.Multer.File[], legalStructure: string, s3Service: S3Service): Promise<string[]> => {
  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File ${file.originalname} exceeds the maximum size of ${MAX_FILE_SIZE_MB} MB.`);
    }
  });

  return await Promise.all(
    files.map(async (file) => {
      const key = `${user.companyProfile.name}/${legalStructure}/${file.originalname}`;
      await s3Service.uploadBuffer(file.buffer, key);
      return `${process.env.AWS_S3_PUBLIC_LINK}${key}`;
    }),
  );
};

export const processFilesToUpdate = async (companyProfile: CompanyProfileEntity, existingFiles: string[], files: Express.Multer.File[], fileCategory: FinancialHealthSectionFilesCategory, s3Service: S3Service, configService: ConfigService): Promise<string[]> => {
  const incomingFiles = [];

  for (const file of files) {
    const incomingBlobName = `${companyProfile.name}/${fileCategory}/${file.originalname}`;
    const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${incomingBlobName}`;
    incomingFiles.push(fileUrl);

    const existingFileIndex = existingFiles.findIndex((asset) => {
      const existingBlobName = asset.split(`${companyProfile.name}/${fileCategory}/`).pop();
      return existingBlobName === file.originalname;
    });

    if (existingFileIndex !== -1) {
      await s3Service.deleteFile(`${companyProfile.name}/${fileCategory}/${existingFiles[existingFileIndex].split(`${companyProfile.name}/${fileCategory}/`).pop()}`);
      existingFiles[existingFileIndex] = fileUrl;
    } else {
      existingFiles.push(fileUrl);
    }

    await s3Service.uploadBuffer(file.buffer, incomingBlobName);
  }

  const filesToDelete = existingFiles.filter((existingFile) => {
    const existingBlobName = existingFile.split(`${companyProfile.name}/${fileCategory}/`).pop();
    return !incomingFiles.some((incomingAsset) => {
      const incomingBlobName = incomingAsset.split(`${companyProfile.name}/${fileCategory}/`).pop();
      return existingBlobName === incomingBlobName;
    });
  });

  for (const assetToDelete of filesToDelete) {
    await s3Service.deleteFile(`${companyProfile.name}/${fileCategory}/${assetToDelete.split(`${companyProfile.name}/${fileCategory}/`).pop()}`);
    existingFiles.splice(existingFiles.indexOf(assetToDelete), 1);
  }

  return existingFiles;
};
