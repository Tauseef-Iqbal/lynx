import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPResearchAndDevelopmentEntity } from './cp-research-and-development.entity';

@Entity({ name: 'cp_research_and_development_research_papers' })
export class CPResearchAndDevelopmentResearchPapersEntity extends CustomBaseEntity {
  @Column({ name: 'paper_title', type: 'varchar', length: 255, nullable: true })
  paperTitle?: string;

  @Column({ name: 'authors', type: 'text', array: true, nullable: true })
  authors?: string[];

  @Column({ name: 'publication_name', type: 'varchar', length: 255, nullable: true })
  publicationName?: string;

  @Column({ name: 'date_of_publication', type: 'date', nullable: true })
  dateOfPublication: Date;

  @Column({ name: 'DOI_link', type: 'varchar', length: 255, nullable: true })
  DOILink?: string;

  @Column({ name: 'research_field', type: 'varchar', length: 255, nullable: true })
  researchField?: string;

  @Column({ name: 'associated_grant', type: 'varchar', length: 255, nullable: true })
  associatedGrant?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Index()
  @ManyToOne(() => CPResearchAndDevelopmentEntity, (researchAndDevelopment) => researchAndDevelopment.researchAndDevelopmentResearchPapers, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'research_and_development_id' })
  researchAndDevelopment: CPResearchAndDevelopmentEntity;
}
