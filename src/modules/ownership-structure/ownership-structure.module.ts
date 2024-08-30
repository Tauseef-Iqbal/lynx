import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPOwnershipStructureEntity } from 'src/typeorm/models/cp-ownership-structure.entity';
import { CPOwnershipStructureDetailsEntity } from 'src/typeorm/models/cp-ownership-structure-details.entity';
import { CPOwnershipStructureKeyManagementEntity } from 'src/typeorm/models/cp-ownership-structure-key-management.entity';
import { OwnershipStructureService } from './ownership-structure.service';
import { OwnershipStructureController } from './ownership-structure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CPOwnershipStructureDetailsEntity, CPOwnershipStructureKeyManagementEntity, CPOwnershipStructureEntity])],
  providers: [OwnershipStructureService],
  controllers: [OwnershipStructureController],
})
export class OwnershipStructureModule {}
