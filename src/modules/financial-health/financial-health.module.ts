import { Module } from '@nestjs/common';
import { FinancialHealthService } from './financial-health.service';
import { FinancialHealthController } from './financial-health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPFinancialHealthEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPFinancialHealthEntity])],
  providers: [FinancialHealthService],
  controllers: [FinancialHealthController],
})
export class FinancialHealthModule {}
