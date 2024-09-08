export interface IImportMaterialsForeignSourcesDetails {
  materialName?: string;
  country?: string;
  percentage?: number;
}

export interface IRestrictedCountrySuppliersDetails {
  supplier?: string;
  country?: string;
}

export interface IForeignContractualObligationsDetails {
  name?: string;
  country?: string;
}

export interface ISupplierCybersecurityStandardComplyDetails {
  standard?: string;
}

export interface SupplyChainFiles {
  suppliersBannedListFiles?: Express.Multer.File[];
  supplierEthicalPracticesContractFiles?: Express.Multer.File[];
}
