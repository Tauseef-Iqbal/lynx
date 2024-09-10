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
    const existedResearchAndDevelopment = await this.findByFilter({ companyProfile: { id: user.companyProfile.id } });
    if (existedResearchAndDevelopment) {
      return this.updateResearchAndDevelopment(existedResearchAndDevelopment.id, user, addResearchAndDevelopmentDto);
    }

    return this.create({ ...addResearchAndDevelopmentDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPResearchAndDevelopmentEntity);
  }

  async updateResearchAndDevelopment(id: number, user: UserEntity, updateResearchAndDevelopmentDto: UpdateResearchAndDevelopmentDto): Promise<CPResearchAndDevelopmentEntity> {
    const existingResearchAndDevelopment = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true, projectsAwarded: true } });
    // if (!existingResearchAndDevelopment) {
    //   throw new Error('ResearchAndDevelopment not associated with this company profile');
    // }

    if (!existingResearchAndDevelopment) return null;

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations) {
      const existingProjectsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentInnovations.map((project) => Number(project.id));
      const projectIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));

      if (projectsToDelete.length) {
        await this.researchAndDevelopmentInnovationsRepository.update(projectsToDelete, { isDeleted: true });
      }

      for (const project of updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations) {
        if (project.id) {
          const existedProject = await this.researchAndDevelopmentInnovationsRepository.findOne({ where: { id: project.id, isDeleted: false } });
          if (!existedProject) throw new NotFoundException(`Project with id ${project.id} isn't associated with the researchAndDevelopment with id ${id}`);
          await this.researchAndDevelopmentInnovationsRepository.update(existedProject.id, project);
        } else {
          const newProject = this.researchAndDevelopmentInnovationsRepository.create({
            ...project,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentInnovationsRepository.save(newProject);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentInnovations;
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents) {
      const existingProjectsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentDefencePatents.map((project) => Number(project.id));
      const projectIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));

      if (projectsToDelete.length) {
        await this.researchAndDevelopmentDefencePatentsRepository.update(projectsToDelete, { isDeleted: true });
      }

      for (const project of updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents) {
        if (project.id) {
          const existedProject = await this.researchAndDevelopmentDefencePatentsRepository.findOne({ where: { id: project.id, isDeleted: false } });
          if (!existedProject) throw new NotFoundException(`Project with id ${project.id} isn't associated with the researchAndDevelopment with id ${id}`);
          await this.researchAndDevelopmentDefencePatentsRepository.update(existedProject.id, project);
        } else {
          const newProject = this.researchAndDevelopmentDefencePatentsRepository.create({
            ...project,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentDefencePatentsRepository.save(newProject);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentDefencePatents;
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers) {
      const existingProjectsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentResearchPapers.map((project) => Number(project.id));
      const projectIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));

      if (projectsToDelete.length) {
        await this.researchAndDevelopmentResearchPapersRepository.update(projectsToDelete, { isDeleted: true });
      }

      for (const project of updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers) {
        if (project.id) {
          const existedProject = await this.researchAndDevelopmentResearchPapersRepository.findOne({ where: { id: project.id, isDeleted: false } });
          if (!existedProject) throw new NotFoundException(`Project with id ${project.id} isn't associated with the researchAndDevelopment with id ${id}`);
          await this.researchAndDevelopmentResearchPapersRepository.update(existedProject.id, project);
        } else {
          const newProject = this.researchAndDevelopmentResearchPapersRepository.create({
            ...project,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentResearchPapersRepository.save(newProject);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentResearchPapers;
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding) {
      const existingProjectsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentResearchFunding.map((project) => Number(project.id));
      const projectIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));

      if (projectsToDelete.length) {
        await this.researchAndDevelopmentResearchFundingRepository.update(projectsToDelete, { isDeleted: true });
      }

      for (const project of updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding) {
        if (project.id) {
          const existedProject = await this.researchAndDevelopmentResearchFundingRepository.findOne({ where: { id: project.id, isDeleted: false } });
          if (!existedProject) throw new NotFoundException(`Project with id ${project.id} isn't associated with the researchAndDevelopment with id ${id}`);
          await this.researchAndDevelopmentResearchFundingRepository.update(existedProject.id, project);
        } else {
          const newProject = this.researchAndDevelopmentResearchFundingRepository.create({
            ...project,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentResearchFundingRepository.save(newProject);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentResearchFunding;
    }

    if (updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions) {
      const existingProjectsIds: number[] = existingResearchAndDevelopment.researchAndDevelopmentResearchInstitutions.map((project) => Number(project.id));
      const projectIdsToKeep = updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));

      if (projectsToDelete.length) {
        await this.researchAndDevelopmentResearchInstitutionsRepository.update(projectsToDelete, { isDeleted: true });
      }

      for (const project of updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions) {
        if (project.id) {
          const existedProject = await this.researchAndDevelopmentResearchInstitutionsRepository.findOne({ where: { id: project.id, isDeleted: false } });
          if (!existedProject) throw new NotFoundException(`Project with id ${project.id} isn't associated with the researchAndDevelopment with id ${id}`);
          await this.researchAndDevelopmentResearchInstitutionsRepository.update(existedProject.id, project);
        } else {
          const newProject = this.researchAndDevelopmentResearchInstitutionsRepository.create({
            ...project,
            researchAndDevelopment: existingResearchAndDevelopment,
          });
          await this.researchAndDevelopmentResearchInstitutionsRepository.save(newProject);
        }
      }
      delete updateResearchAndDevelopmentDto.researchAndDevelopmentResearchInstitutions;
    }

    return this.update(id, updateResearchAndDevelopmentDto as unknown as CPResearchAndDevelopmentEntity);
  }

  async getMyResearchAndDevelopment(companyProfileId: number): Promise<CPResearchAndDevelopmentEntity> {
    const myResearchAndDevelopment = await this.findByFilter(
      { companyProfile: { id: companyProfileId } },
      { relations: { researchAndDevelopmentInnovations: true, researchAndDevelopmentDefencePatents: true, researchAndDevelopmentResearchPapers: true, researchAndDevelopmentResearchFunding: true, researchAndDevelopmentResearchInstitutions: true } },
    );
    // if (!myResearchAndDevelopment) {
    //   throw new NotFoundException('ResearchAndDevelopment not found against your company profile');
    // }

    if (!myResearchAndDevelopment) return null;

    return myResearchAndDevelopment;
  }

  async deleteMyResearchAndDevelopment(companyProfileId: number): Promise<CPResearchAndDevelopmentEntity> {
    const myResearchAndDevelopment = await this.getMyResearchAndDevelopment(companyProfileId);
    return this.update(myResearchAndDevelopment.id, { isDeleted: true } as unknown as CPResearchAndDevelopmentEntity);
  }
}
