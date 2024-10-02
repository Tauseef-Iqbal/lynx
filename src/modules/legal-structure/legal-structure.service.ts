import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
import { CPLegalStructureEntity, CpLegalStructureOrgFacilityEntity, UserEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { AddLegalStructureDto, UpdateLegalStructureDto } from './dtos';
import { LegalStructureFiles } from './interfaces';

@Injectable()
export class LegalStructureService extends BaseTypeOrmCrudService<CPLegalStructureEntity> {
  constructor(
    @InjectRepository(CPLegalStructureEntity)
    readonly legalStructureRepository: Repository<CPLegalStructureEntity>,
    @InjectRepository(CpLegalStructureOrgFacilityEntity)
    readonly legalStructureOrgFacilityRepository: Repository<CpLegalStructureOrgFacilityEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(legalStructureRepository);
  }

  async addLegalStructure(user: UserEntity, addLegalStructureDto: AddLegalStructureDto, files: LegalStructureFiles): Promise<CPLegalStructureEntity> {
    const existedLegalStructure = await this.getLegalStructureByFilter({ companyProfile: { id: user.companyProfile.id } });
    if (existedLegalStructure) {
      return this.updateLegalStructure(existedLegalStructure.id, user, addLegalStructureDto, files);
    }

    if (files?.assets?.length || addLegalStructureDto?.dbaAssets?.length) {
      addLegalStructureDto.dbaAssets = await processFilesToAdd({
        incomingFiles: files.assets,
        incomingS3AndBase64: addLegalStructureDto.dbaAssets,
        keyPrefix: `${user.companyProfile.name}/Legal Structure/DBA Name Certificates`,
        configService: this.configService,
        s3Service: this.s3Service,
        assetsMetadata: addLegalStructureDto.assetsMetadata,
      });
    }

    if (addLegalStructureDto?.dbaName && (files?.dbaNameFiles?.length || addLegalStructureDto?.dbaNameFiles?.length)) {
      addLegalStructureDto.dbaNameFiles = await processFilesToAdd({
        incomingFiles: files.dbaNameFiles,
        incomingS3AndBase64: addLegalStructureDto.dbaNameFiles,
        keyPrefix: `${user.companyProfile.name}/Legal Structure/DBA Name Certificates`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    return this.create({ ...addLegalStructureDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPLegalStructureEntity);
  }

  async updateLegalStructure(id: number, user: UserEntity, updateLegalStructureDto: UpdateLegalStructureDto, files: LegalStructureFiles): Promise<CPLegalStructureEntity> {
    const existedLegalStructure = await this.getLegalStructureByFilter({ id, companyProfile: { id: user.companyProfile.id } });
    // if (!existedLegalStructure) {
    //   throw new Error('Legal Structure not associated with this company profile');
    // }

    if (!existedLegalStructure) return null;

    if (existedLegalStructure?.dbaAssets?.length || files?.dbaNameFiles?.length) {
      updateLegalStructureDto.dbaAssets = await processFilesToUpdate({
        existingFiles: existedLegalStructure.dbaAssets,
        incomingFiles: files.assets,
        incomingS3AndBase64: updateLegalStructureDto.dbaAssets,
        keyPrefix: `${existedLegalStructure.companyProfile.name}/Legal Structure/DBA Name Certificates`,
        configService: this.configService,
        s3Service: this.s3Service,
        assetsMetadata: updateLegalStructureDto.assetsMetadata,
      });
    }

    if (updateLegalStructureDto?.dbaName && (files?.dbaNameFiles?.length || updateLegalStructureDto?.dbaNameFiles?.length)) {
      updateLegalStructureDto.dbaNameFiles = await processFilesToUpdate({
        existingFiles: existedLegalStructure.dbaNameFiles,
        incomingFiles: files.dbaNameFiles,
        incomingS3AndBase64: updateLegalStructureDto.dbaNameFiles,
        keyPrefix: `${existedLegalStructure.companyProfile.name}/Legal Structure/DBA Name Certificates`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (updateLegalStructureDto.orgFacilities.length) {
      const existingOrgFacilitiesIds: number[] = existedLegalStructure.orgFacilities.map((orgFacility) => Number(orgFacility.id));
      const orgFacilitiesIdsToKeep = updateLegalStructureDto.orgFacilities.filter((orgFacility) => orgFacility.id).map((orgFacility) => orgFacility.id);
      const orgFacilitiesToDelete = existingOrgFacilitiesIds.filter((existingId) => !orgFacilitiesIdsToKeep.includes(existingId));
      if (orgFacilitiesToDelete.length) {
        await this.legalStructureOrgFacilityRepository.delete(orgFacilitiesToDelete);
      }

      if (updateLegalStructureDto.orgFacilities.length) {
        for (const orgFacilities of updateLegalStructureDto.orgFacilities) {
          if (orgFacilities.id) {
            await this.legalStructureOrgFacilityRepository.update(orgFacilities.id, orgFacilities);
          } else {
            const newOrgFacility = this.legalStructureOrgFacilityRepository.create({
              ...orgFacilities,
              cpLegalStructure: existedLegalStructure,
            });
            await this.legalStructureOrgFacilityRepository.save(newOrgFacility);
          }
        }
      }
      delete updateLegalStructureDto.orgFacilities;
    } else {
      await this.legalStructureOrgFacilityRepository.delete({ cpLegalStructure: { id: existedLegalStructure.id } });
    }

    await this.update(id, updateLegalStructureDto as unknown as CPLegalStructureEntity);

    return this.getLegalStructureByFilter({ companyProfile: { id: user.companyProfile.id } });
  }

  async getMyLegalStructure(companyProfileId: number): Promise<CPLegalStructureEntity> {
    const myLegalStructure = await this.getLegalStructureByFilter({ companyProfile: { id: companyProfileId } });

    // if (!myLegalStructure) {
    //   throw new NotFoundException('Legal Structure not found against your company profile');
    // }

    if (!myLegalStructure) return null;

    return myLegalStructure;
  }

  async getLegalStructureByFilter(filter: any): Promise<CPLegalStructureEntity> {
    const result = await this.findByRelationFilters(filter, {
      relations: {
        companyProfile: 'companyProfile',
        orgFacilities: 'orgFacilities',
      },
      relationFilters: {
        orgFacilities: {
          condition: 'orgFacilities.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
      },
    });

    return result as CPLegalStructureEntity;
  }

  async deleteMyLegalStructure(companyProfileId: number): Promise<CPLegalStructureEntity> {
    const myLegalStructure = await this.getMyLegalStructure(companyProfileId);
    return this.update(myLegalStructure.id, { isDeleted: true } as unknown as CPLegalStructureEntity);
  }
}
