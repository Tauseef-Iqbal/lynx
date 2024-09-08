import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PointsOfContactService } from './points-of-contact.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddPointsOfContactDto, UpdatePointsOfContactDto } from './dtos';
import { CPPointsOfContactEntity, UserEntity } from 'src/typeorm/models';

@ApiTags('Points Of Contact')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('points-of-contact')
export class PointsOfContactController {
  constructor(private readonly pointsOfContactService: PointsOfContactService) {}

  @ApiOperation({ summary: 'Add PointsOfContact' })
  @Post()
  async addPointsOfContact(@User() user: UserEntity, @Body() addPointsOfContactDto: AddPointsOfContactDto) {
    const pointsOfContact = await this.pointsOfContactService.addPointsOfContact(user, addPointsOfContactDto);
    return new ResponseDto(HttpStatus.CREATED, 'Points Of Contact added successfully!', pointsOfContact).toJSON();
  }

  @ApiOperation({ summary: 'Update PointsOfContact' })
  @Put('/:id')
  async updatePointsOfContact(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updatePointsOfContactDto: UpdatePointsOfContactDto) {
    const pointsOfContact = await this.pointsOfContactService.updatePointsOfContact(id, user, updatePointsOfContactDto);
    return new ResponseDto(HttpStatus.CREATED, 'Points Of Contact added successfully!', pointsOfContact).toJSON();
  }

  @ApiOperation({ summary: 'Get My PointsOfContact' })
  @Get('section/me')
  async getMyPointsOfContact(@User() user: UserEntity) {
    const response = await this.pointsOfContactService.getMyPointsOfContact(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My PointsOfContact Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get PointsOfContact By ID' })
  @Get('/:id')
  async getPointsOfContactById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.pointsOfContactService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Points Of Contact Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Delete PointsOfContact By ID' })
  @Delete('/:id')
  async deletePointsOfContact(@Param('id', ParseIntPipe) id: number) {
    const response = await this.pointsOfContactService.update(id, { isDeleted: true } as unknown as CPPointsOfContactEntity);
    return new ResponseDto(HttpStatus.OK, 'Points Of Contact Section deleted successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Delete My PointsOfContact' })
  @Delete('section/me')
  async deleteMyPointsOfContact(@User() user: UserEntity) {
    const response = await this.pointsOfContactService.deleteMyPointsOfContact(user.companyProfile.id);
    return new ResponseDto(HttpStatus.OK, 'Points Of Contact Section deleted successfully!', response).toJSON();
  }
}
