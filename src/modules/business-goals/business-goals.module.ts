import { Module } from '@nestjs/common';
import { BusinessGoalsService } from './business-goals.service';
import { BusinessGoalsController } from './business-goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPBusinessGoalsEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPBusinessGoalsEntity])],
  providers: [BusinessGoalsService],
  controllers: [BusinessGoalsController],
})
export class BusinessGoalsModule {}
