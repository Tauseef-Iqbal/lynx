export interface IBaseCyberSecurityDetails {
  frequency?: string;
  provider?: string;
}

export interface IPenetrationTestingDetails extends IBaseCyberSecurityDetails {}
export interface ICybersecurityTrainingDetails extends IBaseCyberSecurityDetails {}
export interface ICybersecurityAuditsDetails extends IBaseCyberSecurityDetails {}

export interface ICybersecurityStandardsComplianceDetails {
  framework?: string;
  certificationStatus?: string;
  complianceFiles?: Express.Multer.File[];
}

export interface ICybersecurityEncryptionDetails {
  standard?: string;
  provider?: string;
  encryptionFiles?: string[];
}

export interface IForeignEntityInvolvedDetails {
  name?: string;
  countryOfAffiliation?: string;
}

export interface IManageAccessControlDetails {
  frequency?: string;
  accessControlTools?: string;
}

export interface IPrimaryFollowUpContact {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
}
