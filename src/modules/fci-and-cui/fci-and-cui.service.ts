import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPFCIAndCUIEntity, UserEntity } from 'src/typeorm/models';
import { AddFCIAndCUIDto, UpdateFCIAndCUIDto } from './dtos';

@Injectable()
export class FCIAndCUIService extends BaseTypeOrmCrudService<CPFCIAndCUIEntity> {
  constructor(
    @InjectRepository(CPFCIAndCUIEntity)
    readonly FCIAndCUIRepository: Repository<CPFCIAndCUIEntity>,
  ) {
    super(FCIAndCUIRepository);
  }

  async addFCIAndCUI(user: UserEntity, addFCIAndCUIDto: AddFCIAndCUIDto): Promise<CPFCIAndCUIEntity> {
    const existedFCIAndCUI = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedFCIAndCUI) {
      return this.updateFCIAndCUI(existedFCIAndCUI.id, user, addFCIAndCUIDto);
    }

    return this.create({ ...addFCIAndCUIDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPFCIAndCUIEntity);
  }

  async updateFCIAndCUI(id: number, user: UserEntity, updateFCIAndCUIDto: UpdateFCIAndCUIDto): Promise<CPFCIAndCUIEntity> {
    const FCIAndCUI = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!FCIAndCUI) {
    //   throw new Error('FCIAndCUI not associated with this company profile');
    // }

    if (!FCIAndCUI) return null;

    return this.update(id, updateFCIAndCUIDto as unknown as CPFCIAndCUIEntity);
  }

  async getMyFCIAndCUI(companyProfileId: number): Promise<CPFCIAndCUIEntity> {
    const myFCIAndCUI = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myFCIAndCUI) {
    //   throw new NotFoundException('FCIAndCUI not found against your company profile');
    // }

    if (!myFCIAndCUI) return null;

    return myFCIAndCUI;
  }

  async deleteMyFCIAndCUI(companyProfileId: number): Promise<CPFCIAndCUIEntity> {
    const myFCIAndCUI = await this.getMyFCIAndCUI(companyProfileId);
    return this.update(myFCIAndCUI.id, { isDeleted: true } as unknown as CPFCIAndCUIEntity);
  }
}
