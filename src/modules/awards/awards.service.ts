import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CpAwardEntity } from 'src/typeorm/models/cp-awards.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';
import { CreateCpAwardDto, UpdateCpAwardDto } from './dtos';
import { AwardFiles } from './interfaces';
import { filesToUpdate, uploadFilesToS3 } from 'src/shared/utils';
import { MAX_CP_AWARDS_FILE_SIZE_MB, MAX_CP_AWARDS_SIZE_BYTES } from 'src/shared/constants';

@Injectable()
export class AwardsService extends BaseTypeOrmCrudService<CpAwardEntity> {
  constructor(
    @InjectRepository(CpAwardEntity)
    readonly cpAwardEntity: Repository<CpAwardEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {
    super(cpAwardEntity);
  }

  async createAward(user: any, createCpAwardDto: CreateCpAwardDto, files: AwardFiles): Promise<CpAwardEntity> {
    if (files.documentation) {
      createCpAwardDto.documentation = await uploadFilesToS3(user, files.documentation, createCpAwardDto.nameOfAward, this.s3Service, MAX_CP_AWARDS_SIZE_BYTES, MAX_CP_AWARDS_FILE_SIZE_MB);
    }

    return this.create({
      ...createCpAwardDto,
      companyProfile: { id: user.companyProfile.id },
    } as unknown as CpAwardEntity);
  }

  async updateAward(user: any, id: number, updateCpAwardDto: UpdateCpAwardDto, files: AwardFiles): Promise<CpAwardEntity> {
    const cpAward = await this.findById(id, { relations: { companyProfile: true } });
    if (!cpAward) {
      throw new Error('Company award not associated with this company profile');
    }

    if (files.documentation) {
      updateCpAwardDto.documentation = await filesToUpdate(user, files.documentation, cpAward.documentation, cpAward.nameOfAward, this.s3Service, this.configService, MAX_CP_AWARDS_SIZE_BYTES, MAX_CP_AWARDS_FILE_SIZE_MB);
    }

    return this.update(id, updateCpAwardDto as unknown as CpAwardEntity);
  }
}
