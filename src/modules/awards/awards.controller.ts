import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { BaseController } from 'src/shared/services';
import { CpAwardEntity } from 'src/typeorm/models/cp-awards.entity';
import { CreateCpAwardDto, UpdateCpAwardDto } from './dtos';
import { AwardsService } from './awards.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from 'src/shared/decorators';
import { AwardFiles } from './interfaces';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { GetAllDto, ResponseDto } from 'src/shared/dtos';

@ApiTags('Company Awards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('awards')
export class AwardsController extends BaseController<CpAwardEntity, CreateCpAwardDto | UpdateCpAwardDto> {
  constructor(private readonly awardService: AwardsService) {
    super(awardService);
  }

  @ApiOperation({ summary: 'Add Company Award' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'company award creation dto',
    type: [CreateCpAwardDto],
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'documentation', maxCount: 10 }]))
  @Post()
  async createAward(@User() user: any, @Body('data') data: string, @UploadedFiles() files: AwardFiles) {
    const createCpAwardDto = plainToInstance(CreateCpAwardDto, JSON.parse(data));
    await validateOrReject(createCpAwardDto);
    const certifications = await this.awardService.createAward(user, createCpAwardDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Company award added successfully!', certifications).toJSON();
  }

  @ApiOperation({ summary: 'Get Company Profile Legal Structure' })
  @Get(':id')
  async getCompanyProfileLegalStructureById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const response = await this.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Award fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Company profile past performance' })
  @Get()
  async getCpProductsAndServices(@Query() queryParams: GetAllDto): Promise<any> {
    const { page = 1, limit = 10 } = queryParams;
    const response = await this.findAll({ limit, page });
    return new ResponseDto(HttpStatus.OK, 'Company awards fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Update Company Award' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'company award update dto',
    type: [UpdateCpAwardDto],
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'documentation', maxCount: 10 }]))
  @Put(':id')
  async updateAward(@User() user: any, @Param('id', ParseIntPipe) id: number, @Body('data') data: string, @UploadedFiles() files: AwardFiles) {
    const updateCpAwardDto = plainToInstance(UpdateCpAwardDto, JSON.parse(data));
    await validateOrReject(updateCpAwardDto);
    const certifications = await this.awardService.updateAward(user, id, updateCpAwardDto, files);
    return new ResponseDto(HttpStatus.OK, 'Company award update successfully!', certifications);
  }

  @ApiOperation({ summary: 'Delete Company profile award' })
  @Delete(':id')
  async deleteCpProductsAndServicesById(@Param('id') id: number): Promise<void> {
    await this.awardService.softDelete(id);
  }
}
