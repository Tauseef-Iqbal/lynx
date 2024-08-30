import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPOwnershipStructureDetailsEntity } from 'src/typeorm/models/cp-ownership-structure-details.entity';
import { CPOwnershipStructureKeyManagementEntity } from 'src/typeorm/models/cp-ownership-structure-key-management.entity';
import { CPOwnershipStructureEntity } from 'src/typeorm/models/cp-ownership-structure.entity';
import { Repository } from 'typeorm';
import { UpdateOwnershipStructureDto } from './dtos';

@Injectable()
export class OwnershipStructureService extends BaseTypeOrmCrudService<CPOwnershipStructureEntity> {
  constructor(
    @InjectRepository(CPOwnershipStructureEntity)
    readonly ownershipStructureRepository: Repository<CPOwnershipStructureEntity>,
    @InjectRepository(CPOwnershipStructureKeyManagementEntity)
    readonly ownershipStructureKeyManagementRepository: Repository<CPOwnershipStructureKeyManagementEntity>,
    @InjectRepository(CPOwnershipStructureDetailsEntity)
    readonly ownershipStructureDetailsRepository: Repository<CPOwnershipStructureDetailsEntity>,
  ) {
    super(ownershipStructureRepository);
  }

  async updateOwnershipStructure(id: number, updateOwnershipStructureDto: UpdateOwnershipStructureDto): Promise<CPOwnershipStructureEntity> {
    const existingOwnershipStructure = await this.findById(id, {
      relations: ['ownershipStructureDetails', 'ownershipStructureKeyManagement', 'companyProfile'],
    });

    if (!existingOwnershipStructure) {
      throw new Error('CPOwnershipStructureEntity not found');
    }

    return this.update(id, updateOwnershipStructureDto as unknown as CPOwnershipStructureEntity);
  }
}
