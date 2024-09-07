import { Module } from '@nestjs/common';
import { PastPerformanceController } from './past-performance.controller';
import { PastPerformanceService } from './past-performance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpPastPerformanceEntity, CpPastPerformanceTestimonialsEntity } from 'src/typeorm/models';
import { PastPerformanceTestimonialsService } from './past-performance-testimonials.service';

@Module({
  imports: [TypeOrmModule.forFeature([CpPastPerformanceEntity, CpPastPerformanceTestimonialsEntity])],
  controllers: [PastPerformanceController],
  providers: [PastPerformanceService, PastPerformanceTestimonialsService],
})
export class PastPerformanceModule {}
