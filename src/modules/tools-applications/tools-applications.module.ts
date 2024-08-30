import { Module } from '@nestjs/common';
import { ToolsAndApplicationsService } from './tools-applications.service';
import { ToolsAndApplicationsController } from './tools-applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPToolsAndApplicationsEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPToolsAndApplicationsEntity])],
  providers: [ToolsAndApplicationsService],
  controllers: [ToolsAndApplicationsController],
})
export class ToolsAndApplicationsModule {}
