import { Module } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfileController } from './company-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfileEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProfileEntity])],
  providers: [CompanyProfileService],
  controllers: [CompanyProfileController],
})
export class CompanyProfileModule {}
