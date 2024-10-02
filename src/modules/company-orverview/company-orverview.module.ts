import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPCompanyOverviewEntity } from 'src/typeorm/models';
import { CompanyOverviewController } from './company-orverview.controller';
import { CompanyOverviewService } from './company-orverview.service';

@Module({
  imports: [TypeOrmModule.forFeature([CPCompanyOverviewEntity])],
  controllers: [CompanyOverviewController],
  providers: [CompanyOverviewService],
})
export class CompanyOrverviewModule {}
