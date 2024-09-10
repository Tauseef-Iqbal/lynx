import { Controller, Get, Post, Put, Param, Body, HttpStatus, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { RequiredSystemService } from './required-system.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { CreateRequiredSystemDto, UpdateRequiredSystemDto } from './dtos';
import { BaseController } from 'src/shared/services';
import { RequiredSystemEntity } from 'src/typeorm/models';
import { GetAllDto, ResponseDto } from 'src/shared/dtos';
import { User } from 'src/shared/decorators';

@ApiTags('Required Systems')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('required-systems')
export class RequiredSystemController extends BaseController<RequiredSystemEntity, CreateRequiredSystemDto | UpdateRequiredSystemDto> {
  constructor(private readonly requiredSystemService: RequiredSystemService) {
    super(requiredSystemService);
  }

  @Post()
  @ApiOperation({ summary: 'Create company profile required system' })
  @ApiBody({ type: CreateRequiredSystemDto })
  async createRequiredSystem(@User() user: any, @Body() createRequiredSystemDto: CreateRequiredSystemDto) {
    const result = await this.requiredSystemService.createRequiredSystem(user, createRequiredSystemDto);
    return new ResponseDto(HttpStatus.CREATED, 'Required System created successfully', result);
  }

  @ApiOperation({ summary: 'Get Company profile required system' })
  @Get(':id')
  async getRequiredSystemById(@Param('id') id: number): Promise<any> {
    const response = await this.findById(id, { relations: { companyProfile: true, businessClassifications: true, certifications: true, systemTypes: true } });
    return new ResponseDto(HttpStatus.OK, 'Company profile required system fetched successfully!', response);
  }

  @ApiOperation({ summary: 'Get Company profile required system' })
  @Get()
  async getRequiredSystems(@Query() queryParams: GetAllDto): Promise<any> {
    const { page = 1, limit = 10 } = queryParams;
    const response = await this.findAll({ limit, page }, { relations: { businessClassifications: true, certifications: true, systemTypes: true } });
    return new ResponseDto(HttpStatus.OK, 'Company profile required system fetched successfully!', response);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company required system' })
  @ApiBody({ type: UpdateRequiredSystemDto })
  async updateRequiredSystem(@Param('id', ParseIntPipe) id: number, @Body() updateRequiredSystemDto: UpdateRequiredSystemDto) {
    const updatedSystem = await this.requiredSystemService.updateRequiredSystem(id, updateRequiredSystemDto);
    return new ResponseDto(HttpStatus.OK, 'Required System updated successfully', updatedSystem);
  }
}
