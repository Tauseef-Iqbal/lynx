import { Test, TestingModule } from '@nestjs/testing';
import { PastPerformanceService } from './past-performance.service';

describe('PastPerformanceService', () => {
  let service: PastPerformanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PastPerformanceService],
    }).compile();

    service = module.get<PastPerformanceService>(PastPerformanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
