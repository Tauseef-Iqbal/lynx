import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmCrudService } from 'src/shared/services';
import { Repository } from 'typeorm';
import { CpLegalStructureOrgFacilityEntity } from 'src/typeorm/models';
import { CompanyProfileLegalStructureOrgFacilityDto } from './dtos';

@Injectable()
export class CompanyProfileLegalStructureOrgFacilityService extends BaseTypeOrmCrudService<CpLegalStructureOrgFacilityEntity> {
  constructor(
    @InjectRepository(CpLegalStructureOrgFacilityEntity)
    readonly cplsOrgFacilityRepository: Repository<CpLegalStructureOrgFacilityEntity>,
  ) {
    super(cplsOrgFacilityRepository);
  }

  /**
   * create list of org facilities against the company profile legal structure
   * @param cpLegalStructureId
   * @param orgFacilities
   */
  async createOrgFacilities(cpLegalStructureId: number, orgFacilities?: CompanyProfileLegalStructureOrgFacilityDto[]): Promise<void> {
    if (orgFacilities?.length > 0) {
      await Promise.all(
        orgFacilities.map((facilityDto) =>
          this.create({
            ...facilityDto,
            cpLegalStructureId,
          } as unknown as CpLegalStructureOrgFacilityEntity),
        ),
      );
    }
  }

  /**
   * update the org facilities of company legal structure
   * if the dto has the id it will update the org facility otherwise create
   * @param orgFacilitiesDto
   */
  async updateOrgFacilities(cpLegalStructureId: number, orgFacilitiesDto: CompanyProfileLegalStructureOrgFacilityDto[]): Promise<void> {
    await Promise.all(
      orgFacilitiesDto.map((orgFacility) => {
        const { id, ...facilityUpdateDto } = orgFacility;
        if (id) {
          return this.update(id, facilityUpdateDto as unknown as CpLegalStructureOrgFacilityEntity);
        } else {
          return this.create({
            ...facilityUpdateDto,
            cpLegalStructureId,
          } as unknown as CpLegalStructureOrgFacilityEntity);
        }
      }),
    );
  }
}
