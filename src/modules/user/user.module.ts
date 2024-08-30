import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CompanyEntity, SocialMediaEntity, UserEntity, UserRepresentationEntity } from 'src/typeorm/models';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    TypeOrmModule.forFeature([UserEntity, UserRepresentationEntity, CompanyEntity, SocialMediaEntity]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
