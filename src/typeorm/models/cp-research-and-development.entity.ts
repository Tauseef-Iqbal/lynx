import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';
import { IGovtGrantsForResearchDetails, IResearchAndDevelopmentTeamDetails } from 'src/modules/research-and-development/interfaces';
import { CPResearchAndDevelopmentInnovationsEntity } from './cp-research-and-development-innovations.entity';
import { CPResearchAndDevelopmentDefencePatentsEntity } from './cp-research-and-development-defence-patents.entity';
import { CPResearchAndDevelopmentResearchPapersEntity } from './cp-research-and-development-research-papers.entity';
import { CPResearchAndDevelopmentResearchFundingEntity } from './cp-research-and-development-research-funding.entity';
import { CPResearchAndDevelopmentResearchInstitutionsEntity } from './cp-research-and-development-research-institutions.entity';

@Entity({ name: 'cp_research_and_development' })
export class CPResearchAndDevelopmentEntity extends CustomBaseEntity {
  @Column({ name: 'research_and_development_team', type: 'boolean', nullable: true })
  researchAndDevelopmentTeam?: boolean;

  @Column({ name: 'research_and_development_team_details', type: 'jsonb', nullable: true })
  researchAndDevelopmentTeamDetails?: IResearchAndDevelopmentTeamDetails;

  @Column({ name: 'projects_offered_to_govt', type: 'boolean', nullable: true })
  projectsOfferedToGovt?: boolean;

  @Column({ name: 'projects_offered_to_govt_details', type: 'text', nullable: true })
  projectsOfferedToGovtDetails?: string;

  @Column({ name: 'reseach_papers_10_years', type: 'boolean', nullable: true })
  reseachPapers10Years?: boolean;

  @Column({ name: 'reseach_funding_10_years', type: 'boolean', nullable: true })
  reseachFunding10Years?: boolean;

  @Column({ name: 'reseach_institutions_collaboration', type: 'boolean', nullable: true })
  reseachInstitutionsCollaboration?: boolean;

  @Column({ name: 'govt_grants_for_research', type: 'boolean', nullable: true })
  govtGrantsForResearch?: boolean;

  @Column({ name: 'interested_in_govt_grants_for_research', type: 'boolean', nullable: true })
  interestedInGovtGrantsForResearch?: boolean;

  @Column({ name: 'govt_grants_for_research_details', type: 'jsonb', nullable: true })
  govtGrantsForResearchDetails?: IGovtGrantsForResearchDetails;

  @Column({ name: 'controlled_technology_activities', type: 'boolean', nullable: true })
  controlledTechnologyActivities?: boolean;

  @Column({ name: 'controlled_technology_activities_details', type: 'text', nullable: true })
  controlledTechnologyActivitiesDetails?: string;

  @Column({ name: 'joint_ventures', type: 'boolean', nullable: true })
  jointVentures?: boolean;

  @Column({ name: 'joint_ventures_details', type: 'text', nullable: true })
  jointVenturesDetails?: string;

  @Column({ name: 'intellectual_property_protection', type: 'boolean', nullable: true })
  intellectualPropertyProtection?: boolean;

  @Column({ name: 'intellectual_property_protection_details', type: 'text', nullable: true })
  intellectualPropertyProtectionDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.researchAndDevelopment, {
    nullable: false,
    // cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @OneToMany(() => CPResearchAndDevelopmentInnovationsEntity, (researchAndDevelopmentInnovations) => researchAndDevelopmentInnovations.researchAndDevelopment, {
    cascade: ['insert', 'update'],
  })
  researchAndDevelopmentInnovations: CPResearchAndDevelopmentInnovationsEntity[];

  @OneToMany(() => CPResearchAndDevelopmentDefencePatentsEntity, (researchAndDevelopmentDefencePatents) => researchAndDevelopmentDefencePatents.researchAndDevelopment, {
    cascade: ['insert', 'update'],
  })
  researchAndDevelopmentDefencePatents: CPResearchAndDevelopmentDefencePatentsEntity[];

  @OneToMany(() => CPResearchAndDevelopmentResearchPapersEntity, (researchAndDevelopmentResearchPapers) => researchAndDevelopmentResearchPapers.researchAndDevelopment, {
    cascade: ['insert', 'update'],
  })
  researchAndDevelopmentResearchPapers: CPResearchAndDevelopmentResearchPapersEntity[];

  @OneToMany(() => CPResearchAndDevelopmentResearchFundingEntity, (researchAndDevelopmentResearchFunding) => researchAndDevelopmentResearchFunding.researchAndDevelopment, {
    cascade: ['insert', 'update'],
  })
  researchAndDevelopmentResearchFunding: CPResearchAndDevelopmentResearchFundingEntity[];

  @OneToMany(() => CPResearchAndDevelopmentResearchInstitutionsEntity, (researchAndDevelopmentResearchInstitutions) => researchAndDevelopmentResearchInstitutions.researchAndDevelopment, {
    cascade: ['insert', 'update'],
  })
  researchAndDevelopmentResearchInstitutions: CPResearchAndDevelopmentResearchInstitutionsEntity[];
}
