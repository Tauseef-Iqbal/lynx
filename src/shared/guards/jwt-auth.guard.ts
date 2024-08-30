import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { UserEntity } from 'src/typeorm/models';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext) {
    const req = this.getRequest(context);

    let token = req?.headers['authorization'] || req?.headers['Authorization'];
    token = token?.replace('Bearer', '')?.trim();
    if (!token) throw new UnauthorizedException('Please authenticate');

    try {
      const payload = this.jwtService.verify(token);
      const cachedUser: string | undefined = await this.cacheManager.get(`user-${payload.sub}`);

      if (!cachedUser) throw new UnauthorizedException('Please authenticate');

      const user = JSON.parse(cachedUser);

      req.user = user as UserEntity;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Please authenticate');
    }
  }
}
