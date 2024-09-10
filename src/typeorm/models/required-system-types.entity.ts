import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { RequiredSystemEntity } from './required-system.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('required_system_types')
export class RequiredSystemTypesEntity extends CustomBaseEntity {
  // systemName is required
  @Column({ type: 'varchar', length: 255, name: 'system_name' })
  systemName: string;

  // All other fields are optional
  @Column({ type: 'text', nullable: true, name: 'system_description' })
  systemDescription?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'system_type' })
  systemType?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'dpas_approval_number' })
  dpasApprovalNumber?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'compliance_details' })
  complianceDetails?: string;

  @ManyToOne(() => RequiredSystemEntity, (requiredSystem) => requiredSystem.systemTypes, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'required_system_id' })
  @Index()
  requiredSystem: RequiredSystemEntity;
}
