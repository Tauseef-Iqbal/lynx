import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddFCIAndCUIDto {
  @ApiPropertyOptional({
    description: 'Indicates if protection contracts are available',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  protectionContracts?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding protection contracts',
    example: 'All contracts are protected under XYZ agreement.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.protectionContracts === false || obj.protectionContracts === 'false' ? null : value), { toClassOnly: true })
  protectionContractsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if assets need protection',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  assets?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding asset protection',
    example: 'Assets are secured in accordance with ABC policy.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.assets === false || obj.assets === 'false' ? null : value), { toClassOnly: true })
  assetsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if personnel need protection',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  personnel?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding personnel protection',
    example: 'Personnel security protocols are in place.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.personnel === false || obj.personnel === 'false' ? null : value), { toClassOnly: true })
  personnelDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there is a physical presence requirement',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  physicalPresence?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding physical presence',
    example: 'Physical presence required at all key locations.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.physicalPresence === false || obj.physicalPresence === 'false' ? null : value), { toClassOnly: true })
  physicalPresenceDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if CUI control flow is managed',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  CUIControlFlow?: boolean;

  @ApiPropertyOptional({
    description: 'Details about CUI control flow',
    example: 'CUI control flow is strictly monitored and controlled.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.CUIControlFlow === false || obj.CUIControlFlow === 'false' ? null : value), { toClassOnly: true })
  CUIControlFlowDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if CUI is on public systems',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  CUIOnPublicSystems?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding CUI on public systems',
    example: 'CUI is not stored on public systems.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.CUIOnPublicSystems === false || obj.CUIOnPublicSystems === 'false' ? null : value), { toClassOnly: true })
  CUIOnPublicSystemsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if security notices are used',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  securityNotices?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding security notices',
    example: 'Security notices are displayed on all entry points.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.securityNotices === false || obj.securityNotices === 'false' ? null : value), { toClassOnly: true })
  securityNoticesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if encrypted CUI is stored on mobile devices',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  encryptedCUIOnMobileDevices?: boolean;

  @ApiPropertyOptional({
    description: 'Details about encrypted CUI on mobile devices',
    example: 'No CUI data is stored on mobile devices.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.encryptedCUIOnMobileDevices === false || obj.encryptedCUIOnMobileDevices === 'false' ? null : value), { toClassOnly: true })
  encryptedCUIOnMobileDevicesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if system media sanitization is required',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  sanitizeSystemMedia?: boolean;

  @ApiPropertyOptional({
    description: 'Details about system media sanitization',
    example: 'All media devices are sanitized before disposal.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.sanitizeSystemMedia === false || obj.sanitizeSystemMedia === 'false' ? null : value), { toClassOnly: true })
  sanitizeSystemMediaDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if offsite maintenance is sanitized',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  sanitizedOffsiteMaintenance?: boolean;

  @ApiPropertyOptional({
    description: 'Details about offsite maintenance sanitization',
    example: 'Offsite maintenance is only performed by trusted partners.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.sanitizedOffsiteMaintenance === false || obj.sanitizedOffsiteMaintenance === 'false' ? null : value), { toClassOnly: true })
  sanitizedOffsiteMaintenanceDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if paper and digital protection is applied',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  paperAndDigitalProtection?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding paper and digital protection',
    example: 'All sensitive data is printed only on secure printers.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.paperAndDigitalProtection === false || obj.paperAndDigitalProtection === 'false' ? null : value), { toClassOnly: true })
  paperAndDigitalProtectionDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if access for authorized users is limited',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  authorisedUsersLimitedAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Details about limited access for authorized users',
    example: 'Access is granted on a need-to-know basis.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.authorisedUsersLimitedAccess === false || obj.authorisedUsersLimitedAccess === 'false' ? null : value), { toClassOnly: true })
  authorisedUsersLimitedAccessDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if media is marked with distribution limitations',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  markedMediaWithDistributionLimitations?: boolean;

  @ApiPropertyOptional({
    description: 'Details about media with distribution limitations',
    example: 'All media is marked with appropriate distribution controls.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.markedMediaWithDistributionLimitations === false || obj.markedMediaWithDistributionLimitations === 'false' ? null : value), { toClassOnly: true })
  markedMediaWithDistributionLimitationsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if transport control access is enforced',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  transportControlAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding transport control access',
    example: 'All transports are logged and monitored.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.transportControlAccess === false || obj.transportControlAccess === 'false' ? null : value), { toClassOnly: true })
  transportControlAccessDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if cryptographic mechanisms are used',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cryptographicMechanisms?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding cryptographic mechanisms',
    example: 'Encryption is used for all sensitive communications.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.cryptographicMechanisms === false || obj.cryptographicMechanisms === 'false' ? null : value), { toClassOnly: true })
  cryptographicMechanismsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if storage locations are protected',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  storageLocationsProtection?: boolean;

  @ApiPropertyOptional({
    description: 'Details about storage locations protection',
    example: 'Storage facilities are protected with multi-layer security.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.storageLocationsProtection === false || obj.storageLocationsProtection === 'false' ? null : value), { toClassOnly: true })
  storageLocationsProtectionDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if screening for authorized access is enforced',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  screeningForAutorisedAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Details about screening for authorized access',
    example: 'Screening is conducted annually.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.screeningForAutorisedAccess === false || obj.screeningForAutorisedAccess === 'false' ? null : value), { toClassOnly: true })
  screeningForAutorisedAccessDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if personnel actions have consequences',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  pesonnelActionsConsequences?: boolean;

  @ApiPropertyOptional({
    description: 'Details about personnel actions consequences',
    example: 'Consequences are outlined in the company policy manual.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.pesonnelActionsConsequences === false || obj.pesonnelActionsConsequences === 'false' ? null : value), { toClassOnly: true })
  pesonnelActionsConsequencesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if SOPs are required at work sites',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  workSitesSOPs?: boolean;

  @ApiPropertyOptional({
    description: 'Details about work sites SOPs',
    example: 'All sites follow the standard operating procedures.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.workSitesSOPs === false || obj.workSitesSOPs === 'false' ? null : value), { toClassOnly: true })
  workSitesSOPsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if operations risk assessment is performed',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  orgPperationsRiskAssessment?: boolean;

  @ApiPropertyOptional({
    description: 'Details about operations risk assessment',
    example: 'Risk assessments are performed quarterly.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.orgPperationsRiskAssessment === false || obj.orgPperationsRiskAssessment === 'false' ? null : value), { toClassOnly: true })
  orgPperationsRiskAssessmentDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if cryptography is used for confidentiality',
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cryptographyForConfidentiality?: boolean;

  @ApiPropertyOptional({
    description: 'Details about cryptography for confidentiality',
    example: 'AES-256 encryption is used for all confidential data.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.cryptographyForConfidentiality === false || obj.cryptographyForConfidentiality === 'false' ? null : value), { toClassOnly: true })
  cryptographyForConfidentialityDetails?: string;
}

export class UpdateFCIAndCUIDto extends PartialType(AddFCIAndCUIDto) {}
