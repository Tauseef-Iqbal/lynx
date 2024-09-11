import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateIf } from 'class-validator';

export class AddToolsAndApplicationsDto {
  @ApiPropertyOptional({
    description: 'Operating systems used by the company',
    type: [String],
    example: ['Windows', 'Linux', 'macOS'],
  })
  @ValidateIf((o) => Array.isArray(o.operatingSystems))
  @IsString({ each: true })
  @IsOptional()
  operatingSystems?: string[] | string;

  @ApiPropertyOptional({
    description: 'Tools and applications used by the company',
    example: 'Microsoft Office, Slack, Trello',
  })
  @IsString()
  @IsOptional()
  toolsAndApplications?: string;

  @ApiPropertyOptional({
    description: 'Critical applications for the company',
    example: 'SAP, Oracle Financials',
  })
  @IsString()
  @IsOptional()
  criticalApplications?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses an email service provider',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  emailServiceProvider?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the email service provider',
    example: 'Google Workspace, Microsoft 365',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.emailServiceProvider === false || obj.emailServiceProvider === 'false' ? null : value), { toClassOnly: true })
  emailServiceProviderDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses cloud services',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  cloudServices?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the cloud services used',
    example: 'AWS, Azure, Google Cloud',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.cloudServices === false || obj.cloudServices === 'false' ? null : value), { toClassOnly: true })
  cloudServicesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses on-premise software/hardware systems',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  onPremiseSoftwareHardwareSystems?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the on-premise software/hardware systems used',
    example: 'Dell Servers, Cisco Networking',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.onPremiseSoftwareHardwareSystems === false || obj.onPremiseSoftwareHardwareSystems === 'false' ? null : value), { toClassOnly: true })
  onPremiseSoftwareHardwareSystemsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses non-company owned mobile devices',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  nonCompanyOwnedMobileDevices?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the MDM (Mobile Device Management) solution used',
    example: 'Microsoft Intune, VMware AirWatch',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.nonCompanyOwnedMobileDevices === false || obj.nonCompanyOwnedMobileDevices === 'false' ? null : value), { toClassOnly: true })
  mdmSolution?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has technology assets',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  technologyAssets?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the technology assets',
    example: 'Laptops, Desktops, Networking Equipment',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.technologyAssets === false || obj.technologyAssets === 'false' ? null : value), { toClassOnly: true })
  technologyAssetsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has financial covenants',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @IsOptional()
  financialCovenants?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the financial covenants',
    example: 'Loan agreements, Credit limits',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialCovenants === false || obj.financialCovenants === 'false' ? null : value), { toClassOnly: true })
  financialCovenantsDetails?: string;

  @ApiPropertyOptional({
    description: 'Details about the security measures implemented',
    example: 'Firewall, Anti-virus, Encryption',
  })
  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.financialCovenants === false || obj.financialCovenants === 'false' ? null : value), { toClassOnly: true })
  securityMeasures?: string;
}

export class UpdateToolsAndApplicationsDto extends PartialType(AddToolsAndApplicationsDto) {}
