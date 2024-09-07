import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CpPastPerformanceTestimonialsEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { PastPerformanceTestimonialsDto } from './dtos';

@Injectable()
export class PastPerformanceTestimonialsService extends BaseTypeOrmCrudService<CpPastPerformanceTestimonialsEntity> {
  constructor(
    @InjectRepository(CpPastPerformanceTestimonialsEntity)
    readonly pastPerformanceRepository: Repository<CpPastPerformanceTestimonialsEntity>,
  ) {
    super(pastPerformanceRepository);
  }

  async createPastPerformanceTestimonials(cpPastPerformanceId: number, createPastPerformanceTestimonialsDto?: PastPerformanceTestimonialsDto[]): Promise<void> {
    if (createPastPerformanceTestimonialsDto?.length > 0) {
      await Promise.all(
        createPastPerformanceTestimonialsDto.map((testimonialsDto) =>
          this.create({
            ...testimonialsDto,
            cpPastPerformanceId,
          } as unknown as CpPastPerformanceTestimonialsEntity),
        ),
      );
    }
  }

  async upsertCpPastPerformance(cpPastPerformanceId: number, ppTestimonials: PastPerformanceTestimonialsDto[]): Promise<void> {
    await Promise.all(
      ppTestimonials.map((ppTestimonial) => {
        const { id, ...testimonialsDto } = ppTestimonial;
        if (id) {
          return this.update(id, testimonialsDto as unknown as CpPastPerformanceTestimonialsEntity);
        } else {
          return this.create({
            ...testimonialsDto,
            cpPastPerformanceId,
          } as unknown as CpPastPerformanceTestimonialsEntity);
        }
      }),
    );
  }
}
