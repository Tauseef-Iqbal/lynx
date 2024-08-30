import { Global, Module } from '@nestjs/common';
import { S3Service, SESService } from './providers';

@Global()
@Module({
  providers: [S3Service, SESService],
  exports: [S3Service, SESService],
})
export class GlobalModule {}
