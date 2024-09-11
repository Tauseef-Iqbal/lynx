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
    const existedRevenue = await this.getRevenueByFilter({ companyProfile: { id: user.companyProfile.id } });
    if (existedRevenue) {
      return this.updateRevenue(existedRevenue.id, user, addRevenueDto);
    }

    return this.create({ ...addRevenueDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPRevenueEntity);
  }

  async updateRevenue(id: number, user: UserEntity, updateRevenueDto: UpdateRevenueDto): Promise<CPRevenueEntity> {
    const existingRevenue = await this.getRevenueByFilter({ id, companyProfile: { id: user.companyProfile.id } });
    // if (!existingRevenue) {
    //   throw new Error('Revenue not associated with this company profile');
    // }

    if (!existingRevenue) return null;

    if (updateRevenueDto.projectsAwarded) {
      const existingProjectsIds: number[] = existingRevenue.projectsAwarded.map((project) => Number(project.id));
      const projectIdsToKeep = updateRevenueDto.projectsAwarded.filter((project) => project.id).map((project) => project.id);
      const projectsToDelete = existingProjectsIds.filter((existingId) => !projectIdsToKeep.includes(existingId));

      if (projectsToDelete.length) {
        await this.revenueProjectsAwardedRepository.delete(projectsToDelete);
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
    } else {
      await this.revenueProjectsAwardedRepository.delete({ cpRevenue: { id: existingRevenue.id } });
    }

    await this.update(id, updateRevenueDto as unknown as CPRevenueEntity);

    return this.getMyRevenue(user.companyProfile.id);
  }

  async getMyRevenue(companyProfileId: number): Promise<CPRevenueEntity> {
    const myRevenue = await this.getRevenueByFilter({ companyProfile: { id: companyProfileId } });
    // if (!myRevenue) {
    //   throw new NotFoundException('Revenue not found against your company profile');
    // }

    if (!myRevenue) return null;

    return myRevenue;
  }

  async getRevenueByFilter(filter: any): Promise<CPRevenueEntity> {
    return this.findByRelationFilters(filter, {
      relations: {
        companyProfile: 'companyProfile',
        projectsAwarded: 'projectsAwarded',
      },
      relationFilters: {
        projectsAwarded: {
          condition: 'projectsAwarded.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
      },
    });
  }

  async deleteMyRevenue(companyProfileId: number): Promise<CPRevenueEntity> {
    const myRevenue = await this.getMyRevenue(companyProfileId);
    return this.update(myRevenue.id, { isDeleted: true } as unknown as CPRevenueEntity);
  }
}
