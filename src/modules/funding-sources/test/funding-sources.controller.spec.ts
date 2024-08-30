import { Test, TestingModule } from '@nestjs/testing';
import { FundingSourcesController } from '../funding-sources.controller';
import { FundingSourcesService } from '../funding-sources.service';

describe('AdminController', () => {
  let controller: FundingSourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundingSourcesController],
      providers: [FundingSourcesService],
    }).compile();

    controller = module.get<FundingSourcesController>(FundingSourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
