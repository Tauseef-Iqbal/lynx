import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { RequiredSystemEntity } from './required-system.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('required_system_business_classification')
export class RequiredSystemBusinessClassificationEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, name: 'classification_name' })
  classificationName: string;

  @ManyToOne(() => RequiredSystemEntity, (requiredSystem) => requiredSystem.businessClassifications, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'required_system_id' })
  @Index()
  requiredSystem: RequiredSystemEntity;
}
