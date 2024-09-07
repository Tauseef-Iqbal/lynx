import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class AddForeignFundingForeignAffiliationDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ description: 'Name of Foreign Entity', example: 'Project X' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Nature of the Investment' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ description: 'Generated Revenue Range' })
  @IsOptional()
  @IsString()
  investmentNature?: string;
}
