import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPRevenueEntity } from 'src/typeorm/models';
import { UpdateRevenueDto } from './dtos';
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

  async updateRevenue(id: number, updateRevenueDto: UpdateRevenueDto): Promise<CPRevenueEntity> {
    const existingRevenue = await this.findById(id, { relations: { projectsAwarded: true, companyProfile: true } });
    if (!existingRevenue) {
      throw new Error('CPRevenueEntity not found');
    }

    if (updateRevenueDto.projectsAwarded) {
      const existingProjectsIds: number[] = existingRevenue.projectsAwarded.map((project) => Number(project.id));
      const projectIdsToKeep = updateRevenueDto.projectsAwarded.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));
      if (projectsToDelete.length) {
        await this.revenueProjectsAwardedRepository.delete(projectsToDelete);
      }

      if (projectIdsToKeep.length) {
        for (const project of updateRevenueDto.projectsAwarded) {
          if (project.id) {
            await this.revenueProjectsAwardedRepository.update(project.id, project);
          } else {
            const newProject = this.revenueProjectsAwardedRepository.create({
              ...project,
              cpRevenue: existingRevenue,
            });
            await this.revenueProjectsAwardedRepository.save(newProject);
          }
        }
      }
      delete updateRevenueDto.projectsAwarded;
    }
    return this.update(id, updateRevenueDto as unknown as CPRevenueEntity);
  }
}
