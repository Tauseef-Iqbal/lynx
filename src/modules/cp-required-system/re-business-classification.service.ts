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

  async upsertRquiredSystemBusinessCertification(requiredSystemId: number, requiredSystemBusinessClassificationDto?: RequiredSystemBusinessClassificationDto[]): Promise<void> {
    await this.businessClassificationRepository.delete({ requiredSystem: { id: requiredSystemId } });

    await Promise.all(
      requiredSystemBusinessClassificationDto.map((businessClassificationDto) => {
        return this.create({
          ...businessClassificationDto,
          requiredSystem: { id: requiredSystemId },
        } as unknown as RequiredSystemBusinessClassificationEntity);
      }),
    );
  }
}
