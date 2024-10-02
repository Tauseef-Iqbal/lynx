import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileEntity } from './company-profile.entity';
import { CPProductsAndServicesMetadataEntity } from './cp-products-and-services-metadata.entity';
import { IAssets } from 'src/modules/company-profile/interfaces';

@Entity({ name: 'cp_products_and_services' })
export class CPProductsAndServicesEntity extends CustomBaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'offering_type', type: 'varchar', length: 255, nullable: true })
  offeringType?: string;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'trl_specification', type: 'varchar', length: 255, nullable: true })
  trlSpecification?: string;

  @Column({ name: 'mrl_specification', type: 'varchar', length: 255, nullable: true })
  mrlSpecification?: string;

  @Column({ name: 'compnay_differentiators', type: 'varchar', array: true, length: 255, nullable: true })
  compnayDifferentiators?: string[];

  @Column({ name: 'challenges_addressed', type: 'text', nullable: true })
  challengesAddressed?: string;

  @Column({ type: 'jsonb', nullable: true })
  assets: IAssets[];

  @OneToMany(() => CPProductsAndServicesMetadataEntity, (productsAndServicesMetadata) => productsAndServicesMetadata.productsAndServices, {
    cascade: ['insert', 'update'],
  })
  productsAndServicesMetadata: CPProductsAndServicesMetadataEntity[];

  @Index()
  @ManyToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.productsAndServices, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
