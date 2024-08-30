import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly privateBucketName: string;
  private readonly publicBucketName: string;
  private readonly logger = new Logger(S3Service.name);

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.privateBucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    this.publicBucketName = this.configService.get<string>('AWS_PUBLIC_S3_BUCKET_NAME');
  }

  async uploadFile(filePath: string, key: string, usePublicBucket = true): Promise<void> {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: usePublicBucket ? this.publicBucketName : this.privateBucketName,
      Key: key,
      Body: fileStream,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      await this.s3Client.send(command);
      this.logger.log(`File uploaded successfully at ${key}`);
    } catch (error) {
      this.logger.error('Error uploading file:', error);
      throw error;
    }
  }

  async getPresignedUrl(key: string, expiresIn = 3600, usePublicBucket = true): Promise<string> {
    const getObjectParams = {
      Bucket: usePublicBucket ? this.publicBucketName : this.privateBucketName,
      Key: key,
    };

    try {
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      this.logger.error('Error generating pre-signed URL:', error);
      throw error;
    }
  }

  async uploadBuffer(buffer: Buffer, key: string, usePublicBucket = true): Promise<void> {
    const uploadParams = {
      Bucket: usePublicBucket ? this.publicBucketName : this.privateBucketName,
      Key: key,
      Body: buffer,
    };
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: uploadParams,
      });

      await upload.done();
      this.logger.log(`Buffer uploaded successfully at ${key}`);
    } catch (error) {
      this.logger.error('Error uploading buffer:', error);
      throw error;
    }
  }

  async deleteFile(key: string, usePublicBucket = true): Promise<void> {
    const deleteParams = {
      Bucket: usePublicBucket ? this.publicBucketName : this.privateBucketName,
      Key: key,
    };

    try {
      const command = new DeleteObjectCommand(deleteParams);
      await this.s3Client.send(command);
      this.logger.log(`File deleted successfully at ${key}`);
    } catch (error) {
      this.logger.error('Error deleting file:', error);
      throw error;
    }
  }
}
