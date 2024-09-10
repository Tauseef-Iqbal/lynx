import { Test, TestingModule } from '@nestjs/testing';
import { DataComplianceDocumentationController } from './data-compliance-documentation.controller';

describe('DataComplianceDocumentationController', () => {
  let controller: DataComplianceDocumentationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataComplianceDocumentationController],
    }).compile();

    controller = module.get<DataComplianceDocumentationController>(DataComplianceDocumentationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
