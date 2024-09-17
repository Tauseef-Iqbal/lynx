import { IsString, IsOptional, ValidateNested, IsBoolean, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StatusEnum } from 'src/shared/enums';

export class RequiredSystemBusinessClassificationDto {
  @IsString()
  classificationName: string;
}

export class RequiredSystemCertificationDto {
  @IsOptional()
  @IsString()
  certificationName: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  certificationStatus?: StatusEnum;
}

export class RequiredSystemTypesDto {
  @IsOptional()
  @IsString()
  systemName?: string;

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

  @IsOptional()
  @IsEnum(StatusEnum)
  systemStatus?: StatusEnum;
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
