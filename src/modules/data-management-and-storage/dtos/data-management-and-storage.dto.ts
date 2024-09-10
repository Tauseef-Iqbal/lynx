import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddDataManagementAndStorageDto {
  @ApiPropertyOptional({ description: 'Indicates if cloud services are used', example: true })
  @IsOptional()
  @IsBoolean()
  cloudServices?: boolean;

  @ApiPropertyOptional({ description: 'Details about the cloud services', example: 'AWS, Azure' })
  @IsOptional()
  @IsString()
  cloudServicesDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if government data is encrypted', example: true })
  @IsOptional()
  @IsBoolean()
  encryptGovtData?: boolean;

  @ApiPropertyOptional({ description: 'Details about the encryption of government data', example: 'AES-256 encryption used for all sensitive data.' })
  @IsOptional()
  @IsString()
  encryptGovtDataDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if third-party vendors are involved', example: true })
  @IsOptional()
  @IsBoolean()
  thirdPartyVendors?: boolean;

  @ApiPropertyOptional({ description: 'Details about third-party vendors', example: 'Vendor A, Vendor B' })
  @IsOptional()
  @IsString()
  thirdPartyVendorsDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if tools are used for securing government data', example: true })
  @IsOptional()
  @IsBoolean()
  toolsForSecuringGovtData?: boolean;

  @ApiPropertyOptional({ description: 'Details about tools used for securing government data', example: 'Tool A, Tool B' })
  @IsOptional()
  @IsString()
  toolsForSecuringGovtDataDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if government data is documented', example: true })
  @IsOptional()
  @IsBoolean()
  documentedGovtData?: boolean;

  @ApiPropertyOptional({ description: 'Details about documented government data', example: 'All records are maintained in a secure repository.' })
  @IsOptional()
  @IsString()
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
  USCitizensSensitiveDataDetails?: string;
}

export class UpdateDataManagementAndStorageDto extends PartialType(AddDataManagementAndStorageDto) {}
