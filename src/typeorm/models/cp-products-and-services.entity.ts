import { Column, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileEntity } from './company-profile.entity';
import { CpProductsAndServicesMetaDataEntity } from './cp-products-and-services-metadata.entity';

@Entity({ name: 'cp_products_and_services' })
export class CpProductsAndServicesEntity extends CustomBaseEntity {
  @Index()
  @Column({ name: 'name', nullable: true, type: 'varchar', length: 255 })
  name?: string;

  @Column({ name: 'type', nullable: true, type: 'varchar', length: 60 })
  type?: string;

  @Column({ name: 'product_or_service_image', nullable: true, type: 'text' })
  productOrServiceImage?: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'trl_specification', nullable: true, type: 'varchar', length: 255 })
  trlSpecification?: string;

  @Column({ name: 'mrl_specification', nullable: true, type: 'varchar', length: 255 })
  mrlSpecification?: string;

  @Column({ name: 'compnay_differentiators', nullable: true, type: 'varchar', array: true, length: 255 })
  compnayDifferentiators?: string[];

  @Column({ name: 'challenges_addressed', nullable: true, type: 'text' })
  challengesAddressed?: string;

  @Column({ name: 'uploaded_materials', nullable: true, type: 'text', array: true })
  uploadedMaterials?: string[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone', nullable: true })
  deletedAt?: Date;

  // relation
  @OneToMany(() => CpProductsAndServicesMetaDataEntity, (meta) => meta.cpProductsAndServicesId)
  productsAndServicesMeta: CpProductsAndServicesMetaDataEntity[];

  @Index()
  @ManyToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.cpRequiredSystem, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
