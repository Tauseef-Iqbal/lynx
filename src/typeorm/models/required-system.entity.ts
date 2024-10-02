import { Entity, Column, OneToMany, DeleteDateColumn, JoinColumn, Index, ManyToOne } from 'typeorm';
import { RequiredSystemBusinessClassificationEntity } from './required-system-business-classification.entity';
import { RequiredSystemCertificationEntity } from './required-system-certification.entity';
import { RequiredSystemTypesEntity } from './required-system-types.entity';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('required_systems')
export class CPRequiredSystemEntity extends CustomBaseEntity {
  @Column({ name: 'has_sam', type: 'boolean', default: false })
  hasSAM?: boolean;

  @OneToMany(() => RequiredSystemBusinessClassificationEntity, (classification) => classification.requiredSystem)
  businessClassifications: RequiredSystemBusinessClassificationEntity[];

  @OneToMany(() => RequiredSystemCertificationEntity, (certification) => certification.requiredSystem)
  certifications: RequiredSystemCertificationEntity[];

  @OneToMany(() => RequiredSystemTypesEntity, (systemTypes) => systemTypes.requiredSystem)
  systemTypes: RequiredSystemTypesEntity[];

  @Column({ type: 'text', nullable: true, name: 'cybersecurity_systems_level' })
  cybersecuritySystemsLevel: string;

  @Column({ type: 'boolean', default: false, name: 'supports_government_integration' })
  supportsGovernmentIntegration: boolean;

  @Column({ type: 'text', nullable: true, name: 'government_integration_details' })
  governmentIntegrationDetails: string;

  @Index()
  @ManyToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.cpRequiredSystems, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}
