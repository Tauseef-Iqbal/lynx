import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPToolsAndApplicationsEntity, UserEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { AddToolsAndApplicationsDto, UpdateToolsAndApplicationsDto } from './dtos';

@Injectable()
export class ToolsAndApplicationsService extends BaseTypeOrmCrudService<CPToolsAndApplicationsEntity> {
  constructor(
    @InjectRepository(CPToolsAndApplicationsEntity)
    readonly toolsAndApplicationsRepository: Repository<CPToolsAndApplicationsEntity>,
  ) {
    super(toolsAndApplicationsRepository);
  }

  async addToolsAndApplications(user: UserEntity, addToolsAndApplicationsDto: AddToolsAndApplicationsDto): Promise<CPToolsAndApplicationsEntity> {
    const existedtoolsAndApplications = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedtoolsAndApplications) {
      return this.updateToolsAndApplications(existedtoolsAndApplications.id, user, addToolsAndApplicationsDto);
    }

    return this.create({ ...addToolsAndApplicationsDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPToolsAndApplicationsEntity);
  }

  async updateToolsAndApplications(id: number, user: UserEntity, updateToolsAndApplicationsDto: UpdateToolsAndApplicationsDto): Promise<CPToolsAndApplicationsEntity> {
    const toolsAndApplications = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    if (!toolsAndApplications) {
      throw new Error('Tools and Applications not associated with this company profile');
    }

    return this.update(id, updateToolsAndApplicationsDto as unknown as CPToolsAndApplicationsEntity);
  }

  async getMyToolsAndApplications(companyProfileId: number): Promise<CPToolsAndApplicationsEntity> {
    const myToolsAndApplications = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!myToolsAndApplications) {
      throw new NotFoundException('Tools and Applications not found against your company profile');
    }
    return myToolsAndApplications;
  }

  async deleteMyToolsAndApplications(companyProfileId: number): Promise<CPToolsAndApplicationsEntity> {
    const myToolsAndApplications = await this.getMyToolsAndApplications(companyProfileId);
    return this.update(myToolsAndApplications.id, { isDeleted: true } as unknown as CPToolsAndApplicationsEntity);
  }
}
