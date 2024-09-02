import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CreateFinancialHealthSectionDto, UpdateFinancialHealthSectionDto } from './dtos/financial-health.dto';
import { CPFinancialHealthEntity } from 'src/typeorm/models';
import { S3Service } from 'src/modules/global/providers';
import { ConfigService } from '@nestjs/config';
import { FinancialHealthFiles } from './interfaces';
import { FinancialHealthSectionFilesCategory } from './enums';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';

@Injectable()
export class FinancialHealthService extends BaseTypeOrmCrudService<CPFinancialHealthEntity> {
  constructor(
    @InjectRepository(CPFinancialHealthEntity) readonly cpFinancialHealthRepository: Repository<CPFinancialHealthEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(cpFinancialHealthRepository);
  }

  async createFinancialHealthSection(user: any, createFinancialHealthSectionDto: CreateFinancialHealthSectionDto, files: FinancialHealthFiles): Promise<CPFinancialHealthEntity> {
    if (files.financialStatementsFiles) {
      if (!createFinancialHealthSectionDto.financialStatements) throw new BadRequestException('financialStatementsFiles should not be provided when financialStatements does not meet the required condition.');
      createFinancialHealthSectionDto.financialStatementsFiles = await processFilesToAdd({
        incomingFiles: files.financialStatementsFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.financialStatementsFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialStatements}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (files.businessPlansFiles) {
      if (!createFinancialHealthSectionDto.businessPlans) throw new BadRequestException('businessPlansFiles should not be provided when businessPlans does not meet the required condition.');
      createFinancialHealthSectionDto.businessPlansFiles = await processFilesToAdd({
        incomingFiles: files.businessPlansFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.businessPlansFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.BusinessPlans}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (files.goodStandingCertificatesFiles) {
      if (!createFinancialHealthSectionDto.goodStandingCertificates) throw new BadRequestException('goodStandingCertificatesFiles should not be provided when goodStandingCertificates does not meet the required condition.');
      createFinancialHealthSectionDto.goodStandingCertificatesFiles = await processFilesToAdd({
        incomingFiles: files.goodStandingCertificatesFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.goodStandingCertificatesFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.GoodStandingCertificates}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (files.financialDisclosureStatementsFiles) {
      if (!createFinancialHealthSectionDto.financialDisclosureStatements) throw new BadRequestException('financialDisclosureStatementsFiles should not be provided when financialDisclosureStatements does not meet the required condition.');
      createFinancialHealthSectionDto.financialDisclosureStatementsFiles = await processFilesToAdd({
        incomingFiles: files.financialDisclosureStatementsFiles,
        incomingS3AndBase64: createFinancialHealthSectionDto.financialDisclosureStatementsFiles,
        keyPrefix: `${user.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialDisclosureStatements}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (files.financialAuditsFiles) {
      if (!createFinancialHealthSectionDto.financialAudits) throw new BadRequestException('financialAuditsFiles should not be provided when financialAudits does not meet the required condition.');
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

  getMyFinancialHealthData(companyProfileId: number) {
    return this.cpFinancialHealthRepository.findOne({ where: { companyProfile: { id: companyProfileId }, isDeleted: false } });
  }

  async updateFinancialHealthSection(id: number, updateFinancialHealthSectionDto: UpdateFinancialHealthSectionDto, files: FinancialHealthFiles): Promise<CPFinancialHealthEntity> {
    const financialHealthSection = await this.findById(id, { relations: { companyProfile: true } });
    if (!financialHealthSection) {
      throw new Error('Financial Health Section not associated with this company profile');
    }

    if (files.financialStatementsFiles) {
      updateFinancialHealthSectionDto.financialStatementsFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.financialStatementsFiles,
        incomingFiles: files.financialStatementsFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.financialStatementsFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialStatements}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (files.businessPlansFiles) {
      updateFinancialHealthSectionDto.businessPlansFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.businessPlansFiles,
        incomingFiles: files.businessPlansFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.businessPlansFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.BusinessPlans}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (files.goodStandingCertificatesFiles) {
      updateFinancialHealthSectionDto.goodStandingCertificatesFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.goodStandingCertificatesFiles,
        incomingFiles: files.goodStandingCertificatesFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.goodStandingCertificatesFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.GoodStandingCertificates}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (files.financialDisclosureStatementsFiles) {
      updateFinancialHealthSectionDto.financialDisclosureStatementsFiles = await processFilesToUpdate({
        existingFiles: financialHealthSection.financialDisclosureStatementsFiles,
        incomingFiles: files.financialDisclosureStatementsFiles,
        incomingS3AndBase64: updateFinancialHealthSectionDto.financialDisclosureStatementsFiles,
        keyPrefix: `${financialHealthSection.companyProfile.name}/${FinancialHealthSectionFilesCategory.FinancialDisclosureStatements}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (files.financialAuditsFiles) {
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
}
