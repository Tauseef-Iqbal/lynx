import { IForeignContractualObligationsDetails, IImportMaterialsForeignSourcesDetails, IRestrictedCountrySuppliersDetails, ISupplierCybersecurityStandardComplyDetails } from 'src/modules/supply-chain/interfaces';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CompanyProfileEntity } from './company-profile.entity';
import { CPSupplyChainSupplierEntity } from './cp-supply-chain-supplier.entity';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'cp_supply_chain' })
export class CPSupplyChainEntity extends CustomBaseEntity {
  @Column({ name: 'supply_chain_entities', type: 'boolean', nullable: true })
  supplyChainEntities?: boolean;

  @Column({ name: 'sole_source_suppliers', type: 'text', nullable: true })
  soleSourceSuppliers?: string;

  @Column({ name: 'contingency_plan', type: 'boolean', nullable: true })
  contingencyPlan?: boolean;

  @Column({ name: 'contingency_plan_details', type: 'text', nullable: true })
  contingencyPlanDetails?: string;

  @Column({ name: 'import_materials_foreign_sources', type: 'boolean', nullable: true })
  importMaterialsForeignSources?: boolean;

  @Column({ name: 'import_materials_foreign_sources_details', type: 'jsonb', nullable: true })
  importMaterialsForeignSourcesDetails?: IImportMaterialsForeignSourcesDetails;

  @Column({ name: 'supplier_compliance_process', type: 'boolean', nullable: true })
  supplierComplianceProcess?: boolean;

  @Column({ name: 'supplier_compliance_process_details', type: 'text', nullable: true })
  supplierComplianceProcessDetails?: string;

  @Column({ name: 'supplier_tracking_origin', type: 'boolean', nullable: true })
  supplierTrackingOrigin?: boolean;

  @Column({ name: 'supplier_tracking_origin_details', type: 'text', nullable: true })
  supplierTrackingOriginDetails?: string;

  @Column({ name: 'counterfeit_detection_mechanism', type: 'boolean', nullable: true })
  counterfeitDetectionMechanism?: boolean;

  @Column({ name: 'counterfeit_detection_mechanism_details', type: 'text', nullable: true })
  counterfeitDetectionMechanismDetails?: string;

  @Column({ name: 'suppliers_banned_list', nullable: true, type: 'boolean' })
  suppliersBannedList?: boolean;

  @Column({ name: 'suppliers_banned_list_files', type: 'text', array: true, nullable: true })
  suppliersBannedListFiles?: string[];

  @Column({ name: 'oem_licensed_resellers', type: 'boolean', nullable: true })
  oemLicensedResellers?: boolean;

  @Column({ name: 'oem_licensed_resellers_details', type: 'text', nullable: true })
  oemLicensedResellersDetails?: string;

  @Column({ name: 'restricted_country_suppliers', type: 'boolean', nullable: true })
  restrictedCountrySuppliers?: boolean;

  @Column({ name: 'restricted_country_suppliers_details', type: 'jsonb', nullable: true })
  restrictedCountrySuppliersDetails?: IRestrictedCountrySuppliersDetails;

  @Column({ name: 'foreign_contractual_obligations', type: 'boolean', nullable: true })
  foreignContractualObligations?: boolean;

  @Column({ name: 'foreign_contractual_obligations_details', type: 'jsonb', nullable: true })
  foreignContractualObligationsDetails?: IForeignContractualObligationsDetails;

  @Column({ name: 'foreign_interest_10_percent', type: 'boolean', nullable: true })
  foreignInterest10Percent?: boolean;

  @Column({ name: 'foreign_interest_10_percent_details', type: 'text', nullable: true })
  foreignInterest10PercentDetails?: string;

  @Column({ name: 'supply_chain_cybersecurity_audits', type: 'boolean', nullable: true })
  supplyChainCybersecurityAudits?: boolean;

  @Column({ name: 'supply_chain_cybersecurity_audits_details', type: 'text', nullable: true })
  supplyChainCybersecurityAuditsDetails?: string;

  @Column({ name: 'supplier_cybersecurity_standard_comply', type: 'boolean', nullable: true })
  supplierCybersecurityStandardComply?: boolean;

  @Column({ name: 'supplier_cybersecurity_standard_comply_details', type: 'jsonb', nullable: true })
  supplierCybersecurityStandardComplyDetails?: ISupplierCybersecurityStandardComplyDetails;

  @Column({ name: 'supplier_cybersecurity_breach', type: 'boolean', nullable: true })
  supplierCybersecurityBreach?: boolean;

  @Column({ name: 'supplier_cybersecurity_breach_details', type: 'text', nullable: true })
  supplierCybersecurityBreachDetails?: string;

  @Column({ name: 'cui_protection_supplier_contract', type: 'boolean', nullable: true })
  cuiProtectionSupplierContract?: boolean;

  @Column({ name: 'cui_protection_supplier_contract_details', type: 'text', nullable: true })
  cuiProtectionSupplierContractDetails?: string;

  @Column({ name: 'supplier_ethical_practices_contract', nullable: true, type: 'boolean' })
  supplierEthicalPracticesContract?: boolean;

  @Column({ name: 'supplier_ethical_practices_contract_files', type: 'text', array: true, nullable: true })
  supplierEthicalPracticesContractFiles?: string[];

  @Column({ name: 'supplier_sustainability_compliance_contract', type: 'boolean', nullable: true })
  supplierSustainabilityComplianceContract?: boolean;

  @Column({ name: 'supplier_sustainability_compliance_contract_details', type: 'text', nullable: true })
  supplierSustainabilityComplianceContractDetails?: string;

  @Index()
  @OneToOne(() => CompanyProfileEntity, (companyProfile) => companyProfile.toolsAndApplications, {
    nullable: false,
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cp_id' })
  companyProfile: CompanyProfileEntity;

  @OneToOne(() => CPSupplyChainSupplierEntity, (supplyChainSupplier) => supplyChainSupplier.supplyChain, {
    cascade: ['insert', 'update'],
  })
  supplyChainSupplier: CPSupplyChainSupplierEntity;
}
