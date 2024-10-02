import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPControlsAndProtocolsEntity } from 'src/typeorm/models';
import { ControlsAndProtocolsController } from './controls-and-protocols.controller';
import { ControlsAndProtocolsService } from './controls-and-protocols.service';

@Module({
  imports: [TypeOrmModule.forFeature([CPControlsAndProtocolsEntity])],
  controllers: [ControlsAndProtocolsController],
  providers: [ControlsAndProtocolsService],
})
export class ControlsAndProtocolsModule {}
