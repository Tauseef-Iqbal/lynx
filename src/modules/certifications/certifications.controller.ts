import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { BaseController } from 'src/shared/services';
import { CpCertificationsEntity, UserEntity } from 'src/typeorm/models';
import { CreateCpCertificationDto, UpdateCpCertificationDto } from './dtos';
import { CertificationsService } from './certifications.service';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';

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
    const certifications = await this.certificationsService.updateCertifications(user, createCpCertificationDto);
    return new ResponseDto(HttpStatus.CREATED, 'Certifications added successfully!', { certifications }).toJSON();
  }

  @ApiOperation({ summary: 'Get Company profile certifications' })
  @Get()
  async getCpCertifications(@User() user: UserEntity): Promise<any> {
    const response = await this.certificationsService.findManyByFilter({ companyProfile: { id: user.companyProfile.id } });
    return new ResponseDto(HttpStatus.OK, 'Company profile certifications fetched successfully!', { response }).toJSON();
  }
}
