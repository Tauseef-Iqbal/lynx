import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPDataManagementAndStorageEntity, UserEntity } from 'src/typeorm/models';
import { AddDataManagementAndStorageDto, UpdateDataManagementAndStorageDto } from './dtos';

@Injectable()
export class DataManagementAndStorageService extends BaseTypeOrmCrudService<CPDataManagementAndStorageEntity> {
  constructor(
    @InjectRepository(CPDataManagementAndStorageEntity)
    readonly dataManagementAndStorageRepository: Repository<CPDataManagementAndStorageEntity>,
  ) {
    super(dataManagementAndStorageRepository);
  }

  async addDataManagementAndStorage(user: UserEntity, addDataManagementAndStorageDto: AddDataManagementAndStorageDto): Promise<CPDataManagementAndStorageEntity> {
    const existedDataManagementAndStorage = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedDataManagementAndStorage) {
      return this.updateDataManagementAndStorage(existedDataManagementAndStorage.id, user, addDataManagementAndStorageDto);
    }

    return this.create({ ...addDataManagementAndStorageDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPDataManagementAndStorageEntity);
  }

  async updateDataManagementAndStorage(id: number, user: UserEntity, updateDataManagementAndStorageDto: UpdateDataManagementAndStorageDto): Promise<CPDataManagementAndStorageEntity> {
    const dataManagementAndStorage = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!dataManagementAndStorage) {
    //   throw new Error('DataManagementAndStorage not associated with this company profile');
    // }

    if (!dataManagementAndStorage) return null;

    return this.update(id, updateDataManagementAndStorageDto as unknown as CPDataManagementAndStorageEntity);
  }

  async getMyDataManagementAndStorage(companyProfileId: number): Promise<CPDataManagementAndStorageEntity> {
    const myDataManagementAndStorage = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myDataManagementAndStorage) {
    //   throw new NotFoundException('DataManagementAndStorage not found against your company profile');
    // }

    if (!myDataManagementAndStorage) return null;

    return myDataManagementAndStorage;
  }

  async deleteMyDataManagementAndStorage(companyProfileId: number): Promise<CPDataManagementAndStorageEntity> {
    const myDataManagementAndStorage = await this.getMyDataManagementAndStorage(companyProfileId);
    return this.update(myDataManagementAndStorage.id, { isDeleted: true } as unknown as CPDataManagementAndStorageEntity);
  }
}
