import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPResearchAndDevelopmentEntity } from './cp-research-and-development.entity';

@Entity({ name: 'cp_research_and_development_research_funding' })
export class CPResearchAndDevelopmentResearchFundingEntity extends CustomBaseEntity {
  @Column({ name: 'funding_name', type: 'varchar', length: 255, nullable: true })
  fundingName?: string;

  @Column({ name: 'funding_agency', type: 'varchar', length: 255, nullable: true })
  fundingAgency?: string;

  @Column({ name: 'principal_investigators', type: 'text', array: true, nullable: true })
  principalInvestigators?: string[];

  @Column({ name: 'publication_name', type: 'varchar', length: 255, nullable: true })
  publicationName?: string;

  @Column({ name: 'award_amount', type: 'decimal', nullable: true })
  awardAmount?: number;

  @Column({ name: 'funding_start_date', type: 'date', nullable: true })
  fundingStartDate?: Date;

  @Column({ name: 'funding_end_date', type: 'date', nullable: true })
  fundingEndDate?: Date;

  @Column({ name: 'DOI_link', type: 'varchar', length: 255, nullable: true })
  DOILink?: string;

  @Column({ name: 'research_field', type: 'varchar', length: 255, nullable: true })
  researchField?: string;

  @Column({ type: 'text', nullable: true })
  projectDescription?: string;

  @Index()
  @ManyToOne(() => CPResearchAndDevelopmentEntity, (researchAndDevelopment) => researchAndDevelopment.researchAndDevelopmentResearchFunding, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'research_and_development_id' })
  researchAndDevelopment: CPResearchAndDevelopmentEntity;
}
