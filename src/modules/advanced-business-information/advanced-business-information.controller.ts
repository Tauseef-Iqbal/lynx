import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';
import { ResponseDto } from 'src/shared/dtos';
import { JwtAuthGuard } from 'src/shared/guards';
import { UserEntity } from 'src/typeorm/models';
import { AdvancedBusinessInformationService } from './advanced-business-information.service';
import { AddAdvancedBusinessInformationDto, UpdateAddAdvancedBusinessInformationDto } from './dtos';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { AdvancedBusinessInformationFiles } from './interfaces';

@ApiTags('Advanced Business Information')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('advanced-business-info')
export class AdvancedBusinessInformationController {
  constructor(private readonly advancedBusinessInformationService: AdvancedBusinessInformationService) {}

  @ApiOperation({ summary: 'Create Advanced Business Information' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'industrySpecificFiles', maxCount: 10 },
        { name: 'businessPlanFiles', maxCount: 10 },
        { name: 'certificateStatusFiles', maxCount: 10 },
        { name: 'convictedOfFeloniesFiles', maxCount: 10 },
        { name: 'ordersUnderDPASFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  @ApiBody({ type: AddAdvancedBusinessInformationDto })
  async createAdvancedBusinessInformation(@User() user: UserEntity, @Body() addAdvancedBusinessInformationDto: AddAdvancedBusinessInformationDto, @UploadedFiles() files: AdvancedBusinessInformationFiles) {
    const businessInfo = await this.advancedBusinessInformationService.createAdvancedBusinessInformation(user, addAdvancedBusinessInformationDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Advanced Business Info added successfully!', businessInfo).toJSON();
  }

  @ApiOperation({ summary: 'Update Advanced Business Info' })
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'industrySpecificFiles', maxCount: 10 },
        { name: 'businessPlanFiles', maxCount: 10 },
        { name: 'certificateStatusFiles', maxCount: 10 },
        { name: 'convictedOfFeloniesFiles', maxCount: 10 },
        { name: 'ordersUnderDPASFiles', maxCount: 10 },
      ],
      {
        limits: {
          fileSize: 500 * 1024 * 1024,
        },
      },
    ),
  )
  async updateAdvancedBusinessInformation(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateAdvancedBusinessInformationDto: UpdateAddAdvancedBusinessInformationDto, @UploadedFiles() files: AdvancedBusinessInformationFiles) {
    const businessInfo = await this.advancedBusinessInformationService.updateAdvancedBusinessInformation(id, user, updateAdvancedBusinessInformationDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Advanced Business Info Updated successfully!', businessInfo).toJSON();
  }

  @ApiOperation({ summary: 'Get My Advanced Business Info' })
  @Get('section/me')
  async getMyAdvancedBusinessInformation(@User() user: UserEntity) {
    const response = await this.advancedBusinessInformationService.getMyAdvancedBusinessInformation(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Advanced Business Info Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Advanced Business Info By ID' })
  @Get('/:id')
  async getMyAdvancedBusinessInformationById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.advancedBusinessInformationService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Advanced Business Info Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Advanced Business Info By ID' })
  // @Delete('/:id')
  // async deleteBusinessInformation(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.advancedBusinessInformationService.update(id, { isDeleted: true } as unknown as CPAdvancedBusinessInformationEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Advanced Business Info Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Advanced Business Info My Cybersecurity' })
  // @Delete('section/me')
  // async deleteMyBusinessInformation(@User() user: UserEntity) {
  //   const response = await this.advancedBusinessInformationService.deleteMyBusinessInformation(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Advanced Business Info Section deleted successfully!', response).toJSON();
  // }
}
