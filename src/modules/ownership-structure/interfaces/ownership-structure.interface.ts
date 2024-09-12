import { RelationshipType } from '../enums';

export interface ICustomerDetails {
  name?: string;
  country?: string;
  contribution?: string;
}

export interface IAgreementsDetails {
  nameOfEntity?: string;
  organizationType?: string;
  relationshipType?: RelationshipType;
}
