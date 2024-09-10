import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from 'src/shared/constants';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { uploadFilesToS3 } from 'src/shared/utils';
import { CPAdvancedBusinessInformationEntity, UserEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { CPAdvancedBusinessInformationDto, UpdateCPAdvancedBusinessInformationDto } from './dtos/cp-advanced-business-info.dto';
import { Assets } from './interfaces';

@Injectable()
export class AdvancedBusinessInformationService extends BaseTypeOrmCrudService<CPAdvancedBusinessInformationEntity> {
  constructor(
    @InjectRepository(CPAdvancedBusinessInformationEntity)
    private readonly businessInfoRepository: Repository<CPAdvancedBusinessInformationEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(businessInfoRepository);
  }

  async createBusinessInformation(user: UserEntity, businessInfoDto: CPAdvancedBusinessInformationDto, files: Assets): Promise<CPAdvancedBusinessInformationEntity> {
    if (files) {
      if (files.industrySpecificFiles) {
        businessInfoDto.industrySpecificFiles = await uploadFilesToS3(user, files.industrySpecificFiles, 'industrySpecificFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.businessPlanFiles) {
        businessInfoDto.businessPlanFiles = await uploadFilesToS3(user, files.businessPlanFiles, 'businessPlanFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.certificateStatusFiles) {
        businessInfoDto.certificateStatusFiles = await uploadFilesToS3(user, files.certificateStatusFiles, 'certificateStatusFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.convictedOfFeloniesFiles) {
        businessInfoDto.convictedOfFeloniesFiles = await uploadFilesToS3(user, files.convictedOfFeloniesFiles, 'convictedOfFeloniesFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.ordersUnderDPASFiles) {
        businessInfoDto.ordersUnderDPASFiles = await uploadFilesToS3(user, files.ordersUnderDPASFiles, 'ordersUnderDPASFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
    }

    const existedBusiness = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    console.log(existedBusiness, 'existedBusiness');
    if (existedBusiness) {
      return this.updateBusinessInformation(existedBusiness.id, user, businessInfoDto, files);
    }

    return this.create({ ...businessInfoDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPAdvancedBusinessInformationEntity);
  }

  async updateBusinessInformation(id: number, user: UserEntity, updateBusinessInfoDto: UpdateCPAdvancedBusinessInformationDto, files: Assets): Promise<CPAdvancedBusinessInformationEntity> {
    const existedBusiness = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });

    if (!existedBusiness) {
      throw new Error('Advanced Business Info not associated with this company profile');
    }

    // Handle file updates
    if (files) {
      if (files.industrySpecificFiles) {
        updateBusinessInfoDto.industrySpecificFiles = await uploadFilesToS3(user, files.industrySpecificFiles, 'industrySpecificFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.businessPlanFiles) {
        updateBusinessInfoDto.businessPlanFiles = await uploadFilesToS3(user, files.businessPlanFiles, 'businessPlanFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.certificateStatusFiles) {
        updateBusinessInfoDto.certificateStatusFiles = await uploadFilesToS3(user, files.certificateStatusFiles, 'certificateStatusFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.convictedOfFeloniesFiles) {
        updateBusinessInfoDto.convictedOfFeloniesFiles = await uploadFilesToS3(user, files.convictedOfFeloniesFiles, 'convictedOfFeloniesFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
      if (files.ordersUnderDPASFiles) {
        updateBusinessInfoDto.ordersUnderDPASFiles = await uploadFilesToS3(user, files.ordersUnderDPASFiles, 'ordersUnderDPASFiles', this.s3Service, this.configService, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB);
      }
    }

    return this.update(id, updateBusinessInfoDto as unknown as CPAdvancedBusinessInformationEntity);
  }

  async getMyBusinessInformation(companyProfileId: number): Promise<CPAdvancedBusinessInformationEntity> {
    const existedbusiness = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });

    if (!existedbusiness) {
      throw new NotFoundException('Cybersecurity not found against your company profile');
    }
    return existedbusiness;
  }

  // async deleteMyBusinessInformation(companyProfileId: number): Promise<CPAdvancedBusinessInformationEntity> {
  //   const existedbusiness = await this.getMyBusinessInformation(companyProfileId);
  //   return this.update(existedbusiness.id, { isDeleted: true } as unknown as CPAdvancedBusinessInformationEntity);
  // }
}
