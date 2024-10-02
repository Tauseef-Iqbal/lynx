import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OfficeType } from '../enums';

export class LegalStructureOrgFacilitiesDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'The full address of the office.' })
  @IsString()
  @IsOptional()
  officeAddress?: string;

  @ApiPropertyOptional({ description: 'The state or region where the office is located.' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ description: 'The city where the office is located.' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'The country where the office is located.' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ description: 'The type of office, such as headquarters, branch, or regional office.' })
  @IsEnum(OfficeType)
  @IsOptional()
  officeType?: OfficeType;
}
