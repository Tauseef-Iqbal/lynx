import { Test, TestingModule } from '@nestjs/testing';
import { CpControlsAndProtocolsService } from '../controls-and-protocols.service';

describe('CpControlsAndProtocolsService', () => {
  let service: CpControlsAndProtocolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpControlsAndProtocolsService],
    }).compile();

    service = module.get<CpControlsAndProtocolsService>(CpControlsAndProtocolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
