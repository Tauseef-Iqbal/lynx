import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

export class SearchCompanyDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  // @OneOf(['title'], {
  //   message: 'Either sam_or_cage or title must be provided.',
  // })
  sam_or_cage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;
}

export class CreateCompanyDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  sam_status?: boolean;

  @ApiProperty()
  @IsOptional()
  brl?: any;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phone_numbers?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  business_descriptors?: string[];

  @ApiProperty()
  @IsOptional()
  total_awarded_amount?: any;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fax_numbers?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  mission_statement?: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  awarding_agencies?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  social_links?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  awarding_sub_agencies?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  points_of_contact?: string[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  product_service_codes?: string[];

  @ApiProperty()
  @IsOptional()
  num_prime_contracts?: any;

  @ApiProperty()
  @IsOptional()
  num_of_employees?: any;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  naics?: number[];

  @ApiProperty()
  @IsOptional()
  num_sub_contracts?: any;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  addresses?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  company_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cage_code?: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  products?: string[];

  @ApiProperty()
  @IsOptional()
  num_grants?: any;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  uei?: string;

  @ApiProperty({ type: [[Object]] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Array)
  capabilities?: any[][];
}

export class SaveCompanyInfoDto {
  @ApiProperty()
  @IsString()
  overview: string;

  @ApiProperty()
  @IsString()
  missionStatement: string;
}

export class ResourceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  extension?: string;

  @IsString()
  @IsOptional()
  source: string;

  @IsString()
  @IsOptional()
  title: string;
}

export class CompanyInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_url: string;
}

export class SocialMediaDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  linkedIn?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  youTube?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  facebook?: string;
}

export class AddCompanyInfoDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  samId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cageCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  stateOfRegistration?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registrationCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  zipCode?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  source?: string;

  @ApiProperty({ type: () => SocialMediaDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMedia?: SocialMediaDto;

  @ApiProperty({ type: [ResourceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources?: ResourceDto[];
}
