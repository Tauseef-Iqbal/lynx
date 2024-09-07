import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { BusinessGoalsService } from './business-goals.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddBusinessGoalsDto, UpdateBusinessGoalsDto } from './dtos';
import { CPBusinessGoalsEntity, UserEntity } from 'src/typeorm/models';

@ApiTags('BusinessGoals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('business-goals')
export class BusinessGoalsController {
  constructor(private readonly businessGoalsService: BusinessGoalsService) {}

  @ApiOperation({ summary: 'Add Business Goals' })
  @Post()
  async addBusinessGoals(@User() user: UserEntity, @Body() addBusinessGoalsDto: AddBusinessGoalsDto) {
    const cyberSecurity = await this.businessGoalsService.addBusinessGoals(user, addBusinessGoalsDto);
    return new ResponseDto(HttpStatus.CREATED, 'BusinessGoals added successfully!', cyberSecurity).toJSON();
  }

  @ApiOperation({ summary: 'Update Business Goals' })
  @Put('/:id')
  async updateBusinessGoals(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateBusinessGoalsDto: UpdateBusinessGoalsDto) {
    const cyberSecurity = await this.businessGoalsService.updateBusinessGoals(id, user, updateBusinessGoalsDto);
    return new ResponseDto(HttpStatus.CREATED, 'BusinessGoals added successfully!', cyberSecurity).toJSON();
  }

  @ApiOperation({ summary: 'Get My Business Goals' })
  @Get('section/me')
  async getMyBusinessGoals(@User() user: UserEntity) {
    const response = await this.businessGoalsService.getMyBusinessGoals(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My BusinessGoals Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get BusinessGoals By ID' })
  @Get('/:id')
  async getBusinessGoalsById(@Param('id', ParseIntPipe) id: number) {
    const response = await this.businessGoalsService.findById(id);
    return new ResponseDto(HttpStatus.OK, 'BusinessGoals Section fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Delete BusinessGoals By ID' })
  @Delete('/:id')
  async deleteBusinessGoals(@Param('id', ParseIntPipe) id: number) {
    const response = await this.businessGoalsService.update(id, { isDeleted: true } as unknown as CPBusinessGoalsEntity);
    return new ResponseDto(HttpStatus.OK, 'BusinessGoals Section deleted successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Delete My Business Goals' })
  @Delete('section/me')
  async deleteMyBusinessGoals(@User() user: UserEntity) {
    const response = await this.businessGoalsService.deleteMyBusinessGoals(user.companyProfile.id);
    return new ResponseDto(HttpStatus.OK, 'BusinessGoals Section deleted successfully!', response).toJSON();
  }
}
