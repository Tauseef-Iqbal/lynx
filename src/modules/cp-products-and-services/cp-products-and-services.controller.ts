import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FILE_LIMITS } from 'src/shared/constants';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { BaseController } from 'src/shared/services';
import { CpProductsAndServicesEntity, UserEntity } from 'src/typeorm/models';
import { CpProductsAndServicesService } from './cp-products-and-services.service';
import { CreateCpProductsAndServicesDto, CreateCpProductsAndServicesDtoApiBodyDto, GetAllQueryParamsDto, UpdateCpProductsAndServicesDto } from './dtos';
import { CpProductsAndServicesFiles } from './interfaces';

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
      { name: 'productOrServiceImage', maxCount: 1 },
    ]),
  )
  async createCpProductsAndService(@User() user: UserEntity, @Body() data: CreateCpProductsAndServicesDto, @UploadedFiles() files: CpProductsAndServicesFiles) {
    const response = await this.cpProductsAndServicesService.createCpProductsAndServices(user, data, files);
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
  async getCpProductsAndServices(@User() user: UserEntity, @Query() queryParams: GetAllQueryParamsDto): Promise<any> {
    const { page = 1, limit = 10 } = queryParams;
    const response = await this.findAll({ limit, page, cp_id: user.companyProfile.id }, { relations: ['productsAndServicesMeta'] });
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
      { name: 'productOrServiceImage', maxCount: 1 },
    ]),
  )
  async updateCompanyProfileLegalStructureById(@User() user: any, @Param('id') id: number, @Body() data: UpdateCpProductsAndServicesDto, @UploadedFiles() files: CpProductsAndServicesFiles): Promise<any> {
    const response = await this.cpProductsAndServicesService.updateCpProductsAndService(id, user, data, files);
    return new ResponseDto(HttpStatus.OK, 'Compnay Profile Product or Service updated successfully!', response);
  }

  @ApiOperation({ summary: 'Delete Company profile products and services' })
  @Delete(':id')
  async deleteCpProductsAndServicesById(@Param('id') id: number): Promise<void> {
    await this.cpProductsAndServicesService.softDelete(id);
  }
}
