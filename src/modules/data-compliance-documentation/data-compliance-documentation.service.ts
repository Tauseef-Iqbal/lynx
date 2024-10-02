import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPDataComplianceDocumentationEntity, UserEntity } from 'src/typeorm/models';
import { AddDataComplianceDocumentationDto, UpdateDataComplianceDocumentationDto } from './dtos';

@Injectable()
export class DataComplianceDocumentationService extends BaseTypeOrmCrudService<CPDataComplianceDocumentationEntity> {
  constructor(
    @InjectRepository(CPDataComplianceDocumentationEntity)
    readonly dataComplianceDocumentationRepository: Repository<CPDataComplianceDocumentationEntity>,
  ) {
    super(dataComplianceDocumentationRepository);
  }

  async addDataComplianceDocumentation(user: UserEntity, addDataComplianceDocumentationDto: AddDataComplianceDocumentationDto): Promise<CPDataComplianceDocumentationEntity> {
    const existedDataComplianceDocumentation = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedDataComplianceDocumentation) {
      return this.updateDataComplianceDocumentation(existedDataComplianceDocumentation.id, user, addDataComplianceDocumentationDto);
    }

    return this.create({ ...addDataComplianceDocumentationDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPDataComplianceDocumentationEntity);
  }

  async updateDataComplianceDocumentation(id: number, user: UserEntity, updateDataComplianceDocumentationDto: UpdateDataComplianceDocumentationDto): Promise<CPDataComplianceDocumentationEntity> {
    const dataComplianceDocumentation = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!dataComplianceDocumentation) {
    //   throw new Error('DataComplianceDocumentation not associated with this company profile');
    // }

    if (!dataComplianceDocumentation) return null;

    return this.update(id, updateDataComplianceDocumentationDto as unknown as CPDataComplianceDocumentationEntity);
  }

  async getMyDataComplianceDocumentation(companyProfileId: number): Promise<CPDataComplianceDocumentationEntity> {
    const myDataComplianceDocumentation = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myDataComplianceDocumentation) {
    //   throw new NotFoundException('DataComplianceDocumentation not found against your company profile');
    // }

    if (!myDataComplianceDocumentation) return null;

    return myDataComplianceDocumentation;
  }

  async deleteMyDataComplianceDocumentation(companyProfileId: number): Promise<CPDataComplianceDocumentationEntity> {
    const myDataComplianceDocumentation = await this.getMyDataComplianceDocumentation(companyProfileId);
    return this.update(myDataComplianceDocumentation.id, { isDeleted: true } as unknown as CPDataComplianceDocumentationEntity);
  }
}
