import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpsertCompanyOverviewDto {
  @ApiPropertyOptional({
    description: 'A brief snapshot or summary of the company.',
    type: String,
    example: 'Innovative tech company specializing in AI solutions.',
  })
  @IsOptional()
  @IsString()
  snapshot?: string;

  @ApiPropertyOptional({
    description: 'List of differentiators of the company.',
    type: [String],
    example: ['Cutting-edge technology', 'Award-winning customer service'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  differentiators?: string[];

  @ApiPropertyOptional({
    description: 'List of competencies of the company.',
    type: [String],
    example: ['Software Development', 'Data Analysis'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  competencies?: string[];

  @ApiPropertyOptional({
    description: 'List of capabilities of the company.',
    type: [String],
    example: ['Cloud Computing', 'Machine Learning'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  capabilities?: string[];

  @ApiPropertyOptional({
    description: 'List of core values of the company.',
    type: [String],
    example: ['Integrity', 'Innovation', 'Customer Focus'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  values?: string[];
}
