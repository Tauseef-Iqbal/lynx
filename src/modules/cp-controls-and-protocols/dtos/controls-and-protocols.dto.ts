import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpsertControlsAndProtocolDto {
  @ApiProperty({
    description: 'Indicates if regular audits are performed',
  })
  @IsBoolean()
  @IsOptional()
  performAudits?: boolean;

  @ApiProperty({
    description: 'Details about the audit findings',
  })
  @IsString()
  @IsOptional()
  auditDetails?: string;

  @ApiProperty({
    description: 'Indicates if employees are regularly trained on data security',
  })
  @IsBoolean()
  @IsOptional()
  trainEmployees?: boolean;

  @ApiProperty({
    description: 'Details about the training programs',
  })
  @IsString()
  @IsOptional()
  trainingDetails?: string;

  @ApiProperty({
    description: 'Indicates if access control measures are implemented',
  })
  @IsBoolean()
  @IsOptional()
  accessControlMeasures?: boolean;

  @ApiProperty({
    description: 'Details about access control mechanisms',
  })
  @IsString()
  @IsOptional()
  accessControlDetails?: string;

  @ApiProperty({
    description: 'Indicates if FISMA compliance is achieved',
  })
  @IsBoolean()
  @IsOptional()
  fismaCompliance?: boolean;

  @ApiProperty({
    description: 'Details on FISMA compliance and monitoring',
  })
  @IsString()
  @IsOptional()
  fismaComplianceDetails?: string;

  @ApiProperty({
    description: 'Indicates if management policies are regularly reviewed',
  })
  @IsBoolean()
  @IsOptional()
  reviewManagementPolicies?: boolean;

  @ApiProperty({
    description: 'Details about management policy reviews',
  })
  @IsString()
  @IsOptional()
  managementPoliciesDetails?: string;

  @ApiProperty({
    description: 'Indicates if the use of removable media is controlled',
  })
  @IsBoolean()
  @IsOptional()
  removableMediaControl?: boolean;

  @ApiProperty({
    description: 'Details on the control of removable media',
  })
  @IsString()
  @IsOptional()
  removableMediaDetails?: string;

  @ApiProperty({
    description: 'Indicates if the use of unidentified storage devices is prohibited',
  })
  @IsBoolean()
  @IsOptional()
  prohibitUnidentifiedStorage?: boolean;

  @ApiProperty({
    description: 'Details on the prohibition of unidentified storage devices',
  })
  @IsString()
  @IsOptional()
  unidentifiedStorageDetails?: string;

  @ApiProperty({
    description: 'Indicates if the system complies with NIST standards',
  })
  @IsBoolean()
  @IsOptional()
  nistCompliance?: boolean;

  @ApiProperty({
    description: 'Details on NIST compliance',
  })
  @IsString()
  @IsOptional()
  nistComplianceDetails?: string;
}
