import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService, UserUpdateEvent } from 'src/shared/services';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from './dtos/company-profile.dto';
import { CompanyProfileEntity } from 'src/typeorm/models/company-profile.entity';
import { S3Service } from 'src/modules/global/providers';
import { ConfigService } from '@nestjs/config';
import { Assets } from './interfaces';
import { processFilesToAdd, processFilesToUpdate } from 'src/shared/utils';
import { UserEntity } from 'src/typeorm/models';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

  async deleteCompany(id: number): Promise<void> {
    await this.delete(id);
  }
}
