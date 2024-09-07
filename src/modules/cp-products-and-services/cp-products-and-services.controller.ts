import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { BaseController } from 'src/shared/services';
import { CpProductsAndServicesEntity } from 'src/typeorm/models';
import { CreateCpProductsAndServicesDto, CreateCpProductsAndServicesDtoApiBodyDto, GetAllQueryParamsDto, UpdateCpProductsAndServicesDto } from './dtos';
import { CpProductsAndServicesService } from './cp-products-and-services.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from 'src/shared/decorators';
import { validateOrReject } from 'class-validator';
import { ResponseDto } from 'src/shared/dtos';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/shared/guards';
import { CpProductsAndServicesFiles } from './interfaces';
import { FILE_LIMITS } from 'src/shared/constants';

@ApiTags('Company Profile Products and Services')
@UseGuards(JwtAuthGuard)
@Controller('cp-products-and-services')
export class CpProductsAndServicesController extends BaseController<CpProductsAndServicesEntity, CreateCpProductsAndServicesDto | UpdateCpProductsAndServicesDto> {
  constructor(private readonly cpProductsAndServicesService: CpProductsAndServicesService) {
    super(cpProductsAndServicesService);
  }

  @Post()
  @ApiOperation({ summary: 'Create company profile products and services' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCpProductsAndServicesDtoApiBodyDto })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'uploadedMaterials', maxCount: FILE_LIMITS.CP_PRODUCTS_AND_SERVICES_FILE_LIMIT },
      { name: 'supportingMaterials', maxCount: FILE_LIMITS.CP_PRODUCTS_AND_SERVICES_FILE_LIMIT },
    ]),
  )
  async createCpProductsAndService(@User() user: any, @Body('data') data: string, @UploadedFiles() files: CpProductsAndServicesFiles) {
    const createCpProductsAndServicesDto = plainToInstance(CreateCpProductsAndServicesDto, JSON.parse(data));
    await validateOrReject(createCpProductsAndServicesDto);
    const response = await this.cpProductsAndServicesService.createCpProductsAndServices(user, createCpProductsAndServicesDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Company profile products or services created successfully!', response);
  }

  @ApiOperation({ summary: 'Get Company profile products and services' })
  @Get(':id')
  async getCpProductsAndServicesById(@Param('id') id: number): Promise<any> {
    const response = await this.findById(id, { relations: ['productsAndServicesMeta'] });
    return new ResponseDto(HttpStatus.OK, 'Company profile products and services fetched successfully!', response);
  }

  @ApiOperation({ summary: 'Get Company profile products and services' })
  @Get()
  async getCpProductsAndServices(@Query() queryParams: GetAllQueryParamsDto): Promise<any> {
    const { page = 1, limit = 10 } = queryParams;
    const response = await this.findAll({ limit, page }, { relations: ['productsAndServicesMeta'] });
    return new ResponseDto(HttpStatus.OK, 'Company profile products and services fetched successfully!', response);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company profile products and services' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCpProductsAndServicesDtoApiBodyDto })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'uploadedMaterials', maxCount: FILE_LIMITS.CP_PRODUCTS_AND_SERVICES_FILE_LIMIT },
      { name: 'supportingMaterials', maxCount: FILE_LIMITS.CP_PRODUCTS_AND_SERVICES_FILE_LIMIT },
    ]),
  )
  async updateCompanyProfileLegalStructureById(@User() user: any, @Param('id') id: number, @Body('data') data: string, @UploadedFiles() files: CpProductsAndServicesFiles): Promise<any> {
    const updateCpProductsAndServicesDto = plainToInstance(UpdateCpProductsAndServicesDto, JSON.parse(data));
    await validateOrReject(updateCpProductsAndServicesDto);
    const response = await this.cpProductsAndServicesService.updateCpProductsAndService(id, user, updateCpProductsAndServicesDto, files);
    return new ResponseDto(HttpStatus.OK, 'Compnay Profile Product or Service updated successfully!', response);
  }

  @ApiOperation({ summary: 'Delete Company profile products and services' })
  @Delete(':id')
  async deleteCpProductsAndServicesById(@Param('id') id: number): Promise<void> {
    await this.cpProductsAndServicesService.softDelete(id);
  }
}
