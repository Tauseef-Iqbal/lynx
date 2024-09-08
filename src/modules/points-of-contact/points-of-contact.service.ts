import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPPointsOfContactEntity, UserEntity } from 'src/typeorm/models';
import { AddPointsOfContactDto, UpdatePointsOfContactDto } from './dtos';

@Injectable()
export class PointsOfContactService extends BaseTypeOrmCrudService<CPPointsOfContactEntity> {
  constructor(
    @InjectRepository(CPPointsOfContactEntity)
    readonly pointsOfContactRepository: Repository<CPPointsOfContactEntity>,
  ) {
    super(pointsOfContactRepository);
  }

  async addPointsOfContact(user: UserEntity, addPointsOfContactDto: AddPointsOfContactDto): Promise<CPPointsOfContactEntity> {
    const existedPointsOfContact = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedPointsOfContact) {
      return this.updatePointsOfContact(existedPointsOfContact.id, user, addPointsOfContactDto);
    }

    return this.create({ ...addPointsOfContactDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPPointsOfContactEntity);
  }

  async updatePointsOfContact(id: number, user: UserEntity, updatePointsOfContactDto: UpdatePointsOfContactDto): Promise<CPPointsOfContactEntity> {
    const pointsOfContact = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    if (!pointsOfContact) {
      throw new Error('Points Of Contact not associated with this company profile');
    }

    return this.update(id, updatePointsOfContactDto as unknown as CPPointsOfContactEntity);
  }

  async getMyPointsOfContact(companyProfileId: number): Promise<CPPointsOfContactEntity> {
    const myPointsOfContact = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!myPointsOfContact) {
      throw new NotFoundException('Points Of Contact not found against your company profile');
    }
    return myPointsOfContact;
  }

  async deleteMyPointsOfContact(companyProfileId: number): Promise<CPPointsOfContactEntity> {
    const myPointsOfContact = await this.getMyPointsOfContact(companyProfileId);
    return this.update(myPointsOfContact.id, { isDeleted: true } as unknown as CPPointsOfContactEntity);
  }
}
