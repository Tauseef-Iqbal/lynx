import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddControlsAndProtocolsDto {
  @ApiPropertyOptional({ description: 'Indicates if regular audits are performed.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  performAudits?: boolean;

  @ApiPropertyOptional({ description: 'Details about the audit findings.', example: 'We have a comprehensive audit findings annually.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.performAudits === false || obj.performAudits === 'false' ? null : value), { toClassOnly: true })
  auditDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if employees are regularly trained on data security.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  employeeTraining?: boolean;

  @ApiPropertyOptional({ description: 'Details about the training programs.', example: 'We have comprehensive plan for training our employees.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.employeeTraining === false || obj.employeeTraining === 'false' ? null : value), { toClassOnly: true })
  employeeTrainingDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if access control measures are implemented.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  accessControlMeasures?: boolean;

  @ApiPropertyOptional({ description: 'Details about how access control measures are taken (if applicable).', example: 'Access logs are maintained using an automated system and reviewed monthly.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.accessControlMeasures === false || obj.accessControlMeasures === 'false' ? null : value), { toClassOnly: true })
  accessControlMeasuresDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization is FISMA compliant.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  fismaCompliance?: boolean;

  @ApiPropertyOptional({ description: 'Details about the FISMA compliance (if applicable).', example: 'Our plan includes immediate notification, containment, and recovery steps.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.fismaCompliance === false || obj.fismaCompliance === 'false' ? null : value), { toClassOnly: true })
  fismaComplianceDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has a policy to review the management', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  reviewManagementPolicies?: boolean;

  @ApiPropertyOptional({ description: 'Details about the policy of review managment (if applicable).', example: 'We ensure compliance through regular audits and staff training.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.reviewManagementPolicies === false || obj.reviewManagementPolicies === 'false' ? null : value), { toClassOnly: true })
  reviewManagementPoliciesDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has a procedure for media control.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  removableMediaControl?: boolean;

  @ApiPropertyOptional({ description: 'Details about the media control removal (if applicable).', example: 'Data is securely erased using industry-standard practices once no longer needed.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.removableMediaControl === false || obj.removableMediaControl === 'false' ? null : value), { toClassOnly: true })
  removableMediaControlDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has a procedure for media control.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  prohibitUnidentifiedStorage?: boolean;

  @ApiPropertyOptional({ description: 'Details about the media control removal (if applicable).', example: 'Data is securely erased using industry-standard practices once no longer needed.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.prohibitUnidentifiedStorage === false || obj.prohibitUnidentifiedStorage === 'false' ? null : value), { toClassOnly: true })
  prohibitUnidentifiedStorageDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has a procedure for media control.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  nistCompliance?: boolean;

  @ApiPropertyOptional({ description: 'Details about the media control removal (if applicable).', example: 'Data is securely erased using industry-standard practices once no longer needed.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.nistCompliance === false || obj.nistCompliance === 'false' ? null : value), { toClassOnly: true })
  nistComplianceDetails?: string;
}

export class UpdateControlsAndProtocolsDto extends PartialType(AddControlsAndProtocolsDto) {}
