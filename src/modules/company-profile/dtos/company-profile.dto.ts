import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Matches, ValidateIf, ValidateNested } from 'class-validator';
import { CompanyClassification } from '../enums';
import { IAssets } from '../interfaces';
import { IsSocialMediaUrl } from '../validators';

export class AssetsDto implements IAssets {
  @ApiPropertyOptional({ description: 'Type of the asset' })
  @IsString()
  type: string;

  @ApiPropertyOptional({ description: 'URL of the asset' })
  @IsString()
  @Matches(/^(https?:\/\/[^\s]+)|(data:[a-zA-Z]+\/[a-zA-Z]+;base64,[a-zA-Z0-9+/]+={0,2})$/, {
    message: 'URL must be a valid S3 URL or a base64-encoded string',
  })
  url: string;
}

export class AssetsMetadataDto {
  @ApiProperty({ description: 'Type of the asset (e.g., image, document)' })
  @IsString()
  type: string;
}

export class SocialMediaDto {
  @ApiPropertyOptional({ description: 'LinkedIn profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('linkedin', { message: 'Invalid LinkedIn URL' })
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({ description: 'Facebook profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('facebook', { message: 'Invalid Facebook URL' })
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({ description: 'YouTube profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('youtube', { message: 'Invalid YouTube URL' })
  @IsString()
  youtube?: string;

  @ApiPropertyOptional({ description: 'Instagram profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('instagram', { message: 'Invalid Instagram URL' })
  @IsString()
  instagram?: string;
}

export class CreateCompanyProfileDto {
  @ApiProperty({ description: 'Company name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Company website' })
  @IsOptional()
  @IsString()
  @IsUrl()
  @ValidateIf((o, val) => ![undefined, null, ''].includes(val))
  website?: string;

  @ApiPropertyOptional({ description: 'SAM ID' })
  @IsOptional()
  @IsString()
  samId?: string;

  @ApiPropertyOptional({ description: 'CAGE Code' })
  @IsNotEmpty()
  @IsString()
  cageCode: string;

  @ApiPropertyOptional({ description: 'DUNS Number' })
  @IsOptional()
  @IsString()
  duns?: string;

  @ApiProperty({ description: 'EIN Number' })
  @IsNotEmpty()
  @IsString()
  ein: string;

  @ApiPropertyOptional({ description: 'Founder Name' })
  @IsOptional()
  @IsString()
  founderName?: string;

  @ApiPropertyOptional({ description: 'Year the company was founded', example: 2024 })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  foundedYear?: number;

  @ApiPropertyOptional({ description: 'State of Registration' })
  @IsOptional()
  @IsString()
  stateOfRegistration?: string;

  @ApiPropertyOptional({ description: 'Registration Code' })
  @IsNotEmpty()
  @IsString()
  registrationCode: string;

  @ApiProperty({ description: 'State' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Company Address' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'City' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'ZIP Code', example: 924892 })
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  zipCode: number;

  @ApiPropertyOptional({ description: 'Classification', enum: CompanyClassification })
  @IsEnum(CompanyClassification)
  @IsOptional()
  classification?: CompanyClassification;

  @ApiPropertyOptional({ description: 'Classification Types' })
  @IsOptional()
  @ValidateIf((obj) => obj.classification === CompanyClassification.SMALL_BUSINESS)
  @IsArray({ message: 'classificationTypes must be an array.' })
  @IsString({ each: true, message: 'Each classificationType must be a string.' })
  @IsNotEmpty({ each: true, message: 'classificationTypes cannot be an empty array.' })
  @Expose()
  @Transform(({ obj, value }) => (obj.classification === CompanyClassification.OTHER_THAN_SMALL_BUSINESS ? null : value), { toClassOnly: true })
  classificationTypes?: string[];

  @ApiPropertyOptional({ description: 'Industry Associations' })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  industryAssociations?: string[] | string;

  @ApiPropertyOptional({ description: 'Company Assets' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  assets?: AssetsDto[];

  @ApiPropertyOptional({ description: 'Names of the assets' })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  @Type(() => AssetsMetadataDto)
  @IsArray()
  assetsMetadata: AssetsMetadataDto[];

  @ApiPropertyOptional({ description: 'Social Media profiles', type: () => SocialMediaDto })
  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => SocialMediaDto)
  socialMedia?: SocialMediaDto;
}

export class UpdateCompanyProfileDto extends PartialType(CreateCompanyProfileDto) {}
