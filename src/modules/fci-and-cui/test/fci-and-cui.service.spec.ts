import { Test, TestingModule } from '@nestjs/testing';
import { FCIAndCUIService } from '../fci-and-cui.service';

describe('FCIAndCUIService', () => {
  let service: FCIAndCUIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FCIAndCUIService],
    }).compile();

    service = module.get<FCIAndCUIService>(FCIAndCUIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
