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

  async createRquiredSystemType(requiredSystemId: number, requiredSystemTypesDto?: RequiredSystemTypesDto[]): Promise<void> {
    await Promise.all(
      requiredSystemTypesDto.map((typeDto) =>
        this.create({
          ...typeDto,
          requiredSystem: { id: requiredSystemId },
        } as unknown as RequiredSystemTypesEntity),
      ),
    );
  }

  async upsertRquiredSystemType(requiredSystemId: number, requiredSystemTypesDto?: RequiredSystemTypesDto[]): Promise<void> {
    await Promise.all(
      requiredSystemTypesDto.map((typeDto) => {
        const { id, ...createOrUpdateDto } = typeDto;
        if (id) {
          return this.update(id, createOrUpdateDto as unknown as RequiredSystemTypesEntity);
        } else {
          return this.create({
            ...createOrUpdateDto,
            requiredSystem: { id: requiredSystemId },
          } as unknown as RequiredSystemTypesEntity);
        }
      }),
    );
  }
}
