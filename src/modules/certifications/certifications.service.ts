import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { CpCertificationsEntity, UserEntity } from 'src/typeorm/models';
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

  async updateCertifications(user: UserEntity, updateCpCertificationDto: UpdateCpCertificationDto[]): Promise<CpCertificationsEntity[]> {
    await this.certificationsRepository.delete({ companyProfile: { id: user.companyProfile.id } });

    return await Promise.all(
      updateCpCertificationDto.map(async (dto) => {
        return this.create({
          ...dto,
          companyProfile: { id: user.companyProfile.id },
        } as unknown as CpCertificationsEntity);
      }),
    );
  }
}
