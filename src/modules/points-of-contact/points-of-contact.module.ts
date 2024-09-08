import { Module } from '@nestjs/common';
import { PointsOfContactService } from './points-of-contact.service';
import { PointsOfContactController } from './points-of-contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPPointsOfContactEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPPointsOfContactEntity])],
  providers: [PointsOfContactService],
  controllers: [PointsOfContactController],
})
export class PointsOfContactModule {}
