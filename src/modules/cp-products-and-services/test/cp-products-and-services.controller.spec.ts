import { Test, TestingModule } from '@nestjs/testing';
import { CpProductsAndServicesController } from '../cp-products-and-services.controller';

describe('CpProductsAndServicesController', () => {
  let controller: CpProductsAndServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpProductsAndServicesController],
    }).compile();

    controller = module.get<CpProductsAndServicesController>(CpProductsAndServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
