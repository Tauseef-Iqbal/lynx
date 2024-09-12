import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResearchAndDevelopmentInnovationsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({
    description: 'Name of the innovation',
    example: 'AI-powered Cybersecurity System',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Year when the innovation was developed',
    example: 2022,
  })
  @IsOptional()
  @IsInt()
  developedYear?: number;

  @ApiPropertyOptional({
    description: 'Description of the innovation',
    example: 'A system using AI to detect and mitigate cyber threats in real time.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
