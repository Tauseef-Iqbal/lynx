import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ConditionalDiscardValue } from 'src/shared/decorators';

export class CreateFinancialHealthSectionDto {
  @ApiPropertyOptional({ description: 'Financial Statements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  financialStatements?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalDiscardValue('financialStatements', (value) => value === true)
  financialStatementsFiles?: any[];

  @ApiPropertyOptional({ description: 'Financial Elements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  financialElements?: boolean;

  @ApiPropertyOptional({ description: 'Financial Elements Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('financialElements', (value) => value === true)
  financialElementsDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Statements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  businessPlans?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalDiscardValue('businessPlans', (value) => value === true)
  businessPlansFiles?: any[];

  @ApiPropertyOptional({ description: 'Bankruptcy Filed' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  bankruptcyFiled?: boolean;

  @ApiPropertyOptional({ description: 'Bankruptcy Filed Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('bankruptcyFiled', (value) => value === true)
  bankruptcyFiledDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Obligations' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  financialObligations?: boolean;

  @ApiPropertyOptional({ description: 'Financial Obligations Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('financialObligations', (value) => value === true)
  financialObligationsDetails?: string;

  @ApiPropertyOptional({ description: 'Good Standing Certificates Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  goodStandingCertificates?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalDiscardValue('goodStandingCertificates', (value) => value === true)
  goodStandingCertificatesFiles?: any[];

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  pendingLawsuitDefendant?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('pendingLawsuitDefendant', (value) => value === true)
  pendingLawsuitDefendantDetails?: string;

  @ApiPropertyOptional({ description: 'Foreign Person Obligations' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  foreignPersonObligations?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Person Obligations Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('foreignPersonObligations', (value) => value === true)
  foreignPersonObligationsDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Disclosure Statements Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  financialDisclosureStatements?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalDiscardValue('financialDisclosureStatements', (value) => value === true)
  financialDisclosureStatementsFiles?: any[];

  @ApiPropertyOptional({ description: 'Financial Changes' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  financialChanges?: boolean;

  @ApiPropertyOptional({ description: 'Financial Changes Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('financialChanges', (value) => value === true)
  financialChangesDetails?: string;

  @ApiPropertyOptional({ description: 'Contingency Financing Plans Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  contingencyFinancingPlans?: boolean;

  @ApiPropertyOptional({ description: 'Contingency Financing Plans Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('contingencyFinancingPlans', (value) => value === true)
  contingencyFinancingPlansDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Covenants' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  financialConvenants?: boolean;

  @ApiPropertyOptional({ description: 'Financial Covenants Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('financialConvenants', (value) => value === true)
  financialConvenantsDetails?: string;

  @ApiPropertyOptional({ description: 'Reserve Fundings' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  reserveFundings?: boolean;

  @ApiPropertyOptional({ description: 'Reserve Fundings Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('reserveFundings', (value) => value === true)
  reserveFundingsDetails?: string;

  @ApiPropertyOptional({ description: 'Financial Audits Available' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  financialAudits?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalDiscardValue('financialAudits', (value) => value === true)
  financialAuditsFiles?: any[];

  @ApiPropertyOptional({ description: 'Ownership/Management Financial Changes' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  ownershipManagementFinancialChanges?: boolean;

  @ApiPropertyOptional({ description: 'Ownership/Management Financial Changes Details' })
  @IsOptional()
  @IsString()
  @ConditionalDiscardValue('ownershipManagementFinancialChanges', (value) => value === true)
  ownershipManagementFinancialChangesDetails?: string;
}

export class UpdateFinancialHealthSectionDto extends PartialType(CreateFinancialHealthSectionDto) {}
