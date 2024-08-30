import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyClassification } from '../enums';

class SocialMediaDto {
  @ApiPropertyOptional({ description: 'LinkedIn profile URL' })
  @IsUrl({}, { message: 'Invalid LinkedIn URL' })
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({ description: 'Facebook profile URL' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid Facebook URL' })
  facebook?: string;

  @ApiPropertyOptional({ description: 'YouTube profile URL' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid YouTube URL' })
  youtube?: string;

  @ApiPropertyOptional({ description: 'Instagram profile URL' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid Instagram URL' })
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

  @ApiProperty({ description: 'Year the company was founded' })
  @IsNotEmpty()
  @IsInt()
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

  @ApiProperty({ description: 'ZIP Code' })
  @IsNotEmpty()
  @IsInt()
  zipCode: number;

  @ApiPropertyOptional({ description: 'Classification', enum: CompanyClassification })
  @IsEnum(CompanyClassification)
  @IsOptional()
  classification?: CompanyClassification;

  @ApiPropertyOptional({ description: 'Classification Types' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  classificationTypes?: string[];

  @ApiPropertyOptional({ description: 'Industry Associations' })
  @IsOptional()
  @IsString({ each: true })
  industryAssociations?: string[] | string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assets?: any[];

  @ApiPropertyOptional({ description: 'Social Media profiles' })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMedia?: SocialMediaDto;
}

export class UpdateCompanyProfileDto extends PartialType(CreateCompanyProfileDto) {}
