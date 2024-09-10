import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPFundingSourcesEntity, CPFundingSourcesForeignAffiliationEntity } from 'src/typeorm/models';
import { AddFundingSourcesDto, UpdateFundingSourcesDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';

@Injectable()
export class FundingSourcesService extends BaseTypeOrmCrudService<CPFundingSourcesEntity> {
  constructor(
    @InjectRepository(CPFundingSourcesEntity)
    readonly fundingSourcesRepository: Repository<CPFundingSourcesEntity>,
    @InjectRepository(CPFundingSourcesForeignAffiliationEntity)
    readonly fundingSourcesForeignAffiliationRepository: Repository<CPFundingSourcesForeignAffiliationEntity>,
  ) {
    super(fundingSourcesRepository);
  }

  async addFundingSources(user: UserEntity, addFundingSourcesDto: AddFundingSourcesDto): Promise<CPFundingSourcesEntity> {
    const existedFundingSources = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedFundingSources) {
      return this.updateFundingSources(existedFundingSources.id, user, addFundingSourcesDto);
    }
    return this.create({ ...addFundingSourcesDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPFundingSourcesEntity);
  }

  async updateFundingSources(id: number, user: UserEntity, updateFundingSourcesDto: UpdateFundingSourcesDto): Promise<CPFundingSourcesEntity> {
    const existedFundingSources = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { fundingSourcesForeignAffiliation: true } });
    // if (!existedFundingSources) {
    //   throw new Error('Funding Sources not associated with this company profile');
    // }

    if (!existedFundingSources) return null;

    if (updateFundingSourcesDto.fundingSourcesForeignAffiliation) {
      const existingForeignAffiliationsIds: number[] = existedFundingSources.fundingSourcesForeignAffiliation.map((project) => Number(project.id));
      const foreignAffiliationsIdsToKeep = updateFundingSourcesDto.fundingSourcesForeignAffiliation.filter((project) => project.id).map((project) => project.id);
      const foreignAffiliationsToDelete = existingForeignAffiliationsIds.filter((existingId) => !foreignAffiliationsIdsToKeep.includes(existingId));
      if (foreignAffiliationsToDelete.length) {
        await this.fundingSourcesForeignAffiliationRepository.update(foreignAffiliationsToDelete, { isDeleted: true });
      }

      if (foreignAffiliationsIdsToKeep.length) {
        for (const foreignAffiliation of updateFundingSourcesDto.fundingSourcesForeignAffiliation) {
          if (foreignAffiliation.id) {
            await this.fundingSourcesForeignAffiliationRepository.update(foreignAffiliation.id, foreignAffiliation);
          } else {
            const newForeignAffiliation = this.fundingSourcesForeignAffiliationRepository.create({
              ...foreignAffiliation,
              fundingSources: existedFundingSources,
            });
            await this.fundingSourcesForeignAffiliationRepository.save(newForeignAffiliation);
          }
        }
      }
      delete updateFundingSourcesDto.fundingSourcesForeignAffiliation;
    }
    return this.update(id, updateFundingSourcesDto as unknown as CPFundingSourcesEntity);
  }

  async getMyFundingSources(companyProfileId: number): Promise<CPFundingSourcesEntity> {
    const myFundingSources = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false }, { relations: { fundingSourcesForeignAffiliation: true } });
    // if (!myFundingSources) {
    //   throw new NotFoundException('Funding Sources not found against your company profile');
    // }

    if (!myFundingSources) return null;

    return myFundingSources;
  }

  async deleteMyFundingSources(companyProfileId: number): Promise<CPFundingSourcesEntity> {
    const myFundingSources = await this.getMyFundingSources(companyProfileId);
    return this.update(myFundingSources.id, { isDeleted: true } as unknown as CPFundingSourcesEntity);
  }
}
