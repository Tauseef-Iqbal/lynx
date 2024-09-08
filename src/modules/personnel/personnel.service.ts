import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPPersonnelEntity, UserEntity } from 'src/typeorm/models';
import { AddPersonnelDto, UpdatePersonnelDto } from './dtos';
import { IFOCIDesignationFiles } from './interfaces';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
import { PersonnelFilesCategory } from './enums';

@Injectable()
export class PersonnelService extends BaseTypeOrmCrudService<CPPersonnelEntity> {
  constructor(
    @InjectRepository(CPPersonnelEntity)
    readonly personnelRepository: Repository<CPPersonnelEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(personnelRepository);
  }

  async addPersonnel(user: UserEntity, addPersonnelDto: AddPersonnelDto, files: IFOCIDesignationFiles): Promise<CPPersonnelEntity> {
    const existedPersonnel = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedPersonnel) {
      return this.updatePersonnel(existedPersonnel.id, user, addPersonnelDto, files);
    } else {
      if (files.FOCIDesignationFiles.length || addPersonnelDto.FOCIDesignationFiles.length) {
        addPersonnelDto.FOCIDesignationFiles = await processFilesToAdd({
          incomingFiles: files.FOCIDesignationFiles,
          incomingS3AndBase64: addPersonnelDto.FOCIDesignationFiles,
          keyPrefix: `${user.companyProfile.name}/Personnel/${PersonnelFilesCategory.FOCIDesignationFiles}`,
          configService: this.configService,
          s3Service: this.s3Service,
        });
      }
      return this.create({ ...addPersonnelDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPPersonnelEntity);
    }
  }

  async updatePersonnel(id: number, user: UserEntity, updatePersonnelDto: UpdatePersonnelDto, files: IFOCIDesignationFiles): Promise<CPPersonnelEntity> {
    const personnel = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    if (!personnel) {
      throw new Error('Personnel not associated with this company profile');
    }

    if (files.FOCIDesignationFiles || updatePersonnelDto.FOCIDesignationFiles) {
      if (files.FOCIDesignationFiles && !updatePersonnelDto.FOCIDesignation) throw new BadRequestException('FOCIDesignationFiles should not be provided when FOCIDesignation does not meet the required condition.');
      updatePersonnelDto.FOCIDesignationFiles = await processFilesToUpdate({
        existingFiles: personnel.FOCIDesignationFiles,
        incomingFiles: files.FOCIDesignationFiles,
        incomingS3AndBase64: updatePersonnelDto.FOCIDesignationFiles,
        keyPrefix: `${personnel.companyProfile.name}/Personnel/${PersonnelFilesCategory.FOCIDesignationFiles}`,
        s3Service: this.s3Service,
        configService: this.configService,
      });
    }

    return this.update(id, updatePersonnelDto as unknown as CPPersonnelEntity);
  }

  async getMyPersonnel(companyProfileId: number): Promise<CPPersonnelEntity> {
    const myPersonnel = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!myPersonnel) {
      throw new NotFoundException('Personnel not found against your company profile');
    }
    return myPersonnel;
  }

  async deleteMyPersonnel(companyProfileId: number): Promise<CPPersonnelEntity> {
    const myPersonnel = await this.getMyPersonnel(companyProfileId);
    return this.update(myPersonnel.id, { isDeleted: true } as unknown as CPPersonnelEntity);
  }
}
