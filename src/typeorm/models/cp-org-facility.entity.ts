import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPLegalStructureEntity } from './cp-legal-structure.entity';
import { OfficeType } from 'src/modules/legal-structure/enums';

@Entity({ name: 'cp_legal_structure_org_facilities' })
export class CpLegalStructureOrgFacilityEntity extends CustomBaseEntity {
  @Column({ name: 'office_address', type: 'varchar', nullable: true })
  officeAddress: string;

  @Column({ name: 'state', type: 'varchar', nullable: true })
  state: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ name: 'office_type', type: 'enum', enum: OfficeType, nullable: true })
  officeType: OfficeType;

  @ManyToOne(() => CPLegalStructureEntity, (legalStructure) => legalStructure.orgFacilities, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_legal_structure_id' })
  @Index()
  cpLegalStructure: CPLegalStructureEntity;
}
