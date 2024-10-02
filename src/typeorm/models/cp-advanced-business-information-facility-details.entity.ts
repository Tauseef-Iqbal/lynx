import { CageCodeClearanceLevel } from 'src/modules/advanced-business-information/enums';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CPAdvancedBusinessInformationEntity } from '.';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_advanced_business_information_facility_details' })
export class CPAdvancedBusinessInformationFacilityDetailsEntity extends CustomBaseEntity {
  @Index()
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ name: 'cage_code_clearance_level', type: 'enum', enum: CageCodeClearanceLevel, nullable: true })
  cageCodeClearanceLevel?: CageCodeClearanceLevel;

  @Column({ type: 'date', nullable: true })
  date?: Date;

  @Column({ name: 'project_duration', type: 'varchar', nullable: true })
  projectDuration?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'varchar', nullable: true })
  state?: string;

  @Column({ name: 'zip_code', type: 'int' })
  zipCode?: number;

  @Index()
  @ManyToOne(() => CPAdvancedBusinessInformationEntity, (businessInformation) => businessInformation.facilityDetails, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_business_information_id' })
  businessInformation: CPAdvancedBusinessInformationEntity;
}
