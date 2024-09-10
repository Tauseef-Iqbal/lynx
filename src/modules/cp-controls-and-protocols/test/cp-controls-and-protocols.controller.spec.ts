import { Test, TestingModule } from '@nestjs/testing';
import { CpControlsAndProtocolsController } from '../cp-controls-and-protocols.controller';

describe('CpControlsAndProtocolsController', () => {
  let controller: CpControlsAndProtocolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpControlsAndProtocolsController],
    }).compile();

    controller = module.get<CpControlsAndProtocolsController>(CpControlsAndProtocolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
