import { Column, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('controls_and_protocols')
export class ControlsAndProtocolEntity extends CustomBaseEntity {
  @Column({ type: 'boolean', default: false, name: 'perform_audits' })
  performAudits: boolean;

  @Column({ type: 'text', nullable: true, name: 'audit_details' })
  auditDetails: string;

  @Column({ type: 'boolean', default: false, name: 'train_employees' })
  trainEmployees: boolean;

  @Column({ type: 'text', nullable: true, name: 'training_details' })
  trainingDetails: string;

  @Column({ type: 'boolean', default: false, name: 'access_control_measures' })
  accessControlMeasures: boolean;

  @Column({ type: 'text', nullable: true, name: 'access_control_details' })
  accessControlDetails: string;

  @Column({ type: 'boolean', default: false, name: 'fisma_compliance' })
  fismaCompliance: boolean;

  @Column({ type: 'text', nullable: true, name: 'fisma_compliance_details' })
  fismaComplianceDetails: string;

  @Column({
    type: 'boolean',
    default: false,
    name: 'review_management_policies',
  })
  reviewManagementPolicies: boolean;

  @Column({ type: 'text', nullable: true, name: 'management_policies_details' })
  managementPoliciesDetails: string;

  @Column({ type: 'boolean', default: false, name: 'removable_media_control' })
  removableMediaControl: boolean;

  @Column({ type: 'text', nullable: true, name: 'removable_media_details' })
  removableMediaDetails: string;

  @Column({
    type: 'boolean',
    default: false,
    name: 'prohibit_unidentified_storage',
  })
  prohibitUnidentifiedStorage: boolean;

  @Column({
    type: 'text',
    nullable: true,
    name: 'unidentified_storage_details',
  })
  unidentifiedStorageDetails: string;

  @Column({ type: 'boolean', default: false, name: 'nist_compliance' })
  nistCompliance: boolean;

  @Column({ type: 'text', nullable: true, name: 'nist_compliance_details' })
  nistComplianceDetails: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.controlsAndProtocol, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
