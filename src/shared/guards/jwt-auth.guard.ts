import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { UserService } from 'src/modules/user';
import { UserEntity } from 'src/typeorm/models';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext) {
    console.log('first');
    const req = this.getRequest(context);

    let token = req?.headers['authorization'] || req?.headers['Authorization'];
    token = token?.replace('Bearer', '')?.trim();
    if (!token) throw new UnauthorizedException('Please authenticate');

    try {
      const payload = this.jwtService.verify(token);

      const cachedUser: string | UserEntity | undefined =
        //  this.configService.get('NODE_ENV') === 'production' ?
        await this.cacheManager.get(`user-${payload.id}`);
      //  : await this.userService.findById(payload.id);

      if (!cachedUser) throw new UnauthorizedException('Please authenticate');

      if (typeof cachedUser === 'string') {
        const user = JSON.parse(cachedUser);
        req.user = user as UserEntity;
        return true;
      }

      req.user = cachedUser as UserEntity;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Please authenticate');
    }
  }
}
