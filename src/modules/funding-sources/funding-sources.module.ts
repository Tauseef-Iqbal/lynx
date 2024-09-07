import { Module } from '@nestjs/common';
import { FundingSourcesService } from './funding-sources.service';
import { FundingSourcesController } from './funding-sources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPFundingSourcesEntity } from 'src/typeorm/models/cp-funding-sources.entity';
import { CPFundingSourcesForeignAffiliationEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPFundingSourcesEntity, CPFundingSourcesForeignAffiliationEntity])],
  providers: [FundingSourcesService],
  controllers: [FundingSourcesController],
})
export class FundingSourcesModule {}
