import { Test, TestingModule } from '@nestjs/testing';
import { FinancialHealthController } from '../financial-health.controller';
import { FinancialHealthService } from '../financial-health.service';

describe('AdminController', () => {
  let controller: FinancialHealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialHealthController],
      providers: [FinancialHealthService],
    }).compile();

    controller = module.get<FinancialHealthController>(FinancialHealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
