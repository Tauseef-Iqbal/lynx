import { S3Service } from 'src/modules/global/providers';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../constants';
import { ParamsToHandleAddFiles, ParamsToHandleUpdateFiles } from '../types';
import { isS3Url } from './basic.utils';

export const processFilesToAdd = async ({ incomingFiles = [], incomingS3AndBase64 = [], keyPrefix, configService, s3Service }: ParamsToHandleAddFiles): Promise<string[]> => {
  const uploadTasks: (() => Promise<void>)[] = [];
  const uploadedFiles: string[] = [];

  // 1. Process assets provided as files
  incomingFiles.forEach((file) => {
    const newKey = `${keyPrefix}/${file.originalname}`;
    const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`;
    uploadedFiles.push(fileUrl);
    uploadTasks.push(() => s3Service.uploadBuffer(file.buffer, newKey));
  });

  // 2. Process assets provided as Base64 strings
  incomingS3AndBase64.forEach((base64Asset) => {
    const { buffer, mimeType } = convertBase64ToBuffer(base64Asset);
    const extension = getFileExtension(mimeType);
    const newKey = `${keyPrefix}/${Date.now()}.${extension}`;
    const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`;
    uploadedFiles.push(fileUrl);
    uploadTasks.push(() => s3Service.uploadBuffer(buffer, newKey));
  });

  await Promise.all(uploadTasks.map((task) => task()));

  return uploadedFiles;
};

export const processCpLegalStructureFilesToAdd = async (user: any, files: Express.Multer.File[], legalStructure: string, s3Service: S3Service): Promise<string[]> => {
  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File ${file.originalname} exceeds the maximum size of ${MAX_FILE_SIZE_MB} MB.`);
    }
  });

  return Promise.all(
    files.map(async (file) => {
      const key = `${user.companyProfile.name}/${legalStructure}/${file.originalname}`;
      await s3Service.uploadBuffer(file.buffer, key);
      return `${process.env.AWS_S3_PUBLIC_LINK}${key}`;
    }),
  );
};

export const processFilesToUpdate = async ({ existingFiles = [], incomingFiles = [], incomingS3AndBase64, keyPrefix, configService, s3Service }: ParamsToHandleUpdateFiles): Promise<string[]> => {
  const existingAssets = new Set<string>(existingFiles);
  const incomingAssets = new Set<string>();
  const deleteTasks: (() => Promise<void>)[] = [];
  const uploadTasks: (() => Promise<void>)[] = [];

  // 1. Process assets provided as files
  incomingFiles.forEach((file) => {
    const newKey = `${keyPrefix}/${file.originalname}`;
    const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`;
    incomingAssets.add(fileUrl);

    const existingAsset = Array.from(existingAssets).find((asset) => asset.endsWith(`/${file.originalname}`));
    if (existingAsset) {
      deleteTasks.push(() => s3Service.deleteFile(newKey));
      existingAssets.delete(existingAsset);
    }

    uploadTasks.push(() => s3Service.uploadBuffer(file.buffer, newKey));
  });

  // 2. Process assets provided as S3 URLs or Base64 strings
  incomingS3AndBase64.forEach((asset) => {
    if (isS3Url(asset)) {
      if (!existingAssets.has(asset)) {
        throw new Error(`Asset URL not found in existing assets: ${asset}`);
      }
      incomingAssets.add(asset);
    } else {
      const { buffer, mimeType } = convertBase64ToBuffer(asset);
      const extension = getFileExtension(mimeType);
      const newKey = `${keyPrefix}/${Date.now()}.${extension}`;
      const fileUrl = `${configService.get<string>('AWS_S3_PUBLIC_LINK')}${newKey}`;
      incomingAssets.add(fileUrl);
      uploadTasks.push(() => s3Service.uploadBuffer(buffer, newKey));
    }
  });

  const assetsToDelete = Array.from(existingAssets).filter(
    (existingAsset) =>
      !Array.from(incomingAssets).some((incomingAsset) => {
        const existingKey = existingAsset.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop();
        const incomingKey = incomingAsset.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop();
        return existingKey === incomingKey;
      }),
  );

  assetsToDelete.forEach((assetToDelete) => {
    const keyToDelete = assetToDelete.split(configService.get<string>('AWS_S3_PUBLIC_LINK')).pop();
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
