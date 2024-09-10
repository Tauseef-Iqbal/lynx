import { Module } from '@nestjs/common';
import { CpControlsAndProtocolsController } from './cp-controls-and-protocols.controller';
import { CpControlsAndProtocolsService } from './cp-controls-and-protocols.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlsAndProtocolEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([ControlsAndProtocolEntity])],
  controllers: [CpControlsAndProtocolsController],
  providers: [CpControlsAndProtocolsService],
})
export class CpControlsAndProtocolsModule {}
