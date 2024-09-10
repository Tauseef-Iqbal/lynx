import { Body, Controller, HttpStatus, Post, Put, UploadedFiles, UseInterceptors, Param, UseGuards, Get, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { UserEntity } from 'src/typeorm/models';
import { CreateFinancialHealthSectionDto, UpdateFinancialHealthSectionDto } from './dtos';
import { FinancialHealthService } from './financial-health.service';
import { FinancialHealthFiles } from './interfaces';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
  async createFinancialHealthSection(@User() user: UserEntity, @Body() createFinancialHealthSectionDto: CreateFinancialHealthSectionDto, @UploadedFiles() files: FinancialHealthFiles) {
    const response = await this.financialHealthService.createFinancialHealthSection(user, createFinancialHealthSectionDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Financial Health Section created successfully!', response).toJSON();
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
  async updateFinancialHealthSection(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateFinancialHealthSectionDto: UpdateFinancialHealthSectionDto, @UploadedFiles() files: FinancialHealthFiles) {
    const response = await this.financialHealthService.updateFinancialHealthSection(id, user, updateFinancialHealthSectionDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Financial Health Section updated successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get My Financial Health' })
  @Get('section/me')
  async getMyFinancialHealth(@User() user: UserEntity) {
    const response = await this.financialHealthService.getMyFinancialHealth(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Financial Health Section fetched successfully!', response);
  }

  @ApiOperation({ summary: 'Get Financial Health By ID' })
  @Get('/:id')
  async getFinancialHealthById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.financialHealthService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Financial Health Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Financial Health By ID' })
  // @Delete('/:id')
  // async deleteFinancialHealth(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.financialHealthService.update(id, { isDeleted: true } as unknown as CPFinancialHealthEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Financial Health Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Financial Health' })
  // @Delete('section/me')
  // async deleteMyFinancialHealth(@User() user: UserEntity) {
  //   const response = await this.financialHealthService.deleteMyFinancialHealth(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Financial Health Section deleted successfully!', response).toJSON();
  // }
}
