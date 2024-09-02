import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IBaseCyberSecurityDetails, ICybersecurityStandardsCompliantDetails, IEncryptDataDetails, IForeignEntityInvolvedDetails, IManageAccessControlDetails, IPrimaryFollowUpContact } from 'src/modules/cybersecurity/interfaces';
import { ConditionalValue } from 'src/shared/validators';

class BaseCyberSecurityDetailsDto implements IBaseCyberSecurityDetails {
  @ApiPropertyOptional({ description: 'The frequency of the cybersecurity activity (e.g., monthly, quarterly).' })
  @IsOptional()
  @IsString()
  frequency?: string;

  @ApiPropertyOptional({ description: 'The service provider responsible for the cybersecurity activity.' })
  @IsOptional()
  @IsString()
  provider?: string;
}

export class PenetrationTestingDetailsDto extends BaseCyberSecurityDetailsDto {}
export class CybersecurityTrainingDetailsDto extends BaseCyberSecurityDetailsDto {}
export class CybersecurityAuditsDetailsDto extends BaseCyberSecurityDetailsDto {}

export class CybersecurityStandardsCompliantDetailsDto implements ICybersecurityStandardsCompliantDetails {
  @ApiPropertyOptional({ description: 'The framework or standard that the organization complies with.' })
  @IsOptional()
  @IsString()
  framework?: string;

  @ApiPropertyOptional({ description: 'The certification status related to cybersecurity standards compliance.' })
  @IsOptional()
  @IsString()
  certificationStatus?: string;
}

export class EncryptDataDetailsDto implements IEncryptDataDetails {
  @ApiPropertyOptional({ description: 'The encryption standard used for data protection.' })
  @IsOptional()
  @IsString()
  standard?: string;

  @ApiPropertyOptional({ description: 'The provider of the encryption services.' })
  @IsOptional()
  @IsString()
  provider?: string;
}

export class ForeignEntityInvolvedDetailsDto implements IForeignEntityInvolvedDetails {
  @ApiPropertyOptional({ description: 'The name of the foreign entity involved in cybersecurity activities.' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'The country of affiliation of the foreign entity.' })
  @IsOptional()
  @IsString()
  countryOfAffiliation?: string;
}

export class ManageAccessControlDetailsDto implements IManageAccessControlDetails {
  @ApiPropertyOptional({ description: 'The frequency of access control management activities.' })
  @IsOptional()
  @IsString()
  frequency?: string;

  @ApiPropertyOptional({ description: 'The tools used for managing access control.' })
  @IsOptional()
  @IsString()
  accessControlTools?: string;
}

export class PrimaryFollowUpContactDto implements IPrimaryFollowUpContact {
  @ApiPropertyOptional({ description: 'The name of the primary follow-up contact for cybersecurity matters.' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'The title or position of the primary follow-up contact.' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'The email address of the primary follow-up contact.' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'The phone number of the primary follow-up contact.' })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class AddCybersecurityDto {
  @ApiPropertyOptional({ description: 'Indicates whether the organization has a dedicated cybersecurity team.' })
  @IsOptional()
  @IsBoolean()
  cybersecurityTeam?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity team.' })
  @IsOptional()
  @IsString()
  @ConditionalValue('cybersecurityTeam', (value) => value === true)
  cybersecurityTeamDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the organization has a cybersecurity policy.' })
  @IsOptional()
  @IsBoolean()
  cybersecurityPolicy?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity policy.' })
  @IsOptional()
  @IsString()
  @ConditionalValue('cybersecurityPolicy', (value) => value === true)
  cybersecurityPolicyDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the organization conducts penetration testing.' })
  @IsOptional()
  @IsBoolean()
  penetrationTesting?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s penetration testing activities.', type: PenetrationTestingDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PenetrationTestingDetailsDto)
  @ConditionalValue('penetrationTesting', (value) => value === true)
  penetrationTestingDetails?: PenetrationTestingDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization complies with cybersecurity standards.' })
  @IsOptional()
  @IsBoolean()
  cybersecurityStandardsCompliant?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s compliance with cybersecurity standards.', type: CybersecurityStandardsCompliantDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CybersecurityStandardsCompliantDetailsDto)
  @ConditionalValue('cybersecurityStandardsCompliant', (value) => value === true)
  cybersecurityStandardsCompliantDetails?: CybersecurityStandardsCompliantDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization has an incident response plan.' })
  @IsOptional()
  @IsBoolean()
  incidentResponsePlan?: boolean;

  @ApiPropertyOptional({ description: 'The date of the last cybersecurity incident.' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @ConditionalValue('incidentResponsePlan', (value) => value === true)
  lastIncident?: Date;

  @ApiPropertyOptional({ description: 'Indicates whether the organization conducts cybersecurity training.' })
  @IsOptional()
  @IsBoolean()
  cybersecurityTraining?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity training activities.', type: CybersecurityTrainingDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CybersecurityTrainingDetailsDto)
  @ConditionalValue('cybersecurityTraining', (value) => value === true)
  cybersecurityTrainingDetails?: CybersecurityTrainingDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization encrypts its data.' })
  @IsOptional()
  @IsBoolean()
  encryptData?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s data encryption activities.', type: EncryptDataDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EncryptDataDetailsDto)
  @ConditionalValue('encryptData', (value) => value === true)
  encryptDataDetails?: EncryptDataDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization conducts cybersecurity audits.' })
  @IsOptional()
  @IsBoolean()
  cybersecurityAudits?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity audits.', type: CybersecurityAuditsDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CybersecurityAuditsDetailsDto)
  @ConditionalValue('cybersecurityAudits', (value) => value === true)
  cybersecurityAuditsDetails?: CybersecurityAuditsDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether a foreign entity is involved in cybersecurity activities.' })
  @IsOptional()
  @IsBoolean()
  foreignEntityInvolved?: boolean;

  @ApiPropertyOptional({ description: 'Details about the involvement of foreign entities in cybersecurity activities.', type: ForeignEntityInvolvedDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ForeignEntityInvolvedDetailsDto)
  @ConditionalValue('foreignEntityInvolved', (value) => value === true)
  foreignEntityInvolvedDetails?: ForeignEntityInvolvedDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization manages access control for its systems.' })
  @IsOptional()
  @IsBoolean()
  manageAccessControl?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s access control management activities.', type: ManageAccessControlDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ManageAccessControlDetailsDto)
  @ConditionalValue('manageAccessControl', (value) => value === true)
  manageAccessControlDetails?: ManageAccessControlDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether cyber violations have been reported.' })
  @IsOptional()
  @IsBoolean()
  cyberViolationsReported?: boolean;

  @ApiPropertyOptional({ description: 'Indicates whether cyber violations were reported within 24 hours.' })
  @IsOptional()
  @IsBoolean()
  @ConditionalValue('cyberViolationsReported', (value) => value === true)
  cyberViolationsReported24Hrs?: boolean;

  @ApiPropertyOptional({ description: 'Indicates whether cyber violations have been resolved.' })
  @IsOptional()
  @IsBoolean()
  @ConditionalValue('cyberViolationsReported', (value) => value === true)
  cyberViolationsResolved?: boolean;

  @ApiPropertyOptional({ description: 'Summary of any cyber violations that have occurred.' })
  @IsOptional()
  @IsString()
  @ConditionalValue('cyberViolationsReported', (value) => value === true)
  cyberViolationsSummary?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the organization is interested in a cybersecurity assessment.' })
  @IsOptional()
  @IsBoolean()
  interestedInCybersecurityAssessement?: boolean;

  @ApiPropertyOptional({ description: 'The preferred type of cybersecurity assessment.' })
  @IsOptional()
  @IsString()
  @ConditionalValue('interestedInCybersecurityAssessement', (value) => value === true)
  preferredAssessementType?: string;

  @ApiPropertyOptional({ description: 'Primary follow-up contact for cybersecurity-related matters.', type: PrimaryFollowUpContactDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PrimaryFollowUpContactDto)
  @ConditionalValue('interestedInCybersecurityAssessement', (value) => value === true)
  primaryFollowUpContact?: PrimaryFollowUpContactDto;
}

export class UpdateCybersecurityDto extends PartialType(AddCybersecurityDto) {}
