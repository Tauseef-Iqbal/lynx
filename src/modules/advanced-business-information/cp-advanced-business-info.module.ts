import { Module } from '@nestjs/common';
import { AdvancedBusinessInformationService } from './cp-advanced-business-info.service';
import { AdvancedBusinessInfoController } from './cp-advanced-business-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPAdvancedBusinessInformationEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPAdvancedBusinessInformationEntity])],
  providers: [AdvancedBusinessInformationService],
  controllers: [AdvancedBusinessInfoController],
})
export class BusinessInfoModule {}
