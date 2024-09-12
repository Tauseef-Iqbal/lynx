import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_data_management_and_storage' })
export class CPDataManagementAndStorageEntity extends CustomBaseEntity {
  @Column({ name: 'cloud_services', type: 'boolean', nullable: true })
  cloudServices?: boolean;

  @Column({ name: 'cloud_services_details', type: 'text', nullable: true })
  cloudServicesDetails?: string;

  @Column({ name: 'encrypt_govt_data', type: 'boolean', nullable: true })
  encryptGovtData?: boolean;

  @Column({ name: 'encrypt_govt_data_details', type: 'text', nullable: true })
  encryptGovtDataDetails?: string;

  @Column({ name: 'third_party_vendors', type: 'boolean', nullable: true })
  thirdPartyVendors?: boolean;

  @Column({ name: 'third_party_vendors_details', type: 'text', nullable: true })
  thirdPartyVendorsDetails?: string;

  @Column({ name: 'tools_for_securing_govt_data', type: 'boolean', nullable: true })
  toolsForSecuringGovtData?: boolean;

  @Column({ name: 'tools_for_securing_govt_data_details', type: 'text', nullable: true })
  toolsForSecuringGovtDataDetails?: string;

  @Column({ name: 'documented_govt_data', type: 'boolean', nullable: true })
  documentedGovtData?: boolean;

  @Column({ name: 'documented_govt_data_details', type: 'text', nullable: true })
  documentedGovtDataDetails?: string;

  @Column({ name: 'US_citizens_sensitive_data', type: 'jsonb', nullable: true })
  USCitizensSensitiveData?: string[];

  @Column({ name: 'US_citizens_sensitive_data_details', type: 'text', nullable: true })
  USCitizensSensitiveDataDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.dataManagementAndStorage, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
