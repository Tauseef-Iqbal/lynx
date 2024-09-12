import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateCpCertificationDto {
  @ApiPropertyOptional({ description: 'The ID of the certificate.' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({ description: 'Category of the certification' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Name of the certification' })
  @IsOptional()
  @IsString()
  certificationName?: string;

  @ApiPropertyOptional({ description: 'Status of the certification' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Completion date of the certification' })
  @IsOptional()
  @IsDate()
  completionDate?: Date;

  @ApiPropertyOptional({ description: 'Expected completion date of the certification' })
  @IsOptional()
  @IsDate()
  expectedCompletionDate?: Date;

  @ApiPropertyOptional({ description: 'Estimated completion date of the certification' })
  @IsOptional()
  @IsDate()
  estimatedCompletionDate?: Date;
}

export class UpdateCpCertificationDto extends PartialType(CreateCpCertificationDto) {}
