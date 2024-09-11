import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPSupplyChainEntity } from './cp-supply-chain.entity';

@Entity({ name: 'cp_supply_chain_supplier' })
export class CPSupplyChainSupplierEntity extends CustomBaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Index()
  @Column({ name: 'sam_id', type: 'varchar', length: 255, nullable: true })
  samId?: string;

  @Index()
  @Column({ name: 'cage_code', type: 'varchar', length: 255, nullable: true })
  cageCode?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  duns?: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  classification?: string;

  @Column({ name: 'facility-clearance-type', type: 'varchar', length: 255, nullable: true })
  facilityClearanceType?: string;

  @Column({ name: 'operations_criticality', type: 'text', nullable: true })
  operationsCriticality?: string;

  @Column({ name: 'supplier_role_description', type: 'text', nullable: true })
  supplierRoleDescription?: string;

  @Index()
  @OneToOne(() => CPSupplyChainEntity, (supplyChain) => supplyChain.supplyChainSupplier, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'supply_chain_id' })
  supplyChain: CPSupplyChainEntity;
}
