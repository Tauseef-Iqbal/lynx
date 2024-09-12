import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_tools_applications' })
export class CPToolsAndApplicationsEntity extends CustomBaseEntity {
  @Column({ name: 'operating_systems', type: 'jsonb', nullable: true })
  operatingSystems?: string[] | string;

  @Column({ name: 'tools_and_applications', type: 'text', nullable: true })
  toolsAndApplications?: string;

  @Column({ name: 'critical_applications', type: 'text', nullable: true })
  criticalApplications?: string;

  @Column({ name: 'email_service_provider', type: 'boolean', nullable: true })
  emailServiceProvider?: boolean;

  @Column({ name: 'email_service_provider_details', type: 'text', nullable: true })
  emailServiceProviderDetails?: string;

  @Column({ name: 'cloud_services', type: 'boolean', nullable: true })
  cloudServices?: boolean;

  @Column({ name: 'cloud_services_details', type: 'text', nullable: true })
  cloudServicesDetails?: string;

  @Column({ name: 'on_premise_software_hardware_systems', type: 'boolean', nullable: true })
  onPremiseSoftwareHardwareSystems?: boolean;

  @Column({ name: 'on_premise_software_hardware_systems_details', type: 'text', nullable: true })
  onPremiseSoftwareHardwareSystemsDetails?: string;

  @Column({ name: 'non_company_owned_mobile_devices', type: 'boolean', nullable: true })
  nonCompanyOwnedMobileDevices?: boolean;

  @Column({ name: 'mdm_solution', type: 'text', nullable: true })
  mdmSolution?: string;

  @Column({ name: 'technology_assets', type: 'boolean', nullable: true })
  technologyAssets?: boolean;

  @Column({ name: 'technology_assets_details', type: 'text', nullable: true })
  technologyAssetsDetails?: string;

  @Column({ name: 'financial_covenants', type: 'boolean', nullable: true })
  financialCovenants?: boolean;

  @Column({ name: 'financial_covenants_details', type: 'text', nullable: true })
  financialCovenantsDetails?: string;

  @Column({ name: 'security_measures', type: 'text', nullable: true })
  securityMeasures?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.toolsAndApplications, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
