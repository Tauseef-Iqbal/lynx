import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateCpCertificationDto {
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

  @ApiPropertyOptional({ description: 'related meta data ' })
  metadata: JSON | string | object | any;
}

export class UpdateCpCertificationDto extends PartialType(CreateCpCertificationDto) {}
