import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { GeneratedRevenueRange, CompanyRevenueStream } from 'src/modules/revenue/enums';
import { Type } from 'class-transformer';
import { AddRevenueProjectsAwardedDto } from './revenue-projects-awarded.dto';
import { ConditionalDiscardValue } from 'src/shared/decorators';

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
  @IsString()
  @IsOptional()
  generatedRevenue?: string;

  @ApiPropertyOptional({ description: 'Generated Revenue Range', type: [AddRevenueProjectsAwardedDto] })
  @Type(() => AddRevenueProjectsAwardedDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  projectsAwarded?: AddRevenueProjectsAwardedDto[];

  @ApiPropertyOptional({ description: 'Generated Revenue Range', enum: GeneratedRevenueRange })
  @IsEnum(GeneratedRevenueRange)
  @IsOptional()
  generatedRevenueRange?: GeneratedRevenueRange;

  @ApiPropertyOptional({ description: 'Five Percent Foreign Revenue', example: true })
  @IsBoolean()
  @IsOptional()
  fivePercentForeignRevenue?: boolean;

  @ApiPropertyOptional({ description: 'Five Percent Foreign Revenue Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('fivePercentForeignRevenue', (value) => value === true)
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
  customerDetails?: CustomerDetailsDto;

  @ApiPropertyOptional({ description: 'IRS Tax Filed', example: true })
  @IsBoolean()
  @IsOptional()
  irsTaxFiled?: boolean;

  @ApiPropertyOptional({ description: 'Financial Backing Investments', example: true })
  @IsBoolean()
  @IsOptional()
  financialBackingInvestments?: boolean;

  @ApiPropertyOptional({ description: 'Financial Backing Investments Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('financialBackingInvestments', (value) => value === true)
  financialBackingInvestmentsDetails?: string;

  @ApiPropertyOptional({ description: 'Revenue Sharing Agreements', example: true })
  @IsBoolean()
  @IsOptional()
  revenueSharingAgreements?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Sharing Agreements Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('revenueSharingAgreements', (value) => value === true)
  revenueSharingAgreementsDetails?: string;

  @ApiPropertyOptional({ description: 'Revenue Restrictions', example: true })
  @IsBoolean()
  @IsOptional()
  revenueRestrictions?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Restrictions Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('revenueRestrictions', (value) => value === true)
  revenueRestrictionsDetails?: string;

  @ApiPropertyOptional({ description: 'Revenue Growth Plan', example: true })
  @IsBoolean()
  @IsOptional()
  revenueGrowthPlan?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Growth Plan Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('revenueGrowthPlan', (value) => value === true)
  revenueGrowthPlanDetails?: string;
}

export class UpdateRevenueDto extends PartialType(AddRevenueDto) {}
