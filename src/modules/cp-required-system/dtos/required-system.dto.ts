import { IsString, IsOptional, ValidateNested, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class RequiredSystemBusinessClassificationDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @IsString()
  classificationName: string;
}

export class RequiredSystemCertificationDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @IsString()
  certificationName: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsString()
  number?: string;
}

export class RequiredSystemTypesDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @IsString()
  systemName: string;

  @IsOptional()
  @IsString()
  systemDescription?: string;

  @IsOptional()
  @IsString()
  systemType?: string;

  @IsOptional()
  @IsString()
  dpasApprovalNumber?: string;

  @IsOptional()
  @IsString()
  complianceDetails?: string;
}

export class CreateRequiredSystemDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  cybersecuritySystemsLevel: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  supportsGovernmentIntegration: boolean;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  governmentIntegrationDetails: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RequiredSystemBusinessClassificationDto)
  businessClassifications?: RequiredSystemBusinessClassificationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RequiredSystemCertificationDto)
  certifications?: RequiredSystemCertificationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RequiredSystemTypesDto)
  systemTypes?: RequiredSystemTypesDto[];
}

export class UpdateRequiredSystemDto extends PartialType(CreateRequiredSystemDto) {}
