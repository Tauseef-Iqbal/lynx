import { Test, TestingModule } from '@nestjs/testing';
import { SupplyChainController } from '../supply-chain.controller';
import { SupplyChainService } from '../supply-chain.service';

describe('AdminController', () => {
  let controller: SupplyChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyChainController],
      providers: [SupplyChainService],
    }).compile();

    controller = module.get<SupplyChainController>(SupplyChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
