import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddOwnerShipStructureDetailsDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ description: 'Type of the investment round' })
  @IsString()
  @IsOptional()
  roundType?: string;

  @ApiPropertyOptional({ description: 'Name of the investor' })
  @IsString()
  @IsOptional()
  investorName?: string;

  @ApiPropertyOptional({ description: 'Country of affiliation of the investor' })
  @IsString()
  @IsOptional()
  countryOfAffiliation?: string;

  @ApiPropertyOptional({ description: 'Number of shares held by the investor' })
  @IsInt()
  @IsOptional()
  numberOfShares?: number;

  @ApiPropertyOptional({ description: 'Types of shares held by the investor' })
  @IsString()
  @IsOptional()
  typesOfShares?: string;

  @ApiPropertyOptional({ description: 'Capital invested by the investor' })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsOptional()
  capitalInvested?: number;

  @ApiPropertyOptional({ description: 'Ownership and voting rights of the investor' })
  @IsString()
  @IsOptional()
  ownershipOrVotingRights?: string;
}
