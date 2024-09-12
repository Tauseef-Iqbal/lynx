import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { ICapacityInfoDetails } from 'src/modules/advanced-business-information/interfaces';
import { CompanyProfileEntity } from '.';

@Entity({ name: 'cp_advanced_business_information' })
export class CPAdvancedBusinessInformationEntity extends CustomBaseEntity {
  @Column({ name: 'company_licensing', type: 'boolean', nullable: true })
  companyLicensing?: boolean;

  @Column({ name: 'industry_specific_files', type: 'text', array: true, nullable: true })
  industrySpecificFiles?: string[];

  @Column({ name: 'business_elements', type: 'boolean', nullable: true })
  businessElements?: boolean;

  @Column({ name: 'business_elements_details', type: 'text', nullable: true })
  businessElementsDetails?: string;

  @Column({ type: 'enum', enum: ['Yes', 'No', 'Hold'], default: 'Hold' })
  dcsaClearanceStatus: string;

  @Column({ name: 'business_plan_files', type: 'text', array: true, nullable: true })
  businessPlanFiles?: string[];

  @Column({ name: 'capacity_information', type: 'jsonb', nullable: true })
  facilityAndCapacityInformation?: ICapacityInfoDetails;

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

  @Column({ name: 'sf_certificate_status', type: 'enum', enum: ['Yes', 'No', 'In-progress'] })
  certificateStatus: string;

  @Column({ name: 'sf_certificate_files', type: 'text', array: true, nullable: true })
  certificateStatusFiles?: string[];

  @Column({ name: 'regularity_action', type: 'boolean', nullable: true })
  regularityAction?: boolean;

  @Column({ name: 'regularity_action_details', type: 'text', nullable: true })
  regularityActionDetails?: string;

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

  @Column({ name: 'has_classified_govt_contract', type: 'boolean', nullable: true })
  hasClassifiedGovtContract?: boolean;

  @Column({ name: 'has_classified_govt_contract_details', type: 'text', nullable: true })
  hasClassifiedGovtContractDetails?: string;

  @Column({ name: 'has_ip_transfer', type: 'boolean', nullable: true })
  hasIPTransfer?: boolean;

  @Column({ name: 'has_ip_transfer_details', type: 'text', nullable: true })
  hasIPTransferDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.cpBusinessInfo, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
