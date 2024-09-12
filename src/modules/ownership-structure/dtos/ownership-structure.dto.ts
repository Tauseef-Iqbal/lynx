import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddOwnershipStructureKeyManagementDto, AddOwnerShipStructureDetailsDto } from '../dtos';
import { IAgreementsDetails } from '../interfaces';
import { RelationshipType } from '../enums';

export class OwnershipAgreementsDetailsDto implements IAgreementsDetails {
  @ApiPropertyOptional({ description: 'Name of entity', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Organization Type', example: 'USA' })
  @IsString()
  @IsOptional()
  organizationType?: string;

  @ApiPropertyOptional({ description: 'Relationship Type', example: '70%' })
  @IsEnum(RelationshipType)
  @IsOptional()
  relationshipType?: RelationshipType;
}

export class ForeignInterestDetailsDto {
  @ApiPropertyOptional({ description: 'Customer Name', example: 'John Doe' })
  @IsString()
  @IsOptional()
  nameOfForeignInterest?: string;

  @ApiPropertyOptional({ description: 'Country', example: 'USA' })
  @IsString()
  @IsOptional()
  countryOfAffiliation?: string;
}

export class AddOwnershipStructureDto {
  @ApiPropertyOptional({ description: 'Ownership Resources', type: () => AddOwnerShipStructureDetailsDto })
  @Type(() => AddOwnerShipStructureDetailsDto)
  @ValidateNested({ each: true })
  @IsOptional()
  ownershipStructureDetails?: AddOwnerShipStructureDetailsDto;

  @ApiPropertyOptional({ description: 'Key Management', type: () => [AddOwnershipStructureKeyManagementDto] })
  @Type(() => AddOwnershipStructureKeyManagementDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  ownershipStructureKeyManagement?: AddOwnershipStructureKeyManagementDto[];

  @ApiPropertyOptional({ description: 'Agreement or Relationship', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  ownershipAgreements?: boolean;

  @ApiPropertyOptional({ description: 'Ownership Details', type: OwnershipAgreementsDetailsDto })
  @Type(() => OwnershipAgreementsDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.ownershipAgreements === false || obj.ownershipAgreements === 'false' ? null : value), { toClassOnly: true })
  ownershipAgreementsDetails?: OwnershipAgreementsDetailsDto;

  @ApiPropertyOptional({ description: 'Agreements with Foreign Persons', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  foreignAgreementsContracts?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Sharing Agreements Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignAgreementsContracts === false || obj.foreignAgreementsContracts === 'false' ? null : value), { toClassOnly: true })
  foreignAgreementsContractsDetails?: string;

  @ApiPropertyOptional({ description: 'Percent Foreign Interest', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  foreignInterest10Percent?: boolean;

  @ApiPropertyOptional({ description: 'Interest Details', type: ForeignInterestDetailsDto })
  @Type(() => ForeignInterestDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignInterest10Percent === false || obj.foreignInterest10Percent === 'false' ? null : value), { toClassOnly: true })
  foreignInterest10PercentDetails?: ForeignInterestDetailsDto;

  @ApiPropertyOptional({ description: 'Foreign Owned Business', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  businessForeignOwnership?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Owned Business Details', type: ForeignInterestDetailsDto })
  @Type(() => ForeignInterestDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.businessForeignOwnership === false || obj.businessForeignOwnership === 'false' ? null : value), { toClassOnly: true })
  businessForeignOwnershipDetails?: ForeignInterestDetailsDto;

  @ApiPropertyOptional({ description: 'Beneficial Owner', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  votingNominee10Percent?: boolean;

  @ApiPropertyOptional({ description: 'Beneficial Owner Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.votingNominee10Percent === false || obj.votingNominee10Percent === 'false' ? null : value), { toClassOnly: true })
  votingNominee10PercentDetails?: string;
}

export class UpdateOwnershipStructureDto extends PartialType(AddOwnershipStructureDto) {}
