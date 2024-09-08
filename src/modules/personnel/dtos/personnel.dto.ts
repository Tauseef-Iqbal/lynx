import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ActiveSecurityClearancesEmployees, EmployeesInvolvedInGovtContracts, TotalEmployees, USEmployeesPercentage, USMilitaryVeteransEmployees } from 'src/modules/personnel/enums';
import { ICompanyFSODetails } from 'src/modules/personnel/interfaces';
import { ConditionalValue } from 'src/shared/validators';

export class CompanyFSODetailsDto implements ICompanyFSODetails {
  @ApiPropertyOptional({ description: 'The name of the primary follow-up contact for cybersecurity matters.' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'The email address of the primary follow-up contact.' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'The phone number of the primary follow-up contact.' })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class AddPersonnelDto {
  @ApiPropertyOptional({ enum: TotalEmployees, description: 'Total employees' })
  @IsOptional()
  @IsEnum(TotalEmployees)
  totalEmployees?: string;

  @ApiPropertyOptional({ enum: USEmployeesPercentage, description: 'US Citizen employees percentage' })
  @IsOptional()
  @IsEnum(USEmployeesPercentage)
  USCitizenEmployeesPercentage?: USEmployeesPercentage;

  @ApiPropertyOptional({ enum: ActiveSecurityClearancesEmployees, description: 'Active security clearances employees' })
  @IsOptional()
  @IsEnum(ActiveSecurityClearancesEmployees)
  activeSecurityClearancesEmployees?: ActiveSecurityClearancesEmployees;

  @ApiPropertyOptional({ type: [String], description: 'Security clearances held by employees' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  securityClearancesHeldByEmployees?: string[];

  @ApiPropertyOptional({ enum: EmployeesInvolvedInGovtContracts, description: 'Employees involved in government contracts' })
  @IsOptional()
  @IsEnum(EmployeesInvolvedInGovtContracts)
  employeesInvolvedInGovtContracts?: EmployeesInvolvedInGovtContracts;

  @ApiPropertyOptional({ description: 'Employees background checks for government contracts' })
  @IsOptional()
  @IsBoolean()
  employeesBackgroundChecksGovtContract?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees background checks for government contracts' })
  @IsOptional()
  @IsString()
  @ConditionalValue('employeesBackgroundChecksGovtContract', (value) => value === true)
  employeesBackgroundChecksGovtContractDetails?: string;

  @ApiPropertyOptional({ description: 'Employees involved in ITAR controlled projects' })
  @IsOptional()
  @IsBoolean()
  employeesITARControlledProjects?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees involved in ITAR controlled projects' })
  @IsOptional()
  @IsString()
  @ConditionalValue('employeesITARControlledProjects', (value) => value === true)
  employeesITARControlledProjectsDetails?: string;

  @ApiPropertyOptional({ description: 'Employees in NISPOM compliance' })
  @IsOptional()
  @IsBoolean()
  employeesNISPOMCompliance?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees in NISPOM compliance' })
  @IsOptional()
  @IsString()
  @ConditionalValue('employeesNISPOMCompliance', (value) => value === true)
  employeesNISPOMComplianceDetails?: string;

  @ApiPropertyOptional({ description: 'FOCI designation status' })
  @IsOptional()
  @IsBoolean()
  FOCIDesignation?: boolean;

  @ApiPropertyOptional({ description: 'Details of FOCI designation' })
  @IsOptional()
  @IsString()
  @ConditionalValue('FOCIDesignation', (value) => value === true)
  FOCIDesignationDetails?: string;

  @ApiPropertyOptional({ type: [String], description: 'Files related to FOCI designation' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalValue('FOCIDesignation', (value) => value === true)
  FOCIDesignationFiles?: string[];

  @ApiPropertyOptional({ description: 'Presence of non-US employees' })
  @IsOptional()
  @IsBoolean()
  NonUSEmployees?: boolean;

  @ApiPropertyOptional({ description: 'Presence of strategic competitors related foreign ties' })
  @IsOptional()
  @IsBoolean()
  strategicCompetitorsRelatedForeignTies?: boolean;

  @ApiPropertyOptional({ description: 'Details of strategic competitors related foreign ties' })
  @IsOptional()
  @IsString()
  @ConditionalValue('strategicCompetitorsRelatedForeignTies', (value) => value === true)
  strategicCompetitorsRelatedForeignTiesDetails?: string;

  @ApiPropertyOptional({ description: 'Presence of foreign nationals' })
  @IsOptional()
  @IsBoolean()
  foreignNationals?: boolean;

  @ApiPropertyOptional({ description: 'Details of foreign nationals' })
  @IsOptional()
  @IsString()
  @ConditionalValue('foreignNationals', (value) => value === true)
  foreignNationalsDetails?: string;

  @ApiPropertyOptional({ description: 'Presence of a company FSO' })
  @IsOptional()
  @IsBoolean()
  companyFSO?: boolean;

  @ApiPropertyOptional({ type: Object, description: 'Details of company FSO' })
  @IsOptional()
  @ValidateNested()
  @Type(() => CompanyFSODetailsDto)
  @ConditionalValue('companyFSO', (value) => value === true)
  companyFSODetails?: CompanyFSODetailsDto;

  @ApiPropertyOptional({ description: 'Employees involved in a security breach' })
  @IsOptional()
  @IsBoolean()
  employeesInvolvedInSecurityBreach?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees involved in a security breach' })
  @IsOptional()
  @IsString()
  @ConditionalValue('employeesInvolvedInSecurityBreach', (value) => value === true)
  employeesInvolvedInSecurityBreachDetails?: string;

  @ApiPropertyOptional({ enum: USMilitaryVeteransEmployees, description: 'US military veterans among employees' })
  @IsOptional()
  @IsEnum(USMilitaryVeteransEmployees)
  USMilitaryVeteransEmployees?: USMilitaryVeteransEmployees;

  @ApiPropertyOptional({ description: 'Presence of diversity initiatives' })
  @IsOptional()
  @IsBoolean()
  diversityInitiatives?: boolean;

  @ApiPropertyOptional({ description: 'Details of diversity initiatives' })
  @IsOptional()
  @IsString()
  @ConditionalValue('diversityInitiatives', (value) => value === true)
  diversityInitiativesDetails?: string;
}

export class UpdatePersonnelDto extends PartialType(AddPersonnelDto) {}
