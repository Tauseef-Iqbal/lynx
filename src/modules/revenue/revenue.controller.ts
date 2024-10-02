import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddRevenueDto, UpdateRevenueDto } from './dtos';
import { UserEntity } from 'src/typeorm/models';
import { CompanyProfileGuard } from 'src/shared/middlewares';

@ApiTags('Revenue')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, CompanyProfileGuard)
@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @ApiOperation({ summary: 'Add Revenue' })
  @Post()
  async addRevenue(@User() user: UserEntity, @Body() addRevenueDto: AddRevenueDto) {
    const revenue = await this.revenueService.addRevenue(user, addRevenueDto);
    return new ResponseDto(HttpStatus.CREATED, 'Revenue added successfully!', revenue).toJSON();
  }

  @ApiOperation({ summary: 'Update Revenue' })
  @Put('/:id')
  async updateRevenue(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity, @Body() updateRevenueDto: UpdateRevenueDto) {
    const revenue = await this.revenueService.updateRevenue(id, user, updateRevenueDto);
    return new ResponseDto(HttpStatus.CREATED, 'Revenue updated successfully!', revenue).toJSON();
  }

  @ApiOperation({ summary: 'Get My Revenue' })
  @Get('section/me')
  async getMyRevenue(@User() user: UserEntity) {
    const response = await this.revenueService.getMyRevenue(user?.companyProfile?.id);
    return new ResponseDto(HttpStatus.OK, 'My Revenue fetched successfully!', response).toJSON();
  }

  @ApiOperation({ summary: 'Get Revenue' })
  @Get('/:id')
  async getMyRevenueByID(@Param('id', ParseIntPipe) id: number) {
    const response = await this.revenueService.findById(id, { relations: { projectsAwarded: true } });
    return new ResponseDto(HttpStatus.OK, 'Revenue fetched successfully!', response).toJSON();
  }

  // @ApiOperation({ summary: 'Delete Revenue' })
  // @Delete('/:id')
  // async deleteMyRevenueByID(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.revenueService.update(id, { isDeleted: true } as unknown as CPRevenueEntity);
  //   return new ResponseDto(HttpStatus.OK, 'Revenue deleted successfully!', response).toJSON();
  // }

  // @ApiOperation({ summary: 'Delete My Revenue' })
  // @Delete('section/me')
  // async deleteMyRevenue(@User() user: UserEntity) {
  //   const response = await this.revenueService.deleteMyRevenue(user.companyProfile.id);
  //   return new ResponseDto(HttpStatus.OK, 'My Revenue deleted successfully!', response).toJSON();
  // }
}
