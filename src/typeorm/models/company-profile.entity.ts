import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPFinancialHealthEntity } from './cp-financial-health.entity';
import { UserEntity } from './user.entity';
import { CompanyProfileLegalStructureEntity } from './company-profile-legal-structure.entity';
import { CPToolsAndApplicationsEntity } from './cp-tools-applications.entity';
import { CPRevenueEntity } from './cp-revenue.entity';
import { CPCybersecurityEntity } from './cp-cybersecurity.entity';
import { CPFundingSourcesEntity } from './cp-funding-sources.entity';
import { ISocialMedia } from 'src/modules/company-profile/interfaces';
import { CompanyClassification } from 'src/modules/company-profile/enums';
import { CPOwnershipStructureEntity } from './cp-ownership-structure.entity';

@Entity({ name: 'company_profile' })
export class CompanyProfileEntity extends CustomBaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Index()
  @Column({ name: 'sam_id', type: 'varchar', length: 255 })
  samId: string;

  @Index()
  @Column({ name: 'cage_code', type: 'varchar', length: 255 })
  cageCode: string;

  @Column({ type: 'varchar', length: 255 })
  duns: string;

  @Column({ type: 'varchar', length: 255 })
  ein: string;

  @Column({ name: 'founder_name', type: 'varchar', length: 255 })
  founderName: string;

  @Column({ name: 'founded_year', type: 'int' })
  foundedYear: string;

  @Column({ name: 'state_of_registration', type: 'varchar', length: 255 })
  stateOfRegistration: string;

  @Column({ name: 'registration_code', type: 'varchar', length: 255 })
  registrationCode: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'bigint', name: 'zip_code' })
  zipCode: number;

  @Column({ name: 'classification', type: 'enum', enum: CompanyClassification, nullable: true })
  classification?: CompanyClassification;

  @Column({ name: 'classification_types', type: 'jsonb', nullable: true })
  classificationTypes?: string[];

  @Column({ name: 'industry_associations', type: 'jsonb', nullable: true })
  industryAssociations?: string[] | string;

  @Column({ name: 'assets', type: 'jsonb', nullable: true })
  assets: string[];

  @Column({ name: 'social_media', type: 'jsonb', nullable: true })
  socialMedia?: ISocialMedia;

  @Index()
  @OneToOne(() => UserEntity, (user) => user.company, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'up_id' })
  userProfile: UserEntity;

  @OneToOne(() => CPFinancialHealthEntity, (financialHealth) => financialHealth.companyProfile)
  financialHealth: CPFinancialHealthEntity;

  @OneToOne(() => CPToolsAndApplicationsEntity, (toolsAndApplications) => toolsAndApplications.companyProfile)
  toolsAndApplications: CPToolsAndApplicationsEntity;

  @OneToOne(() => CompanyProfileLegalStructureEntity, (cpLegalStructure) => cpLegalStructure.companyProfile)
  cpLegalStructure: CompanyProfileLegalStructureEntity;

  @OneToOne(() => CPRevenueEntity, (revenue) => revenue.companyProfile)
  revenue: CPRevenueEntity;

  @OneToOne(() => CPCybersecurityEntity, (cybersecurity) => cybersecurity.companyProfile)
  cybersecurity: CPCybersecurityEntity;

  @OneToOne(() => CPFundingSourcesEntity, (fundingSources) => fundingSources.companyProfile)
  fundingSources: CPFundingSourcesEntity;

  @OneToOne(() => CPOwnershipStructureEntity, (ownershipStructure) => ownershipStructure.companyProfile)
  ownershipStructure: CPOwnershipStructureEntity;
}
