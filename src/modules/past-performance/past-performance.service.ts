import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CpPastPerformanceEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { S3Service } from '../global/providers';
import { ConfigService } from '@nestjs/config';
import { CreatePastPerformanceDto } from './dtos';
import { CpPastPerformanceFiles } from './interfaces';
import { filesToUpdate, uploadFilesToS3 } from 'src/shared/utils';
import { PastPerformanceTestimonialsService } from './past-performance-testimonials.service';
import { MAX_PAST_PROFORMANCE_FILE_SIZE_BYTES, MAX_PAST_PROFORMANCE_FILE_SIZE_MB } from 'src/shared/constants';

@Injectable()
export class PastPerformanceService extends BaseTypeOrmCrudService<CpPastPerformanceEntity> {
  constructor(
    @InjectRepository(CpPastPerformanceEntity)
    readonly pastPerformanceRepository: Repository<CpPastPerformanceEntity>,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly pastPerformanceTestimonialsService: PastPerformanceTestimonialsService,
  ) {
    super(pastPerformanceRepository);
  }

  async createPastPerformance(user: any, createPastPerformanceDto: CreatePastPerformanceDto, files: CpPastPerformanceFiles): Promise<CpPastPerformanceEntity> {
    if (files.supportingDocs) {
      createPastPerformanceDto.supportingDocs = await uploadFilesToS3(user, files.supportingDocs, createPastPerformanceDto.contractName, this.s3Service, MAX_PAST_PROFORMANCE_FILE_SIZE_BYTES, MAX_PAST_PROFORMANCE_FILE_SIZE_MB);
    }

    const pp = await this.create({ ...createPastPerformanceDto, companyProfile: { id: user.companyProfile.id } } as unknown as CpPastPerformanceEntity);

    await this.pastPerformanceTestimonialsService.createPastPerformanceTestimonials(pp.id, createPastPerformanceDto.pastPerformanceTestimonials);

    return pp;
  }

  async updatePastPerformance(user: any, id: number, updatePastPerformanceDto: CreatePastPerformanceDto, files: CpPastPerformanceFiles): Promise<CpPastPerformanceEntity> {
    const pastPerformance = await this.findById(id, { relations: { companyProfile: true, pastPerformanceTestimonials: true } });
    if (!pastPerformance) {
      throw new Error('Company product or service not associated with this company profile');
    }

    if (files.supportingDocs) {
      updatePastPerformanceDto.supportingDocs = await filesToUpdate(user, files.supportingDocs, pastPerformance.supportingDocs, pastPerformance.contractName, this.s3Service, this.configService, MAX_PAST_PROFORMANCE_FILE_SIZE_BYTES, MAX_PAST_PROFORMANCE_FILE_SIZE_MB);
    }

    if (updatePastPerformanceDto?.pastPerformanceTestimonials?.length > 0) {
      await this.pastPerformanceTestimonialsService.upsertCpPastPerformance(id, updatePastPerformanceDto.pastPerformanceTestimonials);

      delete updatePastPerformanceDto.pastPerformanceTestimonials;
    }

    return this.update(id, updatePastPerformanceDto as unknown as CpPastPerformanceEntity);
  }
}
