import { CompanyRevenueStream, GeneratedRevenueRange } from 'src/modules/revenue/enums';
import { ICustomerDetails } from 'src/modules/revenue/interfaces';
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CPRevenueProjectsAwardedEntity } from './cp-revenue-projects-awarded.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_revenue' })
export class CPRevenueEntity extends CustomBaseEntity {
  @Column({ name: 'growth_state', type: 'jsonb', nullable: true })
  growthState?: string[] | string;

  @Column({ name: 'generated_revenue', type: 'text', nullable: true })
  generatedRevenue?: string;

  @Column({
    name: 'generated_revenue_range',
    type: 'enum',
    enum: GeneratedRevenueRange,
    nullable: true,
  })
  generatedRevenueRange?: GeneratedRevenueRange;

  @Column({ name: 'five_percent_foreign_revenue', type: 'boolean', nullable: true })
  fivePercentForeignRevenue?: boolean;

  @Column({ name: 'five_percent_foreign_revenue_details', type: 'text', nullable: true })
  fivePercentForeignRevenueDetails?: string;

  @Column({
    name: 'company_revenue_stream',
    type: 'enum',
    enum: CompanyRevenueStream,
    nullable: true,
  })
  companyRevenueStream?: CompanyRevenueStream;

  @Column({ name: 'customer_details', type: 'jsonb', nullable: true })
  customerDetails?: ICustomerDetails;

  @Column({ name: 'irs_tax_filed', type: 'boolean', nullable: true })
  irsTaxFiled?: boolean;

  @Column({ name: 'financial_backing_investments', type: 'boolean', nullable: true })
  financialBackingInvestments?: boolean;

  @Column({ name: 'financial_backing_investments_details', type: 'text', nullable: true })
  financialBackingInvestmentsDetails?: string;

  @Column({ name: 'revenue_sharing_agreements', type: 'boolean', nullable: true })
  revenueSharingAgreements?: boolean;

  @Column({ name: 'revenue_sharing_agreements_details', type: 'text', nullable: true })
  revenueSharingAgreementsDetails?: string;

  @Column({ name: 'revenue_restrictions', type: 'boolean', nullable: true })
  revenueRestrictions?: boolean;

  @Column({ name: 'revenue_restrictions_details', type: 'text', nullable: true })
  revenueRestrictionsDetails?: string;

  @Column({ name: 'revenue_growth_plan', type: 'boolean', nullable: true })
  revenueGrowthPlan?: boolean;

  @Column({ name: 'revenue_growth_plan_details', type: 'text', nullable: true })
  revenueGrowthPlanDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.revenue, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @OneToMany(() => CPRevenueProjectsAwardedEntity, (projectsAwarded) => projectsAwarded.cpRevenue, {
    cascade: ['insert', 'update'],
  })
  projectsAwarded: CPRevenueProjectsAwardedEntity[];
}
