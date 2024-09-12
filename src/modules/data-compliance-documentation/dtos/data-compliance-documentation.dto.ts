import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpsertDataComplianceDocumentationDto {
  @ApiPropertyOptional({ description: 'The ID of the DataComplianceDocumentation.' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  // Documented Data Governance Policy
  @ApiProperty({
    description: 'Indicates if the organization has a data governance policy.',
    example: true,
  })
  @IsBoolean()
  hasDataGovernancePolicy: boolean;

  @ApiPropertyOptional({
    description: 'Details about the data governance policy (if applicable).',
    example: 'We have a comprehensive data governance policy reviewed annually.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  dataGovernancePolicyDetails?: string;

  // Data Loss Prevention (DLP) Strategy
  @ApiProperty({
    description: 'Indicates if the organization has a DLP (Data Loss Prevention) strategy.',
    example: true,
  })
  @IsBoolean()
  hasDlpStrategy: boolean;

  @ApiPropertyOptional({
    description: 'Details about the DLP strategy (if applicable).',
    example: 'Our DLP strategy includes encryption, monitoring, and access control.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  dlpStrategyDetails?: string;

  // Access Log Maintenance
  @ApiProperty({
    description: 'Indicates if the organization maintains access logs.',
    example: true,
  })
  @IsBoolean()
  hasAccessLog: boolean;

  @ApiPropertyOptional({
    description: 'Details about how access logs are maintained (if applicable).',
    example: 'Access logs are maintained using an automated system and reviewed monthly.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  accessLogDetails?: string;

  // Incident Response Plan
  @ApiProperty({
    description: 'Indicates if the organization has an incident response plan.',
    example: true,
  })
  @IsBoolean()
  hasIncidentResponsePlan: boolean;

  @ApiPropertyOptional({
    description: 'Details about the incident response plan (if applicable).',
    example: 'Our plan includes immediate notification, containment, and recovery steps.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  incidentResponseDetails?: string;

  // Privacy Act of 1974 Policy
  @ApiProperty({
    description: 'Indicates if the organization has a policy related to the Privacy Act of 1974.',
    example: true,
  })
  @IsBoolean()
  hasPrivacyActPolicy: boolean;

  @ApiPropertyOptional({
    description: 'Details about the Privacy Act policy (if applicable).',
    example: 'We ensure compliance through regular audits and staff training.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  privacyActPolicyDetails?: string;

  // Data Disposal Procedure
  @ApiProperty({
    description: 'Indicates if the organization has a data disposal procedure.',
    example: true,
  })
  @IsBoolean()
  hasDataDisposalProcedure: boolean;

  @ApiPropertyOptional({
    description: 'Details about the data disposal procedure (if applicable).',
    example: 'Data is securely erased using industry-standard practices once no longer needed.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  dataDisposalProcedureDetails?: string;
}
