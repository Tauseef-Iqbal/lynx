import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CpLegalStructureOrgFacilityEntity } from './company-profile-org-facility.entity';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_legal_structure' })
export class CompanyProfileLegalStructureEntity extends CustomBaseEntity {
  @Index()
  @Column({ name: 'legal_structure', nullable: true, type: 'varchar', array: true, length: 255 })
  legalStructure: string[];

  @Column({ name: 'dba_name', nullable: true, type: 'varchar', length: 255 })
  dbaName: string;

  @Column({ name: 'dba_files', type: 'text', array: true, nullable: true })
  dbaFiles: string[];

  @Column({ name: 'completed_projects_files', type: 'text', array: true, nullable: true })
  completedProjectsFiles: string[];

  @Column({ name: 'legal_structure_changed', type: 'boolean', default: true })
  legalStructureChanged: boolean;

  @Column({ name: 'legal_structure_changed_description', type: 'text', nullable: true })
  legalStructureChangedDescription: string | null;

  @Column({ name: 'corporation_own_operate_foreign_countries', type: 'boolean', default: true })
  corporationOwnOperateForeignCountries: boolean;

  @Column({ name: 'corporation_own_operate_foreign_countries_description', type: 'text', nullable: true })
  corporationOwnOperateForeignCountriesDescription: string | null;

  @Column({ name: 'has_multiple_org_facilities', type: 'boolean', default: true })
  hasMultipleOrgFacilities: boolean;

  // relation
  @OneToMany(() => CpLegalStructureOrgFacilityEntity, (facility) => facility.cpLegalStructureId)
  orgFacilities: CpLegalStructureOrgFacilityEntity[];

  @Index()
  @OneToOne(() => CompanyProfileEntity, (company) => company.cpLegalStructure, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
