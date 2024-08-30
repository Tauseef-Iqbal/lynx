import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FundingSourcesService } from './funding-sources.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddFundingSourcesDto, UpdateFundingSourcesDto } from './dtos';
import { CPFundingSourcesEntity } from 'src/typeorm/models/cp-funding-sources.entity';

@ApiTags('Funding Sources')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('funding-sources')
export class FundingSourcesController {
  constructor(private readonly fundingSourcesService: FundingSourcesService) {}

  @ApiOperation({ summary: 'Add Funding Sources' })
  @Post()
  async addFundingSources(@User() user: any, @Body() addFundingSourcesDto: AddFundingSourcesDto) {
    const inputParams = { ...addFundingSourcesDto, companyProfile: { id: user?.companyProfile.id } };
    const fundingSources = await this.fundingSourcesService.create(inputParams as unknown as CPFundingSourcesEntity);
    return new ResponseDto(HttpStatus.CREATED, 'Funding Sources added successfully!', fundingSources).toJSON();
  }

  @ApiOperation({ summary: 'Update Funding Sources' })
  @Put('/:id')
  async updateFundingSources(@Param('id') id: number, @Body() updateFundingSourcesDto: UpdateFundingSourcesDto) {
    const fundingSources = await this.fundingSourcesService.update(id, updateFundingSourcesDto as unknown as CPFundingSourcesEntity);
    return new ResponseDto(HttpStatus.CREATED, 'Funding Sources updated successfully!', fundingSources).toJSON();
  }

  @ApiOperation({ summary: 'Get Funding Sources' })
  @Get('/:id')
  async getFinancialHealthById(@Param('id') id: number) {
    return await this.fundingSourcesService.findById(id);
  }

  @ApiOperation({ summary: 'Delete Funding Sources' })
  @Delete('/:id')
  async deleteFinancialHealth(@Param('id') id: number) {
    return this.fundingSourcesService.update(id, { isDeleted: true } as unknown as CPFundingSourcesEntity);
  }
}
