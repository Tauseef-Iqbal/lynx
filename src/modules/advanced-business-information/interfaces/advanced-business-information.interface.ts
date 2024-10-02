export interface ICapacityInfoDetails {
  fitstName?: string;
  cageCode?: string;
  date?: Date;
  contractDuration: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface AdvancedBusinessInformationFiles {
  industrySpecificFiles?: Express.Multer.File[];
  businessPlanFiles?: Express.Multer.File[];
  certificateStatusFiles?: Express.Multer.File[];
  convictedOfFeloniesFiles?: Express.Multer.File[];
  ordersUnderDPASFiles?: Express.Multer.File[];
}
