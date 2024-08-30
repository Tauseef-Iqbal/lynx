import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ConditionalDiscardValue } from 'src/shared/decorators';

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
  @IsOptional()
  emailServiceProvider?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the email service provider',
    example: 'Google Workspace, Microsoft 365',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('emailServiceProvider', (value) => value === true)
  emailServiceProviderDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses cloud services',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  cloudServices?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the cloud services used',
    example: 'AWS, Azure, Google Cloud',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('cloudServices', (value) => value === true)
  cloudServicesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses on-premise software/hardware systems',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  onPremiseSoftwareHardwareSystems?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the on-premise software/hardware systems used',
    example: 'Dell Servers, Cisco Networking',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('onPremiseSoftwareHardwareSystems', (value) => value === true)
  onPremiseSoftwareHardwareSystemsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company uses non-company owned mobile devices',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  nonCompanyOwnedMobileDevices?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the MDM (Mobile Device Management) solution used',
    example: 'Microsoft Intune, VMware AirWatch',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('nonCompanyOwnedMobileDevices', (value) => value === true)
  mdmSolution?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has technology assets',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  technologyAssets?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the technology assets',
    example: 'Laptops, Desktops, Networking Equipment',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('technologyAssets', (value) => value === true)
  technologyAssetsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the company has financial covenants',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  financialCovenants?: boolean;

  @ApiPropertyOptional({
    description: 'Details about the financial covenants',
    example: 'Loan agreements, Credit limits',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('financialCovenants', (value) => value === true)
  financialCovenantsDetails?: string;

  @ApiPropertyOptional({
    description: 'Details about the security measures implemented',
    example: 'Firewall, Anti-virus, Encryption',
  })
  @IsString()
  @IsOptional()
  @ConditionalDiscardValue('financialCovenants', (value) => value === true)
  securityMeasures?: string;
}

export class UpdateToolsAndApplicationsDto extends PartialType(AddToolsAndApplicationsDto) {}
