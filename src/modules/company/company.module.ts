import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComapnyInfoEntity, CompanyEntity, CompanyResourceEntity, SocialMediaEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, SocialMediaEntity, CompanyResourceEntity, ComapnyInfoEntity])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
