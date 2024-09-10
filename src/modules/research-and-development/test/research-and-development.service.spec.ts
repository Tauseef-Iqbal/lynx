import { Test, TestingModule } from '@nestjs/testing';
import { ResearchAndDevelopmentService } from '../research-and-development.service';

describe('ResearchAndDevelopmentService', () => {
  let service: ResearchAndDevelopmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchAndDevelopmentService],
    }).compile();

    service = module.get<ResearchAndDevelopmentService>(ResearchAndDevelopmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
