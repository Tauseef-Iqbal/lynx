import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPFundingSourcesEntity } from 'src/typeorm/models/cp-funding-sources.entity';

@Injectable()
export class FundingSourcesService extends BaseTypeOrmCrudService<CPFundingSourcesEntity> {
  constructor(
    @InjectRepository(CPFundingSourcesEntity)
    readonly fundingSourcesRepository: Repository<CPFundingSourcesEntity>,
  ) {
    super(fundingSourcesRepository);
  }
}
