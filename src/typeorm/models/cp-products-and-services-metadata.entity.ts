import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CpProductsAndServicesEntity } from './cp-products-and-services.entity';

@Entity({ name: 'cp_products_and_services_metadata' })
export class CpProductsAndServicesMetaDataEntity extends CustomBaseEntity {
  @Index()
  @Column({ name: 'type', nullable: true, type: 'varchar', length: 60 })
  type?: string;

  @Column({ name: 'additional_info', type: 'text', nullable: true })
  additionalInfo?: string;

  @Column({ name: 'supporting_materials', nullable: true, type: 'text', array: true })
  supportingMaterials?: string[];

  @ManyToOne(() => CpProductsAndServicesEntity, (cprs) => cprs.productsAndServicesMeta, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_products_and_services_id' })
  @Index()
  cpProductsAndServicesId: CpProductsAndServicesEntity;
}
