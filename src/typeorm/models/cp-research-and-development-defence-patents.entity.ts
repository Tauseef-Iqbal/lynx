import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';
import { CPResearchAndDevelopmentEntity } from './cp-research-and-development.entity';

@Entity({ name: 'cp_research_and_development_defence_patents' })
export class CPResearchAndDevelopmentDefencePatentsEntity extends CustomBaseEntity {
  @Column({ name: 'patent_name', type: 'varchar', length: 255, nullable: true })
  patentName?: string;

  @Column({ name: 'patent_number', type: 'varchar', length: 255, nullable: true })
  patentNumber?: string;

  @Column({ name: 'patent_countries', type: 'text', array: true, nullable: true })
  patentCountries?: string[];

  @Column({ name: 'patentee_names', type: 'text', array: true, nullable: true })
  patenteeNames?: string[];

  @Column({ name: 'date_of_grant', type: 'date', nullable: true })
  dateOfGrant: Date;

  @Column({ name: 'date_of_expiration', type: 'date', nullable: true })
  dateOfExpiration: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Index()
  @ManyToOne(() => CPResearchAndDevelopmentEntity, (researchAndDevelopment) => researchAndDevelopment.researchAndDevelopmentDefencePatents, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'research_and_development_id' })
  researchAndDevelopment: CPResearchAndDevelopmentEntity;
}
