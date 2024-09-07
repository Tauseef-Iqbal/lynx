import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPOwnershipStructureDetailsEntity } from 'src/typeorm/models/cp-ownership-structure-details.entity';
import { CPOwnershipStructureKeyManagementEntity } from 'src/typeorm/models/cp-ownership-structure-key-management.entity';
import { CPOwnershipStructureEntity } from 'src/typeorm/models/cp-ownership-structure.entity';
import { Repository } from 'typeorm';
import { AddOwnershipStructureDto, UpdateOwnershipStructureDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';

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

  async addOwnershipStructure(user: UserEntity, addOwnershipStructureDto: AddOwnershipStructureDto): Promise<CPOwnershipStructureEntity> {
    const existedOwnershipStructure = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedOwnershipStructure) {
      return this.updateOwnershipStructure(existedOwnershipStructure.id, user, addOwnershipStructureDto);
    }

    return this.create({ ...addOwnershipStructureDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPOwnershipStructureEntity);
  }

  async updateOwnershipStructure(id: number, user: UserEntity, updateOwnershipStructureDto: UpdateOwnershipStructureDto): Promise<CPOwnershipStructureEntity> {
    const existingOwnershipStructure = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id }, isDeleted: false }, { relations: { companyProfile: true, ownershipStructureDetails: true, ownershipStructureKeyManagement: true } });
    if (!existingOwnershipStructure) {
      throw new Error('Ownership Structure not associated with this company profile');
    }

    const { ownershipStructureDetails, ownershipStructureKeyManagement } = updateOwnershipStructureDto;

    if (ownershipStructureDetails) {
      if (ownershipStructureDetails.id) {
        const existedOwnershipStructureDetails = await this.ownershipStructureDetailsRepository.findOne({ where: { id: ownershipStructureDetails.id, isDeleted: false } });
        if (!existedOwnershipStructureDetails) throw new NotFoundException(`Ownership Structure Details with id ${ownershipStructureDetails.id} isn't associated with the Ownership Structure with id ${id}`);
        await this.ownershipStructureDetailsRepository.update(existedOwnershipStructureDetails.id, ownershipStructureDetails);
      } else {
        const newOwnershipStructureDetails = this.ownershipStructureDetailsRepository.create({
          ...ownershipStructureDetails,
          ownershipStructure: existingOwnershipStructure,
        });
        await this.ownershipStructureDetailsRepository.save(newOwnershipStructureDetails);
      }
      delete updateOwnershipStructureDto.ownershipStructureDetails;
    }

    if (ownershipStructureKeyManagement) {
      const existingKeyManagementIds: number[] = existingOwnershipStructure.ownershipStructureKeyManagement.map((keyManagement) => Number(keyManagement.id));
      const keyManagementsIdsToKeep = ownershipStructureKeyManagement.filter((keyManagement) => keyManagement.id).map((keyManagement) => keyManagement.id);
      const keyManagementsToDelete = existingKeyManagementIds.filter((existingId) => !keyManagementsIdsToKeep.includes(existingId));
      if (keyManagementsToDelete.length) {
        await this.ownershipStructureKeyManagementRepository.update(keyManagementsToDelete, { isDeleted: true });
      }

      for (const keyManagement of ownershipStructureKeyManagement) {
        if (keyManagement.id) {
          const existedkeyManagement = await this.ownershipStructureKeyManagementRepository.findOne({ where: { id: keyManagement.id, isDeleted: false } });
          if (!existedkeyManagement) throw new NotFoundException(`Ownership Structure Key Management with id ${keyManagement.id} isn't associated with the Ownership Structure with id ${id}`);
          await this.ownershipStructureKeyManagementRepository.update(existedkeyManagement.id, keyManagement);
        } else {
          const newOwnershipStructureKeyManagement = this.ownershipStructureKeyManagementRepository.create({
            ...keyManagement,
            ownershipStructure: existingOwnershipStructure,
          });
          await this.ownershipStructureKeyManagementRepository.save(newOwnershipStructureKeyManagement);
        }
      }
      delete updateOwnershipStructureDto.ownershipStructureKeyManagement;
    }

    return this.update(id, updateOwnershipStructureDto as unknown as CPOwnershipStructureEntity);
  }

  async getMyOwnershipStructure(companyProfileId: number): Promise<CPOwnershipStructureEntity> {
    const myOwnershipStructure = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!myOwnershipStructure) {
      throw new NotFoundException('Ownership Structure not found against your company profile');
    }
    return myOwnershipStructure;
  }

  async deleteMyOwnershipStructure(companyProfileId: number): Promise<CPOwnershipStructureEntity> {
    const myOwnershipStructure = await this.getMyOwnershipStructure(companyProfileId);
    return this.update(myOwnershipStructure.id, { isDeleted: true } as unknown as CPOwnershipStructureEntity);
  }
}
