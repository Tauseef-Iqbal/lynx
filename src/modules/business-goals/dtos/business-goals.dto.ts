import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { BrandingAndMarketingEnum, CollaborationEnum, GrowthAndExpansionEnum, OperationsEnum, ProcurementEnum } from '../enums/business-goals.enum';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class AddBusinessGoalsDto {
  @ApiPropertyOptional({ enum: GrowthAndExpansionEnum, isArray: true, description: 'Growth and Expansion Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(GrowthAndExpansionEnum, { each: true })
  growthAndExpansion?: GrowthAndExpansionEnum[];

  @ApiPropertyOptional({ enum: CollaborationEnum, description: 'Collaboration Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(CollaborationEnum)
  collaboration?: CollaborationEnum[];

  @ApiPropertyOptional({ enum: ProcurementEnum, description: 'Procurement Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(ProcurementEnum)
  procurement?: ProcurementEnum[];

  @ApiPropertyOptional({ enum: OperationsEnum, description: 'Operations Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(OperationsEnum)
  operations?: OperationsEnum[];

  @ApiPropertyOptional({ enum: BrandingAndMarketingEnum, description: 'Branding and Marketing Goals' })
  @IsOptional()
  @IsArray()
  @IsEnum(BrandingAndMarketingEnum)
  brandingAndMarketing?: BrandingAndMarketingEnum[];
}

export class UpdateBusinessGoalsDto extends PartialType(AddBusinessGoalsDto) {}
