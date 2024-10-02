import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { processCpLegalStructureFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
import { CPAdvancedBusinessInformationEntity, UserEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { Assets } from './interfaces';
import { AddAdvancedBusinessInformationDto } from './dtos';

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

  async createBusinessInformation(user: UserEntity, advancedBusinessInfoDto: AddAdvancedBusinessInformationDto, files: Assets): Promise<CPAdvancedBusinessInformationEntity> {
    if (files) {
      if (files.industrySpecificFiles && files.industrySpecificFiles.length) {
        advancedBusinessInfoDto.industrySpecificFiles = await processCpLegalStructureFilesToAdd(user, files.industrySpecificFiles, 'industrySpecificFiles', this.s3Service, this.configService);
      }
      if (files.businessPlanFiles && files.businessPlanFiles.length) {
        advancedBusinessInfoDto.businessPlanFiles = await processCpLegalStructureFilesToAdd(user, files.businessPlanFiles, 'businessPlanFiles', this.s3Service, this.configService);
      }
      if (files.certificateStatusFiles && files.certificateStatusFiles.length) {
        advancedBusinessInfoDto.certificateStatusFiles = await processCpLegalStructureFilesToAdd(user, files.certificateStatusFiles, 'certificateStatusFiles', this.s3Service, this.configService);
      }
      if (files.convictedOfFeloniesFiles && files.convictedOfFeloniesFiles.length) {
        advancedBusinessInfoDto.convictedOfFeloniesFiles = await processCpLegalStructureFilesToAdd(user, files.convictedOfFeloniesFiles, 'convictedOfFeloniesFiles', this.s3Service, this.configService);
      }
      if (files.ordersUnderDPASFiles && files.ordersUnderDPASFiles.length) {
        advancedBusinessInfoDto.ordersUnderDPASFiles = await processCpLegalStructureFilesToAdd(user, files.ordersUnderDPASFiles, 'ordersUnderDPASFiles', this.s3Service, this.configService);
      }
    }

    const existedBusiness = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedBusiness) {
      return this.updateBusinessInformation(existedBusiness.id, user, advancedBusinessInfoDto, files);
    }

    return this.create({ ...advancedBusinessInfoDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPAdvancedBusinessInformationEntity);
  }

  async updateBusinessInformation(id: number, user: UserEntity, updateBusinessInfoDto: UpdateAddAdvancedBusinessInformationDto, files: Assets): Promise<CPAdvancedBusinessInformationEntity> {
    const existedBusiness = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!existedBusiness) {
    //   throw new Error('Advanced Business Info not associated with this company profile');
    // }

    if (!existedBusiness) return null;

    if (files) {
      updateBusinessInfoDto.industrySpecificFiles = await processFilesToUpdate({
        existingFiles: existedBusiness.industrySpecificFiles,
        incomingFiles: files.industrySpecificFiles || [],
        incomingS3AndBase64: [],
        keyPrefix: `${user.companyProfile.name}/industrySpecificFiles`,
        configService: this.configService,
        s3Service: this.s3Service,
      });

      updateBusinessInfoDto.businessPlanFiles = await processFilesToUpdate({
        existingFiles: existedBusiness.businessPlanFiles,
        incomingFiles: files.businessPlanFiles || [],
        incomingS3AndBase64: [],
        keyPrefix: `${user.companyProfile.name}/businessPlanFiles`,
        configService: this.configService,
        s3Service: this.s3Service,
      });

      updateBusinessInfoDto.certificateStatusFiles = await processFilesToUpdate({
        existingFiles: existedBusiness.certificateStatusFiles,
        incomingFiles: files.certificateStatusFiles || [],
        incomingS3AndBase64: [],
        keyPrefix: `${user.companyProfile.name}/certificateStatusFiles`,
        configService: this.configService,
        s3Service: this.s3Service,
      });

      updateBusinessInfoDto.convictedOfFeloniesFiles = await processFilesToUpdate({
        existingFiles: existedBusiness.convictedOfFeloniesFiles,
        incomingFiles: files.convictedOfFeloniesFiles || [],
        incomingS3AndBase64: [],
        keyPrefix: `${user.companyProfile.name}/convictedOfFeloniesFiles`,
        configService: this.configService,
        s3Service: this.s3Service,
      });

      updateBusinessInfoDto.ordersUnderDPASFiles = await processFilesToUpdate({
        existingFiles: existedBusiness.ordersUnderDPASFiles,
        incomingFiles: files.ordersUnderDPASFiles || [],
        incomingS3AndBase64: [],
        keyPrefix: `${user.companyProfile.name}/ordersUnderDPASFiles`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    return this.update(id, updateBusinessInfoDto as unknown as CPAdvancedBusinessInformationEntity);
  }

  async getMyBusinessInformation(companyProfileId: number): Promise<CPAdvancedBusinessInformationEntity> {
    const existedbusiness = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });

    if (!existedbusiness) {
      // throw new NotFoundException('Cybersecurity not found against your company profile');
    }
    return existedbusiness;
  }

  // async deleteMyBusinessInformation(companyProfileId: number): Promise<CPAdvancedBusinessInformationEntity> {
  //   const existedbusiness = await this.getMyBusinessInformation(companyProfileId);
  //   return this.update(existedbusiness.id, { isDeleted: true } as unknown as CPAdvancedBusinessInformationEntity);
  // }
}
