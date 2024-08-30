import { Injectable } from '@nestjs/common';
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
      createFinancialHealthSectionDto.financialStatementsFiles = await processFilesToAdd(user, files.financialStatementsFiles, FinancialHealthSectionFilesCategory.FinancialStatements, this.s3Service);
    }
    if (files.businessPlansFiles) {
      createFinancialHealthSectionDto.businessPlansFiles = await processFilesToAdd(user, files.businessPlansFiles, FinancialHealthSectionFilesCategory.BusinessPlans, this.s3Service);
    }
    if (files.goodStandingCertificatesFiles) {
      createFinancialHealthSectionDto.goodStandingCertificatesFiles = await processFilesToAdd(user, files.goodStandingCertificatesFiles, FinancialHealthSectionFilesCategory.GoodStandingCertificates, this.s3Service);
    }
    if (files.financialDisclosureStatementsFiles) {
      createFinancialHealthSectionDto.financialDisclosureStatementsFiles = await processFilesToAdd(user, files.financialDisclosureStatementsFiles, FinancialHealthSectionFilesCategory.FinancialDisclosureStatements, this.s3Service);
    }
    if (files.financialAuditsFiles) {
      createFinancialHealthSectionDto.financialAuditsFiles = await processFilesToAdd(user, files.financialAuditsFiles, FinancialHealthSectionFilesCategory.FinancialAudits, this.s3Service);
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
      updateFinancialHealthSectionDto.financialStatementsFiles = await processFilesToUpdate(
        financialHealthSection.companyProfile,
        financialHealthSection.financialStatementsFiles || [],
        files.financialStatementsFiles,
        FinancialHealthSectionFilesCategory.FinancialStatements,
        this.s3Service,
        this.configService,
      );
    }
    if (files.businessPlansFiles) {
      updateFinancialHealthSectionDto.businessPlansFiles = await processFilesToUpdate(financialHealthSection.companyProfile, updateFinancialHealthSectionDto.businessPlansFiles || [], files.businessPlansFiles, FinancialHealthSectionFilesCategory.BusinessPlans, this.s3Service, this.configService);
    }
    if (files.goodStandingCertificatesFiles) {
      updateFinancialHealthSectionDto.goodStandingCertificatesFiles = await processFilesToUpdate(
        financialHealthSection.companyProfile,
        updateFinancialHealthSectionDto.goodStandingCertificatesFiles || [],
        files.goodStandingCertificatesFiles,
        FinancialHealthSectionFilesCategory.GoodStandingCertificates,
        this.s3Service,
        this.configService,
      );
    }
    if (files.financialDisclosureStatementsFiles) {
      updateFinancialHealthSectionDto.financialDisclosureStatementsFiles = await processFilesToUpdate(
        financialHealthSection.companyProfile,
        updateFinancialHealthSectionDto.financialDisclosureStatementsFiles || [],
        files.financialDisclosureStatementsFiles,
        FinancialHealthSectionFilesCategory.FinancialDisclosureStatements,
        this.s3Service,
        this.configService,
      );
    }
    if (files.financialAuditsFiles) {
      updateFinancialHealthSectionDto.financialAuditsFiles = await processFilesToUpdate(
        financialHealthSection.companyProfile,
        updateFinancialHealthSectionDto.financialAuditsFiles || [],
        files.financialAuditsFiles,
        FinancialHealthSectionFilesCategory.FinancialAudits,
        this.s3Service,
        this.configService,
      );
    }

    return this.update(id, updateFinancialHealthSectionDto as unknown as CPFinancialHealthEntity);
  }
}
