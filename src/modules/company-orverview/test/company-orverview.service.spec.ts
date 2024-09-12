import { Test, TestingModule } from '@nestjs/testing';
import { CompanyOrverviewService } from '../company-orverview.service';

describe('CompanyOrverviewService', () => {
  let service: CompanyOrverviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyOrverviewService],
    }).compile();

    service = module.get<CompanyOrverviewService>(CompanyOrverviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
