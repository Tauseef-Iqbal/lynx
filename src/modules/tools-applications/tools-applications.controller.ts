import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ToolsAndApplicationsService } from './tools-applications.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddToolsAndApplicationsDto, UpdateToolsAndApplicationsDto } from './dtos';
import { CPToolsAndApplicationsEntity } from 'src/typeorm/models';

@ApiTags('Tools And Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tools-and-applications')
export class ToolsAndApplicationsController {
  constructor(private readonly toolsAndApplicationsService: ToolsAndApplicationsService) {}

  @ApiOperation({ summary: 'Add Tools And Applications' })
  @Post()
  async addToolsAndApplications(@User() user: any, @Body() addToolsAndApplicationsDto: AddToolsAndApplicationsDto) {
    const inputParams = { ...addToolsAndApplicationsDto, companyProfile: { id: user?.companyProfile.id } };
    const toolsAndApplications = await this.toolsAndApplicationsService.create(inputParams as unknown as CPToolsAndApplicationsEntity);
    return new ResponseDto(HttpStatus.CREATED, 'Tools and Applications added successfully!', toolsAndApplications).toJSON();
  }

  @ApiOperation({ summary: 'Update Tools And Applications' })
  @Put('/:id')
  async updateToolsAndApplications(@Param() id: number, @Body() updateToolsAndApplicationsDto: UpdateToolsAndApplicationsDto) {
    const toolsAndApplications = await this.toolsAndApplicationsService.update(id, updateToolsAndApplicationsDto as unknown as CPToolsAndApplicationsEntity);
    return new ResponseDto(HttpStatus.CREATED, 'Tools and Applications updated successfully!', toolsAndApplications).toJSON();
  }

  @Get('/:id')
  async getToolsAndApplicationsById(@Param('id') id: number) {
    return await this.toolsAndApplicationsService.findById(id);
  }

  @Delete('/:id')
  async deleteToolsAndApplications(@Param('id') id: number) {
    return this.toolsAndApplicationsService.update(id, { isDeleted: true } as unknown as CPToolsAndApplicationsEntity);
  }
}
