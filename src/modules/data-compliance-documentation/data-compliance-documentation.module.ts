import { Module } from '@nestjs/common';
import { DataComplianceDocumentationController } from './data-compliance-documentation.controller';
import { DataComplianceDocumentationService } from './data-compliance-documentation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataComplianceDocumentationEntity } from 'src/typeorm/models/cp-data-compliance-documentation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataComplianceDocumentationEntity])],
  controllers: [DataComplianceDocumentationController],
  providers: [DataComplianceDocumentationService],
})
export class DataComplianceDocumentationModule {}
