import { Module } from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { PersonnelController } from './personnel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPPersonnelEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPPersonnelEntity])],
  providers: [PersonnelService],
  controllers: [PersonnelController],
})
export class PersonnelModule {}
