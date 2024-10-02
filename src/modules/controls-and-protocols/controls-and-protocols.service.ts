import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CPControlsAndProtocolsEntity, UserEntity } from 'src/typeorm/models';
import { AddControlsAndProtocolsDto, UpdateControlsAndProtocolsDto } from './dtos';

@Injectable()
export class ControlsAndProtocolsService extends BaseTypeOrmCrudService<CPControlsAndProtocolsEntity> {
  constructor(
    @InjectRepository(CPControlsAndProtocolsEntity)
    readonly controlsAndProtocolsRepository: Repository<CPControlsAndProtocolsEntity>,
  ) {
    super(controlsAndProtocolsRepository);
  }

  async addControlsAndProtocols(user: UserEntity, addControlsAndProtocolsDto: AddControlsAndProtocolsDto): Promise<CPControlsAndProtocolsEntity> {
    const existedControlsAndProtocols = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });
    if (existedControlsAndProtocols) {
      return this.updateControlsAndProtocols(existedControlsAndProtocols.id, user, addControlsAndProtocolsDto);
    }

    return this.create({ ...addControlsAndProtocolsDto, companyProfile: { id: user.companyProfile.id } } as unknown as CPControlsAndProtocolsEntity);
  }

  async updateControlsAndProtocols(id: number, user: UserEntity, updateControlsAndProtocolsDto: UpdateControlsAndProtocolsDto): Promise<CPControlsAndProtocolsEntity> {
    const controlsAndProtocols = await this.findByFilter({ id, companyProfile: { id: user.companyProfile.id } }, { relations: { companyProfile: true } });
    // if (!controlsAndProtocols) {
    //   throw new Error('ControlsAndProtocols not associated with this company profile');
    // }

    if (!controlsAndProtocols) return null;

    return this.update(id, updateControlsAndProtocolsDto as unknown as CPControlsAndProtocolsEntity);
  }

  async getMyControlsAndProtocols(companyProfileId: number): Promise<CPControlsAndProtocolsEntity> {
    const myControlsAndProtocols = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    // if (!myControlsAndProtocols) {
    //   throw new NotFoundException('ControlsAndProtocols not found against your company profile');
    // }

    if (!myControlsAndProtocols) return null;

    return myControlsAndProtocols;
  }

  async deleteMyControlsAndProtocols(companyProfileId: number): Promise<CPControlsAndProtocolsEntity> {
    const myControlsAndProtocols = await this.getMyControlsAndProtocols(companyProfileId);
    return this.update(myControlsAndProtocols.id, { isDeleted: true } as unknown as CPControlsAndProtocolsEntity);
  }
}
