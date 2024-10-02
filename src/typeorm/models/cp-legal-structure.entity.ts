import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CpLegalStructureOrgFacilityEntity } from './cp-org-facility.entity';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';
import { LegalStructure } from 'src/modules/legal-structure/enums';
import { IAssets } from 'src/modules/company-profile/interfaces';

@Entity({ name: 'cp_legal_structure' })
export class CPLegalStructureEntity extends CustomBaseEntity {
  @Index()
  @Column({ name: 'legal_structure', type: 'simple-array', nullable: true })
  legalStructure?: LegalStructure[];

  @Column({ name: 'other_legal_structure', type: 'varchar', nullable: true })
  otherLegalStructure: string;

  @Column({ name: 'dba_assets', type: 'jsonb', nullable: true })
  dbaAssets: IAssets[];

  @Column({ name: 'dba_name', type: 'boolean', nullable: true })
  dbaName?: boolean;

  @Column({ name: 'dba_name_files', type: 'text', array: true, nullable: true })
  dbaNameFiles?: string[];

  @Column({ name: 'legal_structure_changed', type: 'boolean', nullable: true })
  legalStructureChanged?: boolean;

  @Column({ name: 'legal_structure_changed_details', type: 'text', nullable: true })
  legalStructureChangedDetails?: string;

  @Column({ name: 'corporation_own_operate_foreign_countries', type: 'boolean', default: true })
  corporationOwnOperateForeignCountries: boolean;

  @Column({ name: 'corporation_own_operate_foreign_countries_details', type: 'text', nullable: true })
  corporationOwnOperateForeignCountriesDetails: string;

  @Column({ name: 'multiple_org_facilities', type: 'boolean', nullable: true })
  multipleOrgFacilities: boolean;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (company) => company.cpLegalStructure, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @OneToMany(() => CpLegalStructureOrgFacilityEntity, (orgFacility) => orgFacility.cpLegalStructure, {
    cascade: ['insert', 'update'],
  })
  orgFacilities: CpLegalStructureOrgFacilityEntity[];
}
