import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsOptional, Length, IsUrl, IsNumber } from 'class-validator';

export class AddSupplyChainSupplierDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'Name of the supplier', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  name?: string;

  @ApiPropertyOptional({ description: 'Website of the supplier', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({ description: 'SAM ID of the supplier', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  samId?: string;

  @ApiPropertyOptional({ description: 'CAGE code of the supplier', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  cageCode?: string;

  @ApiPropertyOptional({ description: 'DUNS number of the supplier', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  duns?: string;

  @ApiProperty({ description: 'Address of the supplier', maxLength: 255 })
  @IsString()
  @Length(1, 255)
  address: string;

  @ApiProperty({ description: 'Country of the supplier', maxLength: 255 })
  @IsString()
  @Length(1, 255)
  country: string;

  @ApiPropertyOptional({ description: 'Classification of the supplier', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  classification?: string;

  @ApiPropertyOptional({ description: 'Facility clearance type', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  facilityClearanceType?: string;

  @ApiPropertyOptional({ description: 'Operations criticality', type: String })
  @IsOptional()
  @IsString()
  operationsCriticality?: string;

  @ApiPropertyOptional({ description: 'Services Provided', type: String })
  @IsOptional()
  @IsString()
  supplierRoleDescription?: string;
}
