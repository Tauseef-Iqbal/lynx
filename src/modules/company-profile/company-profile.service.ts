import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService, UserUpdateEvent } from 'src/shared/services';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from './dtos/company-profile.dto';
import { CompanyProfileEntity } from 'src/typeorm/models/company-profile.entity';
import { S3Service } from 'src/modules/global/providers';
import { ConfigService } from '@nestjs/config';
import { Assets } from './interfaces';
import { getEntityProgress, processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
import {
  CPCompanyOverviewEntity,
  CPLegalStructureEntity,
  CPControlsAndProtocolsEntity,
  CPAdvancedBusinessInformationEntity,
  CpAwardEntity,
  CPBusinessGoalsEntity,
  CpCertificationsEntity,
  CPCybersecurityEntity,
  CPDataManagementAndStorageEntity,
  CPFCIAndCUIEntity,
  CPFinancialHealthEntity,
  CPFundingSourcesEntity,
  CPOwnershipStructureEntity,
  CpPastPerformanceEntity,
  CPPersonnelEntity,
  CPPointsOfContactEntity,
  CPProductsAndServicesEntity,
  CPRequiredSystemEntity,
  CPResearchAndDevelopmentEntity,
  CPRevenueEntity,
  CPToolsAndApplicationsEntity,
  UserEntity,
} from 'src/typeorm/models';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CPDataComplianceDocumentationEntity } from 'src/typeorm/models/cp-data-compliance-documentation.entity';

@Injectable()
export class CompanyProfileService extends BaseTypeOrmCrudService<CompanyProfileEntity> {
  constructor(
    @InjectRepository(CompanyProfileEntity) readonly companyRepository: Repository<CompanyProfileEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(companyRepository);
  }

  async createCompanyProfile(user: UserEntity, createCompanyProfileDto: CreateCompanyProfileDto, files: Assets): Promise<any> {
    if (user?.companyProfile.id) {
      return this.updateCompanyProfile(user.companyProfile.id, user, createCompanyProfileDto, files);
    } else {
      if (files?.assets?.length || createCompanyProfileDto?.assets?.length) {
        createCompanyProfileDto.assets = await processFilesToAdd({
          incomingFiles: files.assets,
          incomingS3AndBase64: createCompanyProfileDto.assets,
          keyPrefix: `${createCompanyProfileDto.name}/Profile`,
          configService: this.configService,
          s3Service: this.s3Service,
          assetsMetadata: createCompanyProfileDto.assetsMetadata,
        });
      }

      const companyProfile = await this.create({ ...createCompanyProfileDto, userProfile: { id: user.id } } as any as CompanyProfileEntity);
      this.eventEmitter.emit('user.updated', new UserUpdateEvent(user.id));
      return companyProfile;
    }
  }

  async updateCompanyProfile(id: number, user: UserEntity, updateCompanyProfileDto: UpdateCompanyProfileDto, files: Assets): Promise<any> {
    const companyProfile = await this.findByFilter({ id, userProfile: { id: user.id } });
    // if (!companyProfile) throw new Error('Company not found');
    if (!companyProfile) return null;

    if (companyProfile?.assets?.length || files?.assets?.length) {
      updateCompanyProfileDto.assets = await processFilesToUpdate({
        existingFiles: companyProfile.assets,
        incomingFiles: files.assets,
        incomingS3AndBase64: updateCompanyProfileDto.assets,
        keyPrefix: `${companyProfile.name}/Profile`,
        configService: this.configService,
        s3Service: this.s3Service,
        assetsMetadata: updateCompanyProfileDto.assetsMetadata,
      });
    }

    const updatedCompanyProfile = await this.update(id, updateCompanyProfileDto as unknown as CompanyProfileEntity);
    this.eventEmitter.emit('user.updated', new UserUpdateEvent(user.id));
    return updatedCompanyProfile;
  }

  async getMyCompanyProfile(user: UserEntity): Promise<CompanyProfileEntity> {
    // if (!user.companyProfile.id) throw new Error(`You're not registered. Please create your company profile.`);
    if (!user.companyProfile.id) return null;
    const companyProfile = await this.findByFilter({ userProfile: { id: user.id } });
    return companyProfile;
  }

  async getCompanyProfileByFilter(filter: any): Promise<CompanyProfileEntity> {
    const result = await this.findByRelationFilters(filter, {
      relations: {
        financialHealth: 'financialHealth',
        toolsAndApplications: 'toolsAndApplications',
        cpLegalStructure: 'cpLegalStructure',
        revenue: 'revenue',
        cybersecurity: 'cybersecurity',
        fundingSources: 'fundingSources',
        ownershipStructure: 'ownershipStructure',
        pastPerformance: 'pastPerformance',
        cpCertifications: 'cpCertifications',
        cpAwards: 'cpAwards',
        businessGoals: 'businessGoals',
        cpBusinessInfo: 'cpBusinessInfo',
        cpRequiredSystems: 'cpRequiredSystems',
        personnel: 'personnel',
        pointsOfContact: 'pointsOfContact',
        dataComplianceDocumentation: 'dataComplianceDocumentation',
        controlsAndProtocols: 'controlsAndProtocols',
        dataManagementAndStorage: 'dataManagementAndStorage',
        FCIAndCUI: 'FCIAndCUI',
        companyOverview: 'companyOverview',
        productsAndServices: 'productsAndServices',
        researchAndDevelopment: 'researchAndDevelopment',
      },
    });

    return result as CompanyProfileEntity;
  }

  async getCompanyProfileProgress(user: UserEntity) {
    const companyProfileProgress = await this.getCompanyProfileByFilter({ id: user?.companyProfile?.id });

    const sectionsProgress = {
      basicInformation: companyProfileProgress ? await getEntityProgress(CompanyProfileEntity, companyProfileProgress) : 0.0,
      financialHealth: companyProfileProgress?.financialHealth ? await getEntityProgress(CPFinancialHealthEntity, companyProfileProgress.financialHealth) : 0.0,
      toolsAndApplications: companyProfileProgress?.toolsAndApplications ? await getEntityProgress(CPToolsAndApplicationsEntity, companyProfileProgress.toolsAndApplications) : 0.0,
      cplegalstructure: companyProfileProgress?.cpLegalStructure ? await getEntityProgress(CPLegalStructureEntity, companyProfileProgress.cpLegalStructure) : 0.0,
      revenue: companyProfileProgress?.revenue ? await getEntityProgress(CPRevenueEntity, companyProfileProgress.revenue) : 0.0,
      cybersecurity: companyProfileProgress?.cybersecurity ? await getEntityProgress(CPCybersecurityEntity, companyProfileProgress.cybersecurity) : 0.0,
      fundingSources: companyProfileProgress?.fundingSources ? await getEntityProgress(CPFundingSourcesEntity, companyProfileProgress.fundingSources) : 0.0,
      ownershipStructure: companyProfileProgress?.ownershipStructure ? await getEntityProgress(CPOwnershipStructureEntity, companyProfileProgress.ownershipStructure) : 0.0,
      pastPerformance: Array.isArray(companyProfileProgress?.pastPerformance) && companyProfileProgress.pastPerformance.length > 0 ? await getEntityProgress(CpPastPerformanceEntity, companyProfileProgress.pastPerformance[0]) : 0.0,
      certifications: Array.isArray(companyProfileProgress?.cpCertifications) && companyProfileProgress.cpCertifications.length > 0 ? await getEntityProgress(CpCertificationsEntity, companyProfileProgress.cpCertifications[0]) : 0.0,
      awards: Array.isArray(companyProfileProgress?.cpAwards) && companyProfileProgress.cpAwards.length > 0 ? await getEntityProgress(CpAwardEntity, companyProfileProgress.cpAwards[0]) : 0.0,
      requiredSystems: Array.isArray(companyProfileProgress?.cpRequiredSystems) && companyProfileProgress.cpRequiredSystems.length > 0 ? await getEntityProgress(CPRequiredSystemEntity, companyProfileProgress.cpRequiredSystems[0]) : 0.0,
      pointsOfContact: Array.isArray(companyProfileProgress?.pointsOfContact) && companyProfileProgress.pointsOfContact.length > 0 ? await getEntityProgress(CPPointsOfContactEntity, companyProfileProgress.pointsOfContact[0]) : 0.0,
      productsAndServices: Array.isArray(companyProfileProgress?.productsAndServices) && companyProfileProgress.productsAndServices.length > 0 ? await getEntityProgress(CPProductsAndServicesEntity, companyProfileProgress.productsAndServices[0]) : 0.0,
      businessGoals: companyProfileProgress?.businessGoals ? await getEntityProgress(CPBusinessGoalsEntity, companyProfileProgress.businessGoals) : 0.0,
      advancedBusinessInformation: companyProfileProgress?.cpBusinessInfo ? await getEntityProgress(CPAdvancedBusinessInformationEntity, companyProfileProgress.cpBusinessInfo) : 0.0,
      personnel: companyProfileProgress?.personnel ? await getEntityProgress(CPPersonnelEntity, companyProfileProgress.personnel) : 0.0,
      dataComplianceDocumentation: companyProfileProgress?.dataComplianceDocumentation ? await getEntityProgress(CPDataComplianceDocumentationEntity, companyProfileProgress.dataComplianceDocumentation) : 0.0,
      companyOverview: companyProfileProgress?.companyOverview ? await getEntityProgress(CPCompanyOverviewEntity, companyProfileProgress.companyOverview) : 0.0,
      FCIAndCUI: companyProfileProgress?.FCIAndCUI ? await getEntityProgress(CPFCIAndCUIEntity, companyProfileProgress.FCIAndCUI) : 0.0,
      dataManagementAndStorage: companyProfileProgress?.dataManagementAndStorage ? await getEntityProgress(CPDataManagementAndStorageEntity, companyProfileProgress.dataManagementAndStorage) : 0.0,
      controlsAndProtocols: companyProfileProgress?.controlsAndProtocols ? await getEntityProgress(CPControlsAndProtocolsEntity, companyProfileProgress.controlsAndProtocols) : 0.0,
      researchAndDevelopment: companyProfileProgress?.researchAndDevelopment ? await getEntityProgress(CPResearchAndDevelopmentEntity, companyProfileProgress.researchAndDevelopment) : 0.0,
    };

    const overallProgress = parseFloat((Object.values(sectionsProgress).reduce((sum, progress) => sum + progress, 0) / Object.keys(sectionsProgress).length).toFixed(2));

    return {
      overallProgress,
      sectionsProgress,
    };
  }

  async deleteCompany(id: number): Promise<void> {
    await this.delete(id);
  }
}
