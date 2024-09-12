import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ICybersecurityStandardsComplianceDetails } from '../interfaces';

export class CybersecurityStandardsComplianceDetailsDto {
  @ApiPropertyOptional({ description: 'The framework or standard that the organization complies with.' })
  @IsOptional()
  @IsString()
  framework?: string;

  @ApiPropertyOptional({ description: 'The certification status related to cybersecurity standards compliance.' })
  @IsOptional()
  @IsString()
  certificationStatus?: string;

  @IsOptional()
  complianceFilesBase64?: { filename: string; data: string }[];
}
