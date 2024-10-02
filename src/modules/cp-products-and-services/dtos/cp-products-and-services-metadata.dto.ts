import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AssetsDto, AssetsMetadataDto } from 'src/modules/company-profile/dtos';
import { InformationType } from '../enums';
import { Transform, Type } from 'class-transformer';

export class ProductsAndServicesMetadataDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'Type of information provided in the metadata', enum: InformationType })
  @IsOptional()
  @IsEnum(InformationType)
  informationType?: InformationType;

  @ApiPropertyOptional({ description: 'Additional information about the product or service' })
  @IsOptional()
  @IsString()
  additionalInformation?: string;

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
}
