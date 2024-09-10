import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { RequiredSystemBusinessClassificationEntity } from 'src/typeorm/models';
import { RequiredSystemBusinessClassificationDto } from './dtos';

@Injectable()
export class RequiredSystemBusinessClassificationService extends BaseTypeOrmCrudService<RequiredSystemBusinessClassificationEntity> {
  constructor(
    @InjectRepository(RequiredSystemBusinessClassificationEntity)
    private businessClassificationRepository: Repository<RequiredSystemBusinessClassificationEntity>,
  ) {
    super(businessClassificationRepository);
  }

  async createRquiredSystemBusinessCertification(requiredSystemId: number, requiredSystemBusinessClassificationDto?: RequiredSystemBusinessClassificationDto[]): Promise<void> {
    await Promise.all(
      requiredSystemBusinessClassificationDto.map((businessClassificationDto) =>
        this.create({
          ...businessClassificationDto,
          requiredSystem: { id: requiredSystemId },
        } as unknown as RequiredSystemBusinessClassificationEntity),
      ),
    );
  }

  async upsertRquiredSystemBusinessCertification(requiredSystemId: number, requiredSystemBusinessClassificationDto?: RequiredSystemBusinessClassificationDto[]): Promise<void> {
    await Promise.all(
      requiredSystemBusinessClassificationDto.map((businessClassificationDto) => {
        const { id, ...createOrUpdateDto } = businessClassificationDto;
        if (id) {
          return this.update(id, createOrUpdateDto as unknown as RequiredSystemBusinessClassificationEntity);
        } else {
          return this.create({
            ...createOrUpdateDto,
            requiredSystem: { id: requiredSystemId },
          } as unknown as RequiredSystemBusinessClassificationEntity);
        }
      }),
    );
  }
}
