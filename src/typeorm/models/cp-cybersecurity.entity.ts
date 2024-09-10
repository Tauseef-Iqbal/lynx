import { ICybersecurityAuditsDetails, ICybersecurityStandardsCompliantDetails, ICybersecurityTrainingDetails, IEncryptDataDetails, IForeignEntityInvolvedDetails, IManageAccessControlDetails, IPenetrationTestingDetails, IPrimaryFollowUpContact } from 'src/modules/cybersecurity/interfaces';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_cybersecurity' })
export class CPCybersecurityEntity extends CustomBaseEntity {
  @Column({ name: 'cybersecurity_team', type: 'boolean', nullable: true })
  cybersecurityTeam?: boolean;

  @Column({ name: 'cybersecurity_team_details', type: 'text', nullable: true })
  cybersecurityTeamDetails?: string;

  @Column({ name: 'cybersecurity_policy', type: 'boolean', nullable: true })
  cybersecurityPolicy?: boolean;

  @Column({ name: 'cybersecurity_policy_details', type: 'text', nullable: true })
  cybersecurityPolicyDetails?: string;

  @Column({ name: 'penetration_testing', type: 'boolean', nullable: true })
  penetrationTesting?: boolean;

  @Column({ name: 'penetration_testing_details', type: 'jsonb', nullable: true })
  penetrationTestingDetails?: IPenetrationTestingDetails;

  @Column({ name: ' cybersecurity_standards_compliant', type: 'boolean', nullable: true })
  cybersecurityStandardsCompliant?: boolean;

  @Column({ name: 'cybersecurity_standards_compliant_details', type: 'jsonb', nullable: true })
  cybersecurityStandardsCompliantDetails?: ICybersecurityStandardsCompliantDetails;

  @Column({ name: ' incident_response_plan', type: 'boolean', nullable: true })
  incidentResponsePlan?: boolean;

  @Column({ name: 'last_incident', type: 'date', nullable: true })
  lastIncident?: Date;

  @Column({ name: 'cybersecurity_training', type: 'boolean', nullable: true })
  cybersecurityTraining?: boolean;

  @Column({ name: 'cybersecurity_training_details', type: 'jsonb', nullable: true })
  cybersecurityTrainingDetails?: ICybersecurityTrainingDetails;

  @Column({ name: 'encrypt_data', type: 'boolean', nullable: true })
  encryptData?: boolean;

  @Column({ name: 'encrypt_data_details', type: 'jsonb', nullable: true })
  encryptDataDetails?: IEncryptDataDetails;

  @Column({ name: 'cybersecurity_audits', type: 'boolean', nullable: true })
  cybersecurityAudits?: boolean;

  @Column({ name: 'cybersecurity_audits_details', type: 'jsonb', nullable: true })
  cybersecurityAuditsDetails?: ICybersecurityAuditsDetails;

  @Column({ name: 'foreign_entity_involved', type: 'boolean', nullable: true })
  foreignEntityInvolved?: boolean;

  @Column({ name: 'foreign_entity_involved_details', type: 'jsonb', nullable: true })
  foreignEntityInvolvedDetails?: IForeignEntityInvolvedDetails;

  @Column({ name: 'manage_access_control', type: 'boolean', nullable: true })
  manageAccessControl?: boolean;

  @Column({ name: 'manage_access_control_details', type: 'jsonb', nullable: true })
  manageAccessControlDetails?: IManageAccessControlDetails;

  @Column({ name: 'cyber_violations_reported', type: 'boolean', nullable: true })
  cyberViolationsReported?: boolean;

  @Column({ name: 'cyber_violations_reported_24_hrs', type: 'boolean', nullable: true })
  cyberViolationsReported24Hrs?: boolean;

  @Column({ name: 'cyber_violations_resolved', type: 'boolean', nullable: true })
  cyberViolationsResolved?: boolean;

  @Column({ name: 'cyber_violations_summary', type: 'text', nullable: true })
  cyberViolationsSummary?: string;

  @Column({ name: 'interested_in_ cybersecurity_assessement', type: 'boolean', nullable: true })
  interestedInCybersecurityAssessement?: boolean;

  @Column({ name: 'preferred_assessement_type', type: 'text', nullable: true })
  preferredAssessementType?: string;

  @Column({ name: 'primary_follow_up_contact', type: 'jsonb', nullable: true })
  primaryFollowUpContact?: IPrimaryFollowUpContact;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.toolsAndApplications, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;
}
