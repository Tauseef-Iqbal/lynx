import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPCybersecurityEntity, UserEntity } from 'src/typeorm/models';
import { AddCybersecurityDto, UpdateCybersecurityDto } from './dtos';

@Injectable()
export class CybersecurityService extends BaseTypeOrmCrudService<CPCybersecurityEntity> {
  constructor(
    @InjectRepository(CPCybersecurityEntity)
    readonly cybersecurityRepository: Repository<CPCybersecurityEntity>,
  ) {
    super(cybersecurityRepository);
  }

  async addCybersecurity(user: UserEntity, addCybersecurityDto: AddCybersecurityDto): Promise<CPCybersecurityEntity> {
    const existedCybersecurity = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedCybersecurity) {
      return this.updateCybersecurity(existedCybersecurity.id, user, addCybersecurityDto);
    }

    return this.create({ ...addCybersecurityDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPCybersecurityEntity);
  }

  async updateCybersecurity(id: number, user: UserEntity, updateCybersecurityDto: UpdateCybersecurityDto): Promise<CPCybersecurityEntity> {
    const cybercecurity = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!cybercecurity) {
    //   throw new Error('Cybersecurity not associated with this company profile');
    // }

    if (!cybercecurity) return null;

    return this.update(id, updateCybersecurityDto as unknown as CPCybersecurityEntity);
  }

  async getMyCybersecurity(companyProfileId: number): Promise<CPCybersecurityEntity> {
    const myCybersecurity = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myCybersecurity) {
    //   throw new NotFoundException('Cybersecurity not found against your company profile');
    // }

    if (!myCybersecurity) return null;

    return myCybersecurity;
  }

  async deleteMyCybersecurity(companyProfileId: number): Promise<CPCybersecurityEntity> {
    const myCybersecurity = await this.getMyCybersecurity(companyProfileId);
    return this.update(myCybersecurity.id, { isDeleted: true } as unknown as CPCybersecurityEntity);
  }
}
