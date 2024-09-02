import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { EventService, S3Service, SESService } from './providers';
import { UserModule } from '../user';

@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 24 * 60 * 60 * 1000,
    }),
    UserModule,
  ],
  providers: [S3Service, SESService, EventService],
  exports: [S3Service, SESService, CacheModule, EventService],
})
export class GlobalModule {}
