import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileEntity } from 'src/typeorm/models';
import { CompanyProfileService } from './company-profile.service';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from './dtos/company-profile.dto';
import { Assets } from './interfaces';

@ApiTags('Company Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @ApiOperation({ summary: 'Create Company Profile' })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'assets' }]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCompanyProfileDto })
  async createCompanyProfile(@User() user: any, @Body() createCompanyProfileDto: CreateCompanyProfileDto, @UploadedFiles() files: Assets) {
    const response = await this.companyProfileService.createCompanyProfile(user, createCompanyProfileDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Company profile created successfully!', response);
  }

  @ApiOperation({ summary: 'Update Company Profile' })
  @Put('/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'assets' }]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCompanyProfileDto })
  async updateCompanyProfile(@Param('id') id: number, @Body() updateCompanyProfileDto: UpdateCompanyProfileDto, @UploadedFiles() files: Assets) {
    const response = await this.companyProfileService.updateCompanyProfile(id, updateCompanyProfileDto, files);
    return new ResponseDto(HttpStatus.OK, 'Company Profile updated successfully!', response);
  }

  @Get('/:id')
  async getFinancialHealthById(@Param('id') id: number) {
    return await this.companyProfileService.findById(id);
  }

  @Delete('/:id')
  async deleteFinancialHealth(@Param('id') id: number) {
    return this.companyProfileService.update(id, { isDeleted: true } as unknown as CompanyProfileEntity);
  }
}
