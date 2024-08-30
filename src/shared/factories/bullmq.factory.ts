import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const getBullMQFactory = (configService: ConfigService) => {
  return () => {
    const redisURI = `redis://${configService.get<string>('REDIS_USER')}:${configService.get<string>('REDIS_PASSWORD')}@${configService.get<string>('REDIS_HOST')}:${configService.get<string>('REDIS_PORT')}`;
    return {
      connection: new Redis(redisURI, {
        maxRetriesPerRequest: null,
      }),
    };
  };
};
