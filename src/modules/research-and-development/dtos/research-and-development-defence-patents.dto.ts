import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ResearchAndDevelopmentDefencePatentsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({
    description: 'Name of the patent',
    example: 'Advanced Radar Technology',
  })
  @IsOptional()
  @IsString()
  patentName?: string;

  @ApiPropertyOptional({
    description: 'Number of the patent',
    example: 'US1234567B1',
  })
  @IsOptional()
  @IsString()
  patentNumber?: string;

  @ApiPropertyOptional({
    description: 'Countries where the patent is registered',
    example: ['United States', 'United Kingdom', 'Canada'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  patentCountries?: string[];

  @ApiPropertyOptional({
    description: 'Names of the patentees',
    example: ['John Doe', 'Jane Smith'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  patenteeNames?: string[];

  @ApiPropertyOptional({
    description: 'Date when the patent was granted',
    example: '2020-08-15',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfGrant?: Date;

  @ApiPropertyOptional({
    description: 'Date when the patent expires',
    example: '2040-08-15',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfExpiration?: Date;

  @ApiPropertyOptional({
    description: 'Description of the patent',
    example: 'A patent for an advanced radar technology that can detect stealth aircraft.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
