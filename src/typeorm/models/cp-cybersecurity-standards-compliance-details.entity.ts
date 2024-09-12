import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPCybersecurityEntity } from './cp-cybersecurity.entity';

@Entity({ name: 'cp_cybersecurity_standards_compliance' })
export class CPCybersecurityStandardsComplianceDetailsEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  framework?: string;

  @Column({ name: 'certification_status', type: 'varchar', length: 255, nullable: true })
  certificationStatus?: boolean;

  @Column({ name: 'compliance_files', type: 'text', array: true, nullable: true })
  complianceFiles?: string[];

  @Index()
  @OneToOne(() => CPCybersecurityEntity, (cybersecurity) => cybersecurity.cybersecurityStandardsComplianceDetails, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_cybersecurity_id' })
  cybersecurity: CPCybersecurityEntity;
}
