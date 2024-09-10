import { ActiveSecurityClearancesEmployees, EmployeesInvolvedInGovtContracts, TotalEmployees, USEmployeesPercentage, USMilitaryVeteransEmployees } from 'src/modules/personnel/enums';
import { ICompanyFSODetails } from 'src/modules/personnel/interfaces';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_personnel' })
export class CPPersonnelEntity extends CustomBaseEntity {
  @Column({ name: 'total_employees', type: 'enum', enum: TotalEmployees, nullable: true })
  totalEmployees?: string;

  @Column({ name: 'us_citizen_employees_percentage', type: 'varchar', enum: USEmployeesPercentage, nullable: true })
  USCitizenEmployeesPercentage?: string;

  @Column({ name: 'active_security_clearances_employees', type: 'varchar', enum: ActiveSecurityClearancesEmployees, nullable: true })
  activeSecurityClearancesEmployees?: string;

  @Column({ name: 'security_clearances_held_by_employees', type: 'jsonb', array: true, nullable: true })
  securityClearancesHeldByEmployees?: string[];

  @Column({ name: 'employees_involved_in_govt_contracts', type: 'varchar', enum: EmployeesInvolvedInGovtContracts, nullable: true })
  employeesInvolvedInGovtContracts?: string;

  @Column({ name: 'employees_background_checks_govt_contract', type: 'boolean', nullable: true })
  employeesBackgroundChecksGovtContract?: boolean;

  @Column({ name: 'employees_background_checks_govt_contract_details', type: 'text', nullable: true })
  employeesBackgroundChecksGovtContractDetails?: string;

  @Column({ name: 'employees_itar_controlled_projects', type: 'boolean', nullable: true })
  employeesITARControlledProjects?: boolean;

  @Column({ name: 'employees_itar_controlled_projects_details', type: 'text', nullable: true })
  employeesITARControlledProjectsDetails?: string;

  @Column({ name: 'employees_nispom_compliance', type: 'boolean', nullable: true })
  employeesNISPOMCompliance?: boolean;

  @Column({ name: 'employees_nispom_compliance_details', type: 'text', nullable: true })
  employeesNISPOMComplianceDetails?: string;

  @Column({ name: 'foci_designation', type: 'boolean', nullable: true })
  FOCIDesignation?: boolean;

  @Column({ name: 'foci_designation_details', type: 'text', nullable: true })
  FOCIDesignationDetails?: string;

  @Column({ name: 'foci_designation_files', type: 'jsonb', array: true, nullable: true })
  FOCIDesignationFiles?: string[];

  @Column({ name: 'non_us_employees', type: 'boolean', nullable: true })
  NonUSEmployees?: boolean;

  @Column({ name: 'strategic_competitors_related_foreign_ties', type: 'boolean', nullable: true })
  strategicCompetitorsRelatedForeignTies?: boolean;

  @Column({ name: 'strategic_competitors_related_foreign_ties_details', type: 'text', nullable: true })
  strategicCompetitorsRelatedForeignTiesDetails?: string;

  @Column({ name: 'foreign_nationals', type: 'boolean', nullable: true })
  foreignNationals?: boolean;

  @Column({ name: 'foreign_nationals_details', type: 'text', nullable: true })
  foreignNationalsDetails?: string;

  @Column({ name: 'company_fso', type: 'boolean', nullable: true })
  companyFSO?: boolean;

  @Column({ name: 'company_fso_details', type: 'jsonb', nullable: true })
  companyFSODetails?: ICompanyFSODetails;

  @Column({ name: 'employees_involved_in_security_breach', type: 'boolean', nullable: true })
  employeesInvolvedInSecurityBreach?: boolean;

  @Column({ name: 'employees_involved_in_security_breach_details', type: 'text', nullable: true })
  employeesInvolvedInSecurityBreachDetails?: string;

  @Column({ name: 'us_military_veterans_employees', type: 'enum', enum: USMilitaryVeteransEmployees, nullable: true })
  USMilitaryVeteransEmployees?: string;

  @Column({ name: 'diversity_initiatives', type: 'boolean', nullable: true })
  diversityInitiatives?: boolean;

  @Column({ name: 'diversity_initiatives_details', type: 'text', nullable: true })
  diversityInitiativesDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.personnel, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
