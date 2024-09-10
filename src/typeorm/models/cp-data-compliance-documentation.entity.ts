import { Entity, Column, DeleteDateColumn, Index, OneToOne, JoinColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileEntity } from '.';

@Entity('cp_data_compliance_documentation')
export class DataComplianceDocumentationEntity extends CustomBaseEntity {
  // Documented Data Governance Policy
  @Column({ type: 'boolean' })
  hasDataGovernancePolicy: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  dataGovernancePolicyDetails?: string;

  // Data Loss Prevention (DLP) Strategy
  @Column({ type: 'boolean' })
  hasDlpStrategy: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  dlpStrategyDetails?: string;

  // Access Log Maintenance
  @Column({ type: 'boolean' })
  hasAccessLog: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  accessLogDetails?: string;

  // Incident Response Plan
  @Column({ type: 'boolean' })
  hasIncidentResponsePlan: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  incidentResponseDetails?: string;

  // Privacy Act of 1974 Policy
  @Column({ type: 'boolean' })
  hasPrivacyActPolicy: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  privacyActPolicyDetails?: string;

  // Data Disposal Procedure
  @Column({ type: 'boolean' })
  hasDataDisposalProcedure: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  dataDisposalProcedureDetails?: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.toolsAndApplications, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
