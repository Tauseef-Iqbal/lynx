import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { RequiredSystemTypesEntity } from 'src/typeorm/models';
import { RequiredSystemTypesDto } from './dtos';

@Injectable()
export class RequiredSystemTypeService extends BaseTypeOrmCrudService<RequiredSystemTypesEntity> {
  constructor(
    @InjectRepository(RequiredSystemTypesEntity)
    private systemTypeRepository: Repository<RequiredSystemTypesEntity>,
  ) {
    super(systemTypeRepository);
  }

  async upsertRquiredSystemType(requiredSystemId: number, requiredSystemTypesDto?: RequiredSystemTypesDto[]): Promise<void> {
    await this.systemTypeRepository.delete({ requiredSystem: { id: requiredSystemId } });

    await Promise.all(
      requiredSystemTypesDto.map((typeDto) => {
        return this.create({
          ...typeDto,
          requiredSystem: { id: requiredSystemId },
        } as unknown as RequiredSystemTypesEntity);
      }),
    );
  }
}
