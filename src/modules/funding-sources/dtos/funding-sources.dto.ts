import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ConditionalValue } from 'src/shared/validators';
import { IInvestorDetails } from '../interfaces';
import { AddForeignFundingForeignAffiliationDto } from './foreign-funding-foreign-affiliation.dto';
import { Type } from 'class-transformer';

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
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fundingDetails?: string[];

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
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ConditionalValue('raiseEquity', (value) => value === true)
  equityStages?: string[];

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
  @ConditionalValue('awardeeHasVentureCapital', (value) => value === true)
  foreignAffiliation?: string;

  @ApiPropertyOptional({
    description: 'Details about the investors',
    type: [String],
    example: ['Investor A', 'Investor B'],
  })
  @IsObject()
  @IsOptional()
  investorDetails?: IInvestorDetails;

  @ApiPropertyOptional({
    description: 'Indicates if the company has foreign funding',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  foreignFunding?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Funding Foreign Affiliation', type: [AddForeignFundingForeignAffiliationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddForeignFundingForeignAffiliationDto)
  fundingSourcesForeignAffiliation?: AddForeignFundingForeignAffiliationDto[];

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
  @ConditionalValue('governmentBackedFunding', (value) => value === true)
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
  @ConditionalValue('fundingRestrictions', (value) => value === true)
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
  @ConditionalValue('additionalFundingStrategy', (value) => value === true)
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
  @ConditionalValue('outstandingDebts', (value) => value === true)
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
  @ConditionalValue('fundingInstruments', (value) => value === true)
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
  @ConditionalValue('hasFinancialAudits', (value) => value === true)
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
  @ConditionalValue('strategicPartnership', (value) => value === true)
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
  @ConditionalValue('foreignFinancialInterest', (value) => value === true)
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
  @ConditionalValue('contingencyFinancingPlan', (value) => value === true)
  contingencyFinancingPlanDetails?: string;
}

export class UpdateFundingSourcesDto extends PartialType(AddFundingSourcesDto) {}
