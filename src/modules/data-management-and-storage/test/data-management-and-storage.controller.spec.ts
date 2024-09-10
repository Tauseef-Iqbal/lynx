import { Test, TestingModule } from '@nestjs/testing';
import { DataManagementAndStorageController } from '../data-management-and-storage.controller';
import { DataManagementAndStorageService } from '../data-management-and-storage.service';

describe('AdminController', () => {
  let controller: DataManagementAndStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataManagementAndStorageController],
      providers: [DataManagementAndStorageService],
    }).compile();

    controller = module.get<DataManagementAndStorageController>(DataManagementAndStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
