import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPRevenueEntity } from './cp-revenue.entity';

@Entity({ name: 'cp_revenue_projects_awarded' })
export class CPRevenueProjectsAwardedEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  value?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  agency?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  duration: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Index()
  @ManyToOne(() => CPRevenueEntity, (cp_revenue) => cp_revenue.projectsAwarded, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_revenue_id' })
  cpRevenue: CPRevenueEntity;
}
