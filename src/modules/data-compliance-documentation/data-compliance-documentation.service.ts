import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { DataComplianceDocumentationEntity } from 'src/typeorm/models/cp-data-compliance-documentation.entity';
import { Repository } from 'typeorm';
import { UpsertDataComplianceDocumentationDto } from './dtos/data-compliance-documentation.dto';

@Injectable()
export class DataComplianceDocumentationService extends BaseTypeOrmCrudService<DataComplianceDocumentationEntity> {
  constructor(
    @InjectRepository(DataComplianceDocumentationEntity)
    readonly dataComplianceRepository: Repository<DataComplianceDocumentationEntity>,
  ) {
    super(dataComplianceRepository);
  }

  async upsertDataComplianceDocumentation(user: any, upsertComplianceDocumentationDto: UpsertDataComplianceDocumentationDto): Promise<DataComplianceDocumentationEntity> {
    const existingDataComplianceDocumentation = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });

    if (existingDataComplianceDocumentation) {
      return this.update(existingDataComplianceDocumentation.id, upsertComplianceDocumentationDto as unknown as DataComplianceDocumentationEntity);
    }

    return this.create({
      ...upsertComplianceDocumentationDto,
      companyProfile: { id: user.companyProfile.id },
    } as unknown as DataComplianceDocumentationEntity);
  }

  async getMyDataComplianceDocumentation(companyProfileId: number): Promise<DataComplianceDocumentationEntity> {
    const dataComplianceDocumentation = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!dataComplianceDocumentation) {
      throw new NotFoundException('DataComplianceDocumentation not found against your company profile');
    }
    return dataComplianceDocumentation;
  }
}
