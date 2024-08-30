import { Module } from '@nestjs/common';
import { FundingSourcesService } from './funding-sources.service';
import { FundingSourcesController } from './funding-sources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPFundingSourcesEntity } from 'src/typeorm/models/cp-funding-sources.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CPFundingSourcesEntity])],
  providers: [FundingSourcesService],
  controllers: [FundingSourcesController],
})
export class FundingSourcesModule {}
