import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ToolsAndApplicationsService } from './tools-applications.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddToolsAndApplicationsDto, UpdateToolsAndApplicationsDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';

@ApiTags('Tools And Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tools-and-applications')
export class ToolsAndApplicationsController {
  constructor(private readonly toolsAndApplicationsService: ToolsAndApplicationsService) {}

  @ApiOperation({ summary: 'Add Tools And Applications' })
  @Post()
  async addToolsAndApplications(@User() user: UserEntity, @Body() addToolsAndApplicationsDto: AddToolsAndApplicationsDto) {
    const toolsAndApplications = await this.toolsAndApplicationsService.addToolsAndApplications(user, addToolsAndApplicationsDto);
    return new ResponseDto(HttpStatus.CREATED, 'Tools and Applications added successfully!', toolsAndApplications).toJSON();
  }

  @ApiOperation({ summary: 'Update Tools And Applications By ID' })
  @Put('/:id')
  async updateToolsAndApplications(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateToolsAndApplicationsDto: UpdateToolsAndApplicationsDto) {
    const toolsAndApplications = await this.toolsAndApplicationsService.updateToolsAndApplications(id, user, updateToolsAndApplicationsDto);
    return new ResponseDto(HttpStatus.CREATED, 'Tools and Applications updated successfully!', toolsAndApplications).toJSON();
  }

  @ApiOperation({ summary: 'Get My Tools And Applications' })
  @Get('section/me')
  async getMyToolsAndApplications(@User() user: UserEntity) {
    const response = await this.toolsAndApplicationsService.getMyToolsAndApplications(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Tools And Applications Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Tools And Applications by ID' })
  @Get('/:id')
  async getMyToolsAndApplicationsByID(@Param('id', ParseIntPipe) id: number) {
    const response = await this.toolsAndApplicationsService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Tools And Applications fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Tools And Applications By ID' })
  // @Delete('/:id')
  // async deleteToolsAndApplications(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.toolsAndApplicationsService.update(id, { isDeleted: true } as unknown as CPToolsAndApplicationsEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Tools And Applications deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Tools And Applications' })
  // @Delete('section/me')
  // async deleteMyToolsAndApplications(@User() user: UserEntity) {
  //   const response = await this.toolsAndApplicationsService.deleteMyToolsAndApplications(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Tools And Applications Section deleted successfully!', response).toJSON();
  // }
}
