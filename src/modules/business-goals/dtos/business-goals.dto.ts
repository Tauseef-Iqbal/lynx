import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { BrandingAndMarketingEnum, CollaborationEnum, GrowthAndExpansionEnum, OperationsEnum, ProcurementEnum } from '../enums/business-goals.enum';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class AddBusinessGoalsDto {
  @ApiPropertyOptional({ enum: GrowthAndExpansionEnum, isArray: true, description: 'Growth and Expansion Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(GrowthAndExpansionEnum, { each: true })
  growthAndExpansion?: GrowthAndExpansionEnum[];

  @ApiPropertyOptional({ enum: CollaborationEnum, isArray: true, description: 'Collaboration Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(CollaborationEnum, { each: true })
  collaboration?: CollaborationEnum[];

  @ApiPropertyOptional({ enum: ProcurementEnum, isArray: true, description: 'Procurement Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(ProcurementEnum, { each: true })
  procurement?: ProcurementEnum[];

  @ApiPropertyOptional({ enum: OperationsEnum, isArray: true, description: 'Operations Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(OperationsEnum, { each: true })
  operations?: OperationsEnum[];

  @ApiPropertyOptional({ enum: BrandingAndMarketingEnum, isArray: true, description: 'Branding and Marketing Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(BrandingAndMarketingEnum, { each: true })
  brandingAndMarketing?: BrandingAndMarketingEnum[];
}

export class UpdateBusinessGoalsDto extends PartialType(AddBusinessGoalsDto) {}
