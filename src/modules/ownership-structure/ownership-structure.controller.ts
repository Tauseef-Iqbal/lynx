import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OwnershipStructureService } from './ownership-structure.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddOwnershipStructureDto, UpdateOwnershipStructureDto } from './dtos';
import { CPOwnershipStructureEntity } from 'src/typeorm/models/cp-ownership-structure.entity';
import { UserEntity } from 'src/typeorm/models';

@ApiTags('Ownership-structure')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ownership-structure')
export class OwnershipStructureController {
  constructor(private readonly ownershipStructureService: OwnershipStructureService) {}

  @ApiOperation({ summary: 'Add Ownership Structure' })
  @Post()
  async addOwnershipStructure(@User() user: UserEntity, @Body() addOwnershipStructureDto: AddOwnershipStructureDto) {
    const ownershipStructure = await this.ownershipStructureService.addOwnershipStructure(user, addOwnershipStructureDto);
    return new ResponseDto(HttpStatus.CREATED, 'Ownership Strcuture added successfully!', ownershipStructure).toJSON();
  }

  @ApiOperation({ summary: 'Update Ownership Structure' })
  @Put('/:id')
  async updateOwnershipStructure(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateOwnershipStructureDto: UpdateOwnershipStructureDto) {
    const ownershipStructure = await this.ownershipStructureService.updateOwnershipStructure(id, user, updateOwnershipStructureDto);
    return new ResponseDto(HttpStatus.CREATED, 'Ownership Strcuture updated successfully!', ownershipStructure).toJSON();
  }

  @ApiOperation({ summary: 'Get My Ownership Structure' })
  @Get('section/me')
  async getMyCybersecurity(@User() user: UserEntity) {
    const response = await this.ownershipStructureService.getMyOwnershipStructure(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Ownership Structure fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Ownership Structure' })
  @Get('/:id')
  async getMyOwnershipStructureByID(@Param('id', ParseIntPipe) id: number) {
    return await this.ownershipStructureService.getMyOwnershipStructure(id);
  }

  @ApiOperation({ summary: 'Delete Ownership Structure' })
  @Delete('/:id')
  async deleteMyOwnershipStructureByID(@Param('id', ParseIntPipe) id: number) {
    return this.ownershipStructureService.update(id, { isDeleted: true } as unknown as CPOwnershipStructureEntity);
  }

  @ApiOperation({ summary: 'Delete My Ownership Structure' })
  @Delete('section/me')
  async deleteMyOwnershipStructure(@User() user: UserEntity) {
    const response = await this.ownershipStructureService.deleteMyOwnershipStructure(user.companyProfile.id);
    return new ResponseDto(HttpStatus.OK, 'My Ownership Structure deleted successfully!', response).toJSON();
  }
}
