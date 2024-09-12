import { Module } from '@nestjs/common';
import { CompanyOrverviewController } from './company-orverview.controller';
import { CompanyOrverviewService } from './company-orverview.service';
import { CompanyOverviewEntity } from 'src/typeorm/models';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyOverviewEntity])],
  controllers: [CompanyOrverviewController],
  providers: [CompanyOrverviewService],
})
export class CompanyOrverviewModule {}
