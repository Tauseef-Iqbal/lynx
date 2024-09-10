import { Module } from '@nestjs/common';
import { FCIAndCUIService } from './fci-and-cui.service';
import { FCIAndCUIController } from './fci-and-cui.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPFCIAndCUIEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPFCIAndCUIEntity])],
  providers: [FCIAndCUIService],
  controllers: [FCIAndCUIController],
})
export class FCIAndCUIModule {}
