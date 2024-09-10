import { S3Service } from 'src/modules/global/providers';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../constants';
import { ParamsToHandleAddFiles, ParamsToHandleUpdateFiles } from '../types';
import { isS3Url } from './basic.utils';
import { PreconditionFailedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const processFilesToAdd = async ({ incomingFiles = [], incomingS3AndBase64 = [], keyPrefix, configService, s3Service, assetsMetadata = [] }: ParamsToHandleAddFiles): Promise<any> => {
  const uploadTasks: (() => Promise<void>)[] = [];
  const uploadedFiles = [];

  // 1. Process assets provided as files
  incomingFiles.forEach((file, index) => {
    const metadata = assetsMetadata[index];
    let newKey: string;

    if (metadata) {
      if (incomingFiles.length !== assetsMetadata.length) throw new PreconditionFailedException('Assets to be uploaded must have the same length as AssetsMetada');
      newKey = `${keyPrefix}/${metadata.type}/${file.originalname}`;
      uploadedFiles.push({ url: `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`, type: metadata.type });
    } else {
      newKey = `${keyPrefix}/${file.originalname}`;
      uploadedFiles.push(`${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`);
    }
    uploadTasks.push(() => s3Service.uploadBuffer(file.buffer, newKey));
  });

  // 2. Process assets provided as Base64 strings
  incomingS3AndBase64.forEach((asset: any) => {
    const { buffer, mimeType } = convertBase64ToBuffer(typeof asset === 'string' ? asset : asset.url);
    const extension = getFileExtension(mimeType);
    const newKey = `${keyPrefix}/${asset.type ? `${asset.type}` : ''}/${Date.now()}.${extension}`;
    const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`;
    typeof asset === 'object' && asset !== null ? uploadedFiles.push({ url: fileUrl, type: asset.type }) : uploadedFiles.push(fileUrl);
    uploadTasks.push(() => s3Service.uploadBuffer(buffer, newKey));
  });

  await Promise.all(uploadTasks.map((task) => task()));

  return uploadedFiles;
};

export const processCpLegalStructureFilesToAdd = async (user: any, files: Express.Multer.File[], legalStructure: string, s3Service: S3Service, configService: ConfigService): Promise<string[]> => {
  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File ${file.originalname} exceeds the maximum size of ${MAX_FILE_SIZE_MB} MB.`);
    }
  });

  return Promise.all(
    files.map(async (file) => {
      const key = `${user.companyProfile.name}/${legalStructure}/${file.originalname}`;
      await s3Service.uploadBuffer(file.buffer, key);
      return `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${key}`;
    }),
  );
};

export const processFilesToUpdate = async ({ existingFiles = [], incomingFiles = [], incomingS3AndBase64 = [], keyPrefix, configService, s3Service, assetsMetadata = [] }: ParamsToHandleUpdateFiles): Promise<any> => {
  const existingAssets = new Set<any>(existingFiles);
  const incomingAssets = new Set<any>();
  const deleteTasks: (() => Promise<void>)[] = [];
  const uploadTasks: (() => Promise<void>)[] = [];

  // 1. Process assets provided as files
  incomingFiles.forEach((file, index) => {
    const metadata = assetsMetadata[index];
    let newKey: string;
    let newAsset: string | { url: string; type: string };

    if (metadata) {
      if (incomingFiles.length !== assetsMetadata.length) throw new PreconditionFailedException('Assets to be uploaded must have the same length as AssetsMetada');
      newKey = `${keyPrefix}/${metadata.type}/${file.originalname}`;
      newAsset = {
        url: `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`,
        type: metadata.type,
      };
    } else {
      newKey = `${keyPrefix}/${file.originalname}`;
      newAsset = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`;
    }

    incomingAssets.add(newAsset);

    const existingAsset = Array.from(existingAssets).find((asset) => {
      if (typeof asset === 'string') {
        return typeof newAsset === 'string' && asset === newAsset;
      } else {
        return typeof newAsset === 'object' && asset.type === newAsset.type && asset.url === newAsset.url;
      }
    });

    if (existingAsset) {
      const keyToDelete = typeof existingAsset === 'string' ? existingAsset.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop() : existingAsset.url.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop();
      if (keyToDelete) {
        deleteTasks.push(() => s3Service.deleteFile(keyToDelete));
      }
      existingAssets.delete(existingAsset);
    }

    uploadTasks.push(() => s3Service.uploadBuffer(file.buffer, newKey));
  });

  // 2. Process assets provided as S3 URLs or Base64 strings
  incomingS3AndBase64.forEach((asset) => {
    let assetUrl: string, assetType: string;

    if (typeof asset === 'string') {
      assetUrl = asset;
    } else if (typeof asset === 'object' && asset.url) {
      assetUrl = asset.url;
      assetType = asset.type;
    } else {
      throw new Error('Invalid asset format. Must be a string or an object with "url" property.');
    }

    if (isS3Url(assetUrl)) {
      console.log({ assetUrl, existingAssets });
      // const existingAsset = Array.from(existingAssets).find((existing) => (typeof existing === 'string' ? existing === assetUrl : existing.url === assetUrl && (!assetType || existing.type === assetType)));
      const existingAsset = Array.from(existingAssets).find((existing) => (typeof existing === 'string' ? existing === assetUrl : existing.url === assetUrl));
      // if (!existingAsset) {
      //   throw new Error(`Asset URL not found in existing assets: ${assetUrl}`);
      // }

      incomingAssets.add(assetType ? { type: assetType, url: assetUrl } : assetUrl);
      existingAssets.delete(existingAsset);
    } else {
      const { buffer, mimeType } = convertBase64ToBuffer(assetUrl);
      const extension = getFileExtension(mimeType);
      const newKey = `${keyPrefix}/${assetType ? `${assetType}` : ''}/${Date.now()}.${extension}`;
      const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`;

      incomingAssets.add(assetType ? { type: assetType, url: fileUrl } : fileUrl);
      uploadTasks.push(() => s3Service.uploadBuffer(buffer, newKey));
    }
  });

  const assetsToDelete = Array.from(existingAssets).filter(
    (existingAsset) =>
      !Array.from(incomingAssets).some((incomingAsset) => {
        const existingKey = typeof existingAsset === 'string' ? existingAsset.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop() : existingAsset.url.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop();
        const incomingKey = typeof incomingAsset === 'string' ? incomingAsset.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop() : incomingAsset.url.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop();
        return existingKey === incomingKey;
      }),
  );

  assetsToDelete.forEach((assetToDelete) => {
    const keyToDelete = typeof assetToDelete === 'string' ? assetToDelete.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop() : assetToDelete.url.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop();
    if (keyToDelete) {
      deleteTasks.push(() => s3Service.deleteFile(keyToDelete));
    }
  });

  await Promise.all(deleteTasks.map((task) => task()));
  await Promise.all(uploadTasks.map((task) => task()));

  return Array.from(incomingAssets);
};

export const convertBase64ToBuffer = (base64: string): { buffer: Buffer; mimeType: string } => {
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }
  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  return { buffer, mimeType };
};

export const getFileExtension = (mimeType: string): string => {
  switch (mimeType) {
    // Images
    case 'image/png':
      return 'png';
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/gif':
      return 'gif';
    case 'image/bmp':
      return 'bmp';
    case 'image/webp':
      return 'webp';
    case 'image/tiff':
      return 'tiff';
    case 'image/svg+xml':
      return 'svg';

    // Audio
    case 'audio/mpeg':
      return 'mp3';
    case 'audio/wav':
      return 'wav';
    case 'audio/ogg':
      return 'ogg';
    case 'audio/aac':
      return 'aac';
    case 'audio/flac':
      return 'flac';

    // Video
    case 'video/mp4':
      return 'mp4';
    case 'video/webm':
      return 'webm';
    case 'video/ogg':
      return 'ogv';
    case 'video/x-msvideo':
      return 'avi';
    case 'video/quicktime':
      return 'mov';
    case 'video/x-matroska':
      return 'mkv';

    // Documents
    case 'application/pdf':
      return 'pdf';
    case 'application/msword':
      return 'doc';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'docx';
    case 'application/vnd.ms-excel':
      return 'xls';
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'xlsx';
    case 'application/vnd.ms-powerpoint':
      return 'ppt';
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'pptx';
    case 'text/plain':
      return 'txt';
    case 'text/html':
      return 'html';
    case 'text/csv':
      return 'csv';

    // Compressed files
    case 'application/zip':
      return 'zip';
    case 'application/x-7z-compressed':
      return '7z';
    case 'application/gzip':
      return 'gz';
    case 'application/x-tar':
      return 'tar';
    case 'application/x-rar-compressed':
      return 'rar';

    // JSON, XML, and others
    case 'application/json':
      return 'json';
    case 'application/xml':
    case 'text/xml':
      return 'xml';

    // Default case
    default:
      return 'bin'; // Default extension if no match
  }
};
