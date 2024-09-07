import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPRevenueEntity, UserEntity } from 'src/typeorm/models';
import { AddRevenueDto, UpdateRevenueDto } from './dtos';
import { CPRevenueProjectsAwardedEntity } from 'src/typeorm/models/cp-revenue-projects-awarded.entity';

@Injectable()
export class RevenueService extends BaseTypeOrmCrudService<CPRevenueEntity> {
  constructor(
    @InjectRepository(CPRevenueEntity)
    readonly revenueRepository: Repository<CPRevenueEntity>,
    @InjectRepository(CPRevenueProjectsAwardedEntity)
    readonly revenueProjectsAwardedRepository: Repository<CPRevenueProjectsAwardedEntity>,
  ) {
    super(revenueRepository);
  }

  async addRevenue(user: UserEntity, addRevenueDto: AddRevenueDto): Promise<CPRevenueEntity> {
    const existedRevenue = await this.findByFilter({ companyProfile: { id: user.companyProfile.id } });
    if (existedRevenue) {
      return this.updateRevenue(existedRevenue.id, user, addRevenueDto);
    }

    return this.create({ ...addRevenueDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPRevenueEntity);
  }

  async updateRevenue(id: number, user: UserEntity, updateRevenueDto: UpdateRevenueDto): Promise<CPRevenueEntity> {
    const existingRevenue = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true, projectsAwarded: true } });
    if (!existingRevenue) {
      throw new Error('Revenue not associated with this company profile');
    }

    if (updateRevenueDto.projectsAwarded) {
      const existingProjectsIds: number[] = existingRevenue.projectsAwarded.map((project) => Number(project.id));
      const projectIdsToKeep = updateRevenueDto.projectsAwarded.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));

      if (projectsToDelete.length) {
        await this.revenueProjectsAwardedRepository.update(projectsToDelete, { isDeleted: true });
      }

      for (const project of updateRevenueDto.projectsAwarded) {
        if (project.id) {
          const existedProject = await this.revenueProjectsAwardedRepository.findOne({ where: { id: project.id, isDeleted: false } });
          if (!existedProject) throw new NotFoundException(`Project with id ${project.id} isn't associated with the revenue with id ${id}`);
          await this.revenueProjectsAwardedRepository.update(existedProject.id, project);
        } else {
          const newProject = this.revenueProjectsAwardedRepository.create({
            ...project,
            cpRevenue: existingRevenue,
          });
          await this.revenueProjectsAwardedRepository.save(newProject);
        }
      }
      delete updateRevenueDto.projectsAwarded;
    }

    return this.update(id, updateRevenueDto as unknown as CPRevenueEntity);
  }

  async getMyRevenue(companyProfileId: number): Promise<CPRevenueEntity> {
    const myRevenue = await this.findByFilter({ companyProfile: { id: companyProfileId } }, { relations: { projectsAwarded: true } });
    if (!myRevenue) {
      throw new NotFoundException('Revenue not found against your company profile');
    }
    return myRevenue;
  }

  async deleteMyRevenue(companyProfileId: number): Promise<CPRevenueEntity> {
    const myRevenue = await this.getMyRevenue(companyProfileId);
    return this.update(myRevenue.id, { isDeleted: true } as unknown as CPRevenueEntity);
  }
}
