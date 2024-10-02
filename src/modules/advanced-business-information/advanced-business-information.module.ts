import { Module } from '@nestjs/common';
import { AdvancedBusinessInformationService } from './advanced-business-information.service';
import { AdvancedBusinessInfoController } from './advanced-business-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPAdvancedBusinessInformationEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPAdvancedBusinessInformationEntity])],
  providers: [AdvancedBusinessInformationService],
  controllers: [AdvancedBusinessInfoController],
})
export class BusinessInfoModule {}
