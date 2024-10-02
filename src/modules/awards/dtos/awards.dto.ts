import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsArray, IsDateString, ValidateNested } from 'class-validator';

export class CpAwardsOfficalDocsDto {
  @ApiPropertyOptional({ description: 'Name of the document', example: 'Certificate of Achievement' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Base64 encoded image string',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  b64Images?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  fileName?: string;
}

export class SaveCpAwardDto {
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

  @ApiPropertyOptional({
    description: 'Official documents related to the award',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CpAwardsOfficalDocsDto)
  officialDocs?: CpAwardsOfficalDocsDto[];
}

export class UpdateCpAwardDto extends PartialType(SaveCpAwardDto) {}
