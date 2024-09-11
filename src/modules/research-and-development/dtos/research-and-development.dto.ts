import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IResearchAndDevelopmentTeamDetails, IGovtGrantsForResearchDetails } from 'src/modules/research-and-development/interfaces';
import { ResearchAndDevelopmentInnovationsDto, ResearchAndDevelopmentDefencePatentsDto, ResearchAndDevelopmentResearchPapersDto, ResearchAndDevelopmentResearchFundingDto, ResearchAndDevelopmentResearchInstitutionsDto } from '../dtos';

class ResearchAndDevelopmentTeamDetailsDto implements IResearchAndDevelopmentTeamDetails {
  @ApiPropertyOptional({ description: 'Team Size', example: '201-500' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiPropertyOptional({ description: 'Team Description', example: 'Team dedicated for Research' })
  @IsString()
  @IsOptional()
  description?: string;
}

class GovtGrantsForResearchDetailsDto implements IGovtGrantsForResearchDetails {
  @ApiPropertyOptional({ description: 'Funding Source', example: 'Library of NYC' })
  @IsString()
  @IsOptional()
  fundingSource?: string;

  @ApiPropertyOptional({ description: 'Amount Funded' })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ description: 'Purpose of Funding', example: 'Innovate Country Youth' })
  @IsString()
  @IsOptional()
  purpose?: string;
}

export class AddResearchAndDevelopmentDto {
  @ApiPropertyOptional({
    description: 'Indicates whether there is a research and development team',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  researchAndDevelopmentTeam?: boolean;

  @ApiPropertyOptional({ description: 'Details of the research and development team', type: ResearchAndDevelopmentTeamDetailsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => ResearchAndDevelopmentTeamDetailsDto)
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.researchAndDevelopmentTeam === false || obj.researchAndDevelopmentTeam === 'false' ? null : value), { toClassOnly: true })
  researchAndDevelopmentTeamDetails?: ResearchAndDevelopmentTeamDetailsDto;

  @ApiPropertyOptional({ description: 'Innovations', type: ResearchAndDevelopmentInnovationsDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResearchAndDevelopmentInnovationsDto)
  @IsOptional()
  researchAndDevelopmentInnovations?: ResearchAndDevelopmentInnovationsDto[];

  @ApiPropertyOptional({ description: 'Defence patents', type: ResearchAndDevelopmentDefencePatentsDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResearchAndDevelopmentDefencePatentsDto)
  @IsOptional()
  researchAndDevelopmentDefencePatents?: ResearchAndDevelopmentDefencePatentsDto[];

  @ApiPropertyOptional({
    description: 'Indicates if research papers were published in the last 10 years',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  reseachPapers10Years?: boolean;

  @ApiPropertyOptional({ description: 'Research Papers', type: ResearchAndDevelopmentResearchPapersDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResearchAndDevelopmentResearchPapersDto)
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.reseachPapers10Years === false || obj.reseachPapers10Years === 'false' ? null : value), { toClassOnly: true })
  researchAndDevelopmentResearchPapers?: ResearchAndDevelopmentResearchPapersDto[];

  @ApiPropertyOptional({
    description: 'Indicates if funding was received in the last 10 years',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  reseachFunding10Years?: boolean;

  @ApiPropertyOptional({ description: 'Research Funding', type: ResearchAndDevelopmentResearchFundingDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResearchAndDevelopmentResearchFundingDto)
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.reseachFunding10Years === false || obj.reseachFunding10Years === 'false' ? null : value), { toClassOnly: true })
  researchAndDevelopmentResearchFunding?: ResearchAndDevelopmentResearchFundingDto[];

  @ApiPropertyOptional({
    description: 'Indicates collaboration with research institutions',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  reseachInstitutionsCollaboration?: boolean;

  @ApiPropertyOptional({ description: 'Research Institutions', type: ResearchAndDevelopmentResearchInstitutionsDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResearchAndDevelopmentResearchInstitutionsDto)
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.reseachInstitutionsCollaboration === false || obj.reseachInstitutionsCollaboration === 'false' ? null : value), { toClassOnly: true })
  researchAndDevelopmentResearchInstitutions?: ResearchAndDevelopmentResearchInstitutionsDto[];

  @ApiPropertyOptional({
    description: 'Indicates whether projects were offered to the government',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  projectsOfferedToGovt?: boolean;

  @ApiPropertyOptional({
    description: 'Details of the projects offered to the government',
    example: 'Project ABC on advanced data encryption was offered to the defense department.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.projectsOfferedToGovt === false || obj.projectsOfferedToGovt === 'false' ? null : value), { toClassOnly: true })
  projectsOfferedToGovtDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there are any government grants for research',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  govtGrantsForResearch?: boolean;

  @ApiPropertyOptional({ description: 'Projects offered to Govt', type: GovtGrantsForResearchDetailsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => GovtGrantsForResearchDetailsDto)
  @IsOptional()
  @Expose()
  @Transform(({ obj, value }) => (obj.govtGrantsForResearch === false || obj.govtGrantsForResearch === 'false' ? null : value), { toClassOnly: true })
  govtGrantsForResearchDetails?: GovtGrantsForResearchDetailsDto;

  @ApiPropertyOptional({
    description: 'Indicates interest in government grants for research',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  @Expose()
  @Transform(({ obj, value }) => (obj.govtGrantsForResearch === true || obj.govtGrantsForResearch === 'true' ? null : value), { toClassOnly: true })
  interestedInGovtGrantsForResearch?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates if there are controlled technology activities',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  controlledTechnologyActivities?: boolean;

  @ApiPropertyOptional({
    description: 'Details of controlled technology activities',
    example: 'Development of encryption algorithms for military communications.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.controlledTechnologyActivities === false || obj.controlledTechnologyActivities === 'false' ? null : value), { toClassOnly: true })
  controlledTechnologyActivitiesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there are any joint ventures',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  jointVentures?: boolean;

  @ApiPropertyOptional({
    description: 'Details of the joint ventures',
    example: 'Joint venture with XYZ Corporation for AI research in robotics.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.jointVentures === false || obj.jointVentures === 'false' ? null : value), { toClassOnly: true })
  jointVenturesDetails?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there is intellectual property protection',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true', { toClassOnly: true })
  intellectualPropertyProtection?: boolean;

  @ApiPropertyOptional({
    description: 'Details of intellectual property protection',
    example: 'Patents filed for 3 unique AI algorithms.',
  })
  @IsOptional()
  @IsString()
  @Expose()
  @Transform(({ obj, value }) => (obj.intellectualPropertyProtection === false || obj.intellectualPropertyProtection === 'false' ? null : value), { toClassOnly: true })
  intellectualPropertyProtectionDetails?: string;
}

export class UpdateResearchAndDevelopmentDto extends PartialType(AddResearchAndDevelopmentDto) {}
