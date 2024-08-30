import { Test, TestingModule } from '@nestjs/testing';
import { FinancialHealthService } from '../financial-health.service';

describe('FinancialHealthService', () => {
  let service: FinancialHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialHealthService],
    }).compile();

    service = module.get<FinancialHealthService>(FinancialHealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
