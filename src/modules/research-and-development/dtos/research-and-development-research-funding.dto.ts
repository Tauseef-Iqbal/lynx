import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ResearchAndDevelopmentResearchFundingDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({
    description: 'Name of the funding',
    example: 'AI Research Grant',
  })
  @IsOptional()
  @IsString()
  fundingName?: string;

  @ApiPropertyOptional({
    description: 'Agency providing the funding',
    example: 'National Science Foundation',
  })
  @IsOptional()
  @IsString()
  fundingAgency?: string;

  @ApiPropertyOptional({
    description: 'Principal investigators involved in the research',
    example: ['Dr. Alice Johnson', 'Dr. Bob Smith'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  principalInvestigators?: string[];

  @ApiPropertyOptional({
    description: 'Name of the publication related to the funding',
    example: 'Journal of AI Research',
  })
  @IsOptional()
  @IsString()
  publicationName?: string;

  @ApiPropertyOptional({
    description: 'Amount awarded for the research funding',
    example: 100000.0,
  })
  @IsOptional()
  @IsDecimal()
  awardAmount?: number;

  @ApiPropertyOptional({
    description: 'Start date of the funding period',
    example: '2022-01-01',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fundingStartDate?: Date;

  @ApiPropertyOptional({
    description: 'End date of the funding period',
    example: '2023-12-31',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fundingEndDate?: Date;

  @ApiPropertyOptional({
    description: 'DOI link of the research',
    example: 'https://doi.org/10.1234/example',
  })
  @IsOptional()
  @IsString()
  DOILink?: string;

  @ApiPropertyOptional({
    description: 'Field of research for which funding is provided',
    example: 'Artificial Intelligence',
  })
  @IsOptional()
  @IsString()
  researchField?: string;

  @ApiPropertyOptional({
    description: 'Description of the research project',
    example: 'Research project focusing on developing advanced AI algorithms.',
  })
  @IsOptional()
  @IsString()
  projectDescription?: string;
}
