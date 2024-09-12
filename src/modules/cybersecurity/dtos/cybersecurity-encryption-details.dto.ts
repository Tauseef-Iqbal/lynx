import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ICybersecurityEncryptionDetails } from '../interfaces';
import { Transform } from 'class-transformer';

export class CybersecurityEncryptionDetailsDto implements ICybersecurityEncryptionDetails {
  @ApiPropertyOptional({ description: 'The encryption standard used for data protection.' })
  @IsOptional()
  @IsString()
  standard?: string;

  @ApiPropertyOptional({ description: 'The provider of the encryption services.' })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];

    return value;
  })
  encryptionFiles?: string[];
}
