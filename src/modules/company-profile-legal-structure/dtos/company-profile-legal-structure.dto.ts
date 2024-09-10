import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { FILE_LIMITS } from 'src/shared/constants';

export class CompanyProfileLegalStructureOrgFacilityDto {
  @ApiPropertyOptional({ description: 'The ID of the organizational facility.' })
  @IsNumber()
  @IsOptional()
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
  @IsString()
  @IsOptional()
  officeType?: string;
}

export class CreateCompanyProfileLegalStructureDto {
  @ApiProperty({ description: 'Company legal structure' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  legalStructure: string[];

  @ApiPropertyOptional({ description: 'Doing Business As name' })
  @IsString()
  @IsOptional()
  dbaName?: string;

  @ApiPropertyOptional({ description: 'Files associated with the DBA' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(FILE_LIMITS.DBA_FILE_LIMIT, { each: true })
  dbaFiles?: string[];

  @ApiPropertyOptional({ description: 'Certificates for completed projects' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  completedProjectsFiles?: string[];

  @ApiPropertyOptional({ description: "Indicates if the company's legal structure changed in the last two years" })
  @IsOptional()
  @IsBoolean()
  legalStructureChanged?: boolean;

  @ApiPropertyOptional({ description: 'Description of the legal structure change' })
  @IsString()
  @IsOptional()
  legalStructureChangedDescription?: string;

  @ApiPropertyOptional({ description: 'Indicates if the company owns or operates in foreign countries' })
  @IsOptional()
  @IsBoolean()
  corporationOwnOperateForeignCountries?: boolean;

  @ApiPropertyOptional({ description: "Description of the corporation's foreign operations" })
  @IsString()
  @IsOptional()
  corporationOwnOperateForeignCountriesDescription?: string;

  @ApiPropertyOptional({ description: 'Indicates if the company has multiple organizational facilities' })
  @IsOptional()
  @IsBoolean()
  hasMultipleOrgFacilities?: boolean;

  @ApiPropertyOptional({ description: 'List of organizational facilities' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyProfileLegalStructureOrgFacilityDto)
  orgFacilities?: CompanyProfileLegalStructureOrgFacilityDto[];
}

export class UpdateCompanyProfileLegalStructureDto extends PartialType(CreateCompanyProfileLegalStructureDto) {}

class DbaFilesApiBodyDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  data: any;
}

export class CreateCompanyProfileLegalStructureApiBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  data: string;

  @ApiProperty({ type: [DbaFilesApiBodyDto], isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DbaFilesApiBodyDto)
  dbaFiles: DbaFilesApiBodyDto[];

  @ApiProperty({ type: [DbaFilesApiBodyDto], isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DbaFilesApiBodyDto)
  completedProjectsFiles: DbaFilesApiBodyDto[];
}
