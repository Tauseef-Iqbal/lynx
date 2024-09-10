import { Test, TestingModule } from '@nestjs/testing';
import { FCIAndCUIController } from '../fci-and-cui.controller';
import { FCIAndCUIService } from '../fci-and-cui.service';

describe('AdminController', () => {
  let controller: FCIAndCUIController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FCIAndCUIController],
      providers: [FCIAndCUIService],
    }).compile();

    controller = module.get<FCIAndCUIController>(FCIAndCUIController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
