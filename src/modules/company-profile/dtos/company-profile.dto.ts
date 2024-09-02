import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, ValidateIf, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CompanyClassification } from '../enums';
import { IsSocialMediaUrl } from '../validators';

export class SocialMediaDto {
  @ApiPropertyOptional({ description: 'LinkedIn profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('linkedin', { message: 'Invalid LinkedIn URL' })
  linkedin?: string;

  @ApiPropertyOptional({ description: 'Facebook profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('facebook', { message: 'Invalid Facebook URL' })
  facebook?: string;

  @ApiPropertyOptional({ description: 'YouTube profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('youtube', { message: 'Invalid YouTube URL' })
  youtube?: string;

  @ApiPropertyOptional({ description: 'Instagram profile URL' })
  @IsOptional()
  @IsSocialMediaUrl('instagram', { message: 'Invalid Instagram URL' })
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
  website?: string;

  @ApiProperty({ description: 'SAM ID' })
  @IsNotEmpty()
  @IsString()
  samId: string;

  @ApiProperty({ description: 'CAGE Code' })
  @IsNotEmpty()
  @IsString()
  cageCode: string;

  @ApiProperty({ description: 'DUNS Number' })
  @IsNotEmpty()
  @IsString()
  duns: string;

  @ApiProperty({ description: 'EIN Number' })
  @IsNotEmpty()
  @IsString()
  ein: string;

  @ApiProperty({ description: 'Founder Name' })
  @IsNotEmpty()
  @IsString()
  founderName: string;

  @ApiProperty({ description: 'Year the company was founded', example: 2024 })
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  foundedYear: number;

  @ApiProperty({ description: 'State of Registration' })
  @IsNotEmpty()
  @IsString()
  stateOfRegistration: string;

  @ApiProperty({ description: 'Registration Code' })
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
  @ValidateIf((obj) => obj.classification === CompanyClassification.SMALL_BUSINESS)
  @IsArray({ message: 'classificationTypes must be an array.' })
  @IsString({ each: true, message: 'Each classificationType must be a string.' })
  @IsNotEmpty({ each: true, message: 'classificationTypes cannot be an empty array.' })
  classificationTypes?: string[];

  @ApiPropertyOptional({ description: 'Industry Associations' })
  @IsOptional()
  @IsString({ each: true })
  industryAssociations?: string[] | string;

  @ApiPropertyOptional({ description: 'Company Assets' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Matches(/^(https?:\/\/[^\s]+)|(data:[a-zA-Z]+\/[a-zA-Z]+;base64,[a-zA-Z0-9+/]+={0,2})$/, { each: true, message: 'Each asset must be a valid S3 URL or a base64-encoded string' })
  assets?: string[];

  @ApiPropertyOptional({ description: 'Social Media profiles' })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMedia?: SocialMediaDto;
}

export class UpdateCompanyProfileDto extends PartialType(CreateCompanyProfileDto) {}
