import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPToolsAndApplicationsEntity } from 'src/typeorm/models';

@Injectable()
export class ToolsAndApplicationsService extends BaseTypeOrmCrudService<CPToolsAndApplicationsEntity> {
  constructor(
    @InjectRepository(CPToolsAndApplicationsEntity)
    readonly companyRepository: Repository<CPToolsAndApplicationsEntity>,
  ) {
    super(companyRepository);
  }
}
