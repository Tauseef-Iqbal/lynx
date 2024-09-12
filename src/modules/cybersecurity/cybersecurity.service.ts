import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPCybersecurityEntity, UserEntity } from 'src/typeorm/models';
import { AddCybersecurityDto, UpdateCybersecurityDto } from './dtos';
import { CybersecurityFiles } from './interfaces';
import { CybersecurityFilesCategory } from './enums';
import { processFilesToAdd } from 'src/shared/utils';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CybersecurityService extends BaseTypeOrmCrudService<CPCybersecurityEntity> {
  constructor(
    @InjectRepository(CPCybersecurityEntity)
    readonly cybersecurityRepository: Repository<CPCybersecurityEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(cybersecurityRepository);
  }

  async addCybersecurity(user: UserEntity, addCybersecurityDto: AddCybersecurityDto, files: CybersecurityFiles): Promise<CPCybersecurityEntity> {
    const existedCybersecurity = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedCybersecurity) {
      return this.updateCybersecurity(existedCybersecurity.id, user, addCybersecurityDto, files);
    }

    // const { cybersecurityStandardsCompliant, cybersecurityStandardsComplianceDetails, encryptData, cybersecurityEncryptionDetails } = addCybersecurityDto;
    // const { complianceFiles, encryptionFiles } = files;

    // if (cybersecurityStandardsCompliant) {
    //   if (complianceFiles || cybersecurityStandardsComplianceDetails?.length) {
    //     for (const cybersecurityStandardsComplianceDetail of cybersecurityStandardsComplianceDetails) {
    //       cybersecurityStandardsComplianceDetail.complianceFiles = await processFilesToAdd({
    //         incomingFiles: complianceFiles,
    //         incomingS3AndBase64: cybersecurityStandardsComplianceDetail.complianceFiles,
    //         keyPrefix: `${user.companyProfile.name}/${CybersecurityFilesCategory.CybersecurityStandardsCompliant}`,
    //         configService: this.configService,
    //         s3Service: this.s3Service,
    //       });
    //     }
    //   }
    // }

    // if (addCybersecurityDto?.encryptData && (files?.encryptionFiles?.length || addCybersecurityDto?.cybersecurityEncryptionDetails?.encryptionFiles?.length)) {
    //   addCybersecurityDto.cybersecurityEncryptionDetails.encryptionFiles = await processFilesToAdd({
    //     incomingFiles: files.encryptionFiles,
    //     incomingS3AndBase64: addCybersecurityDto.cybersecurityEncryptionDetails.encryptionFiles,
    //     keyPrefix: `${user.companyProfile.name}/${CybersecurityFilesCategory.EncryptionData}`,
    //     configService: this.configService,
    //     s3Service: this.s3Service,
    //   });
    // }

    return this.create({ ...addCybersecurityDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPCybersecurityEntity);
  }

  async updateCybersecurity(id: number, user: UserEntity, updateCybersecurityDto: UpdateCybersecurityDto, files: CybersecurityFiles): Promise<CPCybersecurityEntity> {
    const cybercecurity = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!cybercecurity) {
    //   throw new Error('Cybersecurity not associated with this company profile');
    // }

    if (!cybercecurity) return null;

    // if (updateCybersecurityDto?.cybersecurityStandardsCompliant && (files?.complianceFiles?.length || updateCybersecurityDto?.cybersecurityStandardsComplianceDetails?.complianceFiles?.length)) {
    //   updateCybersecurityDto.cybersecurityStandardsComplianceDetails.complianceFiles = await processFilesToAdd({
    //     incomingFiles: files.complianceFiles,
    //     incomingS3AndBase64: updateCybersecurityDto.cybersecurityStandardsComplianceDetails.complianceFiles,
    //     keyPrefix: `${user.companyProfile.name}/${CybersecurityFilesCategory.CybersecurityStandardsCompliant}`,
    //     configService: this.configService,
    //     s3Service: this.s3Service,
    //   });
    // }

    // if (updateCybersecurityDto?.encryptData && (files?.encryptionFiles?.length || updateCybersecurityDto?.cybersecurityEncryptionDetails?.encryptionFiles?.length)) {
    //   updateCybersecurityDto.cybersecurityEncryptionDetails.encryptionFiles = await processFilesToAdd({
    //     incomingFiles: files.encryptionFiles,
    //     incomingS3AndBase64: updateCybersecurityDto.cybersecurityEncryptionDetails.encryptionFiles,
    //     keyPrefix: `${user.companyProfile.name}/${CybersecurityFilesCategory.EncryptionData}`,
    //     configService: this.configService,
    //     s3Service: this.s3Service,
    //   });
    // }

    // if (updateCybersecurityDto.cybersecurityStandardsComplianceDetails) {
    //   const existingForeignAffiliationsIds: number[] = existedFundingSources.cybersecurityStandardsComplianceDetails.map((cybersecurityStandardsComplianceDetails) => Number(cybersecurityStandardsComplianceDetails.id));
    //   const foreignAffiliationsIdsToKeep = updateCybersecurityDto.cybersecurityStandardsComplianceDetails.filter((cybersecurityStandardsComplianceDetails) => cybersecurityStandardsComplianceDetails.id).map((cybersecurityStandardsComplianceDetails) => cybersecurityStandardsComplianceDetails.id);
    //   const foreignAffiliationsToDelete = existingForeignAffiliationsIds.filter((existingId) => !foreignAffiliationsIdsToKeep.includes(existingId));
    //   if (foreignAffiliationsToDelete.length) {
    //     await this.cybersecurityStandardsComplianceDetailsRepository.delete(foreignAffiliationsToDelete);
    //   }

    //   if (updateCybersecurityDto.cybersecurityStandardsComplianceDetails) {
    //     for (const foreignAffiliation of updateCybersecurityDto.cybersecurityStandardsComplianceDetails) {
    //       if (foreignAffiliation.id) {
    //         await this.cybersecurityStandardsComplianceDetailsRepository.update(foreignAffiliation.id, foreignAffiliation);
    //       } else {
    //         const newForeignAffiliation = this.cybersecurityStandardsComplianceDetailsRepository.create({
    //           ...foreignAffiliation,
    //           fundingSources: existedFundingSources,
    //         });
    //         await this.cybersecurityStandardsComplianceDetailsRepository.save(newForeignAffiliation);
    //       }
    //     }
    //   }
    //   delete updateCybersecurityDto.cybersecurityStandardsComplianceDetails;
    // } else {
    //   await this.cybersecurityStandardsComplianceDetailsRepository.delete({ fundingSources: { id: existedFundingSources.id } });
    // }

    return this.update(id, updateCybersecurityDto as unknown as CPCybersecurityEntity);
  }

  async getMyCybersecurity(companyProfileId: number): Promise<CPCybersecurityEntity> {
    const myCybersecurity = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myCybersecurity) {
    //   throw new NotFoundException('Cybersecurity not found against your company profile');
    // }

    if (!myCybersecurity) return null;

    return myCybersecurity;
  }

  async getCybersecurityByFilter(filter: any): Promise<CPCybersecurityEntity> {
    return this.findByRelationFilters(filter, {
      relations: {
        companyProfile: 'companyProfile',
        cybersecurityStandardsComplianceDetails: 'cybersecurityStandardsComplianceDetails',
        cybersecurityEncryptionDetails: 'cybersecurityEncryptionDetails',
      },
      relationFilters: {
        cybersecurityStandardsComplianceDetails: {
          condition: 'cybersecurityStandardsComplianceDetails.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
        cybersecurityEncryptionDetails: {
          condition: 'cybersecurityEncryptionDetails.isDeleted = :isDeleted',
          params: { isDeleted: false },
        },
      },
    });
  }

  async deleteMyCybersecurity(companyProfileId: number): Promise<CPCybersecurityEntity> {
    const myCybersecurity = await this.getMyCybersecurity(companyProfileId);
    return this.update(myCybersecurity.id, { isDeleted: true } as unknown as CPCybersecurityEntity);
  }
}
