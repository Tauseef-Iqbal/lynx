import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { GeneratedRevenueRange, CompanyRevenueStream, GeneratedRevenue } from 'src/modules/revenue/enums';
import { Expose, Transform, Type } from 'class-transformer';
import { AddRevenueProjectsAwardedDto } from './revenue-projects-awarded.dto';

class CustomerDetailsDto {
  @ApiPropertyOptional({ description: 'Customer Name', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Country', example: 'USA' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ description: 'Percentage Contribution', example: '70%' })
  @IsString()
  @IsOptional()
  contribution?: string;
}

export class AddRevenueDto {
  @ApiPropertyOptional({ description: 'Growth State', type: [String], example: ['Growth Stage 1', 'Growth Stage 2'] })
  @IsString({ each: true })
  @IsOptional()
  growthState?: string[] | string;

  @ApiPropertyOptional({ description: 'Generated Revenue', example: 'Yes' })
  @IsEnum(GeneratedRevenue)
  @IsOptional()
  @IsString()
  generatedRevenue?: GeneratedRevenue;

  @ApiPropertyOptional({ description: 'Generated Revenue Range', enum: GeneratedRevenueRange })
  @IsEnum(GeneratedRevenueRange)
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.generatedRevenue === GeneratedRevenue.No || obj.generatedRevenue === GeneratedRevenue.NOT_APPLICABLE ? null : value), { toClassOnly: true })
  generatedRevenueRange?: GeneratedRevenueRange;

  @ApiPropertyOptional({ description: 'Generated Revenue Range', type: [AddRevenueProjectsAwardedDto] })
  @Type(() => AddRevenueProjectsAwardedDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  projectsAwarded?: AddRevenueProjectsAwardedDto[];

  @ApiPropertyOptional({ description: 'Five Percent Foreign Revenue', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  fivePercentForeignRevenue?: boolean;

  @ApiPropertyOptional({ description: 'Five Percent Foreign Revenue Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.fivePercentForeignRevenue === false || obj.fivePercentForeignRevenue === 'false' ? null : value), { toClassOnly: true })
  fivePercentForeignRevenueDetails?: string;

  @ApiPropertyOptional({ description: 'Company Revenue Stream', enum: CompanyRevenueStream })
  @IsEnum(CompanyRevenueStream)
  @IsOptional()
  companyRevenueStream?: CompanyRevenueStream;

  @ApiPropertyOptional({ description: 'Customer Details', type: CustomerDetailsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerDetailsDto)
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.companyRevenueStream === CompanyRevenueStream.DIVERSIFIED || obj.companyRevenueStream === CompanyRevenueStream.NOT_APPLICABLE ? null : value), { toClassOnly: true })
  customerDetails?: CustomerDetailsDto;

  @ApiPropertyOptional({ description: 'IRS Tax Filed', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  irsTaxFiled?: boolean;

  @ApiPropertyOptional({ description: 'Financial Backing Investments', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  financialBackingInvestments?: boolean;

  @ApiPropertyOptional({ description: 'Financial Backing Investments Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialBackingInvestments === false || obj.financialBackingInvestments === 'false' ? null : value), { toClassOnly: true })
  financialBackingInvestmentsDetails?: string;

  @ApiPropertyOptional({ description: 'Revenue Sharing Agreements', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  revenueSharingAgreements?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Sharing Agreements Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.revenueSharingAgreements === false || obj.revenueSharingAgreements === 'false' ? null : value), { toClassOnly: true })
  revenueSharingAgreementsDetails?: string;

  @ApiPropertyOptional({ description: 'Revenue Restrictions', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  revenueRestrictions?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Restrictions Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.revenueRestrictions === false || obj.revenueRestrictions === 'false' ? null : value), { toClassOnly: true })
  revenueRestrictionsDetails?: string;

  @ApiPropertyOptional({ description: 'Revenue Growth Plan', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  revenueGrowthPlan?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Growth Plan Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.revenueGrowthPlan === false || obj.revenueGrowthPlan === 'false' ? null : value), { toClassOnly: true })
  revenueGrowthPlanDetails?: string;
}

export class UpdateRevenueDto extends PartialType(AddRevenueDto) {}
