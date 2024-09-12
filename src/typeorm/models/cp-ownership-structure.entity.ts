import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CPOwnershipStructureDetailsEntity } from './cp-ownership-structure-details.entity';
import { CPOwnershipStructureKeyManagementEntity } from './cp-ownership-structure-key-management.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_ownership_structure' })
export class CPOwnershipStructureEntity extends CustomBaseEntity {
  @Column({ name: 'ownership_agreements', type: 'boolean', nullable: true })
  ownershipAgreements?: boolean;

  @Column({ name: 'ownership_agreements_details', type: 'jsonb', nullable: true })
  ownershipAgreementsDetails?: string;

  @Column({ name: 'foreign_agreements_contracts', type: 'boolean', nullable: true })
  foreignAgreementsContracts?: boolean;

  @Column({ name: 'foreign_agreements_contracts_details', type: 'text', nullable: true })
  foreignAgreementsContractsDetails?: string;

  @Column({ name: 'foreign_interest_10_percent', type: 'boolean', nullable: true })
  foreignInterest10Percent?: boolean;

  @Column({ name: 'foreign_interest_10_percent_details', type: 'jsonb', nullable: true })
  foreignInterest10PercentDetails?: string;

  @Column({ name: 'business_foreign_ownership', type: 'boolean', nullable: true })
  businessForeignOwnership?: boolean;

  @Column({ name: 'business_foreign_ownership_details', type: 'jsonb', nullable: true })
  businessForeignOwnershipDetails?: string;

  @Column({ name: 'voting_nominee_10_percent', type: 'boolean', nullable: true })
  votingNominee10Percent?: boolean;

  @Column({ name: 'voting_nominee_10_percent_details', type: 'text', nullable: true })
  votingNominee10PercentDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.ownershipStructure, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @OneToOne(() => CPOwnershipStructureDetailsEntity, (ownershipStructureDetails) => ownershipStructureDetails.ownershipStructure, {
    cascade: ['insert', 'update'],
  })
  ownershipStructureDetails: CPOwnershipStructureDetailsEntity;

  @OneToMany(() => CPOwnershipStructureKeyManagementEntity, (ownershipStructureKeyManagement) => ownershipStructureKeyManagement.ownershipStructure, {
    cascade: ['insert', 'update'],
  })
  ownershipStructureKeyManagement: CPOwnershipStructureKeyManagementEntity[];
}
