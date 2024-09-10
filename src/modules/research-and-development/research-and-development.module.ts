import { Module } from '@nestjs/common';
import { ResearchAndDevelopmentService } from './research-and-development.service';
import { ResearchAndDevelopmentController } from './research-and-development.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CPResearchAndDevelopmentDefencePatentsEntity,
  CPResearchAndDevelopmentEntity,
  CPResearchAndDevelopmentInnovationsEntity,
  CPResearchAndDevelopmentResearchFundingEntity,
  CPResearchAndDevelopmentResearchInstitutionsEntity,
  CPResearchAndDevelopmentResearchPapersEntity,
} from 'src/typeorm/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([CPResearchAndDevelopmentEntity, CPResearchAndDevelopmentInnovationsEntity, CPResearchAndDevelopmentDefencePatentsEntity, CPResearchAndDevelopmentResearchPapersEntity, CPResearchAndDevelopmentResearchFundingEntity, CPResearchAndDevelopmentResearchInstitutionsEntity]),
  ],
  providers: [ResearchAndDevelopmentService],
  controllers: [ResearchAndDevelopmentController],
})
export class ResearchAndDevelopmentModule {}
