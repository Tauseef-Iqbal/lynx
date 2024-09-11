import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { ActiveSecurityClearancesEmployees, EmployeesInvolvedInGovtContracts, TotalEmployees, USEmployeesPercentage, USMilitaryVeteransEmployees } from 'src/modules/personnel/enums';
import { ICompanyFSODetails } from 'src/modules/personnel/interfaces';

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
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  employeesBackgroundChecksGovtContract?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees background checks for government contracts' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.employeesBackgroundChecksGovtContract === false || obj.employeesBackgroundChecksGovtContract === 'false' ? null : value), { toClassOnly: true })
  employeesBackgroundChecksGovtContractDetails?: string;

  @ApiPropertyOptional({ description: 'Employees involved in ITAR controlled projects' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  employeesITARControlledProjects?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees involved in ITAR controlled projects' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.employeesITARControlledProjects === false || obj.employeesITARControlledProjects === 'false' ? null : value), { toClassOnly: true })
  employeesITARControlledProjectsDetails?: string;

  @ApiPropertyOptional({ description: 'Employees in NISPOM compliance' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  employeesNISPOMCompliance?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees in NISPOM compliance' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.employeesNISPOMCompliance === false || obj.employeesNISPOMCompliance === 'false' ? null : value), { toClassOnly: true })
  employeesNISPOMComplianceDetails?: string;

  @ApiPropertyOptional({ description: 'FOCI designation status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  FOCIDesignation?: boolean;

  @ApiPropertyOptional({ description: 'Details of FOCI designation' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.FOCIDesignation === false || obj.FOCIDesignation === 'false' ? null : value), { toClassOnly: true })
  FOCIDesignationDetails?: string;

  @ApiPropertyOptional({ type: [String], description: 'Files related to FOCI designation' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.FOCIDesignation === false || obj.FOCIDesignation === 'false' ? null : value), { toClassOnly: true })
  FOCIDesignationFiles?: string[];

  @ApiPropertyOptional({ description: 'Presence of non-US employees' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  NonUSEmployees?: boolean;

  @ApiPropertyOptional({ description: 'Presence of strategic competitors related foreign ties' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  strategicCompetitorsRelatedForeignTies?: boolean;

  @ApiPropertyOptional({ description: 'Details of strategic competitors related foreign ties' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.strategicCompetitorsRelatedForeignTies === false || obj.strategicCompetitorsRelatedForeignTies === 'false' ? null : value), { toClassOnly: true })
  strategicCompetitorsRelatedForeignTiesDetails?: string;

  @ApiPropertyOptional({ description: 'Presence of foreign nationals' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  foreignNationals?: boolean;

  @ApiPropertyOptional({ description: 'Details of foreign nationals' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignNationals === false || obj.foreignNationals === 'false' ? null : value), { toClassOnly: true })
  foreignNationalsDetails?: string;

  @ApiPropertyOptional({ description: 'Presence of a company FSO' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  companyFSO?: boolean;

  @ApiPropertyOptional({ type: Object, description: 'Details of company FSO' })
  @IsOptional()
  @ValidateNested()
  @Type(() => CompanyFSODetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.companyFSO === false || obj.companyFSO === 'false' ? null : value), { toClassOnly: true })
  companyFSODetails?: CompanyFSODetailsDto;

  @ApiPropertyOptional({ description: 'Employees involved in a security breach' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  employeesInvolvedInSecurityBreach?: boolean;

  @ApiPropertyOptional({ description: 'Details of employees involved in a security breach' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.employeesInvolvedInSecurityBreach === false || obj.employeesInvolvedInSecurityBreach === 'false' ? null : value), { toClassOnly: true })
  employeesInvolvedInSecurityBreachDetails?: string;

  @ApiPropertyOptional({ enum: USMilitaryVeteransEmployees, description: 'US military veterans among employees' })
  @IsOptional()
  @IsEnum(USMilitaryVeteransEmployees)
  USMilitaryVeteransEmployees?: USMilitaryVeteransEmployees;

  @ApiPropertyOptional({ description: 'Presence of diversity initiatives' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  diversityInitiatives?: boolean;

  @ApiPropertyOptional({ description: 'Details of diversity initiatives' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.diversityInitiatives === false || obj.diversityInitiatives === 'false' ? null : value), { toClassOnly: true })
  diversityInitiativesDetails?: string;
}

export class UpdatePersonnelDto extends PartialType(AddPersonnelDto) {}
