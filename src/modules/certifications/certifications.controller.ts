import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { BaseController } from 'src/shared/services';
import { CpCertificationsEntity, UserEntity } from 'src/typeorm/models';
import { CreateCpCertificationDto, UpdateCpCertificationDto } from './dtos';
import { CertificationsService } from './certifications.service';
import { User } from 'src/shared/decorators';
import { GetAllDto, ResponseDto } from 'src/shared/dtos';

@ApiTags('Company Certifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('certifications')
export class CertificationsController extends BaseController<CpCertificationsEntity, CreateCpCertificationDto | UpdateCpCertificationDto> {
  constructor(private readonly certificationsService: CertificationsService) {
    super(certificationsService);
  }

  @ApiOperation({ summary: 'Add Compnay Certifications' })
  @ApiBody({
    description: 'Array of certification DTOs to be added',
    type: [CreateCpCertificationDto],
  })
  @Post()
  async addCertifications(@User() user: UserEntity, @Body() createCpCertificationDto: CreateCpCertificationDto[]) {
    const certifications = await this.certificationsService.addCertifications(user, createCpCertificationDto);
    return new ResponseDto(HttpStatus.CREATED, 'Certifications added successfully!', certifications).toJSON();
  }

  @ApiOperation({ summary: 'Get Company profile certifications' })
  @Get(':id')
  async getCpCertificationById(@Param('id') id: number): Promise<any> {
    const response = await this.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Company profile certifications fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Company profile certifications' })
  @Get()
  async getCpCertifications(@User() user: UserEntity, @Query() queryParams: GetAllDto): Promise<any> {
    const { page = 1, limit = 10 } = queryParams;
    const response = await this.findAll({ limit, page, cp_id: user.companyProfile.id });
    return new ResponseDto(HttpStatus.OK, 'Company profile certifications fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Update Compnay Certifications' })
  @ApiBody({
    description: 'Array of certification DTOs to be updated',
    type: [UpdateCpCertificationDto],
  })
  @Put('/update')
  async updateCertifications(@User() user: any, @Body() updateCpCertificationDto: UpdateCpCertificationDto[]) {
    const certifications = await this.certificationsService.updateCertifications(user, updateCpCertificationDto);
    return new ResponseDto(HttpStatus.OK, 'Certifications update successfully!', certifications).toJSON();
  }

  @ApiOperation({ summary: 'Update Compnay Certifications' })
  @ApiBody({
    description: 'Certification DTO to be updated',
    type: [UpdateCpCertificationDto],
  })
  @Put(':id')
  async updateCertificationById(@Param('id') id: number, @Body() updateCpCertificationDto: UpdateCpCertificationDto[]) {
    const certifications = await this.update(id, updateCpCertificationDto as unknown as CpCertificationsEntity);
    return new ResponseDto(HttpStatus.OK, 'Certifications update successfully!', certifications).toJSON();
  }

  @ApiOperation({ summary: 'Delete Company profile certificate' })
  @Delete(':id')
  async deleteCpProductsAndServicesById(@Param('id') id: number): Promise<void> {
    await this.certificationsService.softDelete(id);
  }
}
