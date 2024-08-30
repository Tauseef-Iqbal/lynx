import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileEntity } from './company-profile.entity';

@Entity({ name: 'cp_funding_sources' })
export class CPFundingSourcesEntity extends CustomBaseEntity {
  @Column({ name: 'funding_type', type: 'text', nullable: true })
  fundingType?: string;

  @Column({ name: 'funding_details', type: 'jsonb', nullable: true })
  fundingDetails?: string[] | string;

  @Column({ name: 'underwriters', type: 'text', nullable: true })
  underWriters?: string;

  @Column({ name: 'raise_equity', type: 'boolean', nullable: true })
  raiseEquity?: boolean;

  @Column({ name: 'equity_stages', type: 'jsonb', nullable: true })
  equityStages?: string[] | string;

  @Column({ name: 'awardee_has_venture_capital', type: 'boolean', nullable: true })
  awardeeHasVentureCapital?: boolean;

  @Column({ name: 'foreign_affiliation', type: 'text', nullable: true })
  foreignAffiliation?: string;

  @Column({ name: 'investor_details', type: 'jsonb', nullable: true })
  investorDetails?: string[] | string;

  @Column({ name: 'foreign_funding', type: 'boolean', nullable: true })
  foreignFunding?: boolean;

  @Column({ name: 'foreign_funding_details', type: 'jsonb', nullable: true })
  foreignFundingDetails?: string[] | string;

  @Column({ name: 'government_backed_funding', type: 'boolean', nullable: true })
  GovernmentBackedFunding?: boolean;

  @Column({ name: 'government_backed_funding_details', type: 'text', nullable: true })
  GovernmentBackedFundingDetails?: string;

  @Column({ name: 'funding_restrictions', type: 'boolean', nullable: true })
  fundingRestrictions?: boolean;

  @Column({ name: 'funding_restrictions_details', type: 'text', nullable: true })
  fundingRestrictionsDetails?: string;

  @Column({ name: 'additional_funding_strategy', type: 'boolean', nullable: true })
  additionalFundingStrategy?: boolean;

  @Column({ name: 'additional_funding_strategy_details', type: 'text', nullable: true })
  additionalFundingStrategyDetails?: string;

  @Column({ name: 'outstanding_debts', type: 'boolean', nullable: true })
  outstandingDebts?: boolean;

  @Column({ name: 'outstanding_debts_details', type: 'text', nullable: true })
  outstandingDebtsDetails?: string;

  @Column({ name: 'funding_instruments', type: 'boolean', nullable: true })
  fundingInstruments?: boolean;

  @Column({ name: 'funding_instruments_details', type: 'text', nullable: true })
  fundingInstrumentsDetails?: string;

  @Column({ name: 'has_financial_audits', type: 'boolean', nullable: true })
  hasFinancialAudits?: boolean;

  @Column({ name: 'audit_details', type: 'text', nullable: true })
  auditDetails?: string;

  @Column({ name: 'strategic_partnership', type: 'boolean', nullable: true })
  strategicPartnership?: boolean;

  @Column({ name: 'strategic_partnership_details', type: 'text', nullable: true })
  strategicPartnershipDetails?: string;

  @Column({ name: 'foreign_financial_interest', type: 'boolean', nullable: true })
  foreignFinancialInterest?: boolean;

  @Column({ name: 'foreign_financial_interest_details', type: 'text', nullable: true })
  foreignFinancialInterestDetails?: string;

  @Column({ name: 'contingency_financing_plan', type: 'boolean', nullable: true })
  contingencyFinancingPlan?: boolean;

  @Column({ name: 'contingency_financing_plan_details', type: 'text', nullable: true })
  contingencyFinancingPlanDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.fundingSources, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
