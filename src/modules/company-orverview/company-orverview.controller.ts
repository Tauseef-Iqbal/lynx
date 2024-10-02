import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddCompanyOverviewDto, UpdateCompanyOverviewDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { CompanyOverviewService } from './company-orverview.service';

@ApiTags('Company Overview')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('company-overview')
export class CompanyOverviewController {
  constructor(private readonly companyOverviewService: CompanyOverviewService) {}

  @ApiOperation({ summary: 'Add Company Overview' })
  @Post()
  async addCompanyOverview(@User() user: UserEntity, @Body() addCompanyOverviewDto: AddCompanyOverviewDto) {
    const companyOverview = await this.companyOverviewService.addCompanyOverview(user, addCompanyOverviewDto);
    return new ResponseDto(HttpStatus.CREATED, 'Company Overview added successfully!', companyOverview).toJSON();
  }

  @ApiOperation({ summary: 'Update Company Overview' })
  @Put('/:id')
  async updateCompanyOverview(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateCompanyOverviewDto: UpdateCompanyOverviewDto) {
    const companyOverview = await this.companyOverviewService.updateCompanyOverview(id, user, updateCompanyOverviewDto);
    return new ResponseDto(HttpStatus.CREATED, 'Company Overview added successfully!', companyOverview).toJSON();
  }

  @ApiOperation({ summary: 'Get My Company Overview' })
  @Get('section/me')
  async getMyCompanyOverview(@User() user: UserEntity) {
    const response = await this.companyOverviewService.getMyCompanyOverview(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Company Overview Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Company Overview By ID' })
  @Get('/:id')
  async getCompanyOverviewById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.companyOverviewService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Company Overview Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Company Overview By ID' })
  // @Delete('/:id')
  // async deleteCompanyOverview(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.companyOverviewService.update(id, { isDeleted: true } as unknown as CPCompanyOverviewEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Company Overview Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Company Overview' })
  // @Delete('section/me')
  // async deleteMyCompanyOverview(@User() user: UserEntity) {
  //   const response = await this.companyOverviewService.deleteMyCompanyOverview(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Company Overview Section deleted successfully!', response).toJSON();
  // }
}
