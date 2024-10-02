import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { IBaseCyberSecurityDetails, IForeignEntityInvolvedDetails, IManageAccessControlDetails, IPrimaryFollowUpContact } from 'src/modules/cybersecurity/interfaces';
import { CybersecurityStandardsComplianceDetailsDto } from './cybersecurity-standards-compliance-details.dto';
import { CybersecurityEncryptionDetailsDto } from './cybersecurity-encryption-details.dto';

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
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cybersecurityTeam?: string;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity team.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.cybersecurityTeam === false || obj.cybersecurityTeam === 'false' ? null : value), { toClassOnly: true })
  cybersecurityTeamDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the organization has a cybersecurity policy.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cybersecurityPolicy?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity policy.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.cybersecurityPolicy === false ? null : value), { toClassOnly: true })
  cybersecurityPolicyDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the organization conducts penetration testing.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  penetrationTesting?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s penetration testing activities.', type: PenetrationTestingDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PenetrationTestingDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.penetrationTesting === false || obj.penetrationTesting === 'false' ? null : value), { toClassOnly: true })
  penetrationTestingDetails?: PenetrationTestingDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization complies with cybersecurity standards.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cybersecurityStandardsCompliant?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s compliance with cybersecurity standards.', type: CybersecurityStandardsComplianceDetailsDto })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CybersecurityStandardsComplianceDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.cybersecurityStandardsCompliant === false || obj.cybersecurityStandardsCompliant === 'false' ? null : value), { toClassOnly: true })
  cybersecurityStandardsComplianceDetails?: CybersecurityStandardsComplianceDetailsDto[];

  @ApiPropertyOptional({ description: 'Indicates whether the organization has an incident response plan.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true, { toClassOnly: true })
  incidentResponsePlan?: boolean;

  @ApiPropertyOptional({ description: 'The date of the last cybersecurity incident.' })
  @IsOptional()
  @IsDate()
  @Expose()
  @Transform(({ obj, value }) => (obj.incidentResponsePlan === false || obj.incidentResponsePlan === 'false' ? null : new Date(value)), { toClassOnly: true })
  lastIncident?: Date;

  @ApiPropertyOptional({ description: 'Indicates whether the organization conducts cybersecurity training.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cybersecurityTraining?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity training activities.', type: CybersecurityTrainingDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CybersecurityTrainingDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.cybersecurityTraining === false || obj.cybersecurityTraining === 'false' ? null : value), { toClassOnly: true })
  cybersecurityTrainingDetails?: CybersecurityTrainingDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization encrypts its data.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  encryptData?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s data encryption activities.', type: CybersecurityEncryptionDetailsDto })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CybersecurityEncryptionDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.encryptData === false || obj.encryptData === 'false' ? null : value), { toClassOnly: true })
  cybersecurityEncryptionDetails?: CybersecurityEncryptionDetailsDto[];

  @ApiPropertyOptional({ description: 'Indicates whether the organization conducts cybersecurity audits.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cybersecurityAudits?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s cybersecurity audits.', type: CybersecurityAuditsDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CybersecurityAuditsDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.cybersecurityAudits === false || obj.cybersecurityAudits === 'false' ? null : value), { toClassOnly: true })
  cybersecurityAuditsDetails?: CybersecurityAuditsDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether a foreign entity is involved in cybersecurity activities.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  foreignEntityInvolved?: boolean;

  @ApiPropertyOptional({ description: 'Details about the involvement of foreign entities in cybersecurity activities.', type: ForeignEntityInvolvedDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ForeignEntityInvolvedDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignEntityInvolved === false || obj.foreignEntityInvolved === 'false' ? null : value), { toClassOnly: true })
  foreignEntityInvolvedDetails?: ForeignEntityInvolvedDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether the organization manages access control for its systems.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  manageAccessControl?: boolean;

  @ApiPropertyOptional({ description: 'Details about the organization’s access control management activities.', type: ManageAccessControlDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ManageAccessControlDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.manageAccessControl === false || obj.manageAccessControl === 'false' ? null : value), { toClassOnly: true })
  manageAccessControlDetails?: ManageAccessControlDetailsDto;

  @ApiPropertyOptional({ description: 'Indicates whether cyber violations have been reported.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cyberViolationsReported?: boolean;

  @ApiPropertyOptional({ description: 'Indicates whether cyber violations were reported within 24 hours.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.cyberViolationsReported === false || obj.cyberViolationsReported === 'false' ? null : value), { toClassOnly: true })
  cyberViolationsReported24Hrs?: boolean;

  @ApiPropertyOptional({ description: 'Indicates whether cyber violations have been resolved.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.cyberViolationsReported === false || obj.cyberViolationsReported === 'false' ? null : value), { toClassOnly: true })
  cyberViolationsResolved?: boolean;

  @ApiPropertyOptional({ description: 'Summary of any cyber violations that have occurred.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.cyberViolationsReported === false || obj.cyberViolationsReported === 'false' ? null : value), { toClassOnly: true })
  cyberViolationsSummary?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the organization is interested in a cybersecurity assessment.' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  interestedInCybersecurityAssessement?: boolean;

  @ApiPropertyOptional({ description: 'The preferred type of cybersecurity assessment.' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.interestedInCybersecurityAssessement === false || obj.interestedInCybersecurityAssessement === 'false' ? null : value), { toClassOnly: true })
  preferredAssessementType?: string;

  @ApiPropertyOptional({ description: 'Primary follow-up contact for cybersecurity-related matters.', type: PrimaryFollowUpContactDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PrimaryFollowUpContactDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.interestedInCybersecurityAssessement === false || obj.interestedInCybersecurityAssessement === 'false' ? null : value), { toClassOnly: true })
  primaryFollowUpContact?: PrimaryFollowUpContactDto;
}

export class UpdateCybersecurityDto extends PartialType(AddCybersecurityDto) {}
