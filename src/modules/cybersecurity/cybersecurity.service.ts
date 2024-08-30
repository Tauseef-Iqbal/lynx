import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPCybersecurityEntity } from 'src/typeorm/models';

@Injectable()
export class CybersecurityService extends BaseTypeOrmCrudService<CPCybersecurityEntity> {
  constructor(
    @InjectRepository(CPCybersecurityEntity)
    readonly cybersecurityRepository: Repository<CPCybersecurityEntity>,
  ) {
    super(cybersecurityRepository);
  }
}
