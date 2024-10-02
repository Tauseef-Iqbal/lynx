import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from '.';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('cp_data_compliance_documentation')
export class CPDataComplianceDocumentationEntity extends CustomBaseEntity {
  @Column({ name: 'data_governance_policy', type: 'boolean', nullable: true })
  dataGovernancePolicy?: boolean;

  @Column({ name: 'data_governance_policy_details', type: 'text', nullable: true })
  dataGovernancePolicyDetails?: string;

  @Column({ name: 'dlp_strategy', type: 'boolean', nullable: true })
  dlpStrategy?: boolean;

  @Column({ name: 'dlp_strategy_details', type: 'text', nullable: true })
  dlpStrategyDetails?: string;

  @Column({ name: 'access_log', type: 'boolean', nullable: true })
  accessLog?: boolean;

  @Column({ name: 'access_log_details', type: 'text', nullable: true })
  accessLogDetails?: string;

  @Column({ name: 'incident_response_plan', type: 'boolean', nullable: true })
  incidentResponse?: boolean;

  @Column({ name: 'incident_response_plan_details', type: 'text', nullable: true })
  incidentResponseDetails?: string;

  @Column({ name: 'privacy_act_policy', type: 'boolean', nullable: true })
  privacyActPolicy?: boolean;

  @Column({ name: 'privacy_act_policy_details', type: 'text', nullable: true })
  privacyActPolicyDetails?: string;

  @Column({ name: 'data_disposal_procedure', type: 'boolean', nullable: true })
  dataDisposalProcedure?: boolean;

  @Column({ name: 'data_disposal_procedure_details', type: 'text', nullable: true })
  dataDisposalProcedureDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.dataComplianceDocumentation, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
