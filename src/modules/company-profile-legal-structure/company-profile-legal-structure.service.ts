import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { Repository } from 'typeorm';
import { CompanyProfileLegalStructureEntity } from 'src/typeorm/models';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';
import { CreateCompanyProfileLegalStructureDto, UpdateCompanyProfileLegalStructureDto } from './dtos';
import { CpLegalStrucutreFiles } from './interfaces';
import { filesToUpdate, uploadFilesToS3 } from 'src/shared/utils';
import { CompanyProfileLegalStructureOrgFacilityService } from './company-profile-legal-structure-org-facility.service';
import { MAX_DBA_FILE_SIZE_BYTES, MAX_DBA_FILE_SIZE_MB } from 'src/shared/constants';

@Injectable()
export class CompanyProfileLegalStructureService extends BaseTypeOrmCrudService<CompanyProfileLegalStructureEntity> {
  constructor(
    @InjectRepository(CompanyProfileLegalStructureEntity)
    readonly cpLegalStructureRepository: Repository<CompanyProfileLegalStructureEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly cplsOrgFacilityService: CompanyProfileLegalStructureOrgFacilityService,
  ) {
    super(cpLegalStructureRepository);
  }

  /**
   * create the company profile legal structure with relation of company_profile and created its organization facilities (optional)
   * @param user
   * @param createCpLegalStructureDto
   * @param files
   * @returns
   */
  async createCompanyProfileLegalStructure(user: any, createCpLegalStructureDto: CreateCompanyProfileLegalStructureDto, files: CpLegalStrucutreFiles): Promise<CompanyProfileLegalStructureEntity> {
    if (files.completedProjectsFiles) {
      createCpLegalStructureDto.completedProjectsFiles = await uploadFilesToS3(user, files.completedProjectsFiles, createCpLegalStructureDto.legalStructure, this.s3Service);
    }

    if (files.dbaFiles) {
      createCpLegalStructureDto.dbaFiles = await uploadFilesToS3(user, files.dbaFiles, createCpLegalStructureDto.legalStructure, this.s3Service, MAX_DBA_FILE_SIZE_BYTES, MAX_DBA_FILE_SIZE_MB);
    }

    // create the company profile legal structure with company profile relation
    const cpls = await this.create({ ...createCpLegalStructureDto, companyProfile: { id: user.companyProfile.id } } as unknown as CompanyProfileLegalStructureEntity);

    // Create organizational facilities using the helper function
    await this.cplsOrgFacilityService.createOrgFacilities(cpls.id, createCpLegalStructureDto.orgFacilities);

    return cpls;
  }

  /**
   * update company profile legal structure record based on primary key.
   * @param id
   * @param updateCpLegalStructureDto
   * @param files
   * @returns
   */
  async updateCompanyProfileLegalStructure(id: number, user: any, updateCpLegalStructureDto: UpdateCompanyProfileLegalStructureDto, files: CpLegalStrucutreFiles): Promise<CompanyProfileLegalStructureEntity> {
    const cpLegalStructure = await this.findById(id, { relations: { companyProfile: true, orgFacilities: true } });
    if (!cpLegalStructure) {
      throw new Error('Company Legal Structure not associated with this company profile');
    }

    if (files.completedProjectsFiles) {
      updateCpLegalStructureDto.completedProjectsFiles = await filesToUpdate(user, files.completedProjectsFiles, cpLegalStructure.completedProjectsFiles, updateCpLegalStructureDto.legalStructure, this.s3Service, this.configService);
    }

    if (files.dbaFiles) {
      updateCpLegalStructureDto.dbaFiles = await filesToUpdate(user, files.dbaFiles, cpLegalStructure.dbaFiles, updateCpLegalStructureDto.legalStructure, this.s3Service, this.configService);
    }

    if (updateCpLegalStructureDto.orgFacilities && updateCpLegalStructureDto.orgFacilities.length > 0) {
      await this.cplsOrgFacilityService.updateOrgFacilities(id, updateCpLegalStructureDto.orgFacilities);

      // after update the CpOrgFacilities, now no need the orgFacilities array to update the cp_legal_structure
      delete updateCpLegalStructureDto.orgFacilities;
    }

    return this.update(id, updateCpLegalStructureDto as unknown as CompanyProfileLegalStructureEntity);
  }
}
