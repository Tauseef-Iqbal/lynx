import { Test, TestingModule } from '@nestjs/testing';
import { RequiredSystemController } from '../required-system.controller';

describe('RequiredSystemController', () => {
  let controller: RequiredSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequiredSystemController],
    }).compile();

    controller = module.get<RequiredSystemController>(RequiredSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
