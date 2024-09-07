import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPBusinessGoalsEntity, UserEntity } from 'src/typeorm/models';
import { AddBusinessGoalsDto, UpdateBusinessGoalsDto } from './dtos';

@Injectable()
export class BusinessGoalsService extends BaseTypeOrmCrudService<CPBusinessGoalsEntity> {
  constructor(
    @InjectRepository(CPBusinessGoalsEntity)
    readonly businessGoalsRepository: Repository<CPBusinessGoalsEntity>,
  ) {
    super(businessGoalsRepository);
  }

  async addBusinessGoals(user: UserEntity, addBusinessGoalsDto: AddBusinessGoalsDto): Promise<CPBusinessGoalsEntity> {
    const existedBusinessGoals = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedBusinessGoals) {
      return this.updateBusinessGoals(existedBusinessGoals.id, user, addBusinessGoalsDto);
    }

    return this.create({ ...addBusinessGoalsDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPBusinessGoalsEntity);
  }

  async updateBusinessGoals(id: number, user: UserEntity, updateBusinessGoalsDto: UpdateBusinessGoalsDto): Promise<CPBusinessGoalsEntity> {
    const businessGoals = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    if (!businessGoals) {
      throw new Error('Business Goals not associated with this company profile');
    }

    return this.update(id, updateBusinessGoalsDto as unknown as CPBusinessGoalsEntity);
  }

  async getMyBusinessGoals(companyProfileId: number): Promise<CPBusinessGoalsEntity> {
    const myBusinessGoals = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!myBusinessGoals) {
      throw new NotFoundException('Business Goals not found against your company profile');
    }
    return myBusinessGoals;
  }

  async deleteMyBusinessGoals(companyProfileId: number): Promise<CPBusinessGoalsEntity> {
    const myBusinessGoals = await this.getMyBusinessGoals(companyProfileId);
    return this.update(myBusinessGoals.id, { isDeleted: true } as unknown as CPBusinessGoalsEntity);
  }
}
