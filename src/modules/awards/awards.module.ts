import { Module } from '@nestjs/common';
import { AwardsController } from './awards.controller';
import { AwardsService } from './awards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpAwardEntity } from 'src/typeorm/models/cp-awards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CpAwardEntity])],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
