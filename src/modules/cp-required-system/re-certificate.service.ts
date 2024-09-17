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

  async upsertRquiredSystemCertification(requiredSystemId: number, requiredSystemCertificationDto?: RequiredSystemCertificationDto[]): Promise<void> {
    await this.certificationRepository.delete({ requiredSystem: { id: requiredSystemId } });

    await Promise.all(
      requiredSystemCertificationDto.map((certificationType) => {
        return this.create({
          ...certificationType,
          requiredSystem: { id: requiredSystemId },
        } as unknown as RequiredSystemCertificationEntity);
      }),
    );
  }
}
