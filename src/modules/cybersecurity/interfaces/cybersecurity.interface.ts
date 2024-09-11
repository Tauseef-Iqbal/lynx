export interface IBaseCyberSecurityDetails {
  frequency?: string;
  provider?: string;
}

export interface IPenetrationTestingDetails extends IBaseCyberSecurityDetails {}
export interface ICybersecurityTrainingDetails extends IBaseCyberSecurityDetails {}
export interface ICybersecurityAuditsDetails extends IBaseCyberSecurityDetails {}

export interface ICybersecurityStandardsCompliantDetails {
  framework?: string;
  certificationStatus?: string;
}

export interface IEncryptDataDetails {
  standard?: string;
  provider?: string;
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

export interface CybersecurityFiles {
  cybersecurityStandardsCompliantFiles?: Express.Multer.File[];
  encryptDataFiles?: Express.Multer.File[];
}
