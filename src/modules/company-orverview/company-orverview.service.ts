import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPCompanyOverviewEntity, UserEntity } from 'src/typeorm/models';
import { AddCompanyOverviewDto, UpdateCompanyOverviewDto } from './dtos';

@Injectable()
export class CompanyOverviewService extends BaseTypeOrmCrudService<CPCompanyOverviewEntity> {
  constructor(
    @InjectRepository(CPCompanyOverviewEntity)
    readonly companyOverviewRepository: Repository<CPCompanyOverviewEntity>,
  ) {
    super(companyOverviewRepository);
  }

  async addCompanyOverview(user: UserEntity, addCompanyOverviewDto: AddCompanyOverviewDto): Promise<CPCompanyOverviewEntity> {
    const existedCompanyOverview = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedCompanyOverview) {
      return this.updateCompanyOverview(existedCompanyOverview.id, user, addCompanyOverviewDto);
    }

    return this.create({ ...addCompanyOverviewDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPCompanyOverviewEntity);
  }

  async updateCompanyOverview(id: number, user: UserEntity, updateCompanyOverviewDto: UpdateCompanyOverviewDto): Promise<CPCompanyOverviewEntity> {
    const companyOverview = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!companyOverview) {
    //   throw new Error('Company Overview not associated with this company profile');
    // }

    if (!companyOverview) return null;

    return this.update(id, updateCompanyOverviewDto as unknown as CPCompanyOverviewEntity);
  }

  async getMyCompanyOverview(companyProfileId: number): Promise<CPCompanyOverviewEntity> {
    const myCompanyOverview = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myCompanyOverview) {
    //   throw new NotFoundException('Company Overview not found against your company profile');
    // }

    if (!myCompanyOverview) return null;

    return myCompanyOverview;
  }

  async deleteMyCompanyOverview(companyProfileId: number): Promise<CPCompanyOverviewEntity> {
    const myCompanyOverview = await this.getMyCompanyOverview(companyProfileId);
    return this.update(myCompanyOverview.id, { isDeleted: true } as unknown as CPCompanyOverviewEntity);
  }
}
