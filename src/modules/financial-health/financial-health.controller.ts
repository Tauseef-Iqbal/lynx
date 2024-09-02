import { Body, Controller, HttpStatus, Post, Put, UploadedFiles, UseInterceptors, Param, UseGuards, Get, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFinancialHealthSectionDto, UpdateFinancialHealthSectionDto } from './dtos';
import { FinancialHealthService } from './financial-health.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ResponseDto } from 'src/shared/dtos';
import { User } from 'src/shared/decorators';
import { JwtAuthGuard } from 'src/shared/guards';
import { FinancialHealthFiles } from './interfaces';
import { CPToolsAndApplicationsEntity, UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Financial Health')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('financial-health')
export class FinancialHealthController {
  constructor(private readonly financialHealthService: FinancialHealthService) {}

  @ApiOperation({ summary: 'Create Financial Health' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'financialStatementsFiles', maxCount: 10 },
        { name: 'businessPlansFiles', maxCount: 10 },
        { name: 'goodStandingCertificatesFiles', maxCount: 10 },
        { name: 'financialDisclosureStatementsFiles', maxCount: 10 },
        { name: 'financialAuditsFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFinancialHealthSectionDto })
  async createFinancialHealthSection(@User() user: any, @Body() createFinancialHealthSectionDto: CreateFinancialHealthSectionDto, @UploadedFiles() files: FinancialHealthFiles) {
    console.log('createFinancialHealthSectionDto>>>>>>>.', createFinancialHealthSectionDto);

    const response = await this.financialHealthService.createFinancialHealthSection(user, createFinancialHealthSectionDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Financial Health Section created successfully!', response);
  }

  @ApiOperation({ summary: 'Update Financial Health' })
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'financialStatementsFiles', maxCount: 10 },
        { name: 'businessPlansFiles', maxCount: 10 },
        { name: 'goodStandingCertificatesFiles', maxCount: 10 },
        { name: 'financialDisclosureStatementsFiles', maxCount: 10 },
        { name: 'financialAuditsFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateFinancialHealthSectionDto })
  async updateFinancialHealthSection(@Param('id') id: number, @Body() updateFinancialHealthSectionDto: UpdateFinancialHealthSectionDto, @UploadedFiles() files: FinancialHealthFiles) {
    const response = await this.financialHealthService.updateFinancialHealthSection(id, updateFinancialHealthSectionDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Financial Health Section updated successfully!', response);
  }

  @Get('my-profile')
  async getMyFinancialHealth(@User() user: UserEntity) {
    if (user?.companyProfile?.id) return await this.financialHealthService.getMyFinancialHealthData(user?.companyProfile?.id);

    return null;
  }

  @Get('/:id')
  async getFinancialHealthById(@Param('id') id: number) {
    return await this.financialHealthService.findById(id);
  }

  @Delete('/:id')
  async deleteFinancialHealth(@Param('id') id: number) {
    return this.financialHealthService.update(id, { isDeleted: true } as unknown as CPToolsAndApplicationsEntity);
  }
}
