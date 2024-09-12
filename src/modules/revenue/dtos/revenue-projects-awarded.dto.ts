import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class AddRevenueProjectsAwardedDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'Project Name', example: 'Project X' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Project Value', example: '500000' })
  @IsString()
  @IsOptional()
  value?: string;

  @ApiPropertyOptional({ description: 'Agency', example: 'Agency Y' })
  @IsString()
  @IsOptional()
  agency?: string;

  @ApiPropertyOptional({ description: 'Duration', example: '6 months' })
  @IsString()
  @IsOptional()
  duration: string;

  @ApiPropertyOptional({ description: 'Description', example: 'Detailed project description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Five Percent Foreign Revenue', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  pastPerformance?: boolean;
}
