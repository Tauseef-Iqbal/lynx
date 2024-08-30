import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class AddRevenueProjectsAwardedDto {
  @IsNumber()
  @IsOptional()
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
}
