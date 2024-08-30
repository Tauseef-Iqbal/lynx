import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CybersecurityService } from './cybersecurity.service';
import { ResponseDto } from 'src/shared/dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { AddCybersecurityDto, UpdateCybersecurityDto } from './dtos';
import { CPCybersecurityEntity } from 'src/typeorm/models';

@ApiTags('Cybersecurity')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cybersecurity')
export class CybersecurityController {
  constructor(private readonly cybersecurityService: CybersecurityService) {}

  @ApiOperation({ summary: 'Add Cybersecurity' })
  @Post()
  async addCybersecurity(@User() user: any, @Body() addCybersecurityDto: AddCybersecurityDto) {
    const inputParams = { ...addCybersecurityDto, companyProfile: { id: user?.companyProfile.id } };
    const toolsAndApplications = await this.cybersecurityService.create(inputParams as unknown as CPCybersecurityEntity);
    return new ResponseDto(HttpStatus.CREATED, 'Cybersecurity added successfully!', toolsAndApplications).toJSON();
  }

  @ApiOperation({ summary: 'Update Cybersecurity' })
  @Put('/:id')
  async updateCybersecurity(@Param('id') id: number, @Body() updateCybersecurityDto: UpdateCybersecurityDto) {
    const toolsAndApplications = await this.cybersecurityService.update(id, updateCybersecurityDto as unknown as CPCybersecurityEntity);
    return new ResponseDto(HttpStatus.CREATED, 'Cybersecurity added successfully!', toolsAndApplications).toJSON();
  }

  @Get('/:id')
  async getFinancialHealthById(@Param('id') id: number) {
    return await this.cybersecurityService.findById(id);
  }

  @Delete('/:id')
  async deleteFinancialHealth(@Param('id') id: number) {
    return this.cybersecurityService.update(id, { isDeleted: true } as unknown as CPCybersecurityEntity);
  }
}
