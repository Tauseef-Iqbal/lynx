import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('cp_controls_and_protocols')
export class CPControlsAndProtocolsEntity extends CustomBaseEntity {
  @Column({ name: 'perform_audits', type: 'boolean', nullable: true })
  performAudits: boolean;

  @Column({ name: 'audit_details', type: 'text', nullable: true })
  auditDetails: string;

  @Column({ name: 'employee_training', type: 'boolean', nullable: true })
  employeeTraining: boolean;

  @Column({ name: 'employee_training_details', type: 'text', nullable: true })
  employeeTrainingDetails: string;

  @Column({ name: 'access_control_measures', type: 'boolean', nullable: true })
  accessControlMeasures: boolean;

  @Column({ name: 'access_control_measures_details', type: 'text', nullable: true })
  accessControlMeasuresDetails: string;

  @Column({ name: 'fisma_compliance', type: 'boolean', nullable: true })
  fismaCompliance: boolean;

  @Column({ name: 'fisma_compliance_details', type: 'text', nullable: true })
  fismaComplianceDetails: string;

  @Column({ name: 'review_management_policies', type: 'boolean', nullable: true })
  reviewManagementPolicies: boolean;

  @Column({ name: 'review_management_policies_details', type: 'text', nullable: true })
  reviewManagementPoliciesDetails: string;

  @Column({ name: 'removable_media_control', type: 'boolean', nullable: true })
  removableMediaControl: boolean;

  @Column({ name: 'removable_media_control_details', type: 'text', nullable: true })
  removableMediaControlDetails: string;

  @Column({ name: 'prohibit_unidentified_storage', type: 'boolean', nullable: true })
  prohibitUnidentifiedStorage: boolean;

  @Column({ name: 'prohibit_unidentified_storage_details', type: 'text', nullable: true })
  prohibitUnidentifiedStorageDetails: string;

  @Column({ name: 'nist_compliance', type: 'boolean', nullable: true })
  nistCompliance: boolean;

  @Column({ name: 'nist_compliance_details', type: 'text', nullable: true })
  nistComplianceDetails: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.controlsAndProtocols, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
