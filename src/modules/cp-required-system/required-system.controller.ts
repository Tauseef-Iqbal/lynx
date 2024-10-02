import { Controller, Get, Post, Put, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { RequiredSystemService } from './required-system.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { CreateRequiredSystemDto, UpdateRequiredSystemDto } from './dtos';
import { BaseController } from 'src/shared/services';
import { CPRequiredSystemEntity, UserEntity } from 'src/typeorm/models';
import { ResponseDto } from 'src/shared/dtos';
import { User } from 'src/shared/decorators';

@ApiTags('Required Systems')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('required-systems')
export class RequiredSystemController extends BaseController<CPRequiredSystemEntity, CreateRequiredSystemDto | UpdateRequiredSystemDto> {
  constructor(private readonly requiredSystemService: RequiredSystemService) {
    super(requiredSystemService);
  }

  @Post()
  @ApiOperation({ summary: 'Create company profile required system' })
  @ApiBody({ type: CreateRequiredSystemDto })
  async createRequiredSystem(@User() user: UserEntity, @Body() createRequiredSystemDto: CreateRequiredSystemDto) {
    const requiredSystem = await this.requiredSystemService.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });

    let result: CPRequiredSystemEntity;
    if (requiredSystem) {
      result = await this.requiredSystemService.updateRequiredSystem(requiredSystem, createRequiredSystemDto);
    } else {
      result = await this.requiredSystemService.createRequiredSystem(user, createRequiredSystemDto);
    }

    const resp = await this.findById(result.id, { relations: { systemTypes: true, certifications: true, businessClassifications: true } });

    return new ResponseDto(HttpStatus.OK, 'Required System created or updated successfully', resp);
  }

  @ApiOperation({ summary: 'Get Company profile required system' })
  @Get()
  async getRequiredSystems(@User() user: UserEntity): Promise<any> {
    const response = await this.requiredSystemService.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false }, { relations: { systemTypes: true, certifications: true, businessClassifications: true } });
    return new ResponseDto(HttpStatus.OK, 'Company profile required system fetched successfully!', response);
  }

  @Put()
  @ApiOperation({ summary: 'Update company required system' })
  @ApiBody({ type: UpdateRequiredSystemDto })
  async updateRequiredSystem(@User() user: UserEntity, @Body() updateRequiredSystemDto: UpdateRequiredSystemDto) {
    const requiredSystem = await this.requiredSystemService.findByFilter({ companyProfile: { id: user.companyProfile.id }, isDeleted: false });

    if (!requiredSystem) {
      throw new Error('required system not found against this company profile');
    }

    const updatedSystem = await this.requiredSystemService.updateRequiredSystem(requiredSystem, updateRequiredSystemDto);
    return new ResponseDto(HttpStatus.OK, 'Required System updated successfully', updatedSystem);
  }
}
