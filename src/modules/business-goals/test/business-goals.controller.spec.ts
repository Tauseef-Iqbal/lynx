import { Test, TestingModule } from '@nestjs/testing';
import { BusinessGoalsController } from '../business-goals.controller';
import { BusinessGoalsService } from '../business-goals.service';

describe('AdminController', () => {
  let controller: BusinessGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessGoalsController],
      providers: [BusinessGoalsService],
    }).compile();

    controller = module.get<BusinessGoalsController>(BusinessGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
