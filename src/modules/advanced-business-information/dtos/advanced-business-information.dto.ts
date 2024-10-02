import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { DCSAClearance, SFCertificate } from '../enums';

export class AddAdvancedBusinessInformationDto {
  @ApiPropertyOptional({ description: 'Indicates whether the company is licensed.', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  companyLicensing?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.companyLicensing === false || obj.companyLicensing === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return value;
  })
  companyLicensingFiles?: string[];

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  constructionIndustry?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.constructionIndustry === false || obj.constructionIndustry === 'false' ? null : value), { toClassOnly: true })
  constructionIndustryDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the company is licensed.', example: true, required: false })
  @IsString()
  @IsOptional()
  @IsEnum(DCSAClearance)
  @Expose()
  dcsaClearance?: DCSAClearance;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.dcsaClearance === false || obj.dcsaClearance === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return value;
  })
  dcsaClearanceFiles?: string[];

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  foreignOwnershipControl?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.foreignOwnershipControl === false || obj.foreignOwnershipControl === 'false' ? null : value), { toClassOnly: true })
  foreignOwnershipControlDetails?: string;

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  investedByGov?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.investedByGov === false || obj.investedByGov === 'false' ? null : value), { toClassOnly: true })
  investedByGovDetails?: string;

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  participateInForeignTravel?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.participateInForeignTravel === false || obj.participateInForeignTravel === 'false' ? null : value), { toClassOnly: true })
  participateInForeignTravelDetails?: string;

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  participateInTradeShows?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.participateInTradeShows === false || obj.participateInTradeShows === 'false' ? null : value), { toClassOnly: true })
  participateInTradeShowsDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the company is licensed.', example: true, required: false })
  @IsString()
  @IsOptional()
  @IsEnum(SFCertificate)
  @Expose()
  sfCertificate?: SFCertificate;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.sfCertificate === false || obj.sfCertificate === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return value;
  })
  sfCertificateFiles?: string[];

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  regulatoryAction?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.regulatoryAction === false || obj.regulatoryAction === 'false' ? null : value), { toClassOnly: true })
  regulatoryActionDetails?: string;

  @ApiPropertyOptional({ description: 'Indicates whether the company is licensed.', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  convictedOfFelonies?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.convictedOfFelonies === false || obj.convictedOfFelonies === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return value;
  })
  convictedOfFeloniesFiles?: string[];

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  ordersUnderDPAS?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.ordersUnderDPAS === false || obj.ordersUnderDPAS === 'false' ? null : value), { toClassOnly: true })
  ordersUnderDPASDetails?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.ordersUnderDPAS === false || obj.ordersUnderDPAS === 'false' ? null : value), { toClassOnly: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return value;
  })
  ordersUnderDPASFiles?: string[];

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  classifiedGovtContract?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.classifiedGovtContract === false || obj.classifiedGovtContract === 'false' ? null : value), { toClassOnly: true })
  classifiedGovtContractDetails?: string;

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  usInstitutionsContracts?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit as Defendant' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  intellectualPropertyTransfer?: boolean;

  @ApiPropertyOptional({ description: 'Pending Lawsuit Defendant Details' })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.intellectualPropertyTransfer === false || obj.intellectualPropertyTransfer === 'false' ? null : value), { toClassOnly: true })
  intellectualPropertyTransferDetails?: string;
}

export class UpdateAdvancedBusinessInformationDto extends PartialType(AddAdvancedBusinessInformationDto) {}
