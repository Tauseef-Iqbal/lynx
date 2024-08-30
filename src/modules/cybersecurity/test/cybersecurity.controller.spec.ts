import { Test, TestingModule } from '@nestjs/testing';
import { CybersecurityController } from '../cybersecurity.controller';
import { CybersecurityService } from '../cybersecurity.service';

describe('AdminController', () => {
  let controller: CybersecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CybersecurityController],
      providers: [CybersecurityService],
    }).compile();

    controller = module.get<CybersecurityController>(CybersecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
