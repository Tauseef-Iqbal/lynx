import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPCybersecurityEntity, UserEntity } from 'src/typeorm/models';
import { AddCybersecurityDto, UpdateCybersecurityDto } from './dtos';
import { CybersecurityFiles } from './interfaces';
import { CybersecurityFilesCategory } from './enums';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
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

    if (addCybersecurityDto?.cybersecurityStandardsCompliant && (files?.cybersecurityStandardsCompliantFiles?.length || addCybersecurityDto?.cybersecurityStandardsCompliantFiles?.length)) {
      addCybersecurityDto.cybersecurityStandardsCompliantFiles = await processFilesToAdd({
        incomingFiles: files.cybersecurityStandardsCompliantFiles,
        incomingS3AndBase64: addCybersecurityDto.cybersecurityStandardsCompliantFiles,
        keyPrefix: `${user.companyProfile.name}/${CybersecurityFilesCategory.CybersecurityStandardsCompliant}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    if (addCybersecurityDto?.encryptData && (files?.encryptDataFiles?.length || addCybersecurityDto?.encryptDataFiles?.length)) {
      addCybersecurityDto.encryptDataFiles = await processFilesToAdd({
        incomingFiles: files.encryptDataFiles,
        incomingS3AndBase64: addCybersecurityDto.encryptDataFiles,
        keyPrefix: `${user.companyProfile.name}/${CybersecurityFilesCategory.EncryptionData}`,
        configService: this.configService,
        s3Service: this.s3Service,
      });
    }

    return this.create({ ...addCybersecurityDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPCybersecurityEntity);
  }

  async updateCybersecurity(id: number, user: UserEntity, updateCybersecurityDto: UpdateCybersecurityDto, files: CybersecurityFiles): Promise<CPCybersecurityEntity> {
    const existingCybercecurity = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!existingCybercecurity) {
    //   throw new Error('Cybersecurity not associated with this company profile');
    // }

    if (!existingCybercecurity) return null;

    if (updateCybersecurityDto?.cybersecurityStandardsCompliant && (files?.cybersecurityStandardsCompliantFiles?.length || updateCybersecurityDto?.cybersecurityStandardsCompliantFiles?.length)) {
      updateCybersecurityDto.cybersecurityStandardsCompliantFiles = await processFilesToUpdate({
        existingFiles: existingCybercecurity.cybersecurityStandardsCompliantFiles,
        incomingFiles: files.cybersecurityStandardsCompliantFiles,
        incomingS3AndBase64: updateCybersecurityDto.cybersecurityStandardsCompliantFiles,
        keyPrefix: `${existingCybercecurity.companyProfile.name}/${CybersecurityFilesCategory.CybersecurityStandardsCompliant}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    if (updateCybersecurityDto?.encryptData && (files?.encryptDataFiles?.length || updateCybersecurityDto?.encryptDataFiles?.length)) {
      updateCybersecurityDto.encryptDataFiles = await processFilesToUpdate({
        existingFiles: existingCybercecurity.encryptDataFiles,
        incomingFiles: files.encryptDataFiles,
        incomingS3AndBase64: updateCybersecurityDto.encryptDataFiles,
        keyPrefix: `${existingCybercecurity.companyProfile.name}/${CybersecurityFilesCategory.EncryptionData}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

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

  async deleteMyCybersecurity(companyProfileId: number): Promise<CPCybersecurityEntity> {
    const myCybersecurity = await this.getMyCybersecurity(companyProfileId);
    return this.update(myCybersecurity.id, { isDeleted: true } as unknown as CPCybersecurityEntity);
  }
}
