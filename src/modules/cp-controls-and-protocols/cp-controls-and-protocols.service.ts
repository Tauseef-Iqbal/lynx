import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { ControlsAndProtocolEntity, UserEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { UpsertControlsAndProtocolDto } from './dtos/controls-and-protocols.dto';

@Injectable()
export class CpControlsAndProtocolsService extends BaseTypeOrmCrudService<ControlsAndProtocolEntity> {
  constructor(
    @InjectRepository(ControlsAndProtocolEntity)
    readonly controlsAndProtocolRepository: Repository<ControlsAndProtocolEntity>,
  ) {
    super(controlsAndProtocolRepository);
  }

  async controlsAndProtocols(user: UserEntity, upsertComplianceDocumentationDto: UpsertControlsAndProtocolDto): Promise<ControlsAndProtocolEntity> {
    const existingControlsAndProtocol = await this.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });

    if (existingControlsAndProtocol) {
      return this.update(existingControlsAndProtocol.id, upsertComplianceDocumentationDto as unknown as ControlsAndProtocolEntity);
    }

    return this.create({
      ...upsertComplianceDocumentationDto,
      companyProfile: { id: user.companyProfile.id },
    } as unknown as ControlsAndProtocolEntity);
  }

  async getMyControlsAndProtocol(companyProfileId: number): Promise<ControlsAndProtocolEntity> {
    const dataComplianceDocumentation = await this.findByFilter({ companyProfile: { id: companyProfileId }, isDeleted: false });
    if (!dataComplianceDocumentation) {
      throw new NotFoundException('ControlsAndProtocolEntity not found against your company profile');
    }
    return dataComplianceDocumentation;
  }
}
