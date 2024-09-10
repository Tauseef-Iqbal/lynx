import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPResearchAndDevelopmentEntity } from './cp-research-and-development.entity';

@Entity({ name: 'cp_research_and_development_innovations' })
export class CPResearchAndDevelopmentInnovationsEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ name: 'developed_year', type: 'int', nullable: true })
  developedYear?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Index()
  @ManyToOne(() => CPResearchAndDevelopmentEntity, (researchAndDevelopment) => researchAndDevelopment.researchAndDevelopmentInnovations, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'research_and_development_id' })
  researchAndDevelopment: CPResearchAndDevelopmentEntity;
}
