import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProfileLegalStructureController } from '../company-profile-legal-structure.controller';

describe('CompanyProfileLegalStructureController', () => {
  let controller: CompanyProfileLegalStructureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyProfileLegalStructureController],
    }).compile();

    controller = module.get<CompanyProfileLegalStructureController>(CompanyProfileLegalStructureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
