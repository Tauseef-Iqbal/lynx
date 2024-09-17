import { Injectable, PreconditionFailedException } from '@nestjs/common';
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

  async addPointsOfContact(user: UserEntity, addPointsOfContactDto: AddPointsOfContactDto[]): Promise<CPPointsOfContactEntity[]> {
    const pointsOfContacts: CPPointsOfContactEntity[] = [];

    for (const incomingPointsOfContact of addPointsOfContactDto) {
      let existingPointOfContact: CPPointsOfContactEntity;

      if (incomingPointsOfContact.id) {
        existingPointOfContact = await this.findByFilter({ id: incomingPointsOfContact.id });
        if (existingPointOfContact) {
          await this.pointsOfContactRepository.update(existingPointOfContact.id, incomingPointsOfContact as unknown as CPPointsOfContactEntity);
          const updatedContact = await this.findById(existingPointOfContact.id);
          pointsOfContacts.push(updatedContact);
        } else {
          const newContact = await this.create({ ...incomingPointsOfContact, companyProfile: { id: user.companyProfile.id } } as unknown as CPPointsOfContactEntity);
          pointsOfContacts.push(newContact);
        }
      } else {
        const newContact = await this.create({ ...incomingPointsOfContact, companyProfile: { id: user.companyProfile.id } } as unknown as CPPointsOfContactEntity);
        pointsOfContacts.push(newContact);
      }
    }

    return pointsOfContacts;
  }

  async updatePointsOfContact(user: UserEntity, updatePointsOfContactDtos: UpdatePointsOfContactDto[]): Promise<CPPointsOfContactEntity[]> {
    const updatedContacts: CPPointsOfContactEntity[] = [];

    for (const updatePointsOfContactDto of updatePointsOfContactDtos) {
      if (updatePointsOfContactDto.id) {
        const pointsOfContact = await this.findByFilter({ id: updatePointsOfContactDto.id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
        if (pointsOfContact) {
          await this.pointsOfContactRepository.update(pointsOfContact.id, updatePointsOfContactDto as unknown as CPPointsOfContactEntity);
          const updatedContact = await this.findById(pointsOfContact.id);
          updatedContacts.push(updatedContact);
        } else {
          throw new PreconditionFailedException(`Point of contact with ID ${updatePointsOfContactDto.id} not found or does not belong to this company profile.`);
        }
      } else {
        throw new PreconditionFailedException('Please use a valid ID to update the Point of Contact.');
      }
    }

    return updatedContacts;
  }

  async getMyPointsOfContact(companyProfileId: number): Promise<CPPointsOfContactEntity[]> {
    const myPointsOfContact = await this.findManyByFilter({ companyProfile: { id: companyProfileId } });
    // if (!myPointsOfContact) {
    //   throw new NotFoundException('Points Of Contact not found against your company profile');
    // }

    if (!myPointsOfContact) return null;

    return myPointsOfContact;
  }

  async deleteMyPointsOfContact(companyProfileId: number): Promise<CPPointsOfContactEntity> {
    const myPointsOfContact = await this.findByFilter({ companyProfile: { id: companyProfileId } });
    return this.update(myPointsOfContact.id, { isDeleted: true } as unknown as CPPointsOfContactEntity);
  }
}
