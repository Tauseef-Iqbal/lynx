import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddDataComplianceDocumentationDto {
  @ApiPropertyOptional({ description: 'Indicates if the organization has a data governance policy.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  dataGovernancePolicy?: boolean;

  @ApiPropertyOptional({ description: 'Details about the data governance policy (if applicable).', example: 'We have a comprehensive data governance policy reviewed annually.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.dataGovernancePolicy === false || obj.dataGovernancePolicy === 'false' ? null : value), { toClassOnly: true })
  dataGovernancePolicyDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has a DLP (Data Loss Prevention) strategy.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  dlpStrategy?: boolean;

  @ApiPropertyOptional({ description: 'Details about the DLP strategy (if applicable).', example: 'Our DLP strategy includes encryption, monitoring, and access control.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.dlpStrategy === false || obj.dlpStrategy === 'false' ? null : value), { toClassOnly: true })
  dlpStrategyDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization maintains access logs.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  accessLog?: boolean;

  @ApiPropertyOptional({ description: 'Details about how access logs are maintained (if applicable).', example: 'Access logs are maintained using an automated system and reviewed monthly.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.accessLog === false || obj.accessLog === 'false' ? null : value), { toClassOnly: true })
  accessLogDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has an incident response plan.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  incidentResponse?: boolean;

  @ApiPropertyOptional({ description: 'Details about the incident response plan (if applicable).', example: 'Our plan includes immediate notification, containment, and recovery steps.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.incidentResponse === false || obj.incidentResponse === 'false' ? null : value), { toClassOnly: true })
  incidentResponseDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has a policy related to the Privacy Act of 1974.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  privacyActPolicy?: boolean;

  @ApiPropertyOptional({ description: 'Details about the Privacy Act policy (if applicable).', example: 'We ensure compliance through regular audits and staff training.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.privacyActPolicy === false || obj.privacyActPolicy === 'false' ? null : value), { toClassOnly: true })
  privacyActPolicyDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates if the organization has a data disposal procedure.', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  dataDisposalProcedure?: boolean;

  @ApiPropertyOptional({ description: 'Details about the data disposal procedure (if applicable).', example: 'Data is securely erased using industry-standard practices once no longer needed.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.dataDisposalProcedure === false || obj.dataDisposalProcedure === 'false' ? null : value), { toClassOnly: true })
  dataDisposalProcedureDetails?: string;
}

export class UpdateDataComplianceDocumentationDto extends PartialType(AddDataComplianceDocumentationDto) {}
