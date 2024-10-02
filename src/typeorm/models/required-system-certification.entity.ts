import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { CPRequiredSystemEntity } from './required-system.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('required_system_certification')
export class RequiredSystemCertificationEntity extends CustomBaseEntity {
  // certificationName is required
  @Column({ type: 'varchar', nullable: true, length: 255, name: 'certification_name' })
  certificationName: string;

  // All other fields are optional
  @Column({ type: 'date', nullable: true, name: 'date' })
  date?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'number' })
  number?: string;

  @Column({
    type: 'varchar',
    default: 'N/A',
    name: 'certification_status',
  })
  certificationStatus?: string;

  @ManyToOne(() => CPRequiredSystemEntity, (requiredSystem) => requiredSystem.certifications, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'required_system_id' })
  @Index()
  requiredSystem: CPRequiredSystemEntity;
}
