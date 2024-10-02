import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PastPerformanceTestimonialsDto {
  @ApiPropertyOptional({ description: 'The ID of the testimonials.' })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({
    description: 'Name of the company providing the testimonial',
  })
  @IsOptional()
  @IsString()
  companyNameProvidingTestimonial?: string;

  @ApiPropertyOptional({
    description: 'Content of the testimonial input',
  })
  @IsOptional()
  @IsString()
  testimonialInput?: string;
}

export class CreatePastPerformanceDto {
  @ApiPropertyOptional({
    description: 'Name of the contract',
  })
  @IsOptional()
  @IsString()
  contractName?: string;

  @ApiPropertyOptional({
    description: 'Name of the contracting agency',
  })
  @IsOptional()
  @IsString()
  contractingAgencyName?: string;

  @ApiPropertyOptional({
    description: 'Type of the contract',
  })
  @IsOptional()
  @IsString()
  contractType?: string;

  @ApiPropertyOptional({
    description: 'Contract number',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  contractNumber?: number;

  @ApiPropertyOptional({
    description: 'Name of the buying agency',
  })
  @IsOptional()
  @IsString()
  buyingAgencyName?: string;

  @ApiPropertyOptional({
    description: 'Supported program record',
  })
  @IsOptional()
  @IsString()
  programRecordSupported?: string;

  @ApiPropertyOptional({
    description: 'Start date of the performance period',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  performancePeriodStartDate?: Date;

  @ApiPropertyOptional({
    description: 'End date of the performance period',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  performancePeriodEndDate?: Date;

  @ApiPropertyOptional({
    description: 'Details of efforts in the project',
  })
  @IsOptional()
  @IsString()
  detailsOfEfforts?: string;

  @ApiPropertyOptional({
    description: 'List of subcontractors and partners',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((item: string) => item.trim());
    } else if (Array.isArray(value)) {
      return value.map((item: string) => (typeof item === 'string' ? item.trim() : item));
    } else {
      return [];
    }
  })
  subcontractorsPartners?: string[];

  @ApiPropertyOptional({
    description: 'Supporting documents',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  supportingDocs?: string[];

  @ApiPropertyOptional({
    description: 'Testimonials related to past performance',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PastPerformanceTestimonialsDto)
  pastPerformanceTestimonials?: PastPerformanceTestimonialsDto[];
}

export class UpdatePastPerformanceDto extends PartialType(CreatePastPerformanceDto) {}

class FilesApiBodyDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  data: any;
}

export class CreatePastPerformanceApiBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  data: string;

  @ApiProperty({ type: [FilesApiBodyDto], isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilesApiBodyDto)
  supportingDocs: FilesApiBodyDto[];
}
