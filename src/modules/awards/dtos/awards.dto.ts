import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateCpAwardDto {
  @ApiProperty({
    description: 'The name of the award',
  })
  @IsString()
  @IsOptional()
  nameOfAward?: string;

  @ApiProperty({
    description: 'The organization that granted the award',
  })
  @IsString()
  @IsOptional()
  awardingOrganization?: string;

  @ApiPropertyOptional({
    description: 'The date the award was granted',
  })
  @IsDateString()
  @IsOptional()
  dateOfAward?: string;

  @ApiProperty({
    description: 'A brief description of the award purpose',
  })
  @IsOptional()
  @IsString()
  awardDescription?: string;

  @ApiProperty({
    description: 'Official documentation related to the award',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documentation?: string[];
}

export class UpdateCpAwardDto extends PartialType(CreateCpAwardDto) {}
