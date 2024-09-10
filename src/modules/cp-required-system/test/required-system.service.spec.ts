import { Test, TestingModule } from '@nestjs/testing';
import { RequiredSystemService } from '../required-system.service';

describe('RequiredSystemService', () => {
  let service: RequiredSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequiredSystemService],
    }).compile();

    service = module.get<RequiredSystemService>(RequiredSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
