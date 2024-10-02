import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPCybersecurityEntity } from './cp-cybersecurity.entity';

@Entity({ name: 'cp_cybersecurity_encryption_details' })
export class CPCybersecurityEncryptionDetailsEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  standard?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  provider?: boolean;

  @Column({ name: 'encryption_files', type: 'text', array: true, nullable: true })
  encryptionFiles?: string[];

  @Index()
  @ManyToOne(() => CPCybersecurityEntity, (cybersecurity) => cybersecurity.cybersecurityEncryptionDetails, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_cybersecurity_id' })
  cybersecurity: CPCybersecurityEntity;
}
