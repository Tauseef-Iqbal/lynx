import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PointsOfContactService } from './points-of-contact.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddPointsOfContactDto, UpdatePointsOfContactDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Points Of Contact')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('points-of-contact')
export class PointsOfContactController {
  constructor(private readonly pointsOfContactService: PointsOfContactService) {}

  @ApiOperation({ summary: 'Add Points Of Contact' })
  @Post()
  async addPointsOfContact(@User() user: UserEntity, @Body() addPointsOfContactDto: AddPointsOfContactDto[]) {
    return this.pointsOfContactService.addPointsOfContact(user, addPointsOfContactDto);
  }

  @ApiOperation({ summary: 'Update Points Of Contact' })
  @Put()
  async updatePointsOfContact(@User() user: UserEntity, @Body() updatePointsOfContactDto: UpdatePointsOfContactDto[]) {
    return this.pointsOfContactService.updatePointsOfContact(user, updatePointsOfContactDto);
  }

  @ApiOperation({ summary: 'Get My Points Of Contact' })
  @Get('section/me')
  async getMyPointsOfContact(@User() user: UserEntity) {
    return this.pointsOfContactService.getMyPointsOfContact(user?.companyProfile?.id);
  }

  @ApiOperation({ summary: 'Get PointsOfContact By ID' })
  @Get('/:id')
  async getPointsOfContactById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.pointsOfContactService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'Points Of Contact Section fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete PointsOfContact By ID' })
  // @Delete('/:id')
  // async deletePointsOfContact(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.pointsOfContactService.update(id, { isDeleted: true } as unknown as CPPointsOfContactEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Points Of Contact Section deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My PointsOfContact' })
  // @Delete('section/me')
  // async deleteMyPointsOfContact(@User() user: UserEntity) {
  //   const response = await this.pointsOfContactService.deleteMyPointsOfContact(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'Points Of Contact Section deleted successfully!', response).toJSON();
  // }
}
