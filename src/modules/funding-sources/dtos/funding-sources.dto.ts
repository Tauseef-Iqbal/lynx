import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ConditionalDiscardValue } from 'src/shared/decorators';

export class AddFundingSourcesDto {
  @ApiPropertyOptional({
    description: 'Type of funding the company is using',
    example: 'Equity, Debt, Grants',
  })
  @IsString()
  @IsOptional()
  fundingType?: string;

  @ApiPropertyOptional({
    description: 'Details about the funding sources',
    type: [String],
    example: ['Venture Capital', 'Angel Investors'],
  })
  @ValidateIf((o) => Array.isArray(o.fundingDetails))
  @IsString({ each: true })
  @IsOptional()
  fundingDetails?: string[] | string;

  @ApiPropertyOptional({
    description: 'Underwriters for the funding',
    example: 'Goldman Sachs, Morgan Stanley',
  })
  @IsString()
  @IsOptional()
  underWriters?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company is raising equity',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  raiseEquity?: boolean;

  @ApiPropertyOptional({
    description: 'Stages of equity raising',
    type: [String],
    example: ['Seed', 'Series A', 'Series B'],
  })
  @ValidateIf((o) => Array.isArray(o.equityStages))
  @IsString({ each: true })
  @IsOptional()
  @ConditionalDiscardValue('raiseEquity', (value) => value === true)
  equityStages?: string[] | string;

  @ApiPropertyOptional({
    description: 'Indicates if the awardee has venture capital backing',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  awardeeHasVentureCapital?: boolean;

  @ApiPropertyOptional({
    description: 'Details about foreign affiliations',
    example: 'Partnership with foreign entities',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('awardeeHasVentureCapital', (value) => value === true)
  foreignAffiliation?: string;

  @ApiPropertyOptional({
    description: 'Details about the investors',
    type: [String],
    example: ['Investor A', 'Investor B'],
  })
  @ValidateIf((o) => Array.isArray(o.investorDetails))
  @IsString({ each: true })
  @IsOptional()
  investorDetails?: string[] | string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has foreign funding',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  foreignFunding?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the foreign funding',
    type: [String],
    example: ['Foreign Investor A', 'Foreign Investor B'],
  })
  @ValidateIf((o) => Array.isArray(o.foreignFundingDetails))
  @IsString({ each: true })
  @IsOptional()
  @ConditionalDiscardValue('foreignFunding', (value) => value === true)
  foreignFundingDetails?: string[] | string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has government-backed funding',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  governmentBackedFunding?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the government-backed funding',
    example: 'Small Business Administration loans, Grants',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('governmentBackedFunding', (value) => value === true)
  governmentBackedFundingDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there are any funding restrictions',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  fundingRestrictions?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the funding restrictions',
    example: 'Use of funds restricted to specific activities',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('fundingRestrictions', (value) => value === true)
  fundingRestrictionsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has additional funding strategies',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  additionalFundingStrategy?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the additional funding strategies',
    example: 'Crowdfunding, Venture Debt',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('additionalFundingStrategy', (value) => value === true)
  additionalFundingStrategyDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has outstanding debts',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  outstandingDebts?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the outstanding debts',
    example: 'Bank loans, Bonds',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('outstandingDebts', (value) => value === true)
  outstandingDebtsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses funding instruments',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  fundingInstruments?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the funding instruments',
    example: 'Convertible Notes, SAFE (Simple Agreement for Future Equity)',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('fundingInstruments', (value) => value === true)
  fundingInstrumentsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has financial audits',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  hasFinancialAudits?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the financial audits',
    example: 'Annual audits conducted by PwC',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('hasFinancialAudits', (value) => value === true)
  auditDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has strategic partnerships',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  strategicPartnership?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the strategic partnerships',
    example: 'Partnership with Company X for joint R&D',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('strategicPartnership', (value) => value === true)
  strategicPartnershipDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has foreign financial interests',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  foreignFinancialInterest?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the foreign financial interests',
    example: 'Equity in a foreign subsidiary',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('foreignFinancialInterest', (value) => value === true)
  foreignFinancialInterestDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has a contingency financing plan',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  contingencyFinancingPlan?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the contingency financing plan',
    example: 'Access to a line of credit in case of emergencies',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('contingencyFinancingPlan', (value) => value === true)
  contingencyFinancingPlanDetails?: string;
}

export class UpdateFundingSourcesDto extends PartialType(AddFundingSourcesDto) {}
