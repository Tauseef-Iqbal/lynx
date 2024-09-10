import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { DataManagementAndStorageService } from './data-management-and-storage.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddDataManagementAndStorageDto, UpdateDataManagementAndStorageDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';

@ApiTags('Data Management And Storage')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('data-management-and-storage')
export class DataManagementAndStorageController {
  constructor(private readonly dataManagementAndStorageService: DataManagementAndStorageService) {}

  @ApiOperation({ summary: 'Add Data Management And Storage' })
  @Post()
  async addDataManagementAndStorage(@User() user: UserEntity, @Body() addDataManagementAndStorageDto: AddDataManagementAndStorageDto) {
    const dataManagementAndStorage = await this.dataManagementAndStorageService.addDataManagementAndStorage(user, addDataManagementAndStorageDto);
    return new ResponseDto(HttpStatus.CREATED, 'Data Management And Storage added successfully!', dataManagementAndStorage).toJSON();
  }

  @ApiOperation({ summary: 'Update Data Management And Storage' })
  @Put('/:id')
  async updateDataManagementAndStorage(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateDataManagementAndStorageDto: UpdateDataManagementAndStorageDto) {
    const dataManagementAndStorage = await this.dataManagementAndStorageService.updateDataManagementAndStorage(id, user, updateDataManagementAndStorageDto);
    return new ResponseDto(HttpStatus.CREATED, 'Data Management And Storage added successfully!', dataManagementAndStorage).toJSON();
  }

  @ApiOperation({ summary: 'Get My Data Management And Storage' })
  @Get('section/me')
  async getMyDataManagementAndStorage(@User() user: UserEntity) {
    const response = await this.dataManagementAndStorageService.getMyDataManagementAndStorage(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My DataManagementAndStorage Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get DataManagementAndStorage By ID' })
  @Get('/:id')
  async getDataManagementAndStorageById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.dataManagementAndStorageService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Data Management And Storage Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete DataManagementAndStorage By ID' })
  // @Delete('/:id')
  // async deleteDataManagementAndStorage(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.dataManagementAndStorageService.update(id, { isDeleted: true } as unknown as CPDataManagementAndStorageEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Data Management And Storage Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Data Management And Storage' })
  // @Delete('section/me')
  // async deleteMyDataManagementAndStorage(@User() user: UserEntity) {
  //   const response = await this.dataManagementAndStorageService.deleteMyDataManagementAndStorage(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Data Management And Storage Section deleted successfully!', response).toJSON();
  // }
}
