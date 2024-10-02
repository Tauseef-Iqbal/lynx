import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { DataComplianceDocumentationService } from './data-compliance-documentation.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddDataComplianceDocumentationDto, UpdateDataComplianceDocumentationDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Data Compliance Documentation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('data-compliance-documentation')
export class DataComplianceDocumentationController {
  constructor(private readonly dataComplianceDocumentationService: DataComplianceDocumentationService) {}

  @ApiOperation({ summary: 'Add Data Compliance Documentation' })
  @Post()
  async addDataComplianceDocumentation(@User() user: UserEntity, @Body() addDataComplianceDocumentationDto: AddDataComplianceDocumentationDto) {
    const dataManagementAndStorage = await this.dataComplianceDocumentationService.addDataComplianceDocumentation(user, addDataComplianceDocumentationDto);
    return new ResponseDto(HttpStatus.CREATED, 'Data Compliance Documentation added successfully!', dataManagementAndStorage).toJSON();
  }

  @ApiOperation({ summary: 'Update Data Compliance Documentation' })
  @Put('/:id')
  async updateDataComplianceDocumentation(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateDataComplianceDocumentationDto: UpdateDataComplianceDocumentationDto) {
    const dataManagementAndStorage = await this.dataComplianceDocumentationService.updateDataComplianceDocumentation(id, user, updateDataComplianceDocumentationDto);
    return new ResponseDto(HttpStatus.CREATED, 'Data Compliance Documentation added successfully!', dataManagementAndStorage).toJSON();
  }

  @ApiOperation({ summary: 'Get My Data Compliance Documentation' })
  @Get('section/me')
  async getMyDataComplianceDocumentation(@User() user: UserEntity) {
    const response = await this.dataComplianceDocumentationService.getMyDataComplianceDocumentation(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Data Compliance Documentation Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Data Compliance Documentation By ID' })
  @Get('/:id')
  async getDataComplianceDocumentationById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.dataComplianceDocumentationService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Data Compliance Documentation Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Data Compliance Documentation By ID' })
  // @Delete('/:id')
  // async deleteDataComplianceDocumentation(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.dataComplianceDocumentationService.update(id, { isDeleted: true } as unknown as CPDataComplianceDocumentationEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Data Compliance Documentation Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Data Compliance Documentation' })
  // @Delete('section/me')
  // async deleteMyDataComplianceDocumentation(@User() user: UserEntity) {
  //   const response = await this.dataComplianceDocumentationService.deleteMyDataComplianceDocumentation(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Data Compliance Documentation Section deleted successfully!', response).toJSON();
  // }
}
