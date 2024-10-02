import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CPRequiredSystemEntity, UserEntity } from 'src/typeorm/models';
import { CreateRequiredSystemDto, UpdateRequiredSystemDto } from './dtos';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { RequiredSystemBusinessClassificationService } from './re-business-classification.service';
import { RequiredSystemCertificationService } from './re-certificate.service';
import { RequiredSystemTypeService } from './re-system-type.service';

@Injectable()
export class RequiredSystemService extends BaseTypeOrmCrudService<CPRequiredSystemEntity> {
  constructor(
    @InjectRepository(CPRequiredSystemEntity)
    private requiredSystemRepository: Repository<CPRequiredSystemEntity>,
    private readonly requiredSystemBusinessClassificationService: RequiredSystemBusinessClassificationService,
    private readonly requiredSystemCertificationService: RequiredSystemCertificationService,
    private readonly requiredSystemTypeService: RequiredSystemTypeService,
  ) {
    super(requiredSystemRepository);
  }

  async createRequiredSystem(user: UserEntity, createRequiredSystemDto: CreateRequiredSystemDto): Promise<CPRequiredSystemEntity> {
    const requiredSystem = await this.create({ ...createRequiredSystemDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPRequiredSystemEntity);

    if (createRequiredSystemDto?.businessClassifications?.length > 0) {
      await this.requiredSystemBusinessClassificationService.upsertRquiredSystemBusinessCertification(requiredSystem.id, createRequiredSystemDto.businessClassifications);
    }

    if (createRequiredSystemDto?.certifications.length > 0) {
      await this.requiredSystemCertificationService.upsertRquiredSystemCertification(requiredSystem.id, createRequiredSystemDto.certifications);
    }

    if (createRequiredSystemDto?.systemTypes?.length > 0) {
      await this.requiredSystemTypeService.upsertRquiredSystemType(requiredSystem.id, createRequiredSystemDto.systemTypes);
    }

    return requiredSystem;
  }

  async updateRequiredSystem(requiredSystem: CPRequiredSystemEntity, updateRequiredSystemDto: UpdateRequiredSystemDto): Promise<CPRequiredSystemEntity> {
    if (updateRequiredSystemDto?.businessClassifications?.length >= 0) {
      await this.requiredSystemBusinessClassificationService.upsertRquiredSystemBusinessCertification(requiredSystem.id, updateRequiredSystemDto.businessClassifications);

      delete updateRequiredSystemDto.businessClassifications;
    }

    if (updateRequiredSystemDto?.certifications.length >= 0) {
      await this.requiredSystemCertificationService.upsertRquiredSystemCertification(requiredSystem.id, updateRequiredSystemDto.certifications);

      delete updateRequiredSystemDto.certifications;
    }

    if (updateRequiredSystemDto?.systemTypes?.length >= 0) {
      await this.requiredSystemTypeService.upsertRquiredSystemType(requiredSystem.id, updateRequiredSystemDto.systemTypes);

      delete updateRequiredSystemDto.systemTypes;
    }

    return this.update(requiredSystem.id, updateRequiredSystemDto as unknown as CPRequiredSystemEntity);
  }
}
