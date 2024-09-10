import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ICapacityInfoDetails } from 'src/modules/advanced-business-information/interfaces';
import { CertificateStatus, ClearanceStatus } from '../enums';

export function stringToBoolean(value: string): boolean {
  return value?.toString()?.toLowerCase() === 'true';
}

export function TransformBoolean() {
  return Transform(({ value }) => stringToBoolean(value));
}

export class CPAdvancedBusinessInformationDto {
  @ApiProperty({
    description: 'Indicates whether the company is licensed.',
    example: true,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  companyLicensing?: boolean;

  @ApiProperty({
    description: 'List of industry-specific files.',
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  industrySpecificFiles?: string[];

  @ApiProperty({
    description: 'Indicates whether the business elements are present.',
    example: false,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  businessElements?: boolean;

  @ApiProperty({
    description: 'Details about the business elements.',
    example: 'Contains information about the business elements.',
    required: false,
  })
  @IsOptional()
  @IsString()
  businessElementsDetails?: string;

  @ApiProperty({
    description: 'Status of the DCSA clearance.',
    example: 'Hold',
    enum: ClearanceStatus,
  })
  @IsOptional()
  @IsEnum(ClearanceStatus)
  dcsaClearanceStatus?: ClearanceStatus;

  @ApiProperty({
    description: 'List of business plan files.',
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  businessPlanFiles?: string[];

  @ApiProperty({
    description: 'Information about facility and capacity.',
    example: { capacity: 100, location: 'Warehouse A' },
    required: false,
    type: Object,
  })
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  facilityAndCapacityInformation?: ICapacityInfoDetails;

  @ApiProperty({
    description: 'Indicates whether there is foreign ownership control.',
    example: false,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  foreignOwnershipControl?: boolean;

  @ApiProperty({
    description: 'Details about foreign ownership control.',
    example: 'Foreign ownership is less than 25%.',
    required: false,
  })
  @IsOptional()
  @IsString()
  foreignOwnershipControlDetails?: string;

  @ApiProperty({
    description: 'Indicates whether the business is invested by government.',
    example: true,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  investedByGov?: boolean;

  @ApiProperty({
    description: 'Details about government investment.',
    example: 'Government owns 10% of the business.',
    required: false,
  })
  @IsOptional()
  @IsString()
  investedByGovDetails?: string;

  @ApiProperty({
    description: 'Indicates whether the business participates in foreign travel.',
    example: true,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  participateInForeignTravel?: boolean;

  @ApiProperty({
    description: 'Details about participation in foreign travel.',
    example: 'Participates in international trade shows.',
    required: false,
  })
  @IsOptional()
  @IsString()
  participateInForeignTravelDetails?: string;

  @ApiProperty({
    description: 'Indicates whether the business participates in trade shows.',
    example: false,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  participateInTradeShows?: boolean;

  @ApiProperty({
    description: 'Details about participation in trade shows.',
    example: 'Participates in local and international trade shows.',
    required: false,
  })
  @IsOptional()
  @IsString()
  participateInTradeShowsDetails?: string;

  @ApiProperty({
    description: 'Status of the SF certificate.',
    example: 'In-progress',
    enum: CertificateStatus,
  })
  @IsOptional()
  @IsEnum(CertificateStatus)
  certificateStatus?: CertificateStatus;

  @ApiProperty({
    description: 'List of SF certificate files.',
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certificateStatusFiles?: string[];

  @ApiProperty({
    description: 'Indicates whether there is any regularity action.',
    example: false,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  regularityAction?: boolean;

  @ApiProperty({
    description: 'Details about any regularity action.',
    example: 'No regularity actions pending.',
    required: false,
  })
  @IsOptional()
  @IsString()
  regularityActionDetails?: string;

  @ApiProperty({
    description: 'Indicates whether there have been convictions of felonies.',
    example: false,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  convictedOfFelonies?: boolean;

  @ApiProperty({
    description: 'List of files related to felony convictions.',
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  convictedOfFeloniesFiles?: string[];

  @ApiProperty({
    description: 'Indicates whether there are orders under DPAS.',
    example: true,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  ordersUnderDPAS?: boolean;

  @ApiProperty({
    description: 'Details about orders under DPAS.',
    example: 'Orders under DPAS are being processed.',
    required: false,
  })
  @IsOptional()
  @IsString()
  ordersUnderDPASDetails?: string;

  @ApiProperty({
    description: 'List of files related to orders under DPAS.',
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ordersUnderDPASFiles?: string[];

  @ApiProperty({
    description: 'Indicates whether there is a classified government contract.',
    example: false,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  hasClassifiedGovtContract?: boolean;

  @ApiProperty({
    description: 'Details about the classified government contract.',
    example: 'Has a classified contract with the Department of Defense.',
    required: false,
  })
  @IsOptional()
  @IsString()
  hasClassifiedGovtContractDetails?: string;

  @ApiProperty({
    description: 'Indicates whether there is IP transfer.',
    example: true,
    required: false,
  })
  @IsOptional()
  @TransformBoolean()
  hasIPTransfer?: boolean;

  @ApiProperty({
    description: 'Details about IP transfer.',
    example: 'IP transfer details not available.',
    required: false,
  })
  @IsOptional()
  @IsString()
  hasIPTransferDetails?: string;
}

export class UpdateCPAdvancedBusinessInformationDto extends PartialType(CPAdvancedBusinessInformationDto) {}
