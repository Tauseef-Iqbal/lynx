import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPCybersecurityEncryptionDetailsEntity, CPCybersecurityEntity, CPCybersecurityStandardsComplianceDetailsEntity, UserEntity } from 'src/typeorm/models';
import { AddCybersecurityDto, UpdateCybersecurityDto } from './dtos';
import { CybersecurityFilesCategory } from './enums';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CybersecurityService extends BaseTypeOrmCrudService<CPCybersecurityEntity> {
  constructor(
    @InjectRepository(CPCybersecurityEntity)
    readonly cybersecurityRepository: Repository<CPCybersecurityEntity>,
    @InjectRepository(CPCybersecurityStandardsComplianceDetailsEntity)
    readonly complianceDetailsRepository: Repository<CPCybersecurityStandardsComplianceDetailsEntity>,
    @InjectRepository(CPCybersecurityEncryptionDetailsEntity)
    readonly encryptionDetailsRepository: Repository<CPCybersecurityEncryptionDetailsEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(cybersecurityRepository);
  }

  async addCybersecurity(user: UserEntity, addCybersecurityDto: AddCybersecurityDto, files: Express.Multer.File[]): Promise<CPCybersecurityEntity> {
    const existedCybersecurity = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedCybersecurity) {
      return this.updateCybersecurity(existedCybersecurity.id, user, addCybersecurityDto, files);
    }

    if (addCybersecurityDto.cybersecurityStandardsComplianceDetails && addCybersecurityDto.cybersecurityStandardsComplianceDetails.length) {
      await Promise.all(
        addCybersecurityDto.cybersecurityStandardsComplianceDetails.map(async (dto, index) => {
          const complianceFiles: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith(`cybersecurityStandardsComplianceDetails[${index}][complianceFiles]`));
          dto.complianceFiles = await processFilesToAdd({
            incomingFiles: complianceFiles,
            incomingS3AndBase64: dto.complianceFiles,
            keyPrefix: `${user.companyProfile.name}/Cybersecurity/${CybersecurityFilesCategory.CybersecurityStandardsCompliant}`,
            configService: this.configService,
            s3Service: this.s3Service,
          });
        }),
      );
    }

    if (addCybersecurityDto.cybersecurityEncryptionDetails && addCybersecurityDto.cybersecurityEncryptionDetails.length) {
      await Promise.all(
        addCybersecurityDto.cybersecurityEncryptionDetails.map(async (dto, index) => {
          const encryptionFiles: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith(`cybersecurityEncryptionDetails[${index}][encryptionFiles]`));
          dto.encryptionFiles = await processFilesToAdd({
            incomingFiles: encryptionFiles,
            incomingS3AndBase64: dto.encryptionFiles,
            keyPrefix: `${user.companyProfile.name}/Cybersecurity/${CybersecurityFilesCategory.EncryptionData}`,
            configService: this.configService,
            s3Service: this.s3Service,
          });
        }),
      );
    }

    return this.create({ ...addCybersecurityDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPCybersecurityEntity);
  }

  async updateCybersecurity(id: number, user: UserEntity, updateCybersecurityDto: UpdateCybersecurityDto, files: Express.Multer.File[]): Promise<CPCybersecurityEntity> {
    const existingCybercecurity = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!existingCybercecurity) {
    //   throw new Error('Cybersecurity not associated with this company profile');
    // }

    if (!existingCybercecurity) return null;

    if (updateCybersecurityDto.cybersecurityStandardsComplianceDetails && updateCybersecurityDto.cybersecurityStandardsComplianceDetails.length) {
      await Promise.all(
        updateCybersecurityDto.cybersecurityStandardsComplianceDetails.map(async (dto, index) => {
          const complianceFiles: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith(`cybersecurityStandardsComplianceDetails[${index}][complianceFiles]`));
          if (dto.id) {
            const existingComplianceDetails = await this.complianceDetailsRepository.findOne({ where: { id: dto.id, cybersecurity: { id: existingCybercecurity.id } } });
            if (!existingComplianceDetails) throw new NotFoundException(`Compliance Details with id ${dto.id} isn't associated with the Cybersecurity with id ${id}`);

            dto.complianceFiles = await processFilesToUpdate({
              existingFiles: existingComplianceDetails.complianceFiles,
              incomingFiles: complianceFiles,
              incomingS3AndBase64: dto.complianceFiles,
              keyPrefix: `${user.companyProfile.name}/Cybersecurity/${CybersecurityFilesCategory.EncryptionData}`,
              configService: this.configService,
              s3Service: this.s3Service,
            });

            await this.complianceDetailsRepository.update(existingComplianceDetails.id, dto as unknown as CPCybersecurityStandardsComplianceDetailsEntity);
          } else {
            dto.complianceFiles = await processFilesToAdd({
              incomingFiles: complianceFiles,
              incomingS3AndBase64: dto.complianceFiles,
              keyPrefix: `${user.companyProfile.name}/Cybersecurity/${CybersecurityFilesCategory.EncryptionData}`,
              configService: this.configService,
              s3Service: this.s3Service,
            });
            const newComplianceDetails = this.complianceDetailsRepository.create({
              ...dto,
              cybersecurity: existingCybercecurity,
            } as unknown as CPCybersecurityStandardsComplianceDetailsEntity);
            await this.complianceDetailsRepository.save(newComplianceDetails);
          }
        }),
      );
      delete updateCybersecurityDto.cybersecurityStandardsComplianceDetails;
    } else {
      await this.complianceDetailsRepository.delete({ cybersecurity: { id: existingCybercecurity.id } });
    }

    if (updateCybersecurityDto.cybersecurityEncryptionDetails && updateCybersecurityDto.cybersecurityEncryptionDetails.length) {
      await Promise.all(
        updateCybersecurityDto.cybersecurityEncryptionDetails.map(async (dto, index) => {
          const encryptionFiles: Express.Multer.File[] = files.filter((file) => file.fieldname.startsWith(`cybersecurityEncryptionDetails[${index}][encryptionFiles]`));
          if (dto.id) {
            const existingEncryptionDetails = await this.encryptionDetailsRepository.findOne({ where: { id: dto.id, cybersecurity: { id: existingCybercecurity.id } } });
            if (!existingEncryptionDetails) throw new NotFoundException(`Encryption Details with id ${dto.id} isn't associated with the Cybersecurity with id ${id}`);

            dto.encryptionFiles = await processFilesToUpdate({
              existingFiles: existingEncryptionDetails.encryptionFiles,
              incomingFiles: encryptionFiles,
              incomingS3AndBase64: dto.encryptionFiles,
              keyPrefix: `${user.companyProfile.name}/Cybersecurity/${CybersecurityFilesCategory.EncryptionData}`,
              configService: this.configService,
              s3Service: this.s3Service,
            });

            await this.encryptionDetailsRepository.update(existingEncryptionDetails.id, dto as unknown as CPCybersecurityEncryptionDetailsEntity);
          } else {
            dto.encryptionFiles = await processFilesToAdd({
              incomingFiles: encryptionFiles,
              incomingS3AndBase64: dto.encryptionFiles,
              keyPrefix: `${user.companyProfile.name}/Cybersecurity/${CybersecurityFilesCategory.EncryptionData}`,
              configService: this.configService,
              s3Service: this.s3Service,
            });
            const newEncryptionDetails = this.encryptionDetailsRepository.create({
              ...dto,
              cybersecurity: existingCybercecurity,
            } as unknown as CPCybersecurityEncryptionDetailsEntity);
            await this.encryptionDetailsRepository.save(newEncryptionDetails);
          }
        }),
      );
      delete updateCybersecurityDto.cybersecurityEncryptionDetails;
    } else {
      await this.encryptionDetailsRepository.delete({ cybersecurity: { id: existingCybercecurity.id } });
    }

    await this.update(id, updateCybersecurityDto as unknown as CPCybersecurityEntity);

    return this.getMyCybersecurity(user.companyProfile.id);
  }

  async getMyCybersecurity(companyProfileId: number): Promise<CPCybersecurityEntity> {
    const myCybersecurity = await this.getCybersecurityByFilter({ companyProfile: { id: companyProfileId } });
    // if (!myCybersecurity) {
    //   throw new NotFoundException('Cybersecurity not found against your company profile');
    // }

    if (!myCybersecurity) return null;

    return myCybersecurity;
  }

  async deleteMyCybersecurity(companyProfileId: number): Promise<CPCybersecurityEntity> {
    const myCybersecurity = await this.getMyCybersecurity(companyProfileId);
    return this.update(myCybersecurity.id, { isDeleted: true } as unknown as CPCybersecurityEntity);
  }

  async getCybersecurityByFilter(filter: any): Promise<CPCybersecurityEntity> {
    const result = await this.findByRelationFilters(filter, {
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

    return result as CPCybersecurityEntity;
  }
}
