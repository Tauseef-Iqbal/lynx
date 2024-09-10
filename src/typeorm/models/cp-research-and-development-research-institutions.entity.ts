import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPResearchAndDevelopmentEntity } from './cp-research-and-development.entity';

@Entity({ name: 'cp_research_and_development_research_institutions' })
export class CPResearchAndDevelopmentResearchInstitutionsEntity extends CustomBaseEntity {
  @Column({ name: 'collaborator_name', type: 'varchar', length: 255, nullable: true })
  collaboratorName?: string;

  @Column({ name: 'affiliated_institution', type: 'varchar', length: 255, nullable: true })
  affiliatedInstitution?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country?: string;

  @Column({ name: 'project_title', type: 'varchar', length: 255, nullable: true })
  projectTitle?: string;

  @Column({ name: 'research_field', type: 'varchar', length: 255, nullable: true })
  researchField?: string;

  @Column({ name: 'collaboration_start_date', type: 'date', nullable: true })
  collaborationStartDate?: Date;

  @Column({ name: 'project_role', type: 'varchar', length: 255, nullable: true })
  projectRole?: string;

  @Index()
  @ManyToOne(() => CPResearchAndDevelopmentEntity, (researchAndDevelopment) => researchAndDevelopment.researchAndDevelopmentResearchInstitutions, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'research_and_development_id' })
  researchAndDevelopment: CPResearchAndDevelopmentEntity;
}
