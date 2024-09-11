import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFinancialHealthSectionDto {
  @ApiPropertyOptional({ description: 'Financial Statements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  financialStatements?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.financialStatements === false || obj.financialStatements === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];

    return value;
  })
  financialStatementsFiles?: string[];

  @ApiPropertyOptional({ description: 'Financial Elements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  financialElements?: boolean;

  @ApiPropertyOptional({ description: 'Financial Elements Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialElements === false || obj.financialElements === 'false' ? null : value), { toClassOnly: true })
  financialElementsDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Statements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  businessPlans?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.businessPlans === false || obj.businessPlans === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];

    return value;
  })
  businessPlansFiles?: string[];

  @ApiPropertyOptional({ description: 'Bankruptcy Filed' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  bankruptcyFiled?: boolean;

  @ApiPropertyOptional({ description: 'Bankruptcy Filed Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.bankruptcyFiled === false || obj.bankruptcyFiled === 'false' ? null : value), { toClassOnly: true })
  bankruptcyFiledDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Obligations' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  financialObligations?: boolean;

  @ApiPropertyOptional({ description: 'Financial Obligations Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialObligations === false || obj.financialObligations === 'false' ? null : value), { toClassOnly: true })
  financialObligationsDetails?: string;

  @ApiPropertyOptional({ description: 'Good Standing Certificates Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  goodStandingCertificates?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.goodStandingCertificates === false || obj.goodStandingCertificates === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];

    return value;
  })
  goodStandingCertificatesFiles?: string[];

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  pendingLawsuitDefendant?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.pendingLawsuitDefendant === false || obj.pendingLawsuitDefendant === 'false' ? null : value), { toClassOnly: true })
  pendingLawsuitDefendantDetails?: string;

  @ApiPropertyOptional({ description: 'Foreign Person Obligations' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  foreignPersonObligations?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Person Obligations Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignPersonObligations === false || obj.foreignPersonObligations === 'false' ? null : value), { toClassOnly: true })
  foreignPersonObligationsDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Disclosure Statements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  financialDisclosureStatements?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.financialDisclosureStatements === false || obj.financialDisclosureStatements === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];

    return value;
  })
  financialDisclosureStatementsFiles?: string[];

  @ApiPropertyOptional({ description: 'Financial Changes' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  financialChanges?: boolean;

  @ApiPropertyOptional({ description: 'Financial Changes Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialChanges === false || obj.financialChanges === 'false' ? null : value), { toClassOnly: true })
  financialChangesDetails?: string;

  @ApiPropertyOptional({ description: 'Contingency Financing Plans Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  contingencyFinancingPlans?: boolean;

  @ApiPropertyOptional({ description: 'Contingency Financing Plans Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.contingencyFinancingPlans === false || obj.contingencyFinancingPlans === 'false' ? null : value), { toClassOnly: true })
  contingencyFinancingPlansDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Covenants' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  financialConvenants?: boolean;

  @ApiPropertyOptional({ description: 'Financial Covenants Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialConvenants === false || obj.financialConvenants === 'false' ? null : value), { toClassOnly: true })
  financialConvenantsDetails?: string;

  @ApiPropertyOptional({ description: 'Reserve Fundings' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  reserveFundings?: boolean;

  @ApiPropertyOptional({ description: 'Reserve Fundings Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.reserveFundings === false || obj.reserveFundings === 'false' ? null : value), { toClassOnly: true })
  reserveFundingsDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Audits Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  financialAudits?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.financialAudits === false || obj.financialAudits === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];

    return value;
  })
  financialAuditsFiles?: string[];

  @ApiPropertyOptional({ description: 'Ownership/Management Financial Changes' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  ownershipManagementFinancialChanges?: boolean;

  @ApiPropertyOptional({ description: 'Ownership/Management Financial Changes Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.ownershipManagementFinancialChanges === false || obj.ownershipManagementFinancialChanges === 'false' ? null : value), { toClassOnly: true })
  ownershipManagementFinancialChangesDetails?: string;
}

export class UpdateFinancialHealthSectionDto extends PartialType(CreateFinancialHealthSectionDto) {}
