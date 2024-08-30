import { Test, TestingModule } from '@nestjs/testing';
import { ToolsAndApplicationsController } from '../tools-applications.controller';
import { ToolsAndApplicationsService } from '../tools-applications.service';

describe('AdminController', () => {
  let controller: ToolsAndApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolsAndApplicationsController],
      providers: [ToolsAndApplicationsService],
    }).compile();

    controller = module.get<ToolsAndApplicationsController>(ToolsAndApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
