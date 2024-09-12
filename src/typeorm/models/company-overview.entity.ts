import { Column, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CompanyProfileEntity } from '.';

@Entity('company_overview')
export class CompanyOverviewEntity extends CustomBaseEntity {
  @Column({ type: 'text', name: 'company_snapshot', nullable: true })
  snapshot: string;

  @Column('text', { array: true, name: 'differentiators', nullable: true })
  differentiators: string[];

  @Column('text', { array: true, name: 'competencies', nullable: true })
  competencies: string[];

  @Column('text', { array: true, name: 'capabilities', nullable: true })
  capabilities: string[];

  @Column('text', { array: true, name: 'values', nullable: true })
  values: string[];

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.companyOverview, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
