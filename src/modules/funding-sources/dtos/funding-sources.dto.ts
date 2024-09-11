import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IInvestorDetails } from '../interfaces';
import { AddForeignFundingForeignAffiliationDto } from './foreign-funding-foreign-affiliation.dto';
import { Expose, Transform, Type } from 'class-transformer';
import { ForeignAffiliation } from '../enums';

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
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
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
  @Expose()
  @Transform(({ obj, value }) => (obj.raiseEquity === false || obj.raiseEquity === 'false' ? null : value), { toClassOnly: true })
  equityStages?: string[];

  @ApiPropertyOptional({
    description: 'Indicates if the awardee has venture capital backing',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  awardeeHasVentureCapital?: boolean;

  @ApiPropertyOptional({
    description: 'Details about foreign affiliations',
    example: 'Partnership with foreign entities',
  })
  @IsString()
  @IsOptional()
  @IsEnum(ForeignAffiliation)
  @Expose()
  @Transform(({ obj, value }) => (obj.awardeeHasVentureCapital === false || obj.awardeeHasVentureCapital === 'false' ? null : value), { toClassOnly: true })
  foreignAffiliation?: ForeignAffiliation;

  @ApiPropertyOptional({
    description: 'Details about the investors',
    type: [String],
    example: ['Investor A', 'Investor B'],
  })
  @IsObject()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignAffiliation === ForeignAffiliation.NO || obj.foreignAffiliation === ForeignAffiliation.UNABLE_TO_DETERMINE ? null : value), { toClassOnly: true })
  investorDetails?: IInvestorDetails;

  @ApiPropertyOptional({
    description: 'Indicates if the company has foreign funding',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  foreignFunding?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Funding Foreign Affiliation', type: [AddForeignFundingForeignAffiliationDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddForeignFundingForeignAffiliationDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignFunding === false || obj.foreignFunding === 'false' ? null : value), { toClassOnly: true })
  fundingSourcesForeignAffiliation?: AddForeignFundingForeignAffiliationDto[];

  @ApiPropertyOptional({
    description: 'Indicates if the company has government-backed funding',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  governmentBackedFunding?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the government-backed funding',
    example: 'Small Business Administration loans, Grants',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.governmentBackedFunding === false || obj.governmentBackedFunding === 'false' ? null : value), { toClassOnly: true })
  governmentBackedFundingDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there are any funding restrictions',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  fundingRestrictions?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the funding restrictions',
    example: 'Use of funds restricted to specific activities',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.fundingRestrictions === false || obj.fundingRestrictions === 'false' ? null : value), { toClassOnly: true })
  fundingRestrictionsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has additional funding strategies',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  additionalFundingStrategy?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the additional funding strategies',
    example: 'Crowdfunding, Venture Debt',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.additionalFundingStrategy === false || obj.additionalFundingStrategy === 'false' ? null : value), { toClassOnly: true })
  additionalFundingStrategyDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has outstanding debts',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  outstandingDebts?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the outstanding debts',
    example: 'Bank loans, Bonds',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.outstandingDebts === false || obj.outstandingDebts === 'false' ? null : value), { toClassOnly: true })
  outstandingDebtsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses funding instruments',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  fundingInstruments?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the funding instruments',
    example: 'Convertible Notes, SAFE (Simple Agreement for Future Equity)',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.fundingInstruments === false || obj.fundingInstruments === 'false' ? null : value), { toClassOnly: true })
  fundingInstrumentsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has financial audits',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  financialAudits?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the financial audits',
    example: 'Annual audits conducted by PwC',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialAudits === false || obj.financialAudits === 'false' ? null : value), { toClassOnly: true })
  auditDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has strategic partnerships',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  strategicPartnership?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the strategic partnerships',
    example: 'Partnership with Company X for joint R&D',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.strategicPartnership === false || obj.strategicPartnership === 'false' ? null : value), { toClassOnly: true })
  strategicPartnershipDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has foreign financial interests',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  foreignFinancialInterest?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the foreign financial interests',
    example: 'Equity in a foreign subsidiary',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignFinancialInterest === false || obj.foreignFinancialInterest === 'false' ? null : value), { toClassOnly: true })
  foreignFinancialInterestDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has a contingency financing plan',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  contingencyFinancingPlan?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the contingency financing plan',
    example: 'Access to a line of credit in case of emergencies',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.contingencyFinancingPlan === false || obj.contingencyFinancingPlan === 'false' ? null : value), { toClassOnly: true })
  contingencyFinancingPlanDetails?: string;
}

export class UpdateFundingSourcesDto extends PartialType(AddFundingSourcesDto) {}
