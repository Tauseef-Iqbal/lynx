import { DCSAClearance, SFCertificate } from 'src/modules/advanced-business-information/enums';
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from '.';
import { CPAdvancedBusinessInformationFacilityDetailsEntity } from './cp-advanced-business-information-facility-details.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_advanced_business_information' })
export class CPAdvancedBusinessInformationEntity extends CustomBaseEntity {
  @Column({ name: 'company_licensing', type: 'boolean', nullable: true })
  companyLicensing?: boolean;

  @Column({ name: 'company_licensing_files', type: 'text', array: true, nullable: true })
  companyLicensingFiles?: string[];

  @Column({ name: 'construction_industry', type: 'boolean', nullable: true })
  constructionIndustry?: boolean;

  @Column({ name: 'construction_industry_details', type: 'text', nullable: true })
  constructionIndustryDetails?: string;

  @Column({ type: 'enum', enum: DCSAClearance, nullable: true })
  dcsaClearance: DCSAClearance;

  @Column({ name: 'dcsa_clearance_files', type: 'text', array: true, nullable: true })
  dcsaClearanceFiles?: string[];

  @Column({ name: 'foreign_ownership_control', type: 'boolean', nullable: true })
  foreignOwnershipControl?: boolean;

  @Column({ name: 'foreign_ownership_control_details', type: 'text', nullable: true })
  foreignOwnershipControlDetails?: string;

  @Column({ name: 'invested_by_gov', type: 'boolean', nullable: true })
  investedByGov?: boolean;

  @Column({ name: 'invested_by_gov_details', type: 'text', nullable: true })
  investedByGovDetails?: string;

  @Column({ name: 'participate_in_foreign_travel', type: 'boolean', nullable: true })
  participateInForeignTravel?: boolean;

  @Column({ name: 'participate_in_foreign_travel_details', type: 'text', nullable: true })
  participateInForeignTravelDetails?: string;

  @Column({ name: 'participate_in_trade_shows', type: 'boolean', nullable: true })
  participateInTradeShows?: boolean;

  @Column({ name: 'participate_in_trade_shows_details', type: 'text', nullable: true })
  participateInTradeShowsDetails?: string;

  @Column({ name: 'sf_certificate', type: 'enum', enum: SFCertificate, nullable: true })
  sfCertificate: string;

  @Column({ name: 'sf_certificate_files', type: 'text', array: true, nullable: true })
  sfCertificateFiles?: string[];

  @Column({ name: 'regulatory_action', type: 'boolean', nullable: true })
  regulatoryAction?: boolean;

  @Column({ name: 'regulatory_action_details', type: 'text', nullable: true })
  regulatoryActionDetails?: string;

  @Column({ name: 'convicted_of_felonies', type: 'boolean', nullable: true })
  convictedOfFelonies?: boolean;

  @Column({ name: 'convicted_of_felonies_files', type: 'text', array: true, nullable: true })
  convictedOfFeloniesFiles?: string[];

  @Column({ name: 'orders_under_dpas', type: 'boolean', nullable: true })
  ordersUnderDPAS?: boolean;

  @Column({ name: 'orders_under_dpas_details', type: 'text', nullable: true })
  ordersUnderDPASDetails?: string;

  @Column({ name: 'orders_under_dpas_files', type: 'text', array: true, nullable: true })
  ordersUnderDPASFiles?: string[];

  @Column({ name: 'classified_govt_contract', type: 'boolean', nullable: true })
  classifiedGovtContract?: boolean;

  @Column({ name: 'classified_govt_contract_details', type: 'text', nullable: true })
  classifiedGovtContractDetails?: string;

  @Column({ name: 'us_institutions_contracts', type: 'boolean', nullable: true })
  usInstitutionsContracts?: boolean;

  @Column({ name: 'intellectual_property_transfer', type: 'boolean', nullable: true })
  intellectualPropertyTransfer?: boolean;

  @Column({ name: 'intellectual_property_transfer_details', type: 'text', nullable: true })
  intellectualPropertyTransferDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.cpBusinessInfo, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @OneToMany(() => CPAdvancedBusinessInformationFacilityDetailsEntity, (facilityDetails) => facilityDetails.businessInformation, {
    cascade: ['insert', 'update'],
  })
  facilityDetails: CPAdvancedBusinessInformationFacilityDetailsEntity[];
}
