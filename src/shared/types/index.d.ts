import { ConfigService } from '@nestjs/config';
import { IAssets, IAssetsMetadata } from 'src/modules/company-profile/interfaces';
import { S3Service } from 'src/modules/global/providers';

export type ParamsToHandleAddFiles = {
  incomingFiles?: Express.Multer.File[];
  incomingS3AndBase64: (string | IAssets)[];
  keyPrefix: string;
  configService: ConfigService;
  s3Service: S3Service;
  assetsMetadata?: IAssetsMetadata[];
};

export type ParamsToHandleUpdateFiles = {
  existingFiles: (string | IAssets)[];
  incomingFiles?: Express.Multer.File[];
  incomingS3AndBase64: (string | IAssets)[];
  keyPrefix: string;
  configService: ConfigService;
  s3Service: S3Service;
  assetsMetadata?: IAssetsMetadata[];
};
