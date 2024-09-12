import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FILE_LIMITS } from 'src/shared/constants';
import { User } from 'src/shared/decorators';
import { GetAllDto, ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { BaseController } from 'src/shared/services';
import { CpPastPerformanceEntity, UserEntity } from 'src/typeorm/models';
import { CreatePastPerformanceApiBodyDto, CreatePastPerformanceDto, UpdatePastPerformanceDto } from './dtos';
import { CpPastPerformanceFiles } from './interfaces';
import { PastPerformanceService } from './past-performance.service';

@ApiTags('Past Performance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('past-performance')
export class PastPerformanceController extends BaseController<CpPastPerformanceEntity, CreatePastPerformanceDto | UpdatePastPerformanceDto> {
  constructor(private readonly pastPerformanceService: PastPerformanceService) {
    super(pastPerformanceService);
  }

  @Post()
  @ApiOperation({ summary: 'Create company profile past performances' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePastPerformanceApiBodyDto })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'supportingDocs', maxCount: FILE_LIMITS.CP_PAST_PERFORMANCE_LIMIT }]))
  async createPastPerformance(@User() user: UserEntity, @Body() data: CreatePastPerformanceDto, @UploadedFiles() files: CpPastPerformanceFiles) {
    // const createCpPastPerformanceDto = plainToInstance(CreatePastPerformanceDto, JSON.parse(data));
    // await validateOrReject(createCpPastPerformanceDto);
    const response = await this.pastPerformanceService.createPastPerformance(user, data, files);
    return new ResponseDto(HttpStatus.CREATED, 'Company profile past performance created successfully!', response);
  }

  @Get('my-profile')
  async getMyCpProductsAndServices(@User() user: any): Promise<any> {
    const response = await this.pastPerformanceService.findByFilter({ companyProfile: { id: user.companyProfile.id } }, { relations: ['pastPerformanceTestimonials'] });
    return new ResponseDto(HttpStatus.OK, 'Company profile past performance fetched successfully!', response);
  }

  @ApiOperation({ summary: 'Get Company profile past performance' })
  @Get(':id')
  async getCpProductsAndServicesById(@Param('id') id: number): Promise<any> {
    const response = await this.findById(id, { relations: ['pastPerformanceTestimonials'] });
    return new ResponseDto(HttpStatus.OK, 'Company profile past performance fetched successfully!', response);
  }

  @ApiOperation({ summary: 'Get Company profile past performance' })
  @Get()
  async getCpProductsAndServices(@User() user: UserEntity, @Query() queryParams: GetAllDto): Promise<any> {
    const { page = 1, limit = 10 } = queryParams;
    const response = await this.findAll({ limit, page, cp_id: user.companyProfile.id }, { relations: ['pastPerformanceTestimonials'] });
    return new ResponseDto(HttpStatus.OK, 'Company profile products and services fetched successfully!', response);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company past performance' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePastPerformanceApiBodyDto })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'supportingDocs', maxCount: FILE_LIMITS.CP_PAST_PERFORMANCE_LIMIT }]))
  async updatePastPerformance(@User() user: any, @Param('id') id: number, @Body() data: UpdatePastPerformanceDto, @UploadedFiles() files: CpPastPerformanceFiles) {
    // const updateCpPastPerformanceDto = plainToInstance(UpdatePastPerformanceDto, JSON.parse(data));
    // await validateOrReject(updateCpPastPerformanceDto);
    const response = await this.pastPerformanceService.updatePastPerformance(user, id, data, files);
    return new ResponseDto(HttpStatus.OK, 'Company profile past performance updated successfully!', response);
  }

  @ApiOperation({ summary: 'Delete Company profile past performance' })
  @Delete(':id')
  async deleteCpProductsAndServicesById(@Param('id') id: number): Promise<void> {
    await this.pastPerformanceService.softDelete(id);
  }
}
