import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPProductsAndServicesEntity } from './cp-products-and-services.entity';
import { InformationType } from 'src/modules/cp-products-and-services/enums';
import { IAssets } from 'src/modules/company-profile/interfaces';

@Entity({ name: 'cp_products_and_services_metadata' })
export class CPProductsAndServicesMetadataEntity extends CustomBaseEntity {
  @Index()
  @Column({ name: 'information_type', type: 'enum', enum: InformationType, nullable: true })
  informationType?: InformationType;

  @Column({ name: 'additional_information', type: 'text', nullable: true })
  additionalInformation?: string;

  @Column({ type: 'jsonb', nullable: true })
  assets: IAssets[];

  @ManyToOne(() => CPProductsAndServicesEntity, (productsAndServices) => productsAndServices.productsAndServicesMetadata, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_products_and_services_id' })
  @Index()
  productsAndServices: CPProductsAndServicesEntity;
}
