import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ConditionalDiscardValue } from 'src/shared/decorators';
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
  @IsOptional()
  ownershipAgreementsDetails?: boolean;

  @ApiPropertyOptional({ description: 'Ownership Details', type: OwnershipAgreementsDetailsDto })
  @Type(() => OwnershipAgreementsDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @ConditionalDiscardValue('percentForeignInterest', (value) => value === true)
  ownershipDetails?: OwnershipAgreementsDetailsDto;

  @ApiPropertyOptional({ description: 'Agreements with Foreign Persons', example: true })
  @IsBoolean()
  @IsOptional()
  agreementsWithForeignPersons?: boolean;

  @ApiPropertyOptional({ description: 'Revenue Sharing Agreements Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('ownershipAgreementsDetails', (value) => value === true)
  revenueSharingAgreementsDetails?: string;

  @ApiPropertyOptional({ description: 'Percent Foreign Interest', example: true })
  @IsBoolean()
  @IsOptional()
  percentForeignInterest?: boolean;

  @ApiPropertyOptional({ description: 'Interest Details', type: ForeignInterestDetailsDto })
  @Type(() => ForeignInterestDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @ConditionalDiscardValue('percentForeignInterest', (value) => value === true)
  foreignInterestDetails?: ForeignInterestDetailsDto;

  @ApiPropertyOptional({ description: 'Foreign Owned Business', example: true })
  @IsBoolean()
  @IsOptional()
  foreignOwnedBusiness?: boolean;

  @ApiPropertyOptional({ description: 'Foreign Owned Business Details', type: ForeignInterestDetailsDto })
  @Type(() => ForeignInterestDetailsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @ConditionalDiscardValue('foreignOwnedBusiness', (value) => value === true)
  foreignOwnedBusinessDetails?: ForeignInterestDetailsDto;

  @ApiPropertyOptional({ description: 'Beneficial Owner', example: true })
  @IsBoolean()
  @IsOptional()
  beneficialOwner?: boolean;

  @ApiPropertyOptional({ description: 'Beneficial Owner Details', example: 'Details here' })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('beneficialOwner', (value) => value === true)
  beneficialOwnerDetails?: string;
}

export class UpdateOwnershipStructureDto extends PartialType(AddOwnershipStructureDto) {}
