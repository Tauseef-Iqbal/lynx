import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OwnershipStructureService } from './ownership-structure.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddOwnershipStructureDto, UpdateOwnershipStructureDto } from './dtos';
import { CPOwnershipStructureEntity } from 'src/typeorm/models/cp-ownership-structure.entity';

@ApiTags('Ownership-structure')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ownership-structure')
export class OwnershipStructureController {
  constructor(private readonly ownershipStructureService: OwnershipStructureService) {}

  @ApiOperation({ summary: 'Add ownership structure' })
  @Post()
  async addOwnerShipStructure(@User() user: any, @Body() addownershipStructureDto: AddOwnershipStructureDto) {
    const inputParams = { ...addownershipStructureDto, companyProfile: { id: user?.companyProfile.id } };
    const ownershipStructure = await this.ownershipStructureService.create(inputParams as unknown as CPOwnershipStructureEntity);
    return new ResponseDto(HttpStatus.CREATED, 'ownership added successfully!', ownershipStructure).toJSON();
  }

  @ApiOperation({ summary: 'Update ownership structure' })
  @Put('/:id')
  async updateOwnerShipStructure(@Param('id') id: number, @Body() updateownershipStructureDto: UpdateOwnershipStructureDto) {
    const ownershipStructure = await this.ownershipStructureService.updateOwnershipStructure(id, updateownershipStructureDto);
    console.log(ownershipStructure, 'ownershipStructure');
    return new ResponseDto(HttpStatus.CREATED, 'ownership updated successfully!').toJSON();
  }

  @ApiOperation({ summary: 'Get ownership structure' })
  @Get('/:id')
  async getOwnerShipStructureById(@Param('id') id: number) {
    return await this.ownershipStructureService.findById(id);
  }

  @ApiOperation({ summary: 'Delete ownership structure' })
  @Delete('/:id')
  async deleteOwnerShipStructure(@Param('id') id: number) {
    return this.ownershipStructureService.update(id, { isDeleted: true } as unknown as CPOwnershipStructureEntity);
  }
}
