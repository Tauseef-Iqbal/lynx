import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CompanyOverviewEntity, UserEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { UpsertCompanyOverviewDto } from './dtos';

@Injectable()
export class CompanyOrverviewService extends BaseTypeOrmCrudService<CompanyOverviewEntity> {
  constructor(
    @InjectRepository(CompanyOverviewEntity)
    readonly companyOverviewRepository: Repository<CompanyOverviewEntity>,
  ) {
    super(companyOverviewRepository);
  }

  async companyOverview(user: UserEntity, upsertCompanyOverviewDto: UpsertCompanyOverviewDto): Promise<CompanyOverviewEntity> {
    const alreadyExist = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });

    if (alreadyExist) {
      return this.update(alreadyExist.id, upsertCompanyOverviewDto as unknown as CompanyOverviewEntity);
    }

    return this.create({
      ...upsertCompanyOverviewDto,
      companyProfile: { id: user.companyProfile.id },
    } as unknown as CompanyOverviewEntity);
  }

  async getCompanyOverview(companyProfileId: number): Promise<CompanyOverviewEntity> {
    const overview = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!overview) {
      throw new NotFoundException('CompanyOverviewEntity not found against your company profile');
    }

    return overview;
  }
}
