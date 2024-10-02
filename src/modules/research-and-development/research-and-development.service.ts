import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import {
  CPResearchAndDevelopmentDefencePatentsEntity,
  CPResearchAndDevelopmentEntity,
  CPResearchAndDevelopmentInnovationsEntity,
  CPResearchAndDevelopmentResearchFundingEntity,
  CPResearchAndDevelopmentResearchInstitutionsEntity,
  CPResearchAndDevelopmentResearchPapersEntity,
  UserEntity,
} from 'src/typeorm/models';
import { AddResearchAndDevelopmentDto, UpdateResearchAndDevelopmentDto } from './dtos';

@Injectable()
export class ResearchAndDevelopmentService extends BaseTypeOrmCrudService<CPResearchAndDevelopmentEntity> {
  constructor(
    @InjectRepository(CPResearchAndDevelopmentEntity)
    readonly researchAndDevelopmentRepository: Repository<CPResearchAndDevelopmentEntity>,
    @InjectRepository(CPResearchAndDevelopmentInnovationsEntity)
    readonly researchAndDevelopmentInnovationsRepository: Repository<CPResearchAndDevelopmentInnovationsEntity>,
    @InjectRepository(CPResearchAndDevelopmentDefencePatentsEntity)
    readonly researchAndDevelopmentDefencePatentsRepository: Repository<CPResearchAndDevelopmentDefencePatentsEntity>,
    @InjectRepository(CPResearchAndDevelopmentResearchPapersEntity)
    readonly researchAndDevelopmentResearchPapersRepository: Repository<CPResearchAndDevelopmentResearchPapersEntity>,
    @InjectRepository(CPResearchAndDevelopmentResearchFundingEntity)
    readonly researchAndDevelopmentResearchFundingRepository: Repository<CPResearchAndDevelopmentResearchFundingEntity>,
    @InjectRepository(CPResearchAndDevelopmentResearchInstitutionsEntity)
    readonly researchAndDevelopmentResearchInstitutionsRepository: Repository<CPResearchAndDevelopmentResearchInstitutionsEntity>,
  ) {
    super(researchAndDevelopmentRepository);
  }

  async addResearchAndDevelopment(user: UserEntity, addResearchAndDevelopmentDto: AddResearchAndDevelopmentDto): Promise<CPResearchAndDevelopmentEntity> {
    const existedResearchAndDevelopment = await this.getResearchAndDevelopmentByFilter({ companyProfile: { id: user.companyProfile.id } });
    if (existedResearchAndDevelopment) {
      return this.updateResearchAndDevelopment(existedResearchAndDevelopment.id, user, addResearchAndDevelopmentDto);
    }

    return this.create({ ...addResearchAndDevelopmentDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPResearchAndDevelopmentEntity);
  }

  async updateResearchAndDevelopment(id: number, user: UserEntity, updateResearchAndDevelopmentDto: UpdateResearchAndDevelopmentDto): Promise<CPResearchAndDevelopmentEntity> {
    const existingResearchAndDevelopment = await this.getResearchAndDevelopmentByFilter({ id, companyProfile: { id: user.companyProfile.id } });
    // if (!existingResearchAndDevelopment) {
    //   throw new Error('ResearchAndDevelopment not associated with this company profile');
    // }

    if (!existingResearchAndDevelopment) return null;

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations) {
      const existingResearchAndDevelopmentInnovationsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentInnovations.map((researchAndDevelopmentInnovation) => Number(researchAndDevelopmentInnovation.id));
      const researchAndDevelopmentInnovationsIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations.filter((researchAndDevelopmentInnovation) => researchAndDevelopmentInnovation.id).map((researchAndDevelopmentInnovation) => researchAndDevelopmentInnovation.id);
      const researchAndDevelopmentInnovationsToDelete = existingResearchAndDevelopmentInnovationsIds.filter((existingId) => !researchAndDevelopmentInnovationsIdsToKeep.includes(existingId));

      if (researchAndDevelopmentInnovationsToDelete.length) {
        await this.researchAndDevelopmentInnovationsRepository.delete(researchAndDevelopmentInnovationsToDelete);
      }

      for (const researchAndDevelopmentInnovation of updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations) {
        if (researchAndDevelopmentInnovation.id) {
          const existingResearchAndDevelopmentInnovation = await this.researchAndDevelopmentInnovationsRepository.findOne({ where: { id: researchAndDevelopmentInnovation.id, isDeleted: false } });
          if (!existingResearchAndDevelopmentInnovation) throw new NotFoundException(`Research And Development Innovation with id ${researchAndDevelopmentInnovation.id} isn't associated with the Research And Development with id ${id}`);
          await this.researchAndDevelopmentInnovationsRepository.update(existingResearchAndDevelopmentInnovation.id, researchAndDevelopmentInnovation);
        } else {
          const newResearchAndDevelopmentInnovation = this.researchAndDevelopmentInnovationsRepository.create({
            ...researchAndDevelopmentInnovation,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentInnovationsRepository.save(newResearchAndDevelopmentInnovation);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations;
    } else {
      await this.researchAndDevelopmentInnovationsRepository.delete({ researchAndDevelopment: { id: existingResearchAndDevelopment.id } });
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents) {
      const existingResearchAndDevelopmentDefencePatentsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentDefencePatents.map((researchAndDevelopmentDefencePatent) => Number(researchAndDevelopmentDefencePatent.id));
      const researchAndDevelopmentDefencePatentsIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents
        .filter((researchAndDevelopmentDefencePatent) => researchAndDevelopmentDefencePatent.id)
        .map((researchAndDevelopmentDefencePatent) => researchAndDevelopmentDefencePatent.id);
      const researchAndDevelopmentDefencePatentsToDelete = existingResearchAndDevelopmentDefencePatentsIds.filter((existingId) => !researchAndDevelopmentDefencePatentsIdsToKeep.includes(existingId));

      if (researchAndDevelopmentDefencePatentsToDelete.length) {
        await this.researchAndDevelopmentDefencePatentsRepository.delete(researchAndDevelopmentDefencePatentsToDelete);
      }

      for (const researchAndDevelopmentDefencePatent of updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents) {
        if (researchAndDevelopmentDefencePatent.id) {
          const existingResearchAndDevelopmentDefencePatent = await this.researchAndDevelopmentDefencePatentsRepository.findOne({ where: { id: researchAndDevelopmentDefencePatent.id, isDeleted: false } });
          if (!existingResearchAndDevelopmentDefencePatent) throw new NotFoundException(`Research And Development Defence Patent with id ${researchAndDevelopmentDefencePatent.id} isn't associated with the Research And Development with id ${id}`);
          await this.researchAndDevelopmentDefencePatentsRepository.update(existingResearchAndDevelopmentDefencePatent.id, researchAndDevelopmentDefencePatent);
        } else {
          const newResearchAndDevelopmentDefencePatent = this.researchAndDevelopmentDefencePatentsRepository.create({
            ...researchAndDevelopmentDefencePatent,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentDefencePatentsRepository.save(newResearchAndDevelopmentDefencePatent);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents;
    } else {
      await this.researchAndDevelopmentInnovationsRepository.delete({ researchAndDevelopment: { id: existingResearchAndDevelopment.id } });
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers) {
      const existingResearchAndDevelopmentInnovationsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentResearchPapers.map((researchAndDevelopmentResearchPaper) => Number(researchAndDevelopmentResearchPaper.id));
      const researchAndDevelopmentInnovationsIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers.filter((researchAndDevelopmentResearchPaper) => researchAndDevelopmentResearchPaper.id).map((researchAndDevelopmentResearchPaper) => researchAndDevelopmentResearchPaper.id);
      const researchAndDevelopmentInnovationsToDelete = existingResearchAndDevelopmentInnovationsIds.filter((existingId) => !researchAndDevelopmentInnovationsIdsToKeep.includes(existingId));

      if (researchAndDevelopmentInnovationsToDelete.length) {
        await this.researchAndDevelopmentResearchPapersRepository.delete(researchAndDevelopmentInnovationsToDelete);
      }

      for (const researchAndDevelopmentResearchPaper of updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers) {
        if (researchAndDevelopmentResearchPaper.id) {
          const existingResearchAndDevelopmentResearchPaper = await this.researchAndDevelopmentResearchPapersRepository.findOne({ where: { id: researchAndDevelopmentResearchPaper.id, isDeleted: false } });
          if (!existingResearchAndDevelopmentResearchPaper) throw new NotFoundException(`Research And Development Research Paper with id ${researchAndDevelopmentResearchPaper.id} isn't associated with the Research And Development with id ${id}`);
          await this.researchAndDevelopmentResearchPapersRepository.update(existingResearchAndDevelopmentResearchPaper.id, researchAndDevelopmentResearchPaper);
        } else {
          const newResearchAndDevelopmentResearchPaper = this.researchAndDevelopmentResearchPapersRepository.create({
            ...researchAndDevelopmentResearchPaper,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentResearchPapersRepository.save(newResearchAndDevelopmentResearchPaper);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers;
    } else {
      await this.researchAndDevelopmentInnovationsRepository.delete({ researchAndDevelopment: { id: existingResearchAndDevelopment.id } });
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding) {
      const existingResearchAndDevelopmentInnovationsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentResearchFunding.map((researchAndDevelopmentResearchFunding) => Number(researchAndDevelopmentResearchFunding.id));
      const researchAndDevelopmentInnovationsIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding
        .filter((researchAndDevelopmentResearchFunding) => researchAndDevelopmentResearchFunding.id)
        .map((researchAndDevelopmentResearchFunding) => researchAndDevelopmentResearchFunding.id);
      const researchAndDevelopmentInnovationsToDelete = existingResearchAndDevelopmentInnovationsIds.filter((existingId) => !researchAndDevelopmentInnovationsIdsToKeep.includes(existingId));

      if (researchAndDevelopmentInnovationsToDelete.length) {
        await this.researchAndDevelopmentResearchFundingRepository.delete(researchAndDevelopmentInnovationsToDelete);
      }

      for (const researchAndDevelopmentResearchFunding of updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding) {
        if (researchAndDevelopmentResearchFunding.id) {
          const existedResearchAndDevelopmentResearchFunding = await this.researchAndDevelopmentResearchFundingRepository.findOne({ where: { id: researchAndDevelopmentResearchFunding.id, isDeleted: false } });
          if (!existedResearchAndDevelopmentResearchFunding) throw new NotFoundException(`Research And Development Research Funding with id ${researchAndDevelopmentResearchFunding.id} isn't associated with the Research And Development with id ${id}`);
          await this.researchAndDevelopmentResearchFundingRepository.update(existedResearchAndDevelopmentResearchFunding.id, researchAndDevelopmentResearchFunding);
        } else {
          const newResearchAndDevelopmentResearchFunding = this.researchAndDevelopmentResearchFundingRepository.create({
            ...researchAndDevelopmentResearchFunding,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentResearchFundingRepository.save(newResearchAndDevelopmentResearchFunding);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding;
    } else {
      await this.researchAndDevelopmentInnovationsRepository.delete({ researchAndDevelopment: { id: existingResearchAndDevelopment.id } });
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions) {
      const existingResearchAndDevelopmentInnovationsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentResearchInstitutions.map((researchAndDevelopmentResearchInstitution) => Number(researchAndDevelopmentResearchInstitution.id));
      const researchAndDevelopmentInnovationsIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions
        .filter((researchAndDevelopmentResearchInstitution) => researchAndDevelopmentResearchInstitution.id)
        .map((researchAndDevelopmentResearchInstitution) => researchAndDevelopmentResearchInstitution.id);
      const researchAndDevelopmentInnovationsToDelete = existingResearchAndDevelopmentInnovationsIds.filter((existingId) => !researchAndDevelopmentInnovationsIdsToKeep.includes(existingId));

      if (researchAndDevelopmentInnovationsToDelete.length) {
        await this.researchAndDevelopmentResearchInstitutionsRepository.delete(researchAndDevelopmentInnovationsToDelete);
      }

      for (const researchAndDevelopmentResearchInstitution of updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions) {
        if (researchAndDevelopmentResearchInstitution.id) {
          const existingResearchAndDevelopmentResearchInstitution = await this.researchAndDevelopmentResearchInstitutionsRepository.findOne({ where: { id: researchAndDevelopmentResearchInstitution.id, isDeleted: false } });
          if (!existingResearchAndDevelopmentResearchInstitution) throw new NotFoundException(`Research And Development Research Institution with id ${researchAndDevelopmentResearchInstitution.id} isn't associated with the Research And Development with id ${id}`);
          await this.researchAndDevelopmentResearchInstitutionsRepository.update(existingResearchAndDevelopmentResearchInstitution.id, researchAndDevelopmentResearchInstitution);
        } else {
          const newResearchAndDevelopmentResearchInstitution = this.researchAndDevelopmentResearchInstitutionsRepository.create({
            ...researchAndDevelopmentResearchInstitution,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentResearchInstitutionsRepository.save(newResearchAndDevelopmentResearchInstitution);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions;
    } else {
      await this.researchAndDevelopmentInnovationsRepository.delete({ researchAndDevelopment: { id: existingResearchAndDevelopment.id } });
    }

    await this.update(id, updateResearchAndDevelopmentDto as unknown as CPResearchAndDevelopmentEntity);

    return this.getMyResearchAndDevelopment(user.companyProfile.id);
  }

  async getMyResearchAndDevelopment(companyProfileId: number): Promise<CPResearchAndDevelopmentEntity> {
    const myResearchAndDevelopment = await this.getResearchAndDevelopmentByFilter({ companyProfile: { id: companyProfileId } });
    // if (!myResearchAndDevelopment) {
    //   throw new NotFoundException('ResearchAndDevelopment not found against your company profile');
    // }

    if (!myResearchAndDevelopment) return null;

    return myResearchAndDevelopment;
  }

  async getResearchAndDevelopmentByFilter(filter: any): Promise<CPResearchAndDevelopmentEntity> {
    const result = await this.findByRelationFilters(filter, {
      relations: {
        companyProfile: 'companyProfile',
        researchAndDevelopmentInnovations: 'researchAndDevelopmentInnovations',
        researchAndDevelopmentDefencePatents: 'researchAndDevelopmentDefencePatents',
        researchAndDevelopmentResearchPapers: 'researchAndDevelopmentResearchPapers',
        researchAndDevelopmentResearchFunding: 'researchAndDevelopmentResearchFunding',
        researchAndDevelopmentResearchInstitutions: 'researchAndDevelopmentResearchInstitutions',
      },
      relationFilters: {
        researchAndDevelopmentInnovations: {
          condition: 'researchAndDevelopmentInnovations.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
        researchAndDevelopmentDefencePatents: {
          condition: 'researchAndDevelopmentDefencePatents.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
        researchAndDevelopmentResearchPapers: {
          condition: 'researchAndDevelopmentResearchPapers.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
        researchAndDevelopmentResearchFunding: {
          condition: 'researchAndDevelopmentResearchFunding.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
        researchAndDevelopmentResearchInstitutions: {
          condition: 'researchAndDevelopmentResearchInstitutions.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
      },
    });

    return result as CPResearchAndDevelopmentEntity;
  }

  async deleteMyResearchAndDevelopment(companyProfileId: number): Promise<CPResearchAndDevelopmentEntity> {
    const myResearchAndDevelopment = await this.getMyResearchAndDevelopment(companyProfileId);
    return this.update(myResearchAndDevelopment.id, { isDeleted: true } as unknown as CPResearchAndDevelopmentEntity);
  }
}
