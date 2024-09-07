import { Test, TestingModule } from '@nestjs/testing';
import { BusinessGoalsService } from '../business-goals.service';

describe('BusinessGoalsService', () => {
  let service: BusinessGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessGoalsService],
    }).compile();

    service = module.get<BusinessGoalsService>(BusinessGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
