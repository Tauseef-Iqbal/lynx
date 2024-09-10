import { Body, Controller, Get, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { CpControlsAndProtocolsService } from './cp-controls-and-protocols.service';
import { User } from 'src/shared/decorators';
import { UserEntity } from 'src/typeorm/models';
import { UpsertControlsAndProtocolDto } from './dtos/controls-and-protocols.dto';
import { ResponseDto } from 'src/shared/dtos';

@ApiTags('Control and Protocol')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cp-controls-and-protocols')
export class CpControlsAndProtocolsController {
  constructor(private readonly cpControlsAndProtocolsService: CpControlsAndProtocolsService) {}

  @ApiOperation({ summary: 'Add Controls And Protocols' })
  @Post()
  async controlsAndProtocols(@User() user: UserEntity, @Body() upsertControlsAndProtocolDto: UpsertControlsAndProtocolDto) {
    const controlsAndProtocols = await this.cpControlsAndProtocolsService.controlsAndProtocols(user, upsertControlsAndProtocolDto);
    return new ResponseDto(HttpStatus.CREATED, 'Controls And Protocols added successfully!', controlsAndProtocols).toJSON();
  }

  @ApiOperation({ summary: 'Update Controls And Protocol' })
  @Put()
  async updateControlsAndProtocols(@User() user: UserEntity, @Body() upsertControlsAndProtocolDto: UpsertControlsAndProtocolDto) {
    const controlsAndProtocols = await this.cpControlsAndProtocolsService.controlsAndProtocols(user, upsertControlsAndProtocolDto);
    return new ResponseDto(HttpStatus.CREATED, 'Controls And Protocol updated successfully!', controlsAndProtocols).toJSON();
  }

  @ApiOperation({ summary: 'Get My Controls And Protocol' })
  @Get()
  async getControlsAndProtocols(@User() user: UserEntity) {
    const response = await this.cpControlsAndProtocolsService.getMyControlsAndProtocol(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Controls And Protocol fetched successfully!', response).toJSON();
  }
}
