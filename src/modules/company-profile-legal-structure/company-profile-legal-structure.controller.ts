import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FILE_LIMITS } from 'src/shared/constants';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { BaseController } from 'src/shared/services';
import { CompanyProfileLegalStructureEntity } from 'src/typeorm/models';
import { CompanyProfileLegalStructureService } from './company-profile-legal-structure.service';
import { CreateCompanyProfileLegalStructureApiBodyDto, CreateCompanyProfileLegalStructureDto, UpdateCompanyProfileLegalStructureDto } from './dtos';
import { CpLegalStrucutreFiles } from './interfaces';

@ApiTags('Company Profile Legal Structure')
@UseGuards(JwtAuthGuard)
@Controller('company-profile-legal-structure')
export class CompanyProfileLegalStructureController extends BaseController<CompanyProfileLegalStructureEntity, CreateCompanyProfileLegalStructureDto | UpdateCompanyProfileLegalStructureDto> {
  constructor(private readonly companyProfileLegalStructureService: CompanyProfileLegalStructureService) {
    super(companyProfileLegalStructureService);
  }

  @Post()
  @ApiOperation({ summary: 'Create company profile legal structure' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCompanyProfileLegalStructureApiBodyDto })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'dbaFiles', maxCount: FILE_LIMITS.DBA_FILE_LIMIT }, { name: 'completedProjectsFiles' }]))
  async createCompanyProfileLegalStructure(@User() user: any, @Body() data: CreateCompanyProfileLegalStructureDto, @UploadedFiles() files: CpLegalStrucutreFiles) {
    // const createCpLegalStructureDto = plainToInstance(CreateCompanyProfileLegalStructureDto, JSON.parse(data));
    // await validateOrReject(createCpLegalStructureDto);
    const response = await this.companyProfileLegalStructureService.createCompanyProfileLegalStructure(user, data, files);
    return new ResponseDto(HttpStatus.CREATED, 'Company profile legal structure created successfully!', response);
  }

  @ApiOperation({ summary: 'Get Company Profile Legal Structure' })
  @Get(':id')
  async getCompanyProfileLegalStructureById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const response = await this.findById(id, { relations: { orgFacilities: true } });
    return new ResponseDto(HttpStatus.OK, 'Legal Structure Section fetched successfully!', response);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company profile legal structure' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCompanyProfileLegalStructureApiBodyDto })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'dbaFiles', maxCount: FILE_LIMITS.DBA_FILE_LIMIT }, { name: 'completedProjectsFiles' }]))
  async updateCompanyProfileLegalStructureById(@User() user: any, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateCompanyProfileLegalStructureDto, @UploadedFiles() files: CpLegalStrucutreFiles): Promise<any> {
    // const updateCpLegalStructureDto = plainToInstance(UpdateCompanyProfileLegalStructureDto, JSON.parse(data));
    // await validateOrReject(updateCpLegalStructureDto);
    const response = await this.companyProfileLegalStructureService.updateCompanyProfileLegalStructure(id, user, data, files);
    return new ResponseDto(HttpStatus.OK, 'Compnay Profile Legal Structure updated successfully!', response);
  }

  @ApiOperation({ summary: 'Delete Company Profile Legal Structure' })
  @Delete(':id')
  async deleteCompanyProfileLegalStructureById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.delete(id);
  }
}
