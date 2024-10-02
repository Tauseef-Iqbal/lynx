import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AssetsDto, AssetsMetadataDto } from 'src/modules/company-profile/dtos';
import { LegalStructure } from '../enums';
import { LegalStructureOrgFacilitiesDto } from './legal-structure-org-facilities.dto';

export class AddLegalStructureDto {
  @ApiPropertyOptional({
    description: 'Legal structure of the company. Multiple options can be selected.',
    example: [LegalStructure.LLC, LegalStructure.OTHER],
    enum: LegalStructure,
    isArray: true,
  })
  @IsArray()
  @IsEnum(LegalStructure, { each: true })
  legalStructure: LegalStructure[];

  @ApiPropertyOptional({ description: 'Other legal strcuture' })
  @IsString()
  @IsOptional()
  @Transform(({ obj }) => (obj.legalStructure.includes(LegalStructure.OTHER) ? obj.otherLegalStructure : null), { toClassOnly: true })
  otherLegalStructure?: string;

  @ApiPropertyOptional({ description: 'Company Assets' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  @Type(() => AssetsDto)
  dbaAssets?: AssetsDto[];

  @ApiPropertyOptional({ description: 'Names of the assets' })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  @Type(() => AssetsMetadataDto)
  @IsArray()
  assetsMetadata: AssetsMetadataDto[];

  @ApiPropertyOptional({ description: 'Indicates if there is a DBA name.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  dbaName?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.dbaName === false || obj.dbaName === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return value;
  })
  dbaNameFiles?: string[];

  @ApiPropertyOptional({ description: "Indicates if the company's legal structure changed in the last two years" })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  legalStructureChanged?: boolean;

  @ApiPropertyOptional({ description: 'Bankruptcy Filed Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.legalStructureChanged === false || obj.legalStructureChanged === 'false' ? null : value), { toClassOnly: true })
  legalStructureChangedDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the company owns or operates in foreign countries' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  corporationOwnOperateForeignCountries?: boolean;

  @ApiPropertyOptional({ description: 'Bankruptcy Filed Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.corporationOwnOperateForeignCountries === false || obj.corporationOwnOperateForeignCountries === 'false' ? null : value), { toClassOnly: true })
  corporationOwnOperateForeignCountriesDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the company has multiple organizational facilities' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  multipleOrgFacilities?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Funding Foreign Affiliation', type: [LegalStructureOrgFacilitiesDto] })
  @IsOptional()
  @IsArray()
  @Type(() => LegalStructureOrgFacilitiesDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.multipleOrgFacilities === false || obj.multipleOrgFacilities === 'false' ? null : value), { toClassOnly: true })
  orgFacilities?: LegalStructureOrgFacilitiesDto[];
}

export class UpdateLegalStructureDto extends PartialType(AddLegalStructureDto) {}
