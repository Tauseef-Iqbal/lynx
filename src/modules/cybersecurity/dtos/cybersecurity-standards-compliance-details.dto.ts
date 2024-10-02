import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CybersecurityStandardsComplianceDetailsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'The framework or standard that the organization complies with.' })
  @IsOptional()
  @IsString()
  framework?: string;

  @ApiPropertyOptional({ description: 'The certification status related to cybersecurity standards compliance.' })
  @IsOptional()
  @IsString()
  certificationStatus?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return value;
  })
  complianceFiles?: string[];
}
