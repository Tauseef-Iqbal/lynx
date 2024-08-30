import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [CacheModule.register({ isGlobal: true, ttl: 86400 })],
})
export class GloabalCacheModule {}
