import { Test, TestingModule } from '@nestjs/testing';
import { PointsOfContactController } from '../points-of-contact.controller';
import { PointsOfContactService } from '../points-of-contact.service';

describe('AdminController', () => {
  let controller: PointsOfContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsOfContactController],
      providers: [PointsOfContactService],
    }).compile();

    controller = module.get<PointsOfContactController>(PointsOfContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
