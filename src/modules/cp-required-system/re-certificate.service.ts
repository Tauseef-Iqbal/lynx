import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeOrmCrudService } from 'src/shared/services';
import { RequiredSystemCertificationEntity } from 'src/typeorm/models';
import { RequiredSystemCertificationDto } from './dtos';

@Injectable()
export class RequiredSystemCertificationService extends BaseTypeOrmCrudService<RequiredSystemCertificationEntity> {
  constructor(
    @InjectRepository(RequiredSystemCertificationEntity)
    private certificationRepository: Repository<RequiredSystemCertificationEntity>,
  ) {
    super(certificationRepository);
  }

  async createRquiredSystemCertification(requiredSystemId: number, requiredSystemCertificationDto?: RequiredSystemCertificationDto[]): Promise<void> {
    await Promise.all(
      requiredSystemCertificationDto.map((certificationType) =>
        this.create({
          ...certificationType,
          requiredSystem: { id: requiredSystemId },
        } as unknown as RequiredSystemCertificationEntity),
      ),
    );
  }

  async upsertRquiredSystemCertification(requiredSystemId: number, requiredSystemCertificationDto?: RequiredSystemCertificationDto[]): Promise<void> {
    await Promise.all(
      requiredSystemCertificationDto.map((certificationType) => {
        const { id, ...createOrUpdateDto } = certificationType;
        if (id) {
          return this.update(id, createOrUpdateDto as unknown as RequiredSystemCertificationEntity);
        } else {
          return this.create({
            ...createOrUpdateDto,
            requiredSystem: { id: requiredSystemId },
          } as unknown as RequiredSystemCertificationEntity);
        }
      }),
    );
  }
}
