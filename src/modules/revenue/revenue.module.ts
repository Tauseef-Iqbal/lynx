import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPRevenueEntity } from 'src/typeorm/models';
import { CPRevenueProjectsAwardedEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPRevenueEntity, CPRevenueProjectsAwardedEntity])],
  providers: [RevenueService],
  controllers: [RevenueController],
})
export class RevenueModule {}
