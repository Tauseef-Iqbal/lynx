import { Test, TestingModule } from '@nestjs/testing';
import { FundingSourcesService } from '../funding-sources.service';

describe('FundingSourcesService', () => {
  let service: FundingSourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundingSourcesService],
    }).compile();

    service = module.get<FundingSourcesService>(FundingSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
