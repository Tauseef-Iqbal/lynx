import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_financial_health' })
export class CPFinancialHealthEntity extends CustomBaseEntity {
  @Column({ name: 'financial_statements', nullable: true, type: 'boolean' })
  financialStatements?: boolean;

  @Column({ name: 'financial_statements_files', type: 'text', array: true, nullable: true })
  financialStatementsFiles?: string[];

  @Column({ name: 'financial_elements', nullable: true, type: 'boolean' })
  financialElements?: boolean;

  @Column({ name: 'financial_elements_details', type: 'text', nullable: true })
  financialElementsDetails?: string;

  @Column({ name: 'business_plans', nullable: true, type: 'boolean' })
  businessPlans?: boolean;

  @Column({ name: 'business_plans_files', type: 'text', array: true, nullable: true })
  businessPlansFiles?: string[];

  @Column({ name: 'bankruptcy_filed', nullable: true, type: 'boolean' })
  bankruptcyFiled?: boolean;

  @Column({ name: 'bankruptcy_filed_details', type: 'text', nullable: true })
  bankruptcyFiledDetails?: string;

  @Column({ name: 'financial_obligations', nullable: true, type: 'boolean' })
  financialObligations?: boolean;

  @Column({ name: 'financial_obligations_details', type: 'text', nullable: true })
  financialObligationsDetails?: string;

  @Column({ name: 'good_standing_certificates', nullable: true, type: 'boolean' })
  goodStandingCertificates?: boolean;

  @Column({ name: 'good_standing_certificates_files', type: 'text', array: true, nullable: true })
  goodStandingCertificatesFiles?: string[];

  @Column({ name: 'pending_lawsuit_defendant', nullable: true, type: 'boolean' })
  pendingLawsuitDefendant?: boolean;

  @Column({ name: 'pending_lawsuit_defendant_details', type: 'text', nullable: true })
  pendingLawsuitDefendantDetails?: string;

  @Column({ name: 'foreign_person_obligations', nullable: true, type: 'boolean' })
  foreignPersonObligations?: boolean;

  @Column({ name: 'foreign_person_obligations_details', type: 'text', nullable: true })
  foreignPersonObligationsDetails?: string;

  @Column({ name: 'financial_disclosure_statements', nullable: true, type: 'boolean' })
  financialDisclosureStatements?: boolean;

  @Column({ name: 'financial_disclosure_statements_files', type: 'text', array: true, nullable: true })
  financialDisclosureStatementsFiles?: string[];

  @Column({ name: 'financial_changes', nullable: true, type: 'boolean' })
  financialChanges?: boolean;

  @Column({ name: 'financial_changes_details', type: 'text', nullable: true })
  financialChangesDetails?: string;

  @Column({ name: 'contingency_financing_plans', nullable: true, type: 'boolean' })
  contingencyFinancingPlans?: boolean;

  @Column({ name: 'contingency_financing_plans_details', type: 'text', nullable: true })
  contingencyFinancingPlansDetails?: string;

  @Column({ name: 'financial_convenants', nullable: true, type: 'boolean' })
  financialConvenants?: boolean;

  @Column({ name: 'financial_convenants_details', type: 'text', nullable: true })
  financialConvenantsDetails?: string;

  @Column({ name: 'reserve_fundings', nullable: true, type: 'boolean' })
  reserveFundings?: boolean;

  @Column({ name: 'reserve_fundings_details', type: 'text', nullable: true })
  reserveFundingsDetails?: string;

  @Column({ name: 'financial_audits', nullable: true, type: 'boolean' })
  financialAudits?: boolean;

  @Column({ name: 'financial_audits_files', type: 'text', array: true, nullable: true })
  financialAuditsFiles?: string[];

  @Column({ name: 'ownership_management_financial_changes', nullable: true, type: 'boolean' })
  ownershipManagementFinancialChanges?: boolean;

  @Column({ name: 'ownership_management_financial_changes_details', type: 'text', nullable: true })
  ownershipManagementFinancialChangesDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (company) => company.financialHealth, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
