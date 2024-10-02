import { Test, TestingModule } from '@nestjs/testing';
import { AdvancedBusinessInformationService } from '../advanced-business-information.service';

describe('AdvancedBusinessInformationService', () => {
  let service: AdvancedBusinessInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvancedBusinessInformationService],
    }).compile();

    service = module.get<AdvancedBusinessInformationService>(AdvancedBusinessInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
