import { Test, TestingModule } from '@nestjs/testing';
import { PointsOfContactService } from '../points-of-contact.service';

describe('PointsOfContactService', () => {
  let service: PointsOfContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsOfContactService],
    }).compile();

    service = module.get<PointsOfContactService>(PointsOfContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
