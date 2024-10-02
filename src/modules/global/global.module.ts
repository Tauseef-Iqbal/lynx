import { Global, Module } from '@nestjs/common';
import { CacheModule, CacheModuleAsyncOptions, CacheStore } from '@nestjs/cache-manager';
import { EventService, S3Service, SESService } from './providers';
import { UserModule } from '../user';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    if (configService.get('NODE_ENV') === 'development') {
      const store = await redisStore({
        socket: {
          host: configService.get<string>('REDIS_HOST'),
          port: parseInt(configService.get<string>('REDIS_PORT')!),
        },

        password: configService.get('REDIS_PASSWORD'),
      });

      return {
        store: store as unknown as CacheStore,
        ttl: 24 * 60 * 60 * 60,
      };
    } else
      return {
        ttl: 24 * 60 * 60 * 60,
      };
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [CacheModule.registerAsync(RedisOptions), UserModule],
  providers: [S3Service, SESService, EventService],
  exports: [S3Service, SESService, CacheModule, EventService],
})
export class GlobalModule {}
