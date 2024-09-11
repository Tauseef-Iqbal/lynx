import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { AddSupplyChainSupplierDto } from './supply-chain-supplier.dto';

export class ImportMaterialsForeignSourcesDetailsDto {
  @ApiPropertyOptional({ description: 'Name of the material' })
  @IsOptional()
  @IsString()
  materialName?: string;

  @ApiPropertyOptional({ description: 'Country of the material' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Percentage of the material from foreign sources', example: 50 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => (typeof value === 'string' ? parseFloat(value) : value))
  percentage?: number;
}

export class RestrictedCountrySuppliersDetailsDto {
  @ApiPropertyOptional({ description: 'Name of the supplier' })
  @IsOptional()
  @IsString()
  supplier?: string;

  @ApiPropertyOptional({ description: 'Country of the supplier' })
  @IsOptional()
  @IsString()
  country?: string;
}

export class ForeignContractualObligationsDetailsDto {
  @ApiPropertyOptional({ description: 'Name of the entity with foreign contractual obligations' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Country associated with the foreign contractual obligation' })
  @IsOptional()
  @IsString()
  country?: string;
}

export class SupplierCybersecurityStandardComplyDetailsDto {
  @ApiPropertyOptional({ description: 'Cybersecurity standard that the supplier complies with' })
  @IsOptional()
  @IsString()
  standard?: string;
}

export class AddSupplyChainDto {
  @ApiPropertyOptional({ description: 'Whether there are supply chain entities' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplyChainEntities?: boolean;

  @ApiPropertyOptional({ description: 'Supply Chain Suppliers Details', type: AddSupplyChainSupplierDto })
  @IsOptional()
  @Type(() => AddSupplyChainSupplierDto)
  @ValidateNested({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.supplyChainEntities === false || obj.supplyChainEntities === 'false' ? null : value), { toClassOnly: true })
  supplyChainSupplier?: AddSupplyChainSupplierDto;

  @ApiPropertyOptional({ description: 'Details of sole source suppliers' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  soleSourceSuppliers?: boolean;

  @ApiPropertyOptional({ description: 'Details of the contingency plan' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.soleSourceSuppliers === false || obj.soleSourceSuppliers === 'false' ? null : value), { toClassOnly: true })
  soleSourceSuppliersDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there is a contingency plan' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  contingencyPlan?: boolean;

  @ApiPropertyOptional({ description: 'Details of the contingency plan' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.contingencyPlan === false || obj.contingencyPlan === 'false' ? null : value), { toClassOnly: true })
  contingencyPlanDetails?: string;

  @ApiPropertyOptional({ description: 'Whether materials are imported from foreign sources' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  importMaterialsForeignSources?: boolean;

  @ApiPropertyOptional({ description: 'Details of materials imported from foreign sources', type: ImportMaterialsForeignSourcesDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImportMaterialsForeignSourcesDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.importMaterialsForeignSources === false || obj.importMaterialsForeignSources === 'false' ? null : value), { toClassOnly: true })
  importMaterialsForeignSourcesDetails?: ImportMaterialsForeignSourcesDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there is a supplier compliance process' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplierComplianceProcess?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier compliance process' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.supplierComplianceProcess === false || obj.supplierComplianceProcess === 'false' ? null : value), { toClassOnly: true })
  supplierComplianceProcessDetails?: string;

  @ApiPropertyOptional({ description: 'Whether supplier tracking origin is present' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplierTrackingOrigin?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier tracking origin' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.supplierTrackingOrigin === false || obj.supplierTrackingOrigin === 'false' ? null : value), { toClassOnly: true })
  supplierTrackingOriginDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there is a counterfeit detection mechanism' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  counterfeitDetectionMechanism?: boolean;

  @ApiPropertyOptional({ description: 'Details of the counterfeit detection mechanism' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.counterfeitDetectionMechanism === false || obj.counterfeitDetectionMechanism === 'false' ? null : value), { toClassOnly: true })
  counterfeitDetectionMechanismDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there is a suppliers banned list' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  suppliersBannedList?: boolean;

  @ApiPropertyOptional({ description: 'Files related to the suppliers banned list', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.suppliersBannedList === false || obj.suppliersBannedList === 'false' ? null : value), { toClassOnly: true })
  suppliersBannedListFiles?: string[] = null;

  @ApiPropertyOptional({ description: 'Whether there are OEM licensed resellers' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  oemLicensedResellers?: boolean;

  @ApiPropertyOptional({ description: 'Details of OEM licensed resellers' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.oemLicensedResellers === false || obj.oemLicensedResellers === 'false' ? null : value), { toClassOnly: true })
  oemLicensedResellersDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there are restricted country suppliers' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  restrictedCountrySuppliers?: boolean;

  @ApiPropertyOptional({ description: 'Details of suppliers from restricted countries', type: RestrictedCountrySuppliersDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RestrictedCountrySuppliersDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.restrictedCountrySuppliers === false || obj.restrictedCountrySuppliers === 'false' ? null : value), { toClassOnly: true })
  restrictedCountrySuppliersDetails?: RestrictedCountrySuppliersDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there are foreign contractual obligations' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  foreignContractualObligations?: boolean;

  @ApiPropertyOptional({ description: 'Details of foreign contractual obligations', type: ForeignContractualObligationsDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ForeignContractualObligationsDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignContractualObligations === false || obj.foreignContractualObligations === 'false' ? null : value), { toClassOnly: true })
  foreignContractualObligationsDetails?: ForeignContractualObligationsDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there is foreign interest of 10% or more' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  foreignInterest10Percent?: boolean;

  @ApiPropertyOptional({ description: 'Details of foreign interest of 10% or more' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignInterest10Percent === false || obj.foreignInterest10Percent === 'false' ? null : value), { toClassOnly: true })
  foreignInterest10PercentDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there are supply chain cybersecurity audits' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplyChainCybersecurityAudits?: boolean;

  @ApiPropertyOptional({ description: 'Details of supply chain cybersecurity audits' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.supplyChainCybersecurityAudits === false || obj.supplyChainCybersecurityAudits === 'false' ? null : value), { toClassOnly: true })
  supplyChainCybersecurityAuditsDetails?: string;

  @ApiPropertyOptional({ description: 'Whether suppliers comply with cybersecurity standards' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplierCybersecurityStandardComply?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier cybersecurity standard compliance', type: SupplierCybersecurityStandardComplyDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierCybersecurityStandardComplyDetailsDto)
  @Expose()
  @Transform(({ obj, value }) => (obj.supplierCybersecurityStandardComply === false || obj.supplierCybersecurityStandardComply === 'false' ? null : value), { toClassOnly: true })
  supplierCybersecurityStandardComplyDetails?: SupplierCybersecurityStandardComplyDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there have been supplier cybersecurity breaches' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplierCybersecurityBreach?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier cybersecurity breaches' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.supplierCybersecurityBreach === false || obj.supplierCybersecurityBreach === 'false' ? null : value), { toClassOnly: true })
  supplierCybersecurityBreachDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there is CUI protection in supplier contracts' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  cuiProtectionSupplierContract?: boolean;

  @ApiPropertyOptional({ description: 'Details of CUI protection in supplier contracts' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.cuiProtectionSupplierContract === false || obj.cuiProtectionSupplierContract === 'false' ? null : value), { toClassOnly: true })
  cuiProtectionSupplierContractDetails?: string;

  @ApiPropertyOptional({ description: 'Whether suppliers have ethical practices contracts' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplierEthicalPracticesContract?: boolean;

  @ApiPropertyOptional({ description: 'Files related to supplier ethical practices contracts', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.supplierEthicalPracticesContract === false || obj.supplierEthicalPracticesContract === 'false' ? null : value), { toClassOnly: true })
  supplierEthicalPracticesContractFiles?: string[];

  @ApiPropertyOptional({ description: 'Whether suppliers comply with sustainability contracts' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  supplierSustainabilityComplianceContract?: boolean;

  @ApiPropertyOptional({ description: 'Files related to supplier sustainability contracts', type: [String] })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.supplierSustainabilityComplianceContract === false || obj.supplierSustainabilityComplianceContract === 'false' ? null : value), { toClassOnly: true })
  supplierSustainabilityComplianceContractDetails?: string;
}

export class UpdateSupplyChainDto extends PartialType(AddSupplyChainDto) {}
