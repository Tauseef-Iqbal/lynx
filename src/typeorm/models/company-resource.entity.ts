import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'company_resources' })
export class CompanyResourceEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', nullable: true })
  source: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  metaData: JSON;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @ManyToOne(() => CompanyEntity, (company) => company.resources, {
    cascade: true,
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'company_id' })
  @Index()
  company: CompanyEntity;
}
