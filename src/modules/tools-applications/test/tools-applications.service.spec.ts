import { Test, TestingModule } from '@nestjs/testing';
import { ToolsAndApplicationsService } from '../tools-applications.service';

describe('ToolsAndApplicationsService', () => {
  let service: ToolsAndApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolsAndApplicationsService],
    }).compile();

    service = module.get<ToolsAndApplicationsService>(ToolsAndApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
