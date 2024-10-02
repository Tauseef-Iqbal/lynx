import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_fci_and_cui' })
export class CPFCIAndCUIEntity extends CustomBaseEntity {
  @Column({ name: 'protection_contracts', type: 'boolean', nullable: true })
  protectionContracts?: boolean;

  @Column({ name: 'protection_contracts_details', type: 'text', nullable: true })
  protectionContractsDetails?: string;

  @Column({ name: 'assets', type: 'boolean', nullable: true })
  assets?: boolean;

  @Column({ name: 'assets_details', type: 'text', nullable: true })
  assetsDetails?: string;

  @Column({ name: 'personnel', type: 'boolean', nullable: true })
  personnel?: boolean;

  @Column({ name: 'personnel_details', type: 'text', nullable: true })
  personnelDetails?: string;

  @Column({ name: 'physical_presence', type: 'boolean', nullable: true })
  physicalPresence?: boolean;

  @Column({ name: 'physical_presence_details', type: 'text', nullable: true })
  physicalPresenceDetails?: string;

  @Column({ name: 'cui_control_flow', type: 'boolean', nullable: true })
  CUIControlFlow?: boolean;

  @Column({ name: 'cui_control_flow_details', type: 'text', nullable: true })
  CUIControlFlowDetails?: string;

  @Column({ name: 'cui_on_public_systems', type: 'boolean', nullable: true })
  CUIOnPublicSystems?: boolean;

  @Column({ name: 'cui_on_public_systems_details', type: 'text', nullable: true })
  CUIOnPublicSystemsDetails?: string;

  @Column({ name: 'security_notices', type: 'boolean', nullable: true })
  securityNotices?: boolean;

  @Column({ name: 'security_notices_devices', type: 'text', nullable: true })
  securityNoticesDetails?: string;

  @Column({ name: 'encrypted_cui_on_mobile_devices', type: 'boolean', nullable: true })
  encryptedCUIOnMobileDevices?: boolean;

  @Column({ name: 'encrypted_cui_on_mobile_devices_details', type: 'text', nullable: true })
  encryptedCUIOnMobileDevicesDetails?: string;

  @Column({ name: 'sanitize_system_media', type: 'boolean', nullable: true })
  sanitizeSystemMedia?: boolean;

  @Column({ name: 'sanitize_system_media_details', type: 'text', nullable: true })
  sanitizeSystemMediaDetails?: string;

  @Column({ name: 'sanitized_offsite_maintenance', type: 'boolean', nullable: true })
  sanitizedOffsiteMaintenance?: boolean;

  @Column({ name: 'sanitized_offsite_maintenance_details', type: 'text', nullable: true })
  sanitizedOffsiteMaintenanceDetails?: string;

  @Column({ name: 'paper_and_digital_protection', type: 'boolean', nullable: true })
  paperAndDigitalProtection?: boolean;

  @Column({ name: 'paper_and_digital_protection_details', type: 'text', nullable: true })
  paperAndDigitalProtectionDetails?: string;

  @Column({ name: 'authorised_users_limited_access', type: 'boolean', nullable: true })
  authorisedUsersLimitedAccess?: boolean;

  @Column({ name: 'authorised_users_limited_access_details', type: 'text', nullable: true })
  authorisedUsersLimitedAccessDetails?: string;

  @Column({ name: 'marked_media_with_distribution_limitations', type: 'boolean', nullable: true })
  markedMediaWithDistributionLimitations?: boolean;

  @Column({ name: 'marked_media_with_distribution_limitations_details', type: 'text', nullable: true })
  markedMediaWithDistributionLimitationsDetails?: string;

  @Column({ name: 'transport_control_access', type: 'boolean', nullable: true })
  transportControlAccess?: boolean;

  @Column({ name: 'transport_control_access_details', type: 'text', nullable: true })
  transportControlAccessDetails?: string;

  @Column({ name: 'cryptographic_mechanisms', type: 'boolean', nullable: true })
  cryptographicMechanisms?: boolean;

  @Column({ name: 'cryptographic_mechanisms_details', type: 'text', nullable: true })
  cryptographicMechanismsDetails?: string;

  @Column({ name: 'storage_locations_protection', type: 'boolean', nullable: true })
  storageLocationsProtection?: boolean;

  @Column({ name: 'storage_locations_protection_details', type: 'text', nullable: true })
  storageLocationsProtectionDetails?: string;

  @Column({ name: 'screening_for_autorised_access', type: 'boolean', nullable: true })
  screeningForAutorisedAccess?: boolean;

  @Column({ name: 'screening_for_autorised_access_details', type: 'text', nullable: true })
  screeningForAutorisedAccessDetails?: string;

  @Column({ name: 'pesonnel_actions_consequences', type: 'boolean', nullable: true })
  pesonnelActionsConsequences?: boolean;

  @Column({ name: 'pesonnel_actions_consequences_details', type: 'text', nullable: true })
  pesonnelActionsConsequencesDetails?: string;

  @Column({ name: 'work_sites_SOPs', type: 'boolean', nullable: true })
  workSitesSOPs?: boolean;

  @Column({ name: 'work_sites_SOPs_details', type: 'text', nullable: true })
  workSitesSOPsDetails?: string;

  @Column({ name: 'org_operations_risk_assessment', type: 'boolean', nullable: true })
  orgPperationsRiskAssessment?: boolean;

  @Column({ name: 'org_operations_risk_assessment_details', type: 'text', nullable: true })
  orgPperationsRiskAssessmentDetails?: string;

  @Column({ name: 'cryptography_for_confidentiality', type: 'boolean', nullable: true })
  cryptographyForConfidentiality?: boolean;

  @Column({ name: 'cryptography_for_confidentiality_details', type: 'text', nullable: true })
  cryptographyForConfidentialityDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.FCIAndCUI, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
