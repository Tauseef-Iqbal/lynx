import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProfileLegalStructureService } from '../legal-structure.service';

describe('CompanyProfileLegalStructureService', () => {
  let service: CompanyProfileLegalStructureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyProfileLegalStructureService],
    }).compile();

    service = module.get<CompanyProfileLegalStructureService>(CompanyProfileLegalStructureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
