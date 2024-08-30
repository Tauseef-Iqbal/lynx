import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getAccessJWTConfig } from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getAccessJWTConfig(configService).secret,
    });
  }

  async validate(payload: any) {
    const cachedUser: string | undefined = await this.cacheManager.get(`user-${payload.sub}`);
    if (!cachedUser) throw new UnauthorizedException('Please authenticate');

    const user = JSON.parse(cachedUser);
    return user;
  }
}
