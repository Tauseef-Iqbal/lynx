import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequiredSystemService } from './required-system.service';
import { RequiredSystemController } from './required-system.controller';
import { RequiredSystemBusinessClassificationEntity, RequiredSystemCertificationEntity, RequiredSystemEntity, RequiredSystemTypesEntity } from 'src/typeorm/models';
import { RequiredSystemBusinessClassificationService } from './re-business-classification.service';
import { RequiredSystemCertificationService } from './re-certificate.service';
import { RequiredSystemTypeService } from './re-system-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequiredSystemEntity, RequiredSystemBusinessClassificationEntity, RequiredSystemCertificationEntity, RequiredSystemTypesEntity])],
  controllers: [RequiredSystemController],
  providers: [RequiredSystemService, RequiredSystemBusinessClassificationService, RequiredSystemCertificationService, RequiredSystemTypeService],
})
export class RequiredSystemModule {}
