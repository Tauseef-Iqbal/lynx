import { Body, Controller, Get, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/shared/services';
import { CompanyOverviewEntity, UserEntity } from 'src/typeorm/models';
import { UpsertCompanyOverviewDto } from './dtos';
import { CompanyOrverviewService } from './company-orverview.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Company Overview')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('company-orverview')
export class CompanyOrverviewController extends BaseController<CompanyOverviewEntity, UpsertCompanyOverviewDto> {
  constructor(private readonly companyOverviewService: CompanyOrverviewService) {
    super(companyOverviewService);
  }

  @ApiOperation({ summary: 'Add Company Overview' })
  @Post()
  async companyOverview(@User() user: UserEntity, @Body() upsertCompanyOverviewDto: UpsertCompanyOverviewDto) {
    const overview = await this.companyOverviewService.companyOverview(user, upsertCompanyOverviewDto);
    return new ResponseDto(HttpStatus.CREATED, 'Company Overview added successfully!', overview).toJSON();
  }

  @ApiOperation({ summary: 'Update Company Overview' })
  @Put()
  async updatecompanyOverview(@User() user: UserEntity, @Body() upsertCompanyOverviewDto: UpsertCompanyOverviewDto) {
    const overview = await this.companyOverviewService.companyOverview(user, upsertCompanyOverviewDto);
    return new ResponseDto(HttpStatus.CREATED, 'Company Overview updated successfully!', overview).toJSON();
  }

  @ApiOperation({ summary: 'Get Company Overview' })
  @Get()
  async getcompanyOverview(@User() user: UserEntity) {
    const response = await this.companyOverviewService.getCompanyOverview(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'Company Overview fetched successfully!', response).toJSON();
  }
}
