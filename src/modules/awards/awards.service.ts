import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { Repository } from 'typeorm';
import { SaveCpAwardDto, UpdateCpAwardDto } from './dtos';
import { CpAwardEntity, UserEntity } from 'src/typeorm/models';
import { AwardsOfficialDocsService } from './award-official-docs.service';

@Injectable()
export class AwardsService extends BaseTypeOrmCrudService<CpAwardEntity> {
  constructor(
    @InjectRepository(CpAwardEntity)
    readonly cpAwardRepository: Repository<CpAwardEntity>,
    private readonly awardsOfficialDocsService: AwardsOfficialDocsService,
  ) {
    super(cpAwardRepository);
  }

  async saveAwards(user: any, saveCpAwardDtoa: SaveCpAwardDto[]): Promise<CpAwardEntity[]> {
    const existingAwards = await this.cpAwardRepository.find({
      where: { companyProfile: { id: user?.companyProfile?.id } },
    });

    if (existingAwards.length > 0) {
      await Promise.all(
        existingAwards.map(async (award) => {
          await this.awardsOfficialDocsService.deleteOfficialDocs(user, award);
          await this.delete(award.id);
        }),
      );
    }

    const newAwards = await Promise.all(
      saveCpAwardDtoa.map(async (createCpAwardDto) => {
        const { officialDocs, ...cpAwardData } = createCpAwardDto;

        const award = await this.create({
          ...cpAwardData,
          companyProfile: { id: user?.companyProfile?.id },
        } as unknown as CpAwardEntity);

        if (officialDocs && officialDocs.length > 0) {
          await this.awardsOfficialDocsService.createOfficialDocs(user, officialDocs, award);
        }

        return award;
      }),
    );

    return newAwards;
  }

  async updateAward(user: UserEntity, id: number, updateCpAwardDto: UpdateCpAwardDto): Promise<CpAwardEntity> {
    const cpAward = await this.findById(id, { relations: { companyProfile: true } });
    // if (!cpAward) {
    //   throw new Error('Company award not associated with this company profile');
    // }

    if (!cpAward) return null;

    const { officialDocs, ...cpAwardData } = updateCpAwardDto;

    if (officialDocs && officialDocs.length > 0) {
      await this.awardsOfficialDocsService.updateOfficialDocs(user, officialDocs, cpAward);
    }

    return this.update(id, cpAwardData as unknown as CpAwardEntity);
  }

  async getMyAwards(companyProfileId: number): Promise<CpAwardEntity[]> {
    const awards = await this.cpAwardRepository.find({
      where: { companyProfile: { id: companyProfileId }, isDeleted: false },
      relations: ['officialDocs'],
    });

    if (!awards || awards.length === 0) {
      // throw new NotFoundException('No awards found for your company profile.');
      return [];
    }

    return awards;
  }
}
