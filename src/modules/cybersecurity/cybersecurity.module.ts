import { Module } from '@nestjs/common';
import { CybersecurityService } from './cybersecurity.service';
import { CybersecurityController } from './cybersecurity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPCybersecurityEncryptionDetailsEntity, CPCybersecurityEntity, CPCybersecurityStandardsComplianceDetailsEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPCybersecurityEntity, CPCybersecurityStandardsComplianceDetailsEntity, CPCybersecurityEncryptionDetailsEntity])],
  providers: [CybersecurityService],
  controllers: [CybersecurityController],
})
export class CybersecurityModule {}
