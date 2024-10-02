import { Test, TestingModule } from '@nestjs/testing';
import { AdvancedBusinessInformationController } from '../advanced-business-information.controller';
import { AdvancedBusinessInformationService } from '../advanced-business-information.service';

describe('AdminController', () => {
  let controller: AdvancedBusinessInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvancedBusinessInformationController],
      providers: [AdvancedBusinessInformationService],
    }).compile();

    controller = module.get<AdvancedBusinessInformationController>(AdvancedBusinessInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
