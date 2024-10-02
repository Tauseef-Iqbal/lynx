import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/modules/global/providers';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
import { CPFinancialHealthEntity, UserEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { CreateFinancialHealthSectionDto, UpdateFinancialHealthSectionDto } from './dtos/financial-health.dto';
import { FinancialHealthSectionFilesCategory } from './enums';
import { FinancialHealthFiles } from './interfaces';

@Injectable()
export class FinancialHealthService extends BaseTypeOrmCrudService<CPFinancialHealthEntity> {
  constructor(
    @InjectRepository(CPFinancialHealthEntity) readonly cpFinancialHealthRepository: Repository<CPFinancialHealthEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(cpFinancialHealthRepository);
  }

  async createFinancialHealthSection(user: UserEntity, createFinancialHealthSectionDto: CreateFinancialHealthSectionDto, files: FinancialHealthFiles): Promise<CPFinancialHealthEntity> {
    const existedFinancialHealth = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedFinancialHealth) {
      return this.updateFinancialHealthSection(existedFinancialHealth.id, user, createFinancialHealthSectionDto, files);
    }

    if (createFinancialHealthSectionDto?.financialStatements && (files?.financialStatementsFiles?.length || createFinancialHealthSectionDto?.financialStatementsFiles?.length)) {
      createFinancialHealthSectionDto.financialStatementsFiles = await processFilesToAdd({
        incomingFiles: files.financialStatementsFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.financialStatementsFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialStatements}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (createFinancialHealthSectionDto?.businessPlans && (files?.businessPlansFiles?.length || createFinancialHealthSectionDto?.businessPlansFiles?.length)) {
      createFinancialHealthSectionDto.businessPlansFiles = await processFilesToAdd({
        incomingFiles: files.businessPlansFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.businessPlansFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.BusinessPlans}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (createFinancialHealthSectionDto?.goodStandingCertificates && (files?.goodStandingCertificatesFiles?.length || createFinancialHealthSectionDto?.goodStandingCertificatesFiles?.length)) {
      createFinancialHealthSectionDto.goodStandingCertificatesFiles = await processFilesToAdd({
        incomingFiles: files.goodStandingCertificatesFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.goodStandingCertificatesFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.GoodStandingCertificates}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (createFinancialHealthSectionDto?.financialDisclosureStatements && (files?.financialDisclosureStatementsFiles?.length || createFinancialHealthSectionDto?.financialDisclosureStatementsFiles?.length)) {
      createFinancialHealthSectionDto.financialDisclosureStatementsFiles = await processFilesToAdd({
        incomingFiles: files.financialDisclosureStatementsFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.financialDisclosureStatementsFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialDisclosureStatements}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (createFinancialHealthSectionDto?.financialAudits && (files?.financialAuditsFiles?.length || createFinancialHealthSectionDto.financialAuditsFiles?.length)) {
      createFinancialHealthSectionDto.financialAuditsFiles = await processFilesToAdd({
        incomingFiles: files.financialAuditsFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.financialAuditsFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialAudits}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    return this.create({ ...createFinancialHealthSectionDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPFinancialHealthEntity);
  }

  async getMyFinancialHealth(companyProfileId: number): Promise<CPFinancialHealthEntity> {
    const myFinancialhealth = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myFinancialhealth) {
    //   throw new NotFoundException('Financial Health section not found against your company profile');
    // }

    if (!myFinancialhealth) return null;

    return myFinancialhealth;
  }

  async updateFinancialHealthSection(id: number, user: UserEntity, updateFinancialHealthSectionDto: UpdateFinancialHealthSectionDto, files: FinancialHealthFiles): Promise<CPFinancialHealthEntity> {
    const financialHealthSection = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!financialHealthSection) {
    //   throw new Error('Financial Health Section not associated with this company profile');
    // }

    if (!financialHealthSection) return null;

    if (updateFinancialHealthSectionDto?.financialStatements && (files?.financialStatementsFiles?.length || updateFinancialHealthSectionDto?.financialStatementsFiles?.length)) {
      updateFinancialHealthSectionDto.financialStatementsFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.financialStatementsFiles,
        incomingFiles: files.financialStatementsFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.financialStatementsFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialStatements}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (updateFinancialHealthSectionDto?.businessPlans && (files?.businessPlansFiles?.length || updateFinancialHealthSectionDto?.businessPlansFiles?.length)) {
      updateFinancialHealthSectionDto.businessPlansFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.businessPlansFiles,
        incomingFiles: files.businessPlansFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.businessPlansFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.BusinessPlans}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (updateFinancialHealthSectionDto?.goodStandingCertificates && (files?.goodStandingCertificatesFiles?.length || updateFinancialHealthSectionDto?.goodStandingCertificatesFiles?.length)) {
      updateFinancialHealthSectionDto.goodStandingCertificatesFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.goodStandingCertificatesFiles,
        incomingFiles: files.goodStandingCertificatesFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.goodStandingCertificatesFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.GoodStandingCertificates}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (updateFinancialHealthSectionDto?.financialDisclosureStatements && (files?.financialDisclosureStatementsFiles?.length || updateFinancialHealthSectionDto?.financialDisclosureStatementsFiles?.length)) {
      updateFinancialHealthSectionDto.financialDisclosureStatementsFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.financialDisclosureStatementsFiles,
        incomingFiles: files.financialDisclosureStatementsFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.financialDisclosureStatementsFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialDisclosureStatements}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (updateFinancialHealthSectionDto?.financialAudits && (files?.financialAuditsFiles?.length || updateFinancialHealthSectionDto?.financialAuditsFiles?.length)) {
      updateFinancialHealthSectionDto.financialAuditsFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.financialAuditsFiles,
        incomingFiles: files.financialAuditsFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.financialAuditsFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialAudits}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    return this.update(id, updateFinancialHealthSectionDto as unknown as CPFinancialHealthEntity);
  }

  async deleteMyFinancialHealth(companyProfileId: number): Promise<CPFinancialHealthEntity> {
    const myFinancialhealth = await this.getMyFinancialHealth(companyProfileId);
    return this.update(myFinancialhealth.id, { isDeleted: true } as unknown as CPFinancialHealthEntity);
  }
}
