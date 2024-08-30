import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileLegalStructureEntity } from './company-profile-legal-structure.entity';

@Entity({ name: 'cp_legal_structure_org_facilities' })
export class CpLegalStructureOrgFacilityEntity extends CustomBaseEntity {
  @Column({ name: 'office_address', type: 'varchar', length: 255, nullable: true })
  officeAddress: string;

  @Column({ name: 'state', type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ name: 'city', type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ name: 'country', type: 'varchar', length: 100, nullable: true })
  country: string;

  // TODO - enum
  @Column({ name: 'office_type', type: 'varchar', length: 50, nullable: true })
  officeType: string;

  @ManyToOne(() => CompanyProfileLegalStructureEntity, (cpls) => cpls.orgFacilities, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'company_profile_legal_structure_id' })
  @Index()
  cpLegalStructureId: CompanyProfileLegalStructureEntity;
}
