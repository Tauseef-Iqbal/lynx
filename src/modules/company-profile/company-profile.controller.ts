import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileService } from './company-profile.service';
import { CreateCompanyProfileDto } from './dtos/company-profile.dto';
import { Assets } from './interfaces';

@ApiTags('Company Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @ApiOperation({ summary: 'Create Company Profile' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'assets', maxCount: 10 }], {
      limits: {
        fileSize: 500 * 1024 * 1024,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCompanyProfileDto })
  async createCompanyProfile(@User() user: UserEntity, @Body() data: any, @UploadedFiles() files: Assets) {
    const createCompanyProfileDto = plainToClass(CreateCompanyProfileDto, data);
    await validate(createCompanyProfileDto);
    const response = await this.companyProfileService.createCompanyProfile(user, createCompanyProfileDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Company profile created successfully!', response);
  }

  // @ApiOperation({ summary: 'Update Company Profile' })
  // @Put('/:id')
  // @UseInterceptors(
  //   FileFieldsInterceptor([{ name: 'assets', maxCount: 10 }], {
  //     limits: {
  //       fileSize: 500 * 1024 * 1024,
  //     },
  //   }),
  // )
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: UpdateCompanyProfileDto })
  // async updateCompanyProfile(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateCompanyProfileDto: UpdateCompanyProfileDto, @UploadedFiles() files: Assets) {
  //   const response = await this.companyProfileService.updateCompanyProfile(id, user, updateCompanyProfileDto, files);
  //   return new ResponseDto(HttpStatus.OK, 'Company Profile updated successfully!', response);
  // }

  @ApiOperation({ summary: 'Get Company Profile By Id' })
  @Get('/:id')
  async getCompanyProfileById(@Param('id', ParseIntPipe) id: number) {
    return await this.companyProfileService.findById(id);
  }

  @ApiOperation({ summary: 'Get My Company Profile' })
  @Get('profile/me')
  async getMyCompanyProfile(@User() user: UserEntity) {
    return this.companyProfileService.getMyCompanyProfile(user);
  }

  @ApiOperation({ summary: 'Get Company Profile Progress' })
  @Get('progress/report')
  async getCompanyProfileProgress(@User() user: UserEntity) {
    const response = await this.companyProfileService.getCompanyProfileProgress(user);
    return new ResponseDto(HttpStatus.OK, 'Company Profile Progress Report', response);
  }

  // @ApiOperation({ summary: 'Delete Company Profile By Id' })
  // @Delete('/:id')
  // async deleteCompanyProfile(@Param('id', ParseIntPipe) id: number) {
  //   return this.companyProfileService.update(id, { isDeleted: true } as unknown as CompanyProfileEntity);
  // }

  // @ApiOperation({ summary: 'Delete My Company Profile' })
  // @Delete('profile/me')
  // async deleteMyCompanyProfile(@User() user: UserEntity) {
  //   return this.companyProfileService.update(user.companyProfile.id, { isDeleted: true } as unknown as CompanyProfileEntity);
  // }
}
