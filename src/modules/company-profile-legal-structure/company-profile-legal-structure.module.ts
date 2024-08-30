import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfileLegalStructureController } from './company-profile-legal-structure.controller';
import { CompanyProfileLegalStructureService } from './company-profile-legal-structure.service';
import { CompanyProfileLegalStructureEntity, CpLegalStructureOrgFacilityEntity } from 'src/typeorm/models';
import { CompanyProfileLegalStructureOrgFacilityService } from './company-profile-legal-structure-org-facility.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProfileLegalStructureEntity, CpLegalStructureOrgFacilityEntity])],
  controllers: [CompanyProfileLegalStructureController],
  providers: [CompanyProfileLegalStructureService, CompanyProfileLegalStructureOrgFacilityService],
})
export class CompanyProfileLegalStructureModule {}
