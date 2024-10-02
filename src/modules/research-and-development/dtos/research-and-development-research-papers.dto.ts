import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ResearchAndDevelopmentResearchPapersDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (![undefined, null, ''].includes(value) ? Number(value) : value))
  id?: number;

  @ApiPropertyOptional({
    description: 'Title of the research paper',
    example: 'Quantum Entanglement in Particle Physics',
  })
  @IsOptional()
  @IsString()
  paperTitle?: string;

  @ApiPropertyOptional({
    description: 'Authors of the research paper',
    example: ['Dr. Alice Johnson', 'Dr. Bob Smith'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  authors?: string[];

  @ApiPropertyOptional({
    description: 'Name of the publication where the paper was published',
    example: 'Journal of Advanced Physics',
  })
  @IsOptional()
  @IsString()
  publicationName?: string;

  @ApiPropertyOptional({
    description: 'Date of publication of the paper',
    example: '2024-02-15',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfPublication?: Date;

  @ApiPropertyOptional({
    description: 'DOI link to the research paper',
    example: 'https://doi.org/10.1000/xyz123',
  })
  @IsOptional()
  @IsString()
  DOILink?: string;

  @ApiPropertyOptional({
    description: 'Field of research related to the paper',
    example: 'Quantum Physics',
  })
  @IsOptional()
  @IsString()
  researchField?: string;

  @ApiPropertyOptional({
    description: 'Associated grant information for the research paper',
    example: 'Grant No. 1234-QT',
  })
  @IsOptional()
  @IsString()
  associatedGrant?: string;

  @ApiPropertyOptional({
    description: 'Description of the research paper',
    example: 'This paper discusses the implications of quantum entanglement in modern physics.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
