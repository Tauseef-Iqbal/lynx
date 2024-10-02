import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/typeorm/models';

@Injectable()
export class CompanyProfileGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const httpReq = context.switchToHttp();
    const request = httpReq.getRequest();

    const user: UserEntity = request.user;

    if (!user?.companyProfile?.id) throw new HttpException('You must have a company profile created to perform this action.', HttpStatus.UNPROCESSABLE_ENTITY);

    return true;
  }
}
