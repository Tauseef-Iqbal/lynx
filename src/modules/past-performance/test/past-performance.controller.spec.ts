import { Test, TestingModule } from '@nestjs/testing';
import { PastPerformanceController } from './past-performance.controller';

describe('PastPerformanceController', () => {
  let controller: PastPerformanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PastPerformanceController],
    }).compile();

    controller = module.get<PastPerformanceController>(PastPerformanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
