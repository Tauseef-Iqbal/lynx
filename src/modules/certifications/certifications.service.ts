import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CpCertificationsEntity } from 'src/typeorm/models';
import { Repository } from 'typeorm';
import { CreateCpCertificationDto, UpdateCpCertificationDto } from './dtos';

@Injectable()
export class CertificationsService extends BaseTypeOrmCrudService<CpCertificationsEntity> {
  constructor(
    @InjectRepository(CpCertificationsEntity)
    readonly certificationsRepository: Repository<CpCertificationsEntity>,
  ) {
    super(certificationsRepository);
  }

  async addCertifications(user: any, createCpCertificationDto: CreateCpCertificationDto[]): Promise<CpCertificationsEntity[]> {
    return await Promise.all(
      createCpCertificationDto.map((dto) =>
        this.create({
          ...dto,
          companyProfile: { id: user.companyProfile.id },
        } as unknown as CpCertificationsEntity),
      ),
    );
  }

  async updateCertifications(user: any, updateCpCertificationDto: UpdateCpCertificationDto[]): Promise<CpCertificationsEntity[]> {
    return await Promise.all(
      updateCpCertificationDto.map(async (dto) => {
        const { id, ...updatedto } = dto;
        if (id) {
          return this.update(id, updatedto as unknown as CpCertificationsEntity);
        } else {
          return this.create({
            ...updatedto,
            companyProfile: { id: user.companyProfile.id },
          } as unknown as CpCertificationsEntity);
        }
      }),
    );
  }
}
