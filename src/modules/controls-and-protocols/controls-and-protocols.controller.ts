import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddControlsAndProtocolsDto, UpdateControlsAndProtocolsDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';
import { ControlsAndProtocolsService } from './controls-and-protocols.service';

@ApiTags('Controls And Protocols')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('controls-and-protocols')
export class ControlsAndProtocolsController {
  constructor(private readonly controlsAndProtocolsService: ControlsAndProtocolsService) {}

  @ApiOperation({ summary: 'Add Controls And Protocols' })
  @Post()
  async addControlsAndProtocols(@User() user: UserEntity, @Body() addControlsAndProtocolsDto: AddControlsAndProtocolsDto) {
    const controlsAndProtocols = await this.controlsAndProtocolsService.addControlsAndProtocols(user, addControlsAndProtocolsDto);
    return new ResponseDto(HttpStatus.CREATED, 'Controls And Protocols added successfully!', controlsAndProtocols).toJSON();
  }

  @ApiOperation({ summary: 'Update Controls And Protocols' })
  @Put('/:id')
  async updateControlsAndProtocols(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateControlsAndProtocolsDto: UpdateControlsAndProtocolsDto) {
    const controlsAndProtocols = await this.controlsAndProtocolsService.updateControlsAndProtocols(id, user, updateControlsAndProtocolsDto);
    return new ResponseDto(HttpStatus.CREATED, 'Controls And Protocols added successfully!', controlsAndProtocols).toJSON();
  }

  @ApiOperation({ summary: 'Get My Controls And Protocols' })
  @Get('section/me')
  async getMyControlsAndProtocols(@User() user: UserEntity) {
    const response = await this.controlsAndProtocolsService.getMyControlsAndProtocols(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Controls And Protocols Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Controls And Protocols By ID' })
  @Get('/:id')
  async getControlsAndProtocolsById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.controlsAndProtocolsService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Controls And Protocols Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Controls And Protocols By ID' })
  // @Delete('/:id')
  // async deleteControlsAndProtocols(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.controlsAndProtocolsService.update(id, { isDeleted: true } as unknown as CPControlsAndProtocolsEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Controls And Protocols Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Controls And Protocols' })
  // @Delete('section/me')
  // async deleteMyControlsAndProtocols(@User() user: UserEntity) {
  //   const response = await this.controlsAndProtocolsService.deleteMyControlsAndProtocols(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Controls And Protocols Section deleted successfully!', response).toJSON();
  // }
}
