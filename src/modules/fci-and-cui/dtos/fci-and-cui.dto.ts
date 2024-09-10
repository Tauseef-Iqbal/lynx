import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class AddFCIAndCUIDto {
  @ApiPropertyOptional({
    description: 'Indicates if protection contracts are available',
    example: true,
  })
  protectionContracts?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding protection contracts',
    example: 'All contracts are protected under XYZ agreement.',
  })
  protectionContractsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if assets need protection',
    example: true,
  })
  assets?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding asset protection',
    example: 'Assets are secured in accordance with ABC policy.',
  })
  assetsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if personnel need protection',
    example: false,
  })
  personnel?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding personnel protection',
    example: 'Personnel security protocols are in place.',
  })
  personnelDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there is a physical presence requirement',
    example: true,
  })
  physicalPresence?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding physical presence',
    example: 'Physical presence required at all key locations.',
  })
  physicalPresenceDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if CUI control flow is managed',
    example: true,
  })
  CUIControlFlow?: boolean;

  @ApiPropertyOptional({
    description: 'Details about CUI control flow',
    example: 'CUI control flow is strictly monitored and controlled.',
  })
  CUIControlFlowDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if CUI is on public systems',
    example: false,
  })
  CUIOnPublicSystems?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding CUI on public systems',
    example: 'CUI is not stored on public systems.',
  })
  CUIOnPublicSystemsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if security notices are used',
    example: true,
  })
  securityNotices?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding security notices',
    example: 'Security notices are displayed on all entry points.',
  })
  securityNoticesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if encrypted CUI is stored on mobile devices',
    example: false,
  })
  encryptedCUIOnMobileDevices?: boolean;

  @ApiPropertyOptional({
    description: 'Details about encrypted CUI on mobile devices',
    example: 'No CUI data is stored on mobile devices.',
  })
  encryptedCUIOnMobileDevicesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if system media sanitization is required',
    example: true,
  })
  sanitizeSystemMedia?: boolean;

  @ApiPropertyOptional({
    description: 'Details about system media sanitization',
    example: 'All media devices are sanitized before disposal.',
  })
  sanitizeSystemMediaDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if offsite maintenance is sanitized',
    example: false,
  })
  sanitizedOffsiteMaintenance?: boolean;

  @ApiPropertyOptional({
    description: 'Details about offsite maintenance sanitization',
    example: 'Offsite maintenance is only performed by trusted partners.',
  })
  sanitizedOffsiteMaintenanceDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if paper and digital protection is applied',
    example: true,
  })
  paperAndDigitalProtection?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding paper and digital protection',
    example: 'All sensitive data is printed only on secure printers.',
  })
  paperAndDigitalProtectionDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if access for authorized users is limited',
    example: true,
  })
  authorisedUsersLimitedAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Details about limited access for authorized users',
    example: 'Access is granted on a need-to-know basis.',
  })
  authorisedUsersLimitedAccessDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if media is marked with distribution limitations',
    example: true,
  })
  markedMediaWithDistributionLimitations?: boolean;

  @ApiPropertyOptional({
    description: 'Details about media with distribution limitations',
    example: 'All media is marked with appropriate distribution controls.',
  })
  markedMediaWithDistributionLimitationsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if transport control access is enforced',
    example: true,
  })
  transportControlAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding transport control access',
    example: 'All transports are logged and monitored.',
  })
  transportControlAccessDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if cryptographic mechanisms are used',
    example: true,
  })
  cryptographicMechanisms?: boolean;

  @ApiPropertyOptional({
    description: 'Details regarding cryptographic mechanisms',
    example: 'Encryption is used for all sensitive communications.',
  })
  cryptographicMechanismsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if storage locations are protected',
    example: true,
  })
  storageLocationsProtection?: boolean;

  @ApiPropertyOptional({
    description: 'Details about storage locations protection',
    example: 'Storage facilities are protected with multi-layer security.',
  })
  storageLocationsProtectionDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if screening for authorized access is enforced',
    example: false,
  })
  screeningForAutorisedAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Details about screening for authorized access',
    example: 'Screening is conducted annually.',
  })
  screeningForAutorisedAccessDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if personnel actions have consequences',
    example: true,
  })
  pesonnelActionsConsequences?: boolean;

  @ApiPropertyOptional({
    description: 'Details about personnel actions consequences',
    example: 'Consequences are outlined in the company policy manual.',
  })
  pesonnelActionsConsequencesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if SOPs are required at work sites',
    example: true,
  })
  workSitesSOPs?: boolean;

  @ApiPropertyOptional({
    description: 'Details about work sites SOPs',
    example: 'All sites follow the standard operating procedures.',
  })
  workSitesSOPsDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if operations risk assessment is performed',
    example: false,
  })
  orgPperationsRiskAssessment?: boolean;

  @ApiPropertyOptional({
    description: 'Details about operations risk assessment',
    example: 'Risk assessments are performed quarterly.',
  })
  orgPperationsRiskAssessmentDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if cryptography is used for confidentiality',
    example: true,
  })
  cryptographyForConfidentiality?: boolean;

  @ApiPropertyOptional({
    description: 'Details about cryptography for confidentiality',
    example: 'AES-256 encryption is used for all confidential data.',
  })
  cryptographyForConfidentialityDetails?: string;
}

export class UpdateFCIAndCUIDto extends PartialType(AddFCIAndCUIDto) {}
