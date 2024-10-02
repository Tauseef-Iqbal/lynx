import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { UserEntity } from 'src/typeorm/models';
import { ProductsAndServicesService } from './cp-products-and-services.service';
import { CreateProductsAndServicesDto, UpdateProductsAndServicesDto } from './dtos';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Company Profile Products and Services')
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('products-and-services')
export class CpProductsAndServicesController {
  constructor(private readonly productsAndServicesService: ProductsAndServicesService) {}

  @ApiOperation({ summary: 'Create company products and services' })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductsAndServicesDto })
  @UseInterceptors(AnyFilesInterceptor())
  async createProductsAndService(@User() user: UserEntity, @Body() createProductsAndServicesDto: CreateProductsAndServicesDto, @UploadedFiles() files: Express.Multer.File[]) {
    const response = await this.productsAndServicesService.createProductsAndServices(user, createProductsAndServicesDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Company profile products or services created successfully!', response);
  }

  @ApiOperation({ summary: 'Update company products and services' })
  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProductsAndServicesDto })
  @UseInterceptors(AnyFilesInterceptor())
  async updateProductsAndService(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateProductsAndServicesDto: UpdateProductsAndServicesDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.productsAndServicesService.updateProductsAndServices(id, user, updateProductsAndServicesDto, files);
  }

  @ApiOperation({ summary: 'Get My Products And Services' })
  @Get('section/me')
  async getMyProductsAndServices(@User() user: UserEntity) {
    return this.productsAndServicesService.getMyProductsAndServices(user?.companyProfile?.id);
  }

  @ApiOperation({ summary: 'Get Products And Services By ID' })
  @Get('/:id')
  async getProductsAndServicesById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.productsAndServicesService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Products And Services Section fetched successfully!', response).toJSON();
  }
}
