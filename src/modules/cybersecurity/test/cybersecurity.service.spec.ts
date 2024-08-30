import { Test, TestingModule } from '@nestjs/testing';
import { CybersecurityService } from '../cybersecurity.service';

describe('CybersecurityService', () => {
  let service: CybersecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CybersecurityService],
    }).compile();

    service = module.get<CybersecurityService>(CybersecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
