import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/modules/global/providers';

export type ParamsToHandleAddFiles = {
  incomingFiles?: Express.Multer.File[];
  incomingS3AndBase64: string[];
  keyPrefix: string;
  configService: ConfigService;
  s3Service: S3Service;
};

export type ParamsToHandleUpdateFiles = {
  existingFiles: string[];
  incomingFiles?: Express.Multer.File[];
  incomingS3AndBase64: string[];
  keyPrefix: string;
  configService: ConfigService;
  s3Service: S3Service;
};
