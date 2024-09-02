import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/typeorm/models';

@Injectable()
export class CompanyProfileGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;

    if (!user?.companyProfile?.id) {
      throw new ForbiddenException('You must have a company profile created to perform this action.');
    }

    return true;
  }
}
