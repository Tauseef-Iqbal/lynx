import { Test, TestingModule } from '@nestjs/testing';
import { CpProductsAndServicesService } from '../cp-products-and-services.service';

describe('CpProductsAndServicesService', () => {
  let service: CpProductsAndServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpProductsAndServicesService],
    }).compile();

    service = module.get<CpProductsAndServicesService>(CpProductsAndServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
