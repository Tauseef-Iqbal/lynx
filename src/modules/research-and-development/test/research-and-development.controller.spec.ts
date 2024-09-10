import { Test, TestingModule } from '@nestjs/testing';
import { ResearchAndDevelopmentController } from '../research-and-development.controller';
import { ResearchAndDevelopmentService } from '../research-and-development.service';

describe('AdminController', () => {
  let controller: ResearchAndDevelopmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchAndDevelopmentController],
      providers: [ResearchAndDevelopmentService],
    }).compile();

    controller = module.get<ResearchAndDevelopmentController>(ResearchAndDevelopmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
