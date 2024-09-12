import { Test, TestingModule } from '@nestjs/testing';
import { CompanyOrverviewController } from '../company-orverview.controller';

describe('CompanyOrverviewController', () => {
  let controller: CompanyOrverviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyOrverviewController],
    }).compile();

    controller = module.get<CompanyOrverviewController>(CompanyOrverviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
