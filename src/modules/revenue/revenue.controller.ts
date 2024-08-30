import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddRevenueDto, UpdateRevenueDto } from './dtos';
import { CPRevenueEntity } from 'src/typeorm/models';

@ApiTags('Revenue')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @ApiOperation({ summary: 'Add Revenue' })
  @Post()
  async addRevenue(@User() user: any, @Body() addRevenueDto: AddRevenueDto) {
    const inputParams = { ...addRevenueDto, companyProfile: { id: user?.companyProfile.id } };
    const revenue = await this.revenueService.create(inputParams as unknown as CPRevenueEntity);
    return new ResponseDto(HttpStatus.CREATED, 'Revenue added successfully!', revenue).toJSON();
  }

  @ApiOperation({ summary: 'Update Revenue' })
  @Put('/:id')
  async updateRevenue(@Param('id') id: number, @Body() updateRevenueDto: UpdateRevenueDto) {
    const revenue = await this.revenueService.updateRevenue(id, updateRevenueDto);
    return new ResponseDto(HttpStatus.CREATED, 'Revenue updated successfully!', revenue).toJSON();
  }

  @ApiOperation({ summary: 'Get Revenue' })
  @Get('/:id')
  async getFinancialHealthById(@Param('id') id: number) {
    return await this.revenueService.findById(id);
  }

  @ApiOperation({ summary: 'Delete Revenue' })
  @Delete('/:id')
  async deleteFinancialHealth(@Param('id') id: number) {
    return this.revenueService.update(id, { isDeleted: true } as unknown as CPRevenueEntity);
  }
}
