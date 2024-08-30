import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddCompanyInfoDto, CreateCompanyDto, SaveCompanyInfoDto, SearchCompanyDto } from './dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Add Company' })
  @Post('create-company')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    await this.companyService.createCompany(createCompanyDto);
    return { message: 'Company created successfully!' };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Save Company' })
  @Post('save-company')
  async addCompanyInfo(@User('id') userId: number, @Body() addCompanyInfoDto: AddCompanyInfoDto) {
    const resp = await this.companyService.saveCompanyInfo(userId, addCompanyInfoDto);
    return new ResponseDto(HttpStatus.CREATED, 'Company saved successfully!', resp).toJSON();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search Company' })
  @Get('search')
  async searchCompany(@Query() searchCompanyDto: SearchCompanyDto) {
    const resp = await this.companyService.searchCompany(searchCompanyDto);
    return new ResponseDto(HttpStatus.OK, 'Found company!', { data: resp }).toJSON();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Save company overview and mission statement' })
  @Post('save-info')
  async saveCompanyOverviewAndMissionStatement(@User('company.id') companyId: number, @Body() saveCompanyInfoDto: SaveCompanyInfoDto) {
    const resp = await this.companyService.saveCompanyOverviewAndMissionStatement(companyId, saveCompanyInfoDto);
    return new ResponseDto(HttpStatus.OK, 'Information saved successfully.', resp).toJSON();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'My Company' })
  @Get('my-company')
  async getMyCompany(@User('id') userId: number) {
    const resp = await this.companyService.getMyCompany(userId);
    return new ResponseDto(HttpStatus.CREATED, 'My company found.', { response: resp }).toJSON();
  }
}
