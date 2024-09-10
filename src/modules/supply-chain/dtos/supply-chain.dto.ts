import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AddSupplyChainSupplierDto } from './supply-chain-supplier.dto';
import { ConditionalValue } from 'src/shared/validators';
import { TransformBoolean } from 'src/modules/advanced-business-information/dtos/cp-advanced-business-info.dto';

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
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplyChainEntities?: boolean;

  @ApiPropertyOptional({ description: 'Supply Chain Suppliers Details', type: AddSupplyChainSupplierDto })
  @IsOptional()
  @Type(() => AddSupplyChainSupplierDto)
  @ValidateNested({ each: true })
  @ConditionalValue('supplyChainEntities', (value) => value === true)
  supplyChainSupplier?: AddSupplyChainSupplierDto;

  @ApiPropertyOptional({ description: 'Details of sole source suppliers' })
  @IsOptional()
  @IsString()
  soleSourceSuppliers?: string;

  @ApiPropertyOptional({ description: 'Whether there is a contingency plan' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  contingencyPlan?: boolean;

  @ApiPropertyOptional({ description: 'Details of the contingency plan' })
  @IsOptional()
  @IsString()
  @ConditionalValue('contingencyPlan', (value) => value === true)
  contingencyPlanDetails?: string;

  @ApiPropertyOptional({ description: 'Whether materials are imported from foreign sources' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  importMaterialsForeignSources?: boolean;

  @ApiPropertyOptional({ description: 'Details of materials imported from foreign sources', type: ImportMaterialsForeignSourcesDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImportMaterialsForeignSourcesDetailsDto)
  @ConditionalValue('importMaterialsForeignSources', (value) => value === true)
  importMaterialsForeignSourcesDetails?: ImportMaterialsForeignSourcesDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there is a supplier compliance process' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplierComplianceProcess?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier compliance process' })
  @IsOptional()
  @IsString()
  @ConditionalValue('supplierComplianceProcess', (value) => value === true)
  supplierComplianceProcessDetails?: string;

  @ApiPropertyOptional({ description: 'Whether supplier tracking origin is present' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplierTrackingOrigin?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier tracking origin' })
  @IsOptional()
  @IsString()
  @ConditionalValue('supplierTrackingOrigin', (value) => value === true)
  supplierTrackingOriginDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there is a counterfeit detection mechanism' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  counterfeitDetectionMechanism?: boolean;

  @ApiPropertyOptional({ description: 'Details of the counterfeit detection mechanism' })
  @IsOptional()
  @IsString()
  @ConditionalValue('counterfeitDetectionMechanism', (value) => value === true)
  counterfeitDetectionMechanismDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there is a suppliers banned list' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  suppliersBannedList?: boolean;

  @ApiPropertyOptional({ description: 'Files related to the suppliers banned list', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalValue('suppliersBannedList', (value) => value === true)
  suppliersBannedListFiles?: string[];

  @ApiPropertyOptional({ description: 'Whether there are OEM licensed resellers' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  oemLicensedResellers?: boolean;

  @ApiPropertyOptional({ description: 'Details of OEM licensed resellers' })
  @IsOptional()
  @IsString()
  @ConditionalValue('oemLicensedResellers', (value) => value === true)
  oemLicensedResellersDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there are restricted country suppliers' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  restrictedCountrySuppliers?: boolean;

  @ApiPropertyOptional({ description: 'Details of suppliers from restricted countries', type: RestrictedCountrySuppliersDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RestrictedCountrySuppliersDetailsDto)
  @ConditionalValue('restrictedCountrySuppliers', (value) => value === true)
  restrictedCountrySuppliersDetails?: RestrictedCountrySuppliersDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there are foreign contractual obligations' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  foreignContractualObligations?: boolean;

  @ApiPropertyOptional({ description: 'Details of foreign contractual obligations', type: ForeignContractualObligationsDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ForeignContractualObligationsDetailsDto)
  @ConditionalValue('foreignContractualObligations', (value) => value === true)
  foreignContractualObligationsDetails?: ForeignContractualObligationsDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there is foreign interest of 10% or more' })
  @IsOptional()
  @TransformBoolean()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  foreignInterest10Percent?: boolean;

  @ApiPropertyOptional({ description: 'Details of foreign interest of 10% or more' })
  @IsOptional()
  @IsString()
  @ConditionalValue('foreignInterest10Percent', (value) => value === true)
  foreignInterest10PercentDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there are supply chain cybersecurity audits' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplyChainCybersecurityAudits?: boolean;

  @ApiPropertyOptional({ description: 'Details of supply chain cybersecurity audits' })
  @IsOptional()
  @IsString()
  @ConditionalValue('supplyChainCybersecurityAudits', (value) => value === true)
  supplyChainCybersecurityAuditsDetails?: string;

  @ApiPropertyOptional({ description: 'Whether suppliers comply with cybersecurity standards' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplierCybersecurityStandardComply?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier cybersecurity standard compliance', type: SupplierCybersecurityStandardComplyDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierCybersecurityStandardComplyDetailsDto)
  @ConditionalValue('supplierCybersecurityStandardComply', (value) => value === true)
  supplierCybersecurityStandardComplyDetails?: SupplierCybersecurityStandardComplyDetailsDto;

  @ApiPropertyOptional({ description: 'Whether there have been supplier cybersecurity breaches' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplierCybersecurityBreach?: boolean;

  @ApiPropertyOptional({ description: 'Details of supplier cybersecurity breaches' })
  @IsOptional()
  @IsString()
  @ConditionalValue('supplierCybersecurityBreach', (value) => value === true)
  supplierCybersecurityBreachDetails?: string;

  @ApiPropertyOptional({ description: 'Whether there is CUI protection in supplier contracts' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  cuiProtectionSupplierContract?: boolean;

  @ApiPropertyOptional({ description: 'Details of CUI protection in supplier contracts' })
  @IsOptional()
  @IsString()
  @ConditionalValue('cuiProtectionSupplierContract', (value) => value === true)
  cuiProtectionSupplierContractDetails?: string;

  @ApiPropertyOptional({ description: 'Whether suppliers have ethical practices contracts' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplierEthicalPracticesContract?: boolean;

  @ApiPropertyOptional({ description: 'Files related to supplier ethical practices contracts', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ConditionalValue('supplierEthicalPracticesContract', (value) => value === true)
  supplierEthicalPracticesContractFiles?: string[];

  @ApiPropertyOptional({ description: 'Whether suppliers comply with sustainability contracts' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  supplierSustainabilityComplianceContract?: boolean;

  @ApiPropertyOptional({ description: 'Files related to supplier sustainability contracts', type: [String] })
  @IsOptional()
  @IsString()
  @ConditionalValue('supplierSustainabilityComplianceContract', (value) => value === true)
  supplierSustainabilityComplianceContractDetails?: string;
}

export class UpdateSupplyChainDto extends PartialType(AddSupplyChainDto) {}
