import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AssetsDto, AssetsMetadataDto } from 'src/modules/company-profile/dtos';
import { MRLSpecification, TRLSpecification } from '../enums';
import { ProductsAndServicesMetadataDto } from './cp-products-and-services-metadata.dto';

export class CreateProductsAndServicesDto {
  @ApiProperty({ description: 'The name of the product or service' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Type of offering provided by the product or service' })
  @IsOptional()
  @IsString()
  offeringType?: string;

  @ApiPropertyOptional({ description: 'Image URL of the product or service' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Description of the product or service' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'TRL specification level', enum: TRLSpecification })
  @IsOptional()
  @IsEnum(TRLSpecification)
  trlSpecification?: TRLSpecification;

  @ApiPropertyOptional({ description: 'MRL specification level', enum: MRLSpecification })
  @IsOptional()
  @IsEnum(MRLSpecification)
  mrlSpecification?: MRLSpecification;

  @ApiPropertyOptional({ description: 'Company differentiators', isArray: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  compnayDifferentiators?: string[];

  @ApiPropertyOptional({ description: 'Challenges addressed by the product or service' })
  @IsOptional()
  @IsString()
  challengesAddressed?: string;

  @ApiPropertyOptional({ description: ' Assets' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  @Type(() => AssetsDto)
  assets?: AssetsDto[];

  @ApiPropertyOptional({ description: 'Names of the assets' })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  @Type(() => AssetsMetadataDto)
  @IsArray()
  assetsMetadata: AssetsMetadataDto[];

  @ApiPropertyOptional({ description: 'Generated Revenue Range', type: [ProductsAndServicesMetadataDto] })
  @Type(() => ProductsAndServicesMetadataDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  productsAndServicesMetadata?: ProductsAndServicesMetadataDto[];
}

export class UpdateProductsAndServicesDto extends PartialType(CreateProductsAndServicesDto) {}
