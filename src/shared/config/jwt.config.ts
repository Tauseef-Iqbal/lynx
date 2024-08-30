import { ConfigService } from '@nestjs/config';

export const getAccessJWTConfig = (configService: ConfigService) => {
  const accessJwtConfig = {
    secret: configService.get('JWT_ACCESS_SECRET'),
    signOptions: { algorithm: 'HS256' as const },
    verifyOptions: { algorithms: ['HS256' as const] },
  };
  return accessJwtConfig;
};
