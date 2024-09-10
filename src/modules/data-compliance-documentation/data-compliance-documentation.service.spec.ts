import { Test, TestingModule } from '@nestjs/testing';
import { DataComplianceDocumentationService } from './data-compliance-documentation.service';

describe('DataComplianceDocumentationService', () => {
  let service: DataComplianceDocumentationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataComplianceDocumentationService],
    }).compile();

    service = module.get<DataComplianceDocumentationService>(DataComplianceDocumentationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
