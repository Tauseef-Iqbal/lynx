import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalStructureController } from './legal-structure.controller';
import { LegalStructureService } from './legal-structure.service';
import { CPLegalStructureEntity, CpLegalStructureOrgFacilityEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPLegalStructureEntity, CpLegalStructureOrgFacilityEntity])],
  controllers: [LegalStructureController],
  providers: [LegalStructureService],
})
export class CompanyProfileLegalStructureModule {}
