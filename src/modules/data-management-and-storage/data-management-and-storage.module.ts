import { Module } from '@nestjs/common';
import { DataManagementAndStorageService } from './data-management-and-storage.service';
import { DataManagementAndStorageController } from './data-management-and-storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPDataManagementAndStorageEntity } from 'src/typeorm/models';

@Module({
  imports: [TypeOrmModule.forFeature([CPDataManagementAndStorageEntity])],
  providers: [DataManagementAndStorageService],
  controllers: [DataManagementAndStorageController],
})
export class DataManagementAndStorageModule {}
