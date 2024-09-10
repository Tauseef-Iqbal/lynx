import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddOwnershipStructureKeyManagementDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'Name of the personnel', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Role of the personnel', example: 'CEO' })
  @IsString()
  @IsOptional()
  role?: string;
}
