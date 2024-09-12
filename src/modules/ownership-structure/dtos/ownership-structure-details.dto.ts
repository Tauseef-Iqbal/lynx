import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { RoundType, SharesType } from '../enums';

export class AddOwnerShipStructureDetailsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'Type of the investment round' })
  @IsEnum(RoundType)
  @IsOptional()
  roundType?: RoundType;

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
  @IsEnum(SharesType)
  @IsOptional()
  typesOfShares?: SharesType;

  @ApiPropertyOptional({ description: 'Capital invested by the investor' })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  capitalInvested?: number;

  @ApiPropertyOptional({ description: 'Ownership and voting rights of the investor' })
  @IsString()
  @IsOptional()
  ownershipOrVotingRights?: string;
}
