import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ResearchAndDevelopmentResearchInstitutionsDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({
    description: 'Name of the collaborator',
    example: 'Dr. John Doe',
  })
  @IsOptional()
  @IsString()
  collaboratorName?: string;

  @ApiPropertyOptional({
    description: 'Name of the affiliated institution',
    example: 'MIT',
  })
  @IsOptional()
  @IsString()
  affiliatedInstitution?: string;

  @ApiPropertyOptional({
    description: 'Country of the affiliated institution',
    example: 'United States',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'Title of the research project',
    example: 'Quantum Computing Research',
  })
  @IsOptional()
  @IsString()
  projectTitle?: string;

  @ApiPropertyOptional({
    description: 'Field of research for the collaboration',
    example: 'Quantum Computing',
  })
  @IsOptional()
  @IsString()
  researchField?: string;

  @ApiPropertyOptional({
    description: 'Start date of the collaboration',
    example: '2024-01-01',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  collaborationStartDate?: Date;

  @ApiPropertyOptional({
    description: 'Role of the collaborator in the project',
    example: 'Principal Investigator',
  })
  @IsOptional()
  @IsString()
  projectRole?: string;
}
