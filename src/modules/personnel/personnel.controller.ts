import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddPersonnelDto, UpdatePersonnelDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IFOCIDesignationFiles } from './interfaces';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Personnel')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @ApiOperation({ summary: 'Add Personnel' })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'FOCIDesignationFiles', maxCount: 10 }], {
      limits: {
        fileSize: 500 * 1024 * 1024,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddPersonnelDto })
  async addPersonnel(@User() user: UserEntity, @Body() addPersonnelDto: AddPersonnelDto, @UploadedFiles() files: IFOCIDesignationFiles) {
    const personnel = await this.personnelService.addPersonnel(user, addPersonnelDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Personnel added successfully!', personnel).toJSON();
  }

  @ApiOperation({ summary: 'Update Personnel' })
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'FOCIDesignationFiles', maxCount: 10 }], {
      limits: {
        fileSize: 500 * 1024 * 1024,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdatePersonnelDto })
  async updatePersonnel(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updatePersonnelDto: UpdatePersonnelDto, @UploadedFiles() files: IFOCIDesignationFiles) {
    const personnel = await this.personnelService.updatePersonnel(id, user, updatePersonnelDto, files);
    return new ResponseDto(HttpStatus.CREATED, 'Personnel added successfully!', personnel).toJSON();
  }

  @ApiOperation({ summary: 'Get My Personnel' })
  @Get('section/me')
  async getMyPersonnel(@User() user: UserEntity) {
    const response = await this.personnelService.getMyPersonnel(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Personnel Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Personnel By ID' })
  @Get('/:id')
  async getPersonnelById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.personnelService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Personnel Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Personnel By ID' })
  // @Delete('/:id')
  // async deletePersonnel(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.personnelService.update(id, { isDeleted: true } as unknown as CPPersonnelEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Personnel Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Personnel' })
  // @Delete('section/me')
  // async deleteMyPersonnel(@User() user: UserEntity) {
  //   const response = await this.personnelService.deleteMyPersonnel(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Personnel Section deleted successfully!', response).toJSON();
  // }
}
