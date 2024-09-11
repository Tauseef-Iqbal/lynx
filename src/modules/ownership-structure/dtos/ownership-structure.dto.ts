import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddOwnershipStructureKeyManagementDto, AddOwnerShipStructureDetailsDto } from '../dtos';

export class OwnershipAgreementsDetailsDto {
  @ApiPropertyOptional({ description: 'Name of entity', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Organization Type', example: 'USA' })
  @IsString()
  @IsOptional()
  organizationType?: string;

  @ApiPropertyOptional({ description: 'Relationship Type', example: '70%' })
  @IsString()
  @IsOptional()
  relationshipType?: string;
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
  ownershipAgreementsDetails?: boolean;

  @ApiPropertyOptional({ description: 'Ownership Details', type: OwnershipAgreementsDetailsDto })
  @Type(() => OwnershipAgreementsDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.ownershipAgreementsDetails === false || obj.ownershipAgreementsDetails === 'false' ? null : value), { toClassOnly: true })
  ownershipDetails?: OwnershipAgreementsDetailsDto;

  @ApiPropertyOptional({ description: 'Agreements with Foreign Persons', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  agreementsWithForeignPersons?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Sharing Agreements Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.agreementsWithForeignPersons === false || obj.agreementsWithForeignPersons === 'false' ? null : value), { toClassOnly: true })
  revenueSharingAgreementsDetails?: string;

  @ApiPropertyOptional({ description: 'Percent Foreign Interest', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  percentForeignInterest?: boolean;

  @ApiPropertyOptional({ description: 'Interest Details', type: ForeignInterestDetailsDto })
  @Type(() => ForeignInterestDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.percentForeignInterest === false || obj.percentForeignInterest === 'false' ? null : value), { toClassOnly: true })
  foreignInterestDetails?: ForeignInterestDetailsDto;

  @ApiPropertyOptional({ description: 'Foreign Owned Business', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  foreignOwnedBusiness?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Owned Business Details', type: ForeignInterestDetailsDto })
  @Type(() => ForeignInterestDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignOwnedBusiness === false || obj.foreignOwnedBusiness === 'false' ? null : value), { toClassOnly: true })
  foreignOwnedBusinessDetails?: ForeignInterestDetailsDto;

  @ApiPropertyOptional({ description: 'Beneficial Owner', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  beneficialOwner?: boolean;

  @ApiPropertyOptional({ description: 'Beneficial Owner Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.beneficialOwner === false || obj.beneficialOwner === 'false' ? null : value), { toClassOnly: true })
  beneficialOwnerDetails?: string;
}

export class UpdateOwnershipStructureDto extends PartialType(AddOwnershipStructureDto) {}
