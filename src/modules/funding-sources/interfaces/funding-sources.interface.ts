import { InvestmentType } from '../enums';

export interface IInvestorDetails {
  name?: string;
  ownershipPercentage?: string;
  investmentType?: InvestmentType;
}
