import { Test, TestingModule } from '@nestjs/testing';
import { DataManagementAndStorageService } from '../data-management-and-storage.service';

describe('DataManagementAndStorageService', () => {
  let service: DataManagementAndStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataManagementAndStorageService],
    }).compile();

    service = module.get<DataManagementAndStorageService>(DataManagementAndStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
