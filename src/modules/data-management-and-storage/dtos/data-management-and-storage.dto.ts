import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddDataManagementAndStorageDto {
  @ApiPropertyOptional({ description: 'Indicates if cloud services are used', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cloudServices?: boolean;

  @ApiPropertyOptional({ description: 'Details about the cloud services', example: 'AWS, Azure' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.cloudServices === false || obj.cloudServices === 'false' ? null : value), { toClassOnly: true })
  cloudServicesDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if government data is encrypted', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  encryptGovtData?: boolean;

  @ApiPropertyOptional({ description: 'Details about the encryption of government data', example: 'AES-256 encryption used for all sensitive data.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.encryptGovtData === false || obj.encryptGovtData === 'false' ? null : value), { toClassOnly: true })
  encryptGovtDataDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if third-party vendors are involved', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  thirdPartyVendors?: boolean;

  @ApiPropertyOptional({ description: 'Details about third-party vendors', example: 'Vendor A, Vendor B' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.thirdPartyVendors === false || obj.thirdPartyVendors === 'false' ? null : value), { toClassOnly: true })
  thirdPartyVendorsDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if tools are used for securing government data', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  toolsForSecuringGovtData?: boolean;

  @ApiPropertyOptional({ description: 'Details about tools used for securing government data', example: 'Tool A, Tool B' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.toolsForSecuringGovtData === false || obj.toolsForSecuringGovtData === 'false' ? null : value), { toClassOnly: true })
  toolsForSecuringGovtDataDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if government data is documented', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  documentedGovtData?: boolean;

  @ApiPropertyOptional({ description: 'Details about documented government data', example: 'All records are maintained in a secure repository.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.documentedGovtData === false || obj.documentedGovtData === 'false' ? null : value), { toClassOnly: true })
  documentedGovtDataDetails?: string;

  @ApiPropertyOptional({
    description: 'List of sensitive data related to US citizens',
    type: [String],
    example: ['Social Security Number', 'Driver License Number'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  USCitizensSensitiveData?: string[];

  @ApiPropertyOptional({ description: 'Details about US citizens sensitive data', example: 'Stored in encrypted databases' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.USCitizensSensitiveData === false || obj.USCitizensSensitiveData === 'false' ? null : value), { toClassOnly: true })
  USCitizensSensitiveDataDetails?: string;
}

export class UpdateDataManagementAndStorageDto extends PartialType(AddDataManagementAndStorageDto) {}
