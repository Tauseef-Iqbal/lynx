import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { FILE_LIMITS } from 'src/shared/constants';

export class CpProductsAndServicesMetaDataDto {
  @ApiPropertyOptional({ description: 'The ID of the company products and services meta data' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'Type of the product or service' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ description: 'Additional information about the product or service' })
  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @ApiPropertyOptional({
    description: 'Indices for the files for Supporting materials to the corresponding additional informations',
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @Type(() => Number)
  fileIndices?: number[];
}

export class CreateCpProductsAndServicesDto {
  @ApiProperty({ description: 'Name of the company products and services' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Type of the company products and services' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ description: 'Detailed description of the company products and services' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'TRL  specifications related to the products and services' })
  @IsOptional()
  @IsString()
  trlSpecification?: string[];

  @ApiPropertyOptional({ description: 'MRL specifications related to the products and services' })
  @IsOptional()
  @IsString()
  mrlSpecification?: string[];

  @ApiPropertyOptional({ description: 'Company differentiators that set it apart from competitors' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (value ? value.split(',').map((item: string) => item.trim()) : []))
  compnayDifferentiators?: string[];

  @ApiPropertyOptional({ description: 'Challenges addressed by the company products and services' })
  @IsString()
  @IsOptional()
  challengesAddressed?: string;

  @ApiPropertyOptional({ description: 'Files associated with the products and services' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(FILE_LIMITS.CP_PRODUCTS_AND_SERVICES_FILE_LIMIT, { each: true })
  uploadedMaterials?: string[];

  @ApiPropertyOptional({ description: 'List of organizational facilities' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CpProductsAndServicesMetaDataDto)
  metaData?: CpProductsAndServicesMetaDataDto[];
}

export class UpdateCpProductsAndServicesDto extends PartialType(CreateCpProductsAndServicesDto) {}

class FilesApiBodyDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  data: any;
}

export class CreateCpProductsAndServicesDtoApiBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  data: string;

  @ApiProperty({ type: [FilesApiBodyDto], isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilesApiBodyDto)
  uploadedMaterials: FilesApiBodyDto[];

  @ApiProperty({ type: [FilesApiBodyDto], isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilesApiBodyDto)
  supportingMaterials: FilesApiBodyDto[];
}

export class GetAllQueryParamsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;
}
