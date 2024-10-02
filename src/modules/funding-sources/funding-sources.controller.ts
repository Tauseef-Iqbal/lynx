import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { FundingSourcesService } from './funding-sources.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddFundingSourcesDto, UpdateFundingSourcesDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Funding Sources')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('funding-sources')
export class FundingSourcesController {
  constructor(private readonly fundingSourcesService: FundingSourcesService) {}

  @ApiOperation({ summary: 'Add Funding Sources' })
  @Post()
  async addFundingSources(@User() user: any, @Body() addFundingSourcesDto: AddFundingSourcesDto) {
    const fundingSources = await this.fundingSourcesService.addFundingSources(user, addFundingSourcesDto);
    return new ResponseDto(HttpStatus.CREATED, 'Funding Sources added successfully!', fundingSources).toJSON();
  }

  @ApiOperation({ summary: 'Update Funding Sources' })
  @Put('/:id')
  async updateFundingSources(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateFundingSourcesDto: UpdateFundingSourcesDto) {
    const fundingSources = await this.fundingSourcesService.updateFundingSources(id, user, updateFundingSourcesDto);
    return new ResponseDto(HttpStatus.CREATED, 'Funding Sources updated successfully!', fundingSources).toJSON();
  }

  @ApiOperation({ summary: 'Get My Funding Sources' })
  @Get('section/me')
  async getMyFundingSources(@User() user: UserEntity) {
    const response = await this.fundingSourcesService.getMyFundingSources(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Funding Sources Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Funding Sources By ID' })
  @Get('/:id')
  async getFundingSourcesById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.fundingSourcesService.findById(id, { relations: { fundingSourcesForeignAffiliation: true } });
    return new ResponseDto(HttpStatus.OK, 'Funding Sources Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Funding Sources By ID' })
  // @Delete('/:id')
  // async deleteFundingSources(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.fundingSourcesService.update(id, { isDeleted: true } as unknown as CPFundingSourcesEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Funding Sources Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Funding Sources' })
  // @Delete('section/me')
  // async deleteMyFundingSources(@User() user: UserEntity) {
  //   const response = await this.fundingSourcesService.deleteMyFundingSources(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Funding Sources Section deleted successfully!', response).toJSON();
  // }
}
