import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from '.';
import { CustomBaseEntity } from './custom-base.entity';

@Entity('cp_company_overview')
export class CPCompanyOverviewEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', nullable: true })
  snapshot: string;

  @Column({ type: 'simple-array', nullable: true })
  differentiators: string[];

  @Column({ type: 'simple-array', nullable: true })
  competencies: string[];

  @Column({ type: 'simple-array', nullable: true })
  capabilities: string[];

  @Column({ type: 'simple-array', nullable: true })
  values: string[];

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.companyOverview, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
